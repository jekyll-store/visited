// Includes
var Reflux = require('reflux');
var I = require('immutable');
var JSE = require('jekyll-store-engine');
var listenAndMix = JSE.Mixins.listenAndMix;
var keptInStorage = JSE.Mixins.keptInStorage;

var VisitedStore = Reflux.createStore({
  // Public
  listenables: [JSE.Actions],
  mixins: [
    listenAndMix(JSE.Stores.Products),
    keptInStorage('visited', I.List)
  ],
  onSetVisitedLimit: function(args) { t.limit = args.limit; },

  onVisit: function(args){
    t.filter(args.name);
    t.addToVisited(args.name);
    t.update();
  },

  // Private
  limit: 3,

  filter: function(name) {
    t.visited = t.visited.filter(function(product) {
      return product.get('name') != name;
    });
  },

  addToVisited: function(name) {
    t.visited = t.visited.unshift(t.products.get(name));
    if(t.visited.size > t.limit) { t.visited = t.visited.pop(); }
  }
});

var t = module.exports = VisitedStore;
