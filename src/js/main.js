import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import _ from "underscore";

import TextAreaView from './views/textareaview';
import TaxonomyView from './views/taxonomyview';
import Taxonomy from './models/taxonomy';

(function () {
  //collections

  //models

  //views
	var valView = new TextAreaView();
  var taxonomyView = new TaxonomyView({myVar: $('textarea').val()});


})();
