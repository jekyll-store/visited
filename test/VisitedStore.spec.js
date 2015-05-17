var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../src/VisitedStore');

describe('VisitedStore', function() {
  before(function() {
    s.update = sinon.spy();
    s.visited = I([{ name: 'wallet' }, { name: 'coat' }]);
    s.products = I({
      'wallet': { name: 'wallet' },
      'glove': { name: 'glove' },
      'tie': { name: 'tie' },
      'coat': { name: 'coat' }
    });
  });

  afterEach(function() { s.update.reset(); })

  it('adds to visited', function() {
    var expected = I([{ name: 'tie' }, { name: 'wallet' }, { name: 'coat' }]);
    s.onVisit({ name: 'tie' });
    assert(s.update.called);
    assert.deepEqual(s.visited, expected);
  });

  it('moves to top if in visited', function() {
    var expected = I([{ name: 'wallet' }, { name: 'tie' }, { name: 'coat' }]);
    s.onVisit({ name: 'wallet' });
    assert(s.update.called);
    assert.deepEqual(s.visited, expected);
  });

  it('pops if limit is reached', function() {
    var expected = I([{ name: 'glove' }, { name: 'wallet' }, { name: 'tie' }]);
    s.onVisit({ name: 'glove' });
    assert(s.update.called);
    assert.deepEqual(s.visited, expected);
  });
});
