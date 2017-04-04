import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const KeywordView = View.extend({
    initialize: function(options) {
      this.options = options
      this.render();
    },
    render: function(){
      console.log(this.options.keywords);
      $(".keywords").html("");
      for (var index in this.options.keywords) {
        $(".keywords").append("<a target='_blank' href='http://www.google.com/search?q="+this.options.keywords[index]+"'>"+this.options.keywords[index]+" </a>");
      }
    }
	});

  export default KeywordView;
