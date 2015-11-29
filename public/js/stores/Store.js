var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var localStorage = require('./Storage').localStorage;
var serverMemoryStorage = require('./Storage').serverMemoryStorage;
var fetch = require('../../../util/fetch');

var IS_CLIENT = typeof window !== 'undefined';



var Store = _.assign({}, EventEmitter.prototype, {

	CACHE_KEY: '',

	_fetch: fetch,

	_getFromCache: function (key) {
		if(IS_CLIENT){
			var cacheData = window.initialData[key];
			if(cacheData){
				this._setCache(key, cacheData);
				return cacheData;
			}
			return localStorage.getItem(key);
		}else{
			return serverMemoryStorage.getItem(key);
		}
	},

	_setCache: function (key, data, expire, serverExpire) {
		// Client side default expire time: 1 day
		// Server side default expire time: 1 second
		if(IS_CLIENT){
			localStorage.setItem(key, data, expire || '1d');
		}else{
			serverMemoryStorage.setItem(key, data, expire || '1s');
		}
	},

	_clearCache: function () {
		// to do
	},

	_errorHandler: function (error) {
		// to do
	},

	_promiseCache: function (cache) {
		return Promise.resolve(new fetch.Response({ jsonBody: cache }));
	},

	// common find action
	find: function (query, fromCache) {
		var cache = this._getFromCache(this.CACHE_KEY);
		if(fromCache) return cache;
		if(cache) return this._promiseCache(cache);

		return (
			this._fetch('/' + this.name, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(query)
			}).then(function (res) {
				var data = res.json();
				this.emit( this.name + '-fetched', data);
				this._setCache(this.CACHE_KEY, data);
				// for passing data to next then function
				return Promise.resolve(res);
			}.bind(this))
		);
	}
});

Store.off = Store.removeListener;

Store.create = function (properties) {
	return _.assign({}, this, properties);
};

module.exports = Store;