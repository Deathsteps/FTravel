var React = require("react");

var Root         = require("./components/Root");
var RouteManager = require('./libs/RouteManager');
var NotFoundPage = require('./components/NotFoundPage');
var ListPage     = require('./components/ListPage');
var DetailPage   = require('./components/DetailPage');
var RoutePage    = require('./components/RoutePage');

RouteManager.register(NotFoundPage);
RouteManager.register('/product', ListPage);
RouteManager.register('/product/:id', DetailPage);
RouteManager.register('/route/:productId', RoutePage);

if(typeof window !== 'undefined'){
	require('../css/site.less');

	window.onload = function() {

		RouteManager.bindUrlChangeEvents();

		React.render(React.createFactory(Root)(), document.getElementById("main"));
	};
}else{
	// Server Side
	// initializing function
	module.exports = function (path, callback) {
		Root.fetchInitialData(path).then(function (data) {
			RouteManager.defaultPath = path;

			var model = {
				title: 'Page',
				body: React.renderToString(React.createFactory(Root)()),
				data: data
			};

			callback(model);
		});		
	};
}
