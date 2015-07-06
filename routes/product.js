var express = require('express');
var React = require('react');

require("node-jsx").install({
  harmony: true,
  extension: ".jsx"
});

var productService = require('../services/product');

var router = express.Router();

/* GET home page. */
router.get('/product', function(req, res, next) {
	if (req.headers['content-type'] === 'application/json') {
		productService.findByPage({
				PageIndex: +req.query.p || 1
			},
			function(err, prods) {
				if (err) {
					err.status = 500;
					return next(err);
				}
				res.json(prods);
			});
	}else{
		next();
	}
});

router.get('/product/:id', function(req, res, next) {
	productService.findOne({
			ProductID: +req.params.id // pay attention to the type of the parameter
		},
		function(err, prod) {
			if (err) {
				err.status = 500;
				return next(err);
			}
			res.json(prod);
		});
});

module.exports = router;
