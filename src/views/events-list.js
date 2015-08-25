var $ = require('jquery');
var Backbone = require('backbone');
var eventsTemplate = require('../templates/events.hbs');
var eventMediaTemplate = require('../templates/event-media-object.hbs');
var GMaps = require('gmaps');

var App = require('../app')

var EventsList = Backbone.View.extend({

	el: $('main'),
	// markers = [],

	events: {
	'submit .search-event form': 'submitSearchEvent'
	},

	render: function() {
		console.log('eventslist')
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		// var filterDate = $('.rail-date input[name="date"]').val()

		if(dd<10) dd='0'+dd;

		if(mm<10) mm='0'+mm;

		today = yyyy+'-'+mm+'-'+dd;
		console.log(today)
		this.$el.html(eventsTemplate({
			todaysDate: today
		}))

	},

	submitSearchEvent: function(e){
		e.preventDefault()

		

		App.Collections.event.fetch().done(function(events){
			var category = $('.search-event form select[name="categories"]').val()
			var eventsByCategory = events.filter(function (model) {
			  console.log(model.category)
	          return model.category === category
	        })
	        // .map(function (model) {
				var result = eventMediaTemplate(eventsByCategory);
				$('.media-event-bio-list').html(result);
	        //   return model.toJSON()
	        // })
	        
	      });


	}



});

module.exports = EventsList;