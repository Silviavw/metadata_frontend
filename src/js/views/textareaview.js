import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import TaxonomyView from './taxonomyview';
import KeywordView from './keywordview';
import SpellingView from './spellingview';
import Taxonomy from '../models/taxonomy';
import Spelling from '../models/spelling';
import Question from '../models/question';


const TextAreaView = View.extend({
    el: 'body',
    events: {
        'keyup #values' : 'keyup',
        'keydown #values' : 'keydown',
        'click .save' : 'save'
    },
    initialize: function(options) {
      this.options = options;
      this.typingTimer;
      this.doneTypingInterval = 400;
      this.render();
    },
    keyup : function(event) {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.doneTyping, this.doneTypingInterval);
    },
    keydown : function(event){
      clearTimeout(this.typingTimer);
    },
    doneTyping: function(){
      var keywordView = new KeywordView({keywords: $('#values').text()});
      var taxonomy = new Taxonomy({url: "http://localhost:8000/task?introduction="+$('#values').text()});
      var spelling = new Spelling({url: "http://localhost:8000/spelling?text="+$('#values').text()});

      taxonomy.fetch({
        success: function(collection, response) {
          var taxonomyView = new TaxonomyView({taxonomy: response.category});
          // var synonymView = new SynonymView({synonyms: response.synonymns});
        }
      });

      spelling.fetch({
        success: function(collection, response) {
            var words = $("#values").text().split(" ");
            $("#values").empty();
            $.each(words, function(i, v) {
            $("#values").append($("<span class='word'>").text(v+" "));
            });
            for (var i = 0; i < response.length; i++) {
                var spellingView = new SpellingView({spelling: response[i]});
            }
        }
      });
    },
    render: function(){
      var question = new Question({url: 'http://localhost/afstuderen/php-crud-api/api.php/question/1'});
      question.fetch({
        success: function(collection, response) {
          $('.vraag').text(response.question);
          $('.antwoord').text(response.answer);
        }
      })
    },
    save: function(){
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "http://localhost/afstuderen/php-crud-api/api.php/question/1",
        "method": "PUT",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
        },
        "data": {
          "question": $('.vraag').text(),
          "answer": $('.antwoord').text()
        }
      }).done(function (response) {
        this.render();
      }.bind(this));

    }
	});

  export default TextAreaView;
