var Reflux = require('reflux');
var JSE = require('jekyll-store-engine');

JSE.Actions.visit = Reflux.createAction();
JSE.Actions.setVisitedLimit = Reflux.createAction();
JSE.Stores.Visited = require('./VisitedStore');
