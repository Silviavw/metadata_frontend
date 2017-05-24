import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
var tooltip = 'tooltip';
import Spelling from '../models/spelling';

const SpellingView = View.extend({
    initialize: function(options) {
      this.options = options
      this.render();
    },
    render: function(){
      var word = this.options.itemclass;
      var suggesties = this.options.suggestions;

      if($(word)){

        // Create suggestions list
        var suggestionsWrapper = $("<ul class='suggestions-wrapper'></ul>");
        suggesties.forEach(suggestion => {
          var suggestionListItem = $("<li>"+suggestion+"</li>")
            .on('click', onSuggestionClick)
          suggestionsWrapper.append(suggestionListItem);
        });

        // Append suggestion list to word span
        var wordElement = $(word)
        wordElement.append(suggestionsWrapper);
      }

      // Replace wrong spelling with suggestion
      function onSuggestionClick(e) {
        var replacementWord = e.currentTarget.innerHTML;
        wordElement.html(replacementWord)

        word.split('.').forEach(singleClass => {
          wordElement.removeClass(singleClass);
        })
      }
    }
	});

  export default SpellingView;
