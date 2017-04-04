import {Model} from 'backbone';

const Taxonomy = Model.extend({
  initialize: function(props){
      this.url = props.url;
  },
});
export default Taxonomy;
