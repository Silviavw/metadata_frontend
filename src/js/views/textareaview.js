import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import TaxonomyView from './taxonomyview';
import KeywordView from './keywordview';
import SpellingView from './spellingview';
import Taxonomy from '../models/taxonomy';
import Spelling from '../models/spelling';
import Question from '../models/question';


const TextAreaView = Backbone.View.extend({
    el: 'body',
    events: {
        'keyup #values' : 'keyup',
        'keydown #values' : 'keydown',
        'click .save' : 'save'
    },
    initialize: function(options) {
      this.options = options;
      this.typingTimer;
      this.doneTypingInterval = 1000;
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

      console.log($('#values').text())
      var taxonomy = new Taxonomy({url: "http://localhost:8000/task?introduction=" + values});
      var spelling = new Spelling({url: "http://localhost:8000/spelling?text=" + values});

      var fetchXhr = taxonomy.fetch({
        success: function(collection, response) {
          var taxonomyView = new TaxonomyView({taxonomy: response.category});
        },
        abortRequests: true
      });

      var sfetchXhr = spelling.fetch({
        success: function(collection, response) {
            var words = $("#values").text().split(" ");
            $("#values").empty();

            $.each(words, function(i, v) {
              if(!response.words[i] || response.words[i].correct) {
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
                  suggestions: response.words[i].suggestion
                });
              }
            });

            new KeywordView({keywords: response.category});

        },
        beforeSend: function() {
        $(".loader").css({opacity:1});
        },
        complete: function() {
        $(".loader").css({opacity:0});
        }
      });

    },
    render: function(){
      var question = new Question({url: 'https://stud.hosted.hr.nl/0878133/php-crud-api/api.php/question/'+this.options.myId});
      question.fetch({
        success: function(collection, response) {
          $('.vraag').text(response.question);
          $('.antwoord').text(response.answer);
        },
        beforeSend: function() {
        $(".loader").css({opacity:1});
        },
        complete: function() {
        $(".loader").css({opacity:0});
        }
      })
    },
    save: function(){
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://stud.hosted.hr.nl/0878133/php-crud-api/api.php/question/"+this.options.myId,
        "method": "PUT",
        "headers": {
          "content-type": "application/x-www-form-urlencoded"
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
