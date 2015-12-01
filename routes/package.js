var express = require('express');
var React   = require('react');
var async   = require('async');

var packageService = require('../services/package');
var hotelService = require('../services/hotel');
var flightService = require('../services/flight');
var dateEncoder = require('../util/dateEncoder');

var findPackage = Promise.promisify(packageService.findOne, packageService);

function getHotelQuery (package) {

}

function getFlightQuery (package) {
	
}

/**
 * @param  {Object}
 * 	{ ProductID: 222,
 * 	  StartDate: '/Date(1292428800000-0000)/',
 * 	 	EndDate: '/Date(1292428800000-0000)/',
 * 	  DepartCityID: 2,
 * 	  ArriveCityID: 43 }
 * @param  {Function}
 */
function getPackageData (query, callback) {
	findPackage({ ProductID: query.productId })
		.done(function (data) {

			var hotelQuery = getHotelQuery(data, query);
			var flightQuery = getFlightQuery(data, query);

			async.parallel({
				hotel: function (callback) {
					hotelService.findRecommendOne(hotelQuery, callback);
				},
				flight: function (callback) {
					flightService.findRecommendOne(flightQuery, callback);
				}
			}, function (err, result) {
				result.package = data;
				callback(err, result);
			});

		})
		.catch(callback);
}

var router = express.Router();

router.get('/package/:productId', function (req, res, next) {
	if(req.headers["content-type"] === 'application/json'){
		var query = {
			ProductID: +req.params.productId,
			StartDate: dateEncoder.decode(req.query.sdate, 'aspNet'),
			EndDate: dateEncoder.decode(req.query.edate, 'aspNet'),
			DepartCityID: +req.query.dcity,
			ArriveCityID: +req.query.acity
		};
		getPackageData(query, function (err, data) {
			if(err){
				err.status = 500;
				next(err);
			}else{
				res.json(data);
			}
		});
	}else{
		// practice big pipe solution
		next();
	}
});