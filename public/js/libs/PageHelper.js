var RouteManager = require('./RouteManager');

try{
	var backwardStyleContent = require('../../css/backward.css');	
}catch (ex){
	console.log('Server side cant require a css.');
}

var _backwardStyle;

function addBackwardStyle () {
	if(_backwardStyle) return;
	// To add a backward animation style sheet to fix the following problem: 
	// CSSTransitionGroup treat every page as a new component and add an enter class to it,
	// which makes the backward motion look like a forward one. 
	// It will make the user confused about their action.
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(backwardStyleContent));
	document.getElementsByTagName('head')[0].appendChild(style);
	_backwardStyle = style;
}

function removeBackwardStyle () {
	if(_backwardStyle){
		_backwardStyle.parentNode.removeChild(_backwardStyle);
		_backwardStyle = null;
	}
}

var PageHelper = {

	forward: function (path, opts) {
		removeBackwardStyle();

		opts = opts || {};
		history.pushState(
			opts.state || {},
			opts.title || '',
			path
		);

		RouteManager.broadcast(path);
	},

	backward: function (path, opts) {
		addBackwardStyle();
		// to do more with the arguments
		history.back();
	}
};

module.exports = PageHelper;