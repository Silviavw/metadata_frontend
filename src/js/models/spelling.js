import {Model} from 'backbone';

const Spelling = Model.extend({
  initialize: function(props){
      this.url = props.url;
  },
});
export default Spelling;
