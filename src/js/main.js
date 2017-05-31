import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import _ from "underscore";

import TextAreaView from './views/textareaview';
import TaxonomyView from './views/taxonomyview';
import CommentView from './views/commentview';
import Taxonomy from './models/taxonomy';
import QuestionfeedbackView from './views/questionfeedbackview';

// import mongo from 'mongodb';

(function () {

	var proxiedSync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    options || (options = {});
    if (!options.crossDomain) {
      options.crossDomain = true;
    }
    if (!options.xhrFields) {
      options.xhrFields = {withCredentials:true};
    }
    return proxiedSync(method, model, options);
  };
  //collections
	// Retrieve
	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "posts/:id": "getPost",
	        "questions/:id": "questionsDetailRoute",
					"questions": "questionsRoute"

	    }
	});
	// Instantiate the router
	var app_router = new AppRouter;

	app_router.on('route:getPost', function (id) {
		var questionfeedbackView = new QuestionfeedbackView({myId: id});
	});

	app_router.on('route:questionsDetailRoute', function (id) {
		var commentView = new CommentView({myId: id});
		var valView = new TextAreaView({myId: id});
	  var taxonomyView = new TaxonomyView({myVar: $('#values').val()});
	});

	app_router.on('route:questionsRoute', function () {

	});
	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();

})();
