// Includes
var Reflux = require('reflux');
var I = require('immutable');
var JSE = require('jekyll-store-engine');
var listenAndMix = JSE.Mixins.listenAndMix;

var VisitedStore = Reflux.createStore({
  // Public
  listenables: [JSE.Actions],
  mixins: [listenAndMix(JSE.Stores.Products)],
  onSetVisitedLimit: function(args) { t.limit = args.limit; },
  getInitialState: function() { return { visited: t.visited }; },

  init: function() {
    this.visited = I.fromJS(this.session.get('visited')) || I.List();
  },

  onVisit: function(args){
    t.filter(args.name);
    t.addToVisited(args.name);
    t.update();
  },

  // Private
  limit: 3,
  session: JSE.Utils.Session,

  filter: function(name) {
    t.visited = t.visited.filter(function(product) {
      return product.get('name') != name;
    });
  },

  addToVisited: function(name) {
    t.visited = t.visited.unshift(t.products.get(name));
    if(t.visited.size > t.limit) { t.visited = t.visited.pop(); }
  },

  update: function() {
    t.session.set('visited', t.visited.toJS());
    t.trigger({ visited: t.visited });
  }
});

var t = module.exports = VisitedStore;
