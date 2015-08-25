var Backbone = require('backbone');

var App = require('../app');

App.Models.Tag = Backbone.Model.extend({

	url: function() {
		var base = App.Settings.apiRoot + '/tags';
		if (this.isNew()) return base;
		return base + '/' + this.id
	}

});

module.exports = App.Models.Tag;