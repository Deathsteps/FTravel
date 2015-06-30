var assert = require("assert");

var productService = require('../services/product');

describe('Product Service', function(){
  describe('findOne', function(){
    it('should find without error', function(done){
    	// Should insert a test data here.
    	var query = {ProductID: 2260535};
    	productService.findOne(
    		query, 
    		function (err, data) {
	    		assert.equal(err, null);
	    		assert.equal(data.ProductID, 2260535);
	    		done();
	    	}
	    );
    });
  });

  describe('findByPage', function(){

  	var pageCount = 0, pageSize = 7, pageLeft = 0;

  	var MongoClient = require('mongodb').MongoClient;
  	var CONNECT_STRING = 'mongodb://localhost:27017/travel';

  	MongoClient.connect(CONNECT_STRING, function(err, db) {
  		db.collection('products').count(function (err, count) {
  			pageCount = Math.ceil(count / pageSize);
  			pageLeft = count % pageSize;
  		});
  	});

    it('should find without error', function(done){
    	productService.findByPage(
    		{PageIndex: 1},
    		function (err, data) {
	    		assert.equal(err, null);
	    		assert.equal(data.length, pageSize);
	    		done();
	    	}
	    );
    });

    it('should page data correctly', function(done){
    	productService.findByPage(
    		{PageIndex: pageCount},
    		function (err, data) {
	    		assert.equal(err, null);
	    		assert.equal(data.length, pageLeft);
	    		done();
	    	}
	    );
    });
  });
});