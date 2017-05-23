import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import _ from "underscore";

import TextAreaView from './views/textareaview';
import TaxonomyView from './views/taxonomyview';
import CommentView from './views/commentview';
import Taxonomy from './models/taxonomy';
// import mongo from 'mongodb';

(function () {
  //collections
	// Retrieve


  // models
	var commentView = new CommentView();

  //views
	var valView = new TextAreaView();
  var taxonomyView = new TaxonomyView({myVar: $('#values').val()});




})();
