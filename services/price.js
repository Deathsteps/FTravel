var _ = require('lodash');
var moment = require('moment');

var MongoClient = require('mongodb').MongoClient;

var CONNECT_STRING = 'mongodb://localhost:27017/travel';

function filterPrices (calendar, dateRange) {
	if(!dateRange) return calendar;

	calendar.Prices = _.filter(calendar.Prices, function (item) {
		return moment(item.Date).isBetween(dateRange.Start, dateRange.End);
	});

	return calendar;
}
/**
 * @param  {Object} query 
 * 	{ DateRange: 
 * 		{ Start: '2014-01-02', 
 * 		  End: '2015-01-21' }, 
 * 		ProductID: 222 }
 * @param  {Function}
 */
exports.find = function (query, callback) {
	if(!query) return null;

	var dateRange = query.DateRange;
	delete query.DateRange;

	MongoClient.connect(CONNECT_STRING, function (err, db) {
		if(err) {
			callback(err);
			db.close();
		}

		db.collection('prices').findOne(
			query,
			function (err, calendar) {
				callback(err, filterPrices(calendar, dateRange));
				db.close();
			}
		);
	});
};