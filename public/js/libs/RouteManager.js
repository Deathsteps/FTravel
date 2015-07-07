var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var _routes = [];
var _notFoundPage = null;

var rParam = /:[\w\d]+/g;

var RouteManager = _.assign({}, EventEmitter.prototype, {

	defaultPath: typeof document === 'undefined' ? '' : document.location.pathname,

	register: function (pattern, component) {
		if(!pattern) return;

		if(arguments.length === 1)
			return (_notFoundPage = pattern);

		var route = {
			pattern: this._parsePattern(pattern),
			component: component
		};
		// route matching is a FILO procedure,
		// the later route will be matched while there're two same patterns
		_routes.push(route);
	},

	clear: function () {
		_routes = [];	
	},

	_parsePattern: function (pattern) {
		var ret = {regExp: pattern};

		if(_.isRegExp(pattern)) return ret;

		ret.regExp = new RegExp(
			pattern.replace(/\\/g,'\\\\').replace(/\//g,'\\/').replace(rParam, "([\\w\\d]+)"));
		// parse parameter names
		if(rParam.test(pattern)){			
			var paramNames = pattern.match(rParam);
			paramNames = _.map(paramNames, function (param) {
				return param.substring(1, param.length);
			});
			ret.params = paramNames;
		}

		return ret;
	},

	match: function (pathname) {
		for (var i = _routes.length - 1; i >= 0; i--) {
			var route = _routes[i];
			var matches = pathname.match(route.pattern.regExp);

			if(matches){
				matches.shift();
				var ret = {component: route.component, params: _.toArray(matches)};
				// fill in parameters
				if(route.pattern.params)
					ret.params.forEach(function (item, i) {
						ret.params[route.pattern.params[i]] = item;
					});
				return ret;
			}
		}
		return {component: _notFoundPage};
	},

	broadcast: function () {
		this.emit('route-changed', document.location.pathname);
	},

	bindUrlChangeEvents: function () {
		this._onPopState = this.broadcast.bind(this);
		window && window.addEventListener('popstate', this._onPopState);
	},

	unbindUrlChangeEvents: function () {
		window && window.removeEventListener('popstate', this._onPopState);	
	}
});

module.exports = RouteManager;