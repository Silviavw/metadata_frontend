import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import TaxonomyView from './taxonomyview';
import KeywordView from './keywordview';
import Taxonomy from '../models/taxonomy';

const TextAreaView = View.extend({
    el: 'body',
    events: {
        'keyup textarea' : 'keyup',
        'keydown textarea' : 'keydown'
    },
    initialize: function(options) {
      this.options = options;
      this.typingTimer;
      this.doneTypingInterval = 400;
    },
    keyup : function(event) {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.doneTyping, this.doneTypingInterval);
    },
    keydown : function(event){
      clearTimeout(this.typingTimer);
    },
    doneTyping: function(){
      var taxonomy = new Taxonomy({url: "http://localhost:8000/task?introduction="+$('textarea').val()});
      taxonomy.fetch({
        success: function(collection, response) {
          var taxonomyView = new TaxonomyView({taxonomy: response.category});
          var keywordView = new KeywordView({keywords: response.keywords});
          // var synonymView = new SynonymView({synonyms: response.synonymns});
        }
      });
    }
	});

  export default TextAreaView;
