import {Model} from 'backbone';

const Question = Model.extend({
  initialize: function(props){
    this.url = props.url;
  },
});
export default Question;
