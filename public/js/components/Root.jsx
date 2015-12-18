import React, {Component}      from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RouteManager            from '../libs/RouteManager';

export default class Root extends Component {

	// Get initial data for server side rendering
	static fetchInitialData(path) {
		var route = RouteManager.match(path);

		if(route.component){
			return route.component.fetchInitialData(route.params);
		}else{
			return Promise.resolve({});
		}
	}

	constructor(props) {
    super(props);
    // set state
    this.state = {
			path: RouteManager.defaultPath
		};
		// deal with this
		this.setPath = (path) => this.setState({ path: path });
  }

	componentDidMount() {
		RouteManager.on('route-changed', this.setPath);
	}

	componentWillUnmount() {
		RouteManager.off('route-changed', this.setPath);
	}

	render() {
		var path = this.state.path;
		var route = RouteManager.match(path);
		var page = React.createElement(route.component, {params: route.params, key: route.key});
		return (
				<ReactCSSTransitionGroup 
					className="animated_pages"
					component="div"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}
					transitionName="page"
				>
					{page}
				</ReactCSSTransitionGroup>
			);
	}
}