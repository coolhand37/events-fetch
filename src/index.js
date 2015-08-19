var Backbone = require('backbone');

var App = require('./app');

App.Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'thankyou(/)': 'thankyou',
		'welcome/:id': 'welcome',
		'events': 'eventslist'
	}

})