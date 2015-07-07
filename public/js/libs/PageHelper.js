var RouteManager = require('./RouteManager');

var PageHelper = {

	forward: function (path, opts) {
		opts = opts || {};
		history.pushState(
			opts.state || {},
			opts.title || '',
			path
		);

		RouteManager.broadcast(path);
	},

	backward: function (path, opts) {
		// to do more with the arguments
		history.back();
	}
};

module.exports = PageHelper;