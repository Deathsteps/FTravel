var React = require('react');
var Promise = require('bluebird');

var RouteManager = require('../libs/RouteManager');
var NotFoundPage = require('./NotFoundPage');
var ListPage = require('./ListPage');

RouteManager.register('/product', ListPage);

var Root = React.createClass({

	statics: {

		defaultPath: '',

		// Get initial data for server side rendering
		fetchInitialData: function (path) {
			var route = RouteManager.match(path);

			if(route.appClass){
				return route.appClass.fetchInitialData();
			}else{
				return Promise.resolve({});
			}

		}
	},

	getInitialState: function () {
		return {
			path: typeof document === 'undefined' ? Root.defaultPath : document.location.pathname
		};
	},

	componentDidMount: function () {
		this._historyChangeHandler = this._historyChange.bind(this);
		window && window.addEventListener('popstate', this._historyChangeHandler);
	},

	componentWillUnMount: function () {
		window && window.removeEventListener('popstate', this._historyChangeHandler);
	},

	render: function () {
		var path = this.state.path;

		var route = RouteManager.match(path);

		if(route.appClass){
			return React.createElement(route.appClass, {params: route.params});
		}else{
			return (<NotFoundPage message="Mis-Matched Path. Please Register the route."/>);
		}
	},

	_historyChange: function () {
		this.setState({
			path: document.location.pathname
		});
	}
});

module.exports = Root;