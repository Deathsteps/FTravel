var Promise = require('bluebird');

var Store = require('./Store');

var ProductStore = Store.create({

	LIST_CACHE_KEY: 'PRODUCTS',
	DETAIL_CHACHE_KEY: 'PRODUCT_DETAILS',

	findByPage: function (pageQuery, fromCache) {
		var cache = this._getFromCache(this.LIST_CACHE_KEY);
		if(fromCache) return cache;
		if(cache) return this._promiseCache(cache);

		return (
			this._fetch('/product', {
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(pageQuery)
			}).then(function (res) {
				var data = res.json();
				this.emit('list-fetched', data);
				this._setCache(this.LIST_CACHE_KEY, data);
				// for passing data to next then function
				return Promise.resolve(res);
			}.bind(this))
		);
	},

	findOne: function (query, fromCache) {
		var cache = this._getFromCache(this.DETAIL_CHACHE_KEY);
		if(fromCache)
			return (cache && cache.ProductID == query.ProductID) ? cache : null;
		if(cache && cache.ProductID == query.ProductID)
			return this._promiseCache(cache);

		return (
			this._fetch('/product/' + query.ProductID, {
				headers: {'Content-Type': 'application/json'}
			}).then(function (res) {
				var data = res.json();
				this.emit('detail-fetched', data);
				this._setCache(this.DETAIL_CHACHE_KEY, data);
				return Promise.resolve(res);
			}.bind(this))
		);

	}
});

module.exports = ProductStore;

