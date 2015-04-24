var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var VisitedStore = require('../src/VisitedStore');

describe('VisitedStore', function() {
  VisitedStore.products = I.fromJS({
    'wallet': { name: 'wallet' },
    'glove': { name: 'glove' },
    'tie': { name: 'tie' },
    'coat': { name: 'coat' }
  });

  VisitedStore.visited = I.fromJS([{ name: 'wallet' }, { name: 'coat' }]);

  sinon.spy(VisitedStore, 'update');
  afterEach(function() { VisitedStore.update.reset(); });

  it('adds to visited', function() {
    var expected = [{ name: 'tie' }, { name: 'wallet' }, { name: 'coat' }];
    VisitedStore.onVisit({ name: 'tie' });
    assert(VisitedStore.update.called);
    assert(VisitedStore.visited.equals(I.fromJS(expected)))
  });

  it('moves to top if in visited', function() {
    var expected = [{ name: 'wallet' }, { name: 'tie' }, { name: 'coat' }];
    VisitedStore.onVisit({ name: 'wallet' });
    assert(VisitedStore.update.called);
    assert(VisitedStore.visited.equals(I.fromJS(expected)))
  });

  it('pops if limit is reached', function() {
    var expected = [{ name: 'glove' }, { name: 'wallet' }, { name: 'tie' }];
    VisitedStore.onVisit({ name: 'glove' });
    assert(VisitedStore.update.called);
    assert(VisitedStore.visited.equals(I.fromJS(expected)))
  });
});
