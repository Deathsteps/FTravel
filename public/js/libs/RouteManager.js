var _ = require('lodash');

var _routes = [];

var rParam = /:[\w\d]+/g;

var RouteManager = {
	register: function (pattern, appClass) {
		if(!pattern) return;
		var route = {
			pattern: this._parsePattern(pattern),
			appClass: appClass
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
				var ret = {appClass: route.appClass, params: _.toArray(matches)};
				// fill in parameters
				if(route.pattern.params)
					ret.params.forEach(function (item, i) {
						ret.params[route.pattern.params[i]] = item;
					});
				return ret;
			}
		}
		return {appClass: null};
	}
};

module.exports = RouteManager;