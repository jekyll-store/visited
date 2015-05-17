// Includes
var Reflux = require('reflux');
var I = require('seamless-immutable');
var JSE = require('jekyll-store-engine');
var listenAndMix = JSE.Mixins.listenAndMix;
var keptInStorage = JSE.Mixins.keptInStorage;

var VisitedStore = Reflux.createStore({
  // Public
  listenables: [JSE.Actions],
  mixins: [listenAndMix(JSE.Stores.Products), keptInStorage('visited', [])],
  onSetVisitedLimit: function(args) { t.limit = args.limit; },
  onVisit: function(args){
    t.visited = t.visited.filter(function(p) { return p.name != args.name; });
    t.visited = I([t.products[args.name]].concat(t.visited)).slice(0, t.limit);
    t.update();
  },

  // Private
  limit: 3
});

var t = module.exports = VisitedStore;
