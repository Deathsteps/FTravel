var React = require('react');
var Promise = require('bluebird');

var RouteManager = require('../libs/RouteManager');

var Root = React.createClass({

	statics: {
		// Get initial data for server side rendering
		fetchInitialData: function (path) {
			var route = RouteManager.match(path);

			if(route.component){
				return route.component.fetchInitialData(route.params);
			}else{
				return Promise.resolve({});
			}

		}
	},

	getInitialState: function () {
		return {
			path: RouteManager.defaultPath
		};
	},

	componentDidMount: function () {

		RouteManager.on('route-changed', this.setPath);
	},

	componentWillUnMount: function () {
		RouteManager.off('route-changed', this.setPath);
	},

	render: function () {
		var path = this.state.path;
		var route = RouteManager.match(path);
		return React.createElement(route.component, {params: route.params});
	},

	setPath: function (path) {
		this.setState({
			path: path
		});
	}
});

module.exports = Root;