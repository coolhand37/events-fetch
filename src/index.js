var Backbone = require('backbone');
var _ = require('lodash');
var App = require('./app');

var userCollection = require('./collections/user')

var eventCollection = require('./collections/event')

var tagCollection = require('./collections/tag')

var HomeView = require('./views/home');
App.Views.home  = new HomeView;

var ThankYouView = require('./views/thank-you');
App.Views.thankYou = new ThankYouView;

var ProfileView = require('./views/profile');
App.Views.profile = new ProfileView;

var EventsListView = require('./views/events-list');
App.Views.eventsList = new EventsListView;

App.Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'thankyou/:id(/)': 'thankYou',
		'profile/:id(/)': 'profile',
		'events/:id(/)': 'eventsList',
		'*actions': 'defaultRoute'
	},

	index: function() {
		App.Views.home.render()
	},

	thankYou: function(id) {
		App.Views.thankYou.render(id)
	},

	profile: function(id) {
		App.Views.profile.render(id)
	},

	eventsList: function(id) {
		App.Views.eventsList.render(id)

	} 

});

App.router = new App.Router;

Backbone.history.start();