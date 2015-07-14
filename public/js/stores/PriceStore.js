var Store = require('./Store');

var PriceStore = Store.create({
	name: 'price',
	CACHE_KEY: 'PRICES'
});

module.exports = PriceStore;