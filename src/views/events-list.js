var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('lodash');
var eventsTemplate = require('../templates/events.hbs');
var eventMediaTemplate = require('../templates/event-media-object.hbs');
var filterBarTemplate = require('../templates/category-filters.hbs');
var tagCollection = require('../collections/tag');

var App = require('../app')

var EventsList = Backbone.View.extend({

	el: $('main'),
	// markers = [],

	selectedFilterCategories: [],

	events: {
		'submit .search-event form': 'submitSearchEvent',
		'click .event-filter-expand': 'clickExpandEventFilter',
		'click .event-filter-colapse': 'clickColapseEvents',
		'click .load-more-event-categories': 'clickLoadMoreEventCat',
		'click .location-filter-expand': 'clickExpandLocationFilter',
		'click .location-filter-colapse': 'clickColapseLocations',
		'click .load-more-locations': 'clickLoadMoreLocations',
		'click .filter-item-add': 'clickFilterItemAdd',
		'click .filter-item-remove': 'clickFilterItemRemove',
		'click .date-filter-add': 'clickFilterDateAdd',
		'click .date-filter-remove': 'clickFilterDateRemove'
	},

	render: function(userId) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) dd='0'+dd;

		if(mm<10) mm='0'+mm;

		today = yyyy+'-'+mm+'-'+dd;
		
		this.$el.html(eventsTemplate({
			todaysDate: today
		}));

		App.Collections.event.fetch().done(function(events){
			var result = eventMediaTemplate(events);
			$('.media-event-bio-list').html(result);
		});
	},

	submitSearchEvent: function(e){
		e.preventDefault()
		
	},

	clickExpandEventFilter: function(e){
		$(e.currentTarget).children('i.fa-plus').addClass('hidden');
		$(e.currentTarget).children('i.fa-minus').removeClass('hidden');
		$(e.currentTarget).addClass('event-filter-colapse');
		$(e.currentTarget).removeClass('event-filter-expand');
		$(e.currentTarget).siblings('.events-list').removeClass('hidden');
		$(e.currentTarget).siblings('.events-list').children('.load-more-event-categories').removeClass('hidden');
		$(e.currentTarget).siblings('.events-list').children('.more-event-categories').addClass('hidden');
	},

	clickColapseEvents: function(e){
		$(e.currentTarget).children('i.fa-plus').removeClass('hidden');
		$(e.currentTarget).children('i.fa-minus').addClass('hidden');
		$(e.currentTarget).removeClass('event-filter-colapse');
		$(e.currentTarget).addClass('event-filter-expand');
		$(e.currentTarget).siblings('.events-list').addClass('hidden');

	},

	clickLoadMoreEventCat: function(e){
		$(e.currentTarget).addClass('hidden');
		$(e.currentTarget).siblings('.more-event-categories').removeClass('hidden')
	},

	clickExpandLocationFilter: function(e){
		$(e.currentTarget).children('i.fa-plus').addClass('hidden');
		$(e.currentTarget).children('i.fa-minus').removeClass('hidden');
		$(e.currentTarget).addClass('location-filter-colapse');
		$(e.currentTarget).removeClass('location-filter-expand');
		$(e.currentTarget).siblings('.location-list').removeClass('hidden');
		$(e.currentTarget).siblings('.location-list').children('.load-more-locations').removeClass('hidden');
		$(e.currentTarget).siblings('.location-list').children('.more-locations').addClass('hidden');
	},

	clickColapseLocations: function(e){
		$(e.currentTarget).children('i.fa-plus').removeClass('hidden');
		$(e.currentTarget).children('i.fa-minus').addClass('hidden');
		$(e.currentTarget).removeClass('location-filter-colapse');
		$(e.currentTarget).addClass('location-filter-expand');
		$(e.currentTarget).siblings('.location-list').addClass('hidden');

	},

	clickLoadMoreLocations: function(e){
		$(e.currentTarget).addClass('hidden');
		$(e.currentTarget).siblings('.more-locations').removeClass('hidden');
	},

	clickFilterItemAdd: function(e){
		
		$(e.currentTarget).children('i.fa-minus').removeClass('hidden');
		$(e.currentTarget).children('i.fa-plus').addClass('hidden');
		$(e.currentTarget).addClass('filter-item-remove');
		$(e.currentTarget).removeClass('filter-item-add');

		var category = $(e.currentTarget).text();
		
		this.selectedFilterCategories.push(category);
		
		var result = filterBarTemplate({
			category: this.selectedFilterCategories
			});
		var _this = this;
		
		$('ul.filter-category-bar').html(result);

		App.Collections.event.fetch().done(function(events){
			var eventsByCategory = events.filter(function (model) {
	          return _this.selectedFilterCategories.indexOf(model.category) > -1
	        });
				var result = eventMediaTemplate(eventsByCategory);
				$('.media-event-bio-list').html(result);        
	      });

	},

	clickFilterItemRemove: function(e){
		$(e.currentTarget).children('i.fa-minus').addClass('hidden');
		$(e.currentTarget).children('i.fa-plus').removeClass('hidden');
		$(e.currentTarget).removeClass('filter-item-remove');
		$(e.currentTarget).addClass('filter-item-add');

		var category = $(e.currentTarget).text();
		var _this = this;

		this.selectedFilterCategories = _.reject(this.selectedFilterCategories, function (filter) {
		  return filter === category
		});

		var result = filterBarTemplate({
			category: this.selectedFilterCategories
			});

		$('ul.filter-category-bar').html(result);

		var events = App.Collections.event;

		var eventsByCategory = events.filter(function (model) {
	          return _this.selectedFilterCategories.indexOf(model.get('category')) > -1
	        })
			.map(function(model){
		        	return model.toJSON();
		    });

		var result = eventMediaTemplate(eventsByCategory);
				$('.media-event-bio-list').html(result); 

	},

	clickFilterDateAdd: function(e){
		$(e.currentTarget).children('i.fa-minus').removeClass('hidden');
		$(e.currentTarget).children('i.fa-plus').addClass('hidden');
		$(e.currentTarget).removeClass('date-filter-add');
		$(e.currentTarget).addClass('date-filter-remove');
	},

	clickFilterDateRemove: function(e){
		$(e.currentTarget).children('i.fa-minus').addClass('hidden');
		$(e.currentTarget).children('i.fa-plus').removeClass('hidden');
		$(e.currentTarget).addClass('date-filter-add');
		$(e.currentTarget).removeClass('date-filter-remove');
	}

});

module.exports = EventsList;