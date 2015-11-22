var express = require('express');
var React = require('react');

var dateEncoder = require('../util/dateEncoder');
var hotelService = require('../services/hotel');

var router = express.Router();

route.get('/hotel', function (req, res, next) {
	if(req.headers["content-type"] === 'application/json'){
		var query = {
			Search: {
				"ArriveCityID" : +req.query.arrive,
				"CheckInDate"  : dateEncoder.decode(req.query.checkIn, 'aspNet'),
				"CheckOutDate" : dateEncoder.decode(req.query.checkOut, 'aspNet'),
			},
			PageQuery: {
				PageIndex: +req.query.p || 1
			}
		};

		hotelService.find(query, function (err, hotels) {
			if(err){
				err.status = 500;
				return next(err);
			}
			res.json(hotels);
		});

	}else{
		next();
	}
});

router.get('/hotel/:id', function (req, res, next) {
	if(req.headers["content-type"] === 'application/json'){
		hotelService.findOne(+req.params.id, function (err, hotel) {
			if(err){
				err.status = 500;
				return next(err);
			}
			res.json(hotel);
		});
	}else{
		next();
	}
}); 


module.exports = router;
