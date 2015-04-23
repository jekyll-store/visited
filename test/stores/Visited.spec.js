var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('immutable');
var rewire = require('rewire');
var VisitedStore = rewire('../../src/VisitedStore');

describe('VisitedStore', function() {
  sinon.spy(VisitedStore, 'trigger');
  function result() { return VisitedStore.trigger.lastCall.args[0]; }

  var session = VisitedStore.session = { set: sinon.spy() };
  function saved() { return session.set.lastCall.args[1]; }

  it('nothing visited initially if nothing in session', function() {
    assert(VisitedStore.getInitialState().visited.equals(I.List()));
  });

  it('retreive visited if in session', function() {
    var previouslyVisited = [{ name: 'wallet' }, { name: 'coat' }];
    session.get = function() { return previouslyVisited; };
    var expected = I.fromJS([{ name: 'wallet' }, { name: 'coat' }]);
    VisitedStore.init();
    assert(VisitedStore.getInitialState().visited.equals(expected));
  });

  describe('with products', function() {
    before(function() {
      VisitedStore.products = I.fromJS({
        'wallet': { name: 'wallet' },
        'glove': { name: 'glove' },
        'tie': { name: 'tie' },
        'coat': { name: 'coat' }
      });
    });

    it('adds to visited', function() {
      var expected = [{ name: 'tie' }, { name: 'wallet' }, { name: 'coat' }];
      VisitedStore.onVisit({ name: 'tie' });

      assert(result().visited.equals(I.fromJS(expected)));
      assert.deepEqual(saved(), expected);
    });

    it('moves to top if in visited', function() {
      var expected = [{ name: 'wallet' }, { name: 'tie' }, { name: 'coat' }];
      VisitedStore.onVisit({ name: 'wallet' });

      assert(result().visited.equals(I.fromJS(expected)));
      assert.deepEqual(saved(), expected);
    });

    it('pops if limit is reached', function() {
      var expected = [{ name: 'glove' }, { name: 'wallet' }, { name: 'tie' }];
      VisitedStore.onVisit({ name: 'glove' });

      assert(result().visited.equals(I.fromJS(expected)));
      assert.deepEqual(saved(), expected);
    });
  });
});
