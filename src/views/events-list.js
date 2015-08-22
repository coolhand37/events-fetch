var $ = require('jquery');
var Backbone = require('backbone');
var eventsTemplate = require('../templates/events.hbs');
var eventMediaTemplate = require('../templates/event-media-object.hbs');
var GMaps = require('gmaps');

var App = require('../app')

var EventsList = Backbone.View.extend({

	el: $('main'),
	markers = [],

	events: {
	'submit .search-event form': 'submitSearchEvent'
	},

	render: function() {
		console.log('eventslist')
		this.$el.html(eventsTemplate())
		
		this.gmap = new GMaps({
		  div: '.map',
		  lat: -12.043333,
		  lng: -77.028333
		});

	},

	submitSearchEvent: function(e){
		e.preventDefault()



		var marker = this.gmap.addMarker({
		  lat: -12.043333,
		  lng: -77.028333,
		  title: 'Lima',
		  click: function(e) {
		  		lert('You clicked in this marker');
			}
		});

		this.markers.push(marker)

		

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