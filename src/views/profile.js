var $ = require('jquery');
var Backbone = require('backbone');
var profileTemplate = require('../templates/profile.hbs');
var eventMediaTemplate = require('../templates/event-media-object.hbs')
var lodash = require('lodash')
var App = require('../app');
var tagCollection = require('../collections/tag');

var Profile = Backbone.View.extend({

	el: $('main'),

	events: {
	'click .edit-profile': 'clickEdit',
	'click .search-events':  'clickSearch',
	'click .tag-events': 'clickTag',
	'submit .user-edit form': 'submitEditUser',
	'submit .user-tag form': 'submitTagEvent',
	'click .tag-it': 'clickToTagIt',
	'click .untag-it': 'clickToUnTagIt'
	},

	render: function(userId) {
		var _this = this;

		
		var user = this.user = new App.Models.User({
			id: userId
		});

		user.fetch().done(function(){
			_this.$el.html(profileTemplate({
				username: user.get('uname'),
				password: user.get('password'),
				email: user.get('email'),
				gender: user.get('gender'),
				zip: user.get('zip'),
				birthyear: user.get('birthyear')
			}));
		});

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) dd='0'+dd;

		if(mm<10) mm='0'+mm;

		today = mm+'/'+dd+'/'+yyyy;
		console.log(today);

		App.Collections.event.fetch().done(function(){
			
			tagCollection.fetch().done(function(){

				var userId = _this.user.id;
				var todaysEvents = App.Collections.event.filter(function (model) {
				  	
					var tag = tagCollection.findWhere({
						eventId: model.id,
						userId: userId
					});
					model.set('isTagged', !!tag)
		          	return model.get('date') === today;
		        })
		        .map(function(model){
		        	return model.toJSON();
		        })
		        console.log(todaysEvents)
				var result = eventMediaTemplate(todaysEvents);
				$('.media-event-bio-list').html(result);
			})
	        
	      });


	},

	clickEdit: function() {
		$('.user-form.user-edit').removeClass('hidden');
	},

	clickSearch: function() {
		App.router.navigate('events', true);
	},

	clickTag: function() {
		$('.user-form.user-tag').removeClass('hidden');
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

		console.log(this.user);
     	this.user.save().done(function () {
        	$('.user-edit').addClass('hidden');
        	$('.user-tools').removeClass('hidden');
      	});

	},

	submitTagEvent: function(e){
		e.preventDefault();

		var events = App.Collections.event

		var searchTerm = $('.user-tag form input[name="name"]').val();
		var searchName = events.filter(function (model) {
		  var match = false;
		  match = (new RegExp('.*' + searchTerm + '.*', 'i'))
		  	.test(model.get('name'));
		  console.log(model.get('name'))
          return match
        })
        .map(function(model) {
        	return model.toJSON()
        })

		var result = eventMediaTemplate(searchName);
		$('.media-event-bio-list').html(result);
		$('.user-tag').addClass('hidden');
        $('.todays-top-events').addClass('hidden');
        $('.user-results-headline').removeClass('hidden')
	  
	},

	clickToTagIt: function(e){
		var userId = this.user.id;
		var eventId = $(e.target).parents('div.media-event-bio').data('event-id');
		console.log(eventId)
		console.log(userId)
		var tag = new App.Models.Tag({
			userId: userId,
			eventId: eventId
		});

		tag.save().done(function(){
			$(e.currentTarget).addClass('hidden');
			$(e.currentTarget).siblings('.untag-it').removeClass('hidden')
		});
		
		tagCollection.add(tag)
	},

	clickToUnTagIt: function(e){
		var userId = this.user.id;
		var eventId = $(e.target).parents('div.media-event-bio').data('event-id');
		var tag = tagCollection.findWhere({
			eventId: eventId,
			userId: userId
		});
		
	    tag.destroy().done(function (tag) {
			$(e.currentTarget).addClass('hidden')
	      	$(e.currentTarget).siblings('.tag-it').removeClass('hidden');
	    });
	}
 
});

module.exports = Profile;

