var Backbone = require('backbone');

var App = require('../app');

App.Models.Event = Backbone.Model.extend({

	url: function() {
		var base = App.Settings.apiRoot + '/events';
		if (this.isNew()) return base;
		return base + '/' + this.id
	}

});

module.exports = App.Models.Event;