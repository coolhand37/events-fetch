var $ = require('jquery');
var Backbone = require('backbone');
var eventsTemplate = require('../templates/events.hbs');

var App = require('../app')

var EventsList = Backbone.View.extend({

	el: $('main'),

	render: function() {
		console.log('eventslist')
		this.$el.html(eventsTemplate())
	}

});

module.exports = EventsList;