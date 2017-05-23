import {Model} from 'backbone';

const Comment = Model.extend({
  initialize: function(props){
      this.url = props.url;
  },
});
export default Comment;
