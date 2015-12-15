var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var compiler = webpack(config);

exports.init = function (app) {
	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));
}
