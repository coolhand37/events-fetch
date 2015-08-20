var Backbone = require('backbone');

var App = require('../app');

App.Models.User = Backbone.Model.extend({

	url: function() {
		var base = App.Settings.apiRoot + '/users';
		if (this.isNew()) return base;
		return base + '/' + this.id
	}

});

module.exports = App.Models.User;