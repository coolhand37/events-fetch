var $ = require('jquery');
var Backbone = require('backbone');
var profileTemplate = require('../templates/profile.hbs');
var eventMediaTemplate = require('../templates/event-media-object.hbs')
var lodash = require('lodash')
var App = require('../app');

var Profile = Backbone.View.extend({

	el: $('main'),

	events: {
	// 'click .search-events':  'clickSearch',
	'click .edit-link': 'clickEdit',
	'submit .user-edit form': 'submitEditUser',
	'submit .tag-event form': 'submitTagEvent'
	},

	render: function(userId) {
		var _this = this;

		console.log(userId)
		var user = this.user = new App.Models.User({
			id: userId
		})

		user.fetch().done(function(){
			_this.$el.html(profileTemplate({
				username: user.get('uname'),
				password: user.get('password'),
				email: user.get('email'),
				gender: user.get('gender'),
				zip: user.get('zip'),
				age: user.get('age')
			}));
		})

	},

	// clickSearch: function() {
	// 	App.router.navigate('events', true);
	// },

	clickEdit: function() {
		$('.user-tools').addClass('hidden');
		$('.user-edit').removeClass('hidden');
	},

	submitEditUser: function(e) {
		e.preventDefault();
		var _this = this;
		var formData =  {
    		uname: $('.user-edit form input[name="uname"]').val(),
    		password: $('.user-edit form input[name="password"]').val(),
    		email: $('.user-edit form input[name="email"]').val(),
    		gender: $('.user-edit form select[name="gender"]').val(),
    		birthyear: $('.user-edit form input[name="birthyear"]').val(),
    		zip: $('.user-edit form input[name="zipCode"]').val() 
    	};


		this.user.set(formData);

		console.log(this.user)
     	this.user.save().done(function () {
        	$('.user-edit').addClass('hidden');
        	$('.user-tools').removeClass('hidden');
      	});

	},

	submitTagEvent: function(e){
		e.preventDefault()

		App.Collections.event.fetch().done(function(events){
			var category = $('.tag-event form input[name="name"]').val()
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

module.exports = Profile;

