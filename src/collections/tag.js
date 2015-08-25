var Backbone = require('backbone');

var App = require('../app');
var Tag = require('../models/tag');

var TagCollection = Backbone.Collection.extend({

	url: App.Settings.apiRoot + '/tags',
  	model: Tag

});

App.Collections.tag = new TagCollection;

module.exports = App.Collections.tag;