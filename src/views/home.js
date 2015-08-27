var $ = require('jquery');
var Backbone = require('backbone');
var homeTemplate = require('../templates/home.hbs');

var App = require('../app');

var Home = Backbone.View.extend({
  	el: $('main'),

	events: {
	    'click .signup-button': 'clickSignup',
	    'submit form.registration': 'submitReg'
	},

	render: function() {
		this.$el.html(homeTemplate());
	},

	clickSignup: function() {
		$('.main-hero-content').addClass('hidden');
		$('.user-form').removeClass('hidden');
    },

    submitReg: function(e) {
    	e.preventDefault();
    	var formData =  {
    		uname: $('form.registration input[name="uname"]').val(),
    		password: $('form.registration input[name="password"]').val(),
    		email: $('form.registration input[name="email"]').val(),
    		gender: $('form.registration select[name="gender"]').val(),
    		birthyear: $('form.registration input[name="birthyear"]').val(),
    		zip: $('form.registration input[name="zipCode"]').val() 
    	};

    	var user = new App.Models.User(formData);

    	user.save().done(function() {
          App.router.navigate('thankyou/' + user.id, { trigger: true });
    		
    	});

    }


});

module.exports = Home;