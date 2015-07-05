var React = require('react');

var Root = React.createClass({

	getInitialState: function () {
		return {
			path: ''
		};
	},

	componentDidMount: function () {
		this._historyChangeHandler = this._historyChange.bind(this);
		window.addEventListener('popstate', this._historyChangeHandler);
	},

	componentWillUnMount: function () {
		window.removeEventListener('popstate', this._historyChangeHandler);
	},

	render: function () {
		
	},

	_historyChange: function () {
		this.setState({
			path: document.location.pathname
		});
	}
});