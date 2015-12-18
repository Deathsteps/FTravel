import React          from "react";
import ReactDOM       from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import Root 				from "./components/Root";
import RouteManager from './libs/RouteManager';
import NotFoundPage from './components/NotFoundPage';
import ListPage     from './components/ListPage';
import DetailPage   from './components/DetailPage';
import RoutePage    from './components/RoutePage';

RouteManager.register(NotFoundPage);
RouteManager.register('/product', ListPage);
RouteManager.register('/product/:id', DetailPage);
RouteManager.register('/route/:productId', RoutePage);

if(typeof window !== 'undefined'){
	require('../css/site.less');

	window.onload = function() {

		RouteManager.bindUrlChangeEvents();

		ReactDOM.render(React.createFactory(Root)(), document.getElementById("main"));
	};
}else{
	// Server Side
	// initializing function
	module.exports = function (path, callback) {
		console.log(Root);
		console.log(Root.fetchInitialData);
		Root.fetchInitialData(path).then(function (data) {
			RouteManager.defaultPath = path;

			var model = {
				title: 'Page',
				body: ReactDOMServer.renderToString(React.createFactory(Root)()),
				data: data
			};

			callback(model);
		});		
	};
}
