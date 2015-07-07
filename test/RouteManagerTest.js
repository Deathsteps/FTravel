var assert = require('assert');

var RouteManager = require('../public/js/libs/RouteManager');

describe('RouteManager', function(){
	it('match without error', function(){
		var AppClass = function(){};

		RouteManager.clear();
		RouteManager.register("/product/hotel", AppClass);

		var router1 = RouteManager.match("/product/hotel");
		assert.equal(router1.component, AppClass);

		var router2 = RouteManager.match("/product/hotel/233");
		assert.equal(router2.component, AppClass);
	});

	it('FILO matching procedure', function(){
		var A = function(){};
		var B = function(){};

		RouteManager.clear();
		RouteManager.register("/product/hotel", A);
		RouteManager.register("/product/hotel", B);

		var route = RouteManager.match("/product/hotel");
		assert.equal(route.component, B);
	});

	it('parse named route parameters correctly', function(){
		var AppClass = function(){};

		RouteManager.clear();
		RouteManager.register("/product/:id", AppClass);

		var route1 = RouteManager.match("/product/2403");
		assert.equal(route1.component, AppClass);
		assert.equal(route1.params.id, 2403);

		RouteManager.register("/product/:from/:to", AppClass);
		var route2 = RouteManager.match("/product/beijing/shanghai");
		assert.equal(route2.component, AppClass);
		assert.equal(route2.params.from, "beijing");
		assert.equal(route2.params.to, "shanghai");
	});

	it('parse regexp matched parameters correctly', function(){
		var AppClass = function(){};

		RouteManager.clear();
		RouteManager.register(/\/product\/(\d+)\/(\w+)/, AppClass);

		var route1 = RouteManager.match("/product/2403/hotel");
		assert.equal(route1.component, AppClass);
		assert.equal(route1.params[0], 2403);
		assert.equal(route1.params[1], "hotel");
	});

	it('register not-found page correctly', function () {
		var NotFoundClass = function(){};

		RouteManager.clear();
		RouteManager.register(NotFoundClass);

		var route = RouteManager.match("/absdv");
		assert.equal(route.component, NotFoundClass);
	});
});