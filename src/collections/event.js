var Backbone = require('backbone');

var App = require('../app');
var Event = require('../models/event');

var EventCollection = Backbone.Collection.extend({

	url: App.Settings.apiRoot + '/events',
  	model: Event

});

App.Collections.event = new EventCollection;

module.exports = App.Collections.event;