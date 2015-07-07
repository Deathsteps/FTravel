var React = require('react');

module.exports = function (req, res, next) {
	var launchApp = require("../public/js/app");
	launchApp(req.path, function (model) {
		res.render('layout', model);		
	});
};
