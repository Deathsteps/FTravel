require('../css/site.less');

var React = require("react");
var ListPage = React.createFactory(require("./components/ListPage"));

window.onload = function() {
	React.render(ListPage(), document.getElementById("main"));
};