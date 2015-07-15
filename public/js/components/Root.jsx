var React = require('react/addons');
var Promise = require('bluebird');

var CSSTransitionGroup = React.addons.CSSTransitionGroup;
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
		// http://unitstep.net/blog/2015/03/03/using-react-animations-to-transition-between-ui-states/
		// Currently, ReactCSSTransitionGroup can only animate components 
		// that are being added or removed, not those being updated.
		// So we use the route key as the page key.
		var page = React.createElement(route.component, {params: route.params, key: route.key});
		return (
			<CSSTransitionGroup transitionName="page" component="div" className="animated_pages">
				{page}
			</CSSTransitionGroup>
		);
	},

	setPath: function (path) {
		this.setState({
			path: path
		});
	}
});

module.exports = Root;