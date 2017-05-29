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
	        "": "defaultRoute"
	    }
	});
	// Instantiate the router
	var app_router = new AppRouter;

	app_router.on('route:getPost', function (id) {
		var questionfeedbackView = new QuestionfeedbackView();
	});

	app_router.on('route:defaultRoute', function (actions) {
		var commentView = new CommentView();
		var valView = new TextAreaView();
	  var taxonomyView = new TaxonomyView({myVar: $('#values').val()});
	});
	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();

})();
