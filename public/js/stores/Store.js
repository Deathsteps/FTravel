var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var fetch = require('../../../util/fetch');

var IS_CLIENT = typeof window !== 'undefined';

var Store = _.assign({}, EventEmitter.prototype, {

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
	}
});

module.exports = Store;