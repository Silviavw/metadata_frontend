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
      var word = this.options.spelling.word;
      var suggesties = this.options.spelling.suggestion;

      if (this.options.spelling.correct == false){

        var ditelement = $('.word:contains('+this.options.spelling.word+')');
        if($(ditelement).find('ul.suggestions-wrapper').length == 0){

        ditelement.addClass('badspelling');

        // Create suggestions wrapper
          console.log(ditelement);
          var suggestionsWrapper = $("<ul class='suggestions-wrapper'></ul>");
          if(ditelement.find('ul.suggestions-wrapper').length == 0){
            console.log("DOES NOT EXIST");
          ditelement.append(suggestionsWrapper);
          }

        // Add suggestion list to wrapper
        suggesties.forEach(suggestion => {
          var sug = $("<li>"+suggestion+"</li>");
          $('.suggestions-wrapper').append(sug);
          console.log(suggestion);

          // .on('click', function(e) {
          //
          //   // word = e.currentTarget.innerHTML;
          //   // var replaceable = ditelement.text().split(" ")[0];
          //   // console.log("replace "+replaceable+" with "+word);
          //   // ditelement.text(ditelement.text().split(" ")[0].replace("is", word+" "));
          //
          //   // var spelling = new Spelling({url: "http://localhost:8000/spelling?text="+$('#values').text()});
          //
          //   // spelling.fetch({
          //   //   success: function(collection, response) {
          //   //       var words = $("#values").text().split(" ");
          //   //       $("#values").empty();
          //   //       $.each(words, function(i, v) {
          //   //       $("#values").append($("<span class='word'>").text(v+" "));
          //   //       });
          //   //       for (var i = 0; i < response.length; i++) {
          //   //           var spellingView = new SpellingView({spelling: response[i]});
          //   //       }
          //   //   }
          //   // });
          //
          // });
        })

      }

    }
  }
	});

  export default SpellingView;
