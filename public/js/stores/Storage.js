var _ = require('lodash');

var IStorage = {
	getItem: function (key) {

	},
	setItem: function (key, json) {

	},
	removeItem: function (key) {
		
	},
	key: function (n) {
		
	},
	clear: function () {
		
	},

	_getExpire: function (expire) {
		if(_.isNumber(expire)){
			return Date.now() + expire;
		}else{
			var amount = {
				's': 1000,
				'm': 60 * 1000,
				'h': 60 * 60 * 1000,
				'd': 24 * 60 * 60 * 1000
			};
			var unit = expire.substring(expire.length-1, expire.length);
			var count = +expire.substring(0, expire.length-1);
			count = _.isNumber(count) ? count : 0;
			return Date.now() + (amount[unit] ? count * amount[unit] : 0);
		}
	}
};

exports.localStorage = _.assign({}, IStorage, {

	getItem: function (key) {
		var value = window.localStorage.getItem(key);
		try{
			value = JSON.parse(value);
			if(value.expire < Date.now()){
				this.removeItem(key);
				return null;
			}else{
				return value.data;
			}
			
		}catch(ex){
			return null;
		}
	},

	setItem: function (key, json, expire) {
		var value = {data: json, expire: this._getExpire(expire)};
		window.localStorage.setItem(key, JSON.stringify(value));
	},

	removeItem: function (key) {
		window.localStorage.removeItem(key);
	}

});

exports.serverMemoryStorage = _.assign({}, IStorage, {

	_data: {},

	getItem: function (key) {
		var value = this._data[key];
		if(!value) return null;
		if(value.expire < Date.now()){
			this.removeItem(key);
			return null;
		}else{
			return value.data;
		}
	},

	setItem: function (key, json, expire) {
		var value = {data: json, expire: this._getExpire(expire)};
		this._data[key] = value;
	},

	removeItem: function (key) {
		delete this._data[key];
	}

});