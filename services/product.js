var MongoClient = require('mongodb').MongoClient;

var CONNECT_STRING = 'mongodb://localhost:27017/travel';

exports.findOne = function (query, callback) {
	if(!query) callback(null);

	MongoClient.connect(CONNECT_STRING, function(err, db) {
		if(err){
			callback(err);
			db.close();
		}
		
		db.collection('products').findOne(
			query,
			function (err, prod) {
				callback(err, prod);
				db.close();
			}
		);
	});
};

var PAGE_SIZE = 7;

exports.findByPage = function (pageQuery, callback) {
	if(!pageQuery){
		callback(null, []);
		db.close();
	}

	MongoClient.connect(CONNECT_STRING, function(err, db) {
		if(err) callback(err);

		db.collection('products').find()
			.skip((pageQuery.PageIndex - 1) * PAGE_SIZE)
			.limit(PAGE_SIZE)
			.toArray(function (err, prods) {
				callback(err, prods);
				db.close();
			});
	});	
};

