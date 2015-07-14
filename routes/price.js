var express = require('express');

var priceService = require('../services/price');

var router = express.Router();

router.post('/price', function (req, res, next) {
	if (req.headers['content-type'] === 'application/json') {
		priceService.find(req.body,
			function(err, data) {
				if (err) {
					err.status = 500;
					return next(err);
				}
				res.json(data);
			});
	}else{
		var err = new Error('Forbidden');
		err.status = 403;
		next(err);
	}
});

module.exports = router;