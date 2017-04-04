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
        $(".tips").html("<p class='tooltipss'>Vragen op reproductieniveau zijn vragen waarbij de leerling zelf niets wezenlijks toe hoeft te voegen aan datgene wat hij geleerd heeft. Met deze vragen kan inzichtelijk gemaakt worden of de leerling de geleerde stof kan reproduceren. Denk bijvoorbeeld aan het kunnen reproduceren van warenkennis, gereedschapskennis, een stappenplan of de werking van apparatuur.</p>");
          break;
        case "2":
        $(".toepassing").addClass("selected");
        $(".reproductie").removeClass("selected");
        $(".inzicht").removeClass("selected");
        $(".tips").html("<p class='tooltipss'>Bij toepassingsvragen moet je de leerstof in een onbekende situatie gebruiken om een probleem op te lossen.</p>");
          break;
        case "3":
        $(".inzicht").addClass("selected");
        $(".reproductie").removeClass("selected");
        $(".toepassing").removeClass("selected");
        $(".tips").html("<p class='tooltipss'>bij vraagstukken op dit niveau wordt een bredere inbreng van de leerling verwacht. De leerling moet zelf de context en de methode construeren om tot een antwoord te komen. Inzichtvragen zijn dus veel ‘’kaler’’ omdat de leerling zelf de context en methode aan het geleerde moet toevoegen om zelfstandig en systematisch een nieuw vraagstuk vanuit verschillende perspectieven te doorgronden en op te lossen.</p>");
          break;
        default:
        // $(".taxonomy").html("");
        $(".tips").html("");
          break;
      }
    }
	});

  export default TaxonomyView;
