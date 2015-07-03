var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var fetch = require('../../../util/fetch');

var Store = _.assign({}, EventEmitter.prototype, {
	_fetch: fetch,

	_getFromCache: function () {
		if(typeof window === 'undefined') // Server-Side
			return null;

		var cacheData = 
			window.initialData[this.cacheKey] ||
			window.localStorage.getItem(this.cacheKey);
		return _.isString(cacheData) ? JSON.parse(cacheData) : cacheData;
	},

	_setCache: function (data) {
		if(typeof window !== 'undefined')
			window.localStorage.setItem(this.cacheKey, data);
	},

	_errorHandler: function (error) {
	}
});

module.exports = Store;