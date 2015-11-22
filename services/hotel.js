var _ = require('lodash');
var moment = require('moment');

var MongoClient = require('mongodb').MongoClient;

var CONNECT_STRING = 'mongodb://localhost:27017/travel';

/**
 * @param  {Number} hotelId
 * @param  {Function}
 */
exports.findOne = function (hotelId, callback) {
	if(!hotelId) return null;

	MongoClient.connect(CONNECT_STRING, function (err, db) {
		if(err) {
			callback(err);
			db.close();
		}

		db.collection('hotels').findOne(
			{"BasicInfo.HotelId": hotelId},
			function (err, hotel) {
				callback(err, hotel);
				db.close();
			}
		);
	});
};
/**
 * @param  {Object} query
 * { Search: {
 * 		ArriveCityID : 43,
 *		CheckInDate : "/Date(1438358400000+0800)/",
 *		CheckOutDate : "/Date(1438531200000+0800)/" }}
 * @param  {Function}
 */
exports.findRecommendOne = function (query, callback) {
	if(!query) return null;

	MongoClient.connect(CONNECT_STRING, function (err, db) {
		if(err) {
			callback(err);
			db.close();
		}

		db.collection('hotels').findOne(
			query,
			function (err, hotel) {
				callback(err, hotel);
				db.close();
			}
		);
	});
};

var PAGE_SIZE = 10;
/**
 * @param  {Object} query
 * { Search: {
 * 		ArriveCityID : 43,
 *		CheckInDate : "/Date(1438358400000+0800)/",
 *		CheckOutDate : "/Date(1438531200000+0800)/" },
 *	 PageQuery: { 
 *	 	PageIndex: 1 }}
 * @param  {Function}
 */
exports.find = function (query, callback) {
	if(!query) return null;

	var pageQuery = query.PageQuery;
	delete query.PageQuery;

	MongoClient.connect(CONNECT_STRING, function (err, db) {
		if(err) {
			callback(err);
			db.close();
		}

		db.collection('hotels').find(query)
			.skip((pageQuery.PageIndex - 1) * PAGE_SIZE)
			.limit(PAGE_SIZE)
			.toArray(function (err, hotels) {
				callback(err, hotels);
				db.close();
			});
	});
};