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
        'keyup #values' : 'keyupquestion',
        'keydown #values' : 'keydownquestion',
        'keyup .antwoord' : 'keyupanswer',
        'keydown .antwoord' : 'keydownanswer',
        'click .save' : 'save'
    },
    initialize: function(options) {
      this.options = options;
      this.typingTimer;
      this.doneTypingInterval = 1000;
      this.render();
    },
    keyupquestion : function(event) {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(this.doneTyping, this.doneTypingInterval);
    },
    keyupanswer : function(event) {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(this.doneTypingAnswer, this.doneTypingInterval);
    },
    keydownquestion : function(event){
      clearTimeout(this.typingTimer);
    },
    keydownanswer : function(event){
      clearTimeout(this.typingTimer);
    },
    doneTyping: function(){
      $('ul.suggestions-wrapper').remove();
      var values = $('#values').text();

      stopCurrentFetches(this.fetchTaxonomy, this.fetchSpelling);

      var taxonomy = new Taxonomy({url: "http://localhost:8000/task?introduction=" + values});
      var spelling = new Spelling({url: "http://localhost:8000/spelling?text=" + values});

      this.fetchTaxonomy = taxonomy.fetch({
        success: function(collection, response) {
          var taxonomyView = new TaxonomyView({taxonomy: response.category});
        },
        abortRequests: true
      });

      this.fetchSpelling = spelling.fetch({
        success: function(collection, response) {
            var words = values.split(" ");
            $("#values").empty();

            $.each(words, function(i, v) {
              if(!response.words[i] || response.words[i].correct) {
                // Set good spelling word
                $("#values").append($("<span class='word'>").text(v)).append("&nbsp;");
              } else {
                // Create badspelling word
                var badspelling = $("#values")
                  .append($("<span class='word badspelling " + i + "'>")
                  .text(v)).append("&nbsp;");

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

      function stopCurrentFetches(fetchTaxonomy, fetchSpelling) {
        //Stop pending fetch
        if(fetchTaxonomy && fetchTaxonomy.readyState > 0 && fetchTaxonomy.readyState < 4) {
          fetchTaxonomy.abort()
        }
        if(fetchSpelling && fetchSpelling.readyState > 0 && fetchSpelling.readyState < 4) {
          fetchSpelling.abort()
        }
      }
    },
    doneTypingAnswer: function(){
      stopCurrentFetches(this.fetchSpellingAnswer);
      var vals = $('.antwoord').text();
      var spelling = new Spelling({url: "http://localhost:8000/spelling?text=" + vals});

      this.fetchSpellingAnswer = spelling.fetch({
        success: function(collection, response) {
            var words = vals.split(" ");
            $(".antwoord").empty();

            $.each(words, function(i, v) {
              if(!response.words[i] || response.words[i].correct) {
                // Set good spelling word
                $(".antwoord").append($("<span class='word'>").text(v)).append("&nbsp;");
              } else {
                // Create badspelling word
                var badspelling = $(".antwoord")
                  .append($("<span class='word badspelling " + i + "'>")
                  .text(v)).append("&nbsp;");

                // Append suggestions list
                var spellingView = new SpellingView({
                  itemclass: '.badspelling.' + i,
                  suggestions: response.words[i].suggestion
                });
              }
            });
        },
        beforeSend: function() {
        $(".answerloader").css({opacity:1});
        },
        complete: function() {
        $(".answerloader").css({opacity:0});
        }
      });

      function stopCurrentFetches(fetchSpelling) {
        //Stop pending fetch
        if(fetchSpelling && fetchSpelling.readyState > 0 && fetchSpelling.readyState < 4) {
          fetchSpelling.abort()
        }
      }

    },
    render: function(){
      var question = new Question({url: 'http://67.207.94.162/api.php/question/'+this.options.myId});

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
        "url": "http://67.207.94.162/api.php/question/"+this.options.myId,
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
