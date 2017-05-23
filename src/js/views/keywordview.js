import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const KeywordView = View.extend({
    initialize: function(options) {
      this.options = options;
      this.render();
// };

// this.checkspelling(settings);

    },
    render: function(){
      var keywords = this.options.keywords.split(" ");
      $(".keywords").html("");
      for (var keyword in keywords) {
        $(".keywords").append("<a class='keyword' target='_blank' href='http://www.google.com/search?q="+keywords[keyword]+"'>"+keywords[keyword]+" </a>");
      }
    },
    // checkspelling: function(settings){
    //   $.ajax(settings).done(function (response) {
    //     console.log(response);
    //   });
    // }
	});

  export default KeywordView;
