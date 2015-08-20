var $ = require('jquery');
var Backbone = require('backbone');
var profileTemplate = require('../templates/profile.hbs');
var lodash = require('lodash')
var App = require('../app');

var Profile = Backbone.View.extend({

	el: $('main'),

	events: {
	'click .search-events':  'clickSearch',
	'click .edit-link': 'clickEdit',
	'submit .user-edit form': 'submitEditUser'
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

	clickSearch: function() {
		App.router.navigate('events', true);
	},

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
    		age: $('.user-edit form input[name="age"]').val(),
    		zip: $('.user-edit form input[name="zipCode"]').val() 
    	};


		this.user.set(formData);

		console.log(this.user)
     	this.user.save().done(function () {
        	$('.user-edit').addClass('hidden');
        	$('.user-tools').removeClass('hidden');
      	});

	}
 
});

module.exports = Profile;

