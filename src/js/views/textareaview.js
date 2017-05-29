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
      $('ul.suggestions-wrapper').remove();

      var values = $('#values').text()

      console.log('value;',values)
      var keywordView = new KeywordView({keywords: values});
      console.log($('#values').text())
      var taxonomy = new Taxonomy({url: "http://188.226.157.168/task?introduction=" + values});
      var spelling = new Spelling({url: "http://188.226.157.168/spelling?text=" + values});

      taxonomy.fetch({
        success: function(collection, response) {
          var taxonomyView = new TaxonomyView({taxonomy: response.category});
        }
      });

      spelling.fetch({
        success: function(collection, response) {
            var words = $("#values").text().split(" ");
            $("#values").empty();

            $.each(words, function(i, v) {
              if(!response[i] || response[i].correct) {
                // Set good spelling word
                $("#values").append($("<span class='word'>").text(v + " "));
              } else {
                // Create badspelling word
                var badspelling = $("#values")
                  .append($("<span class='word badspelling " + i + "'>")
                  .text(v + " "));

                // Append suggestions list
                var spellingView = new SpellingView({
                  itemclass: '.badspelling.' + i,
                  suggestions: response[i].suggestion
                });
              }
            });
        }
      });
    },
    render: function(){
      var question = new Question({url: 'https://stud.hosted.hr.nl/0878133/php-crud-api/api.php/question/1'});
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
        "url": "https://stud.hosted.hr.nl/0878133/php-crud-api/api.php/question/1",
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
