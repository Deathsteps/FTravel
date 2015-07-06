var React = require('react');

module.exports = function (req, res, next) {
	var Root = require("../public/js/components/Root");
	Root.fetchInitialData(req.path).then(function (data) {
		Root.defaultPath = req.path;
		var body = React.renderToString(React.createFactory(Root)());
		var model = {
			title: 'Page',
			body: body,
			data: data
		};
		res.render('layout', model);
	});	
};
