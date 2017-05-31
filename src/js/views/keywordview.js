import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const KeywordView = View.extend({
    initialize: function(options) {
      this.options = options;
      this.render();
    },
    render: function(){
      // $(".keywords").html(this.options.keywords);
      console.log(this.options.keywords);
      $(".keywords").empty();

      for (var keyword in this.options.keywords) {
        $(".keywords").append("<a class='sugcategory' target='_blank' href='http://www.google.com/search?q="+this.options.keywords[keyword]+"'>"+this.options.keywords[keyword]+" </a>");
      }
    }
    // checkspelling: function(settings){
    //   $.ajax(settings).done(function (response) {
    //     console.log(response);
    //   });
    // }
	});

  export default KeywordView;
