var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

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

	componentWillUnmount: function () {
		RouteManager.off('route-changed', this.setPath);
	},

	render: function () {
		var path = this.state.path;
		var route = RouteManager.match(path);
		var page = React.createElement(route.component, {params: route.params, key: route.key});
		return (
			<ReactCSSTransitionGroup transitionName="page" component="div" className="animated_pages" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				{page}
			</ReactCSSTransitionGroup>
		);
	},

	setPath: function (path) {
		this.setState({
			path: path
		});
	}
});

module.exports = Root;