var Store = require('./Store');

var PriceStore = Store.create({
	CACHE_KEY: 'PRICES',

	find: function (query, fromCache) {
		var cache = this._getFromCache(this.CACHE_KEY);
		if(fromCache)
			return (cache && cache.ProductID == query.ProductID) ? cache : null;
		if(cache && cache.ProductID == query.ProductID)
			return this._promiseCache(cache);

		return (
			this._fetch('/price', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(query)
			}).then(function (res) {
				var data = res.json();
				this.emit('price-fetched', data);
				// the expire time of price cache should be short
				// here I set 1 minute
				this._setCache(this.CACHE_KEY, data, 60 * 1000);
				// for passing data to next then function
				return Promise.resolve(res);
			}.bind(this))
		);	
	}
});

module.exports = PriceStore;