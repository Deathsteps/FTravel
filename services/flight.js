var _ = require('lodash');
var moment = require('moment');

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;

var CONNECT_STRING = 'mongodb://localhost:27017/travel';

/**
 * @param  {Number} flightId
 * @param  {Function}
 */
exports.findOne = function (flightId, callback) {
	if(!flightId) return null;

	flightId = new MongoDB.ObjectId(flightId);

	MongoClient.connect(CONNECT_STRING, function (err, db) {
		if(err) {
			callback(err);
			db.close();
		}

		db.collection('flights').findOne(
			{"_id": flightId},
			function (err, flight) {
				callback(err, flight);
				db.close();
			}
		);
	});
};
/**
 * @param  {Object} query
 * { Search: {
 * 		ArriveCityID : 43,
 *		DepartCityID : 2 }}
 * @param  {Function}
 */
exports.findRecommendOne = function (query, callback) {
	if(!query) return null;

	MongoClient.connect(CONNECT_STRING, function (err, db) {
		if(err) {
			callback(err);
			db.close();
		}

		db.collection('flights').findOne(
			query,
			function (err, flight) {
				callback(err, flight);
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
 *		DepartCityID : 2 }}
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

		db.collection('flights').find(query)
			.skip((pageQuery.PageIndex - 1) * PAGE_SIZE)
			.limit(PAGE_SIZE)
			.toArray(function (err, flights) {
				callback(err, flights);
				db.close();
			});
	});
};