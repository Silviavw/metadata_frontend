import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const KeywordView = View.extend({
    el: 'body',
    initialize: function(options) {
      this.options = options;
      this.render();
    },
    events: {
      'click .sugcategory': 'addcategory'
    },
    render: function(){
      $(".keywords").empty();
      $(".keywords").append('<h6 class="minisubitle">Voorgestelde categorieen:</h6>')
      for (var keyword in this.options.keywords) {
        $(".keywords").append("<a class='sugcategory'>"+this.options.keywords[keyword]+" </a>");
      }
    },
    addcategory: function(e){
      $(".categoryadd").append('<span class="tag-categorie">'+$(e.currentTarget).text()+'<a class="rmtag">x</a></span>');
    }
	});

  export default KeywordView;
