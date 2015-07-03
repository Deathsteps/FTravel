var assert = require("assert");

var fetch = require('../util/fetch');

describe('Util fetch', function(){
  it('server side fetch without error', function(done){
      var query = {PageIndex: 1};
      fetch('/product', {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(query)
      }).then(function (res) {
        assert.equal(res.json().length, 7);
        done();
      });
    });
});