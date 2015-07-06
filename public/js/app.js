require('../css/site.less');

var React = require("react");
var Root = React.createFactory(require("./components/Root"));

window.onload = function() {
	React.render(Root(), document.getElementById("main"));
};