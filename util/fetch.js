var Promise = require('bluebird');

function Response(opts) {
	this.status = opts.status || '200';
	this.statusText = opts.statusText || 'Success';
	this.headers = opts.headers;
	this.url = opts.url || '';
	this.body = opts.body;
	this.jsonBody = opts.jsonBody;
}
Response.prototype = {
	constructor: Response,

	json: function () {
		return this.jsonBody || JSON.parse(this.body);
	},

	text: function () {
		return this.body || JSON.stringify(this.jsonBody);
	}
};

if(typeof XMLHttpRequest === "function"){
	(function (module) {
		function headers(xhr) {
			var head = {};
			var pairs = xhr.getAllResponseHeaders().trim().split('\n');
			pairs.forEach(function(header) {
				var split = header.trim().split(':');
				var key = split.shift().trim();
				var value = split.join(':').trim();
				head[key] = value;
			});
			return head;
		}

		function responseURL(xhr) {
			if ('responseURL' in xhr) {
				return xhr.responseURL;
			}
			// Avoid security warnings on getResponseHeader when not allowed by CORS
			if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
				return xhr.getResponseHeader('X-Request-URL');
			}

			return;
		}

		function fetch (url, init) {

			var _headers = init.headers || {};
			var _method = (init.method || 'GET').toUpperCase();
			var _body = init.body;
			
			return new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();

				xhr.onload = function() {
					var status = (xhr.status === 1223) ? 204 : xhr.status;
					if (status < 100 || status > 599) {
						reject(new TypeError('Network request failed'));
						return;
					}

					resolve(new Response({
						status: status,
						statusText: xhr.statusText,
						headers: headers(xhr),
						url: responseURL(xhr),
						body: 'response' in xhr ? xhr.response : xhr.responseText
					}));
				};

				xhr.onerror = function() {
					reject(new TypeError('Network request failed'));
				};

				xhr.open(_method, url, true);

				_.forEach(_headers, function(value, name) {
					xhr.setRequestHeader(name, value);
				});

				xhr.send(typeof _body === 'undefined' ? null : _body);
			});
		}

		fetch.Response = Response;
		module.exports = fetch;
	})(module);
	
}else{
	(function (module) {
		var http = require('http');

		var options = {
			hostname: 'localhost',
			port: 3000,
			method: 'GET',
			headers: {
			  'Content-Type': 'application/json',
			  'Content-Length': 0
			}
		};

		function fetch (url, init) {
			return new Promise(function (resolve, reject) {
				var postData = init.body || '';
				options.path = url;
				options.method = init.method;
				options.headers = init.headers;
				options.headers['Content-Length'] = postData.length;

				var req = http.request(options, function(res) {
					res.setEncoding('utf8');

					var buffers = [];
					res.on('data', function (chunk) {
						buffers.push(chunk);
					});
					res.on('end', function () {
						resolve(new Response({
							status: res.statusCode,
							statusText: res.statusText,
							headers: res.headers,
							url: res.url,
							body: buffers.join('')
						}));
					});
				});

				req.on('error', function(e) {
					reject(e);
				});

				// write data to request body
				req.write(postData);
				req.end();
			});
		}

		fetch.Response = Response;
		module.exports = fetch;
	})(module);
}

