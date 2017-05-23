import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Comment from '../models/comment';

const CommentView = View.extend({
    initialize: function(options) {
      this.options = options;
      this.render();
    },
    render: function(){
      var comment = new Comment({url: 'http://localhost/afstuderen/api.php/comment'});
      comment.fetch({
        success: function(collection, response) {
          for (var value of response) {
            $('.comments').append('<div class="comment"><p><span>'+value.username+'</span><br>'+value.comment+'</p></div><br>')
          }
        }
      })
    }
  });

  export default CommentView;
