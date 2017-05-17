import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Taxonomy from '../models/taxonomy';

const TaxonomyView = View.extend({
    el: 'div',
    initialize: function(options) {
      this.options = options
      this.render();

        $( ".reproductie" ).on( "click", function() {
              $(this).addClass('selected');
              $(".toepassing").removeClass("selected");
              $(".inzicht").removeClass("selected");
          });

          $( ".toepassing" ).on( "click", function() {
                $(this).addClass('selected');
                $(".reproductie").removeClass("selected");
                $(".inzicht").removeClass("selected");
            });

          $( ".inzicht" ).on( "click", function() {
                $(this).addClass('selected');
                $(".reproductie").removeClass("selected");
                $(".toepassing").removeClass("selected");
            });

    },
    render: function(){
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
        // $(".taxonomy").html("");
        $(".tips").html("");
          break;
      }
    }
	});

  export default TaxonomyView;
