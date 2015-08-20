var Backbone = require('backbone');

var App = require('../app');
var User = require('../models/user');

var UserCollection = Backbone.Collection.extend({

	url: App.Settings.apiRoot + '/users',
  	model: User

});

App.Collections.user = new UserCollection;

module.exports = App.Collections.user;