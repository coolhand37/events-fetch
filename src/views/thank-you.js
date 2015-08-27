var $ = require('jquery');
var Backbone = require('backbone');
var thankYouTemplate = require('../templates/thank-you.hbs');

var App = require('../app');

var ThankYou = Backbone.View.extend ({

	el: $('main'),

	events: {
		'click .get-started': 'clickGetStarted'
	},

	render: function (userId) {
		this.id = userId;
		this.$el.html(thankYouTemplate());
	},

	clickGetStarted: function() {
		App.router.navigate('profile/' + this.id, true);
	}

});

module.exports = ThankYou;