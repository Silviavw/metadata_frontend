import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const SynonymView = View.extend({
    initialize: function(options) {
      this.options = options
      this.render();
    },
    render: function(){
      console.log(this.options.synonyms);
    }
	});

  export default SynonymView;
