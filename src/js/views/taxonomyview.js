import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Taxonomy from '../models/taxonomy';

const TaxonomyView = View.extend({
    initialize: function(options) {
      this.options = options
      // this.tooltip();
      this.render();

        $( ".reproductie" ).on( "click", function() {
              $(this).addClass('handselected');
              $(".toepassing").removeClass("handselected");
              $(".inzicht").removeClass("handselected");
          });

          $( ".toepassing" ).on( "click", function() {
                $(this).addClass('handselected');
                $(".reproductie").removeClass("handselected");
                $(".inzicht").removeClass("handselected");
            });

          $( ".inzicht" ).on( "click", function() {
                $(this).addClass('handselected');
                $(".reproductie").removeClass("handselected");
                $(".toepassing").removeClass("handselected");
            });

    },
    render: function(){
      if ($( ".reproductie" ).hasClass("handselected") === false&&$( ".toepassing" ).hasClass("handselected") === false&&$( ".inzicht" ).hasClass("handselected") === false){

      switch (this.options.taxonomy) {
        case "1":
        $(".reproductie").addClass("selected");
        $(".toepassing").removeClass("selected");
        $(".inzicht").removeClass("selected");
          break;
        case "2":
        $(".toepassing").addClass("selected");
        $(".reproductie").removeClass("selected");
        $(".inzicht").removeClass("selected");
          break;
        case "3":
        $(".inzicht").addClass("selected");
        $(".reproductie").removeClass("selected");
        $(".toepassing").removeClass("selected");
          break;
        default:
        $(".tips").html("");
          break;
      }
    }

    }
//     tooltip: function(){
//       $( ".question" ).hover(
//   function() {
//     var suggestionsWrapper = $("<span class='tooltip-taxonomy'>TESTTEST</span>");
//     $(this).append(suggestionsWrapper);
//     }, function() {
//     // $(this).children(".tooltip-taxonomy").remove();
//   }
// );
//     }
	});

  export default TaxonomyView;
