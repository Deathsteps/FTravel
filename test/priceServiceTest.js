var assert = require('assert');
var moment = require('moment');
var _ = require('lodash');

var priceService = require('../services/price');

describe('Price Service', function(){
  describe('findOne', function(){
    it('should find without error', function(done){
    	// Should insert a test data here.
    	priceService.find(
    		{ ProductID: 2260535 }, 
    		function (err, data) {
	    		assert.equal(err, null);
	    		assert.equal(data.Prices.constructor, Array);
	    		done();
	    	}
	    );
    });

    it('find with the date range correctly', function (done) {
    	var dateRange = { Start: '2015-07-13', End: '2015-09-13' };
    	priceService.find(
    		{ ProductID: 2260535, DateRange: dateRange }, 
    		function (err, data) {
	    		assert.equal(err, null);
	    		assert.equal(data.Prices.constructor, Array);

	    		var exception = 
	    			_.find(data.Prices, function (item) {
	    				return !moment(item.Date).isBetween(dateRange.Start, dateRange.End);
	    			});
	    		assert.equal(exception, undefined);

	    		done();
	    	}
	    );
    });
  });
});