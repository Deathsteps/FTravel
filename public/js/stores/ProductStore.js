var _ = require('lodash');
var Promise = require('bluebird');

var Store = require('./Store');

var ProductStore = _.assign({}, Store, {
	cacheKey: 'PRODUCTS',

	findByPage: function (pageQuery, onlyCache) {
		var cache = this._getFromCache();
		if(onlyCache || cache) return cache;
		return (
			this._fetch('/product', {
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(pageQuery)
			}).then(function (res) {
				var data = res.json();
				this.emit('list-fetched', data);
				this._setCache(data);
				// for passing data to next then function
				return Promise.resolve(res);
			}.bind(this))
		);
	}
});

module.exports = ProductStore;

