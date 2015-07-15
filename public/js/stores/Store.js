var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var fetch = require('../../../util/fetch');

var IS_CLIENT = typeof window !== 'undefined';

var Store = _.assign({}, EventEmitter.prototype, {

	CACHE_KEY: '',

	clientSide: IS_CLIENT,

	_fetch: fetch,

	_serverCache: {expire: Date.now()},

	_getFromCache: function (key) {
		var cacheData;

		if(IS_CLIENT){
			cacheData = window.initialData[key];
			if(cacheData){
				this._setCache(key, cacheData);
				return cacheData;				
			}

			cacheData = window.localStorage.getItem(key);
			if(!cacheData) return null;

			cacheData = JSON.parse(cacheData);
		}else{
			cacheData = this._serverCache;
		}

		return cacheData.expire < Date.now() ? null : cacheData.data;
	},

	_setCache: function (key, data, expire) {
		// Client side default expire time: 1 day
		// Server side default expire time: 1 second
		if(!expire)
			expire = IS_CLIENT ? (1 * 24 * 60 * 60 * 1000) : 60;

		data = {data: data, expire: new Date(Date.now() + expire)};
		if(IS_CLIENT){
			window.localStorage.setItem(key, JSON.stringify(data));
		}else{
			this._serverCache = data;
		}
	},

	_clearCache: function () {
		// to do
	},

	_errorHandler: function (error) {
		// to do
	},

	// common find action
	find: function (query, fromCache) {
		var cache = this._getFromCache(this.CACHE_KEY);
		if(fromCache) return cache;

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