import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Comment from '../models/comment';

const CommentView = View.extend({
    el: 'body',
    initialize: function(options) {
      this.options = options;
      this.render();
    },
    events: {
      'click .deel': 'showmodal',
      'click .overlay': 'hidemodal',
      'click .btncopy': 'copyclipboard'
    },
    render: function(){
      var comment = new Comment({url: 'https://stud.hosted.hr.nl/0878133/php-crud-api/api.php/comment'});
      comment.fetch({
        success: function(collection, response) {
          for (var records of response.comment.records) {
              $('.comments').append('<div class="comment"><p><span>'+records[2]+'</span><br>'+records[1]+'</p></div><br>')
          }
        }
      })
    },
    showmodal: function(){
      $('body').append('<div class="overlay"></div><div id="modalshare" class="modall"><h5>Deel deze vraag</h5><input class="urlval" type="text"/><a class="btncopy">COPY</a></div>');
      $(".urlval").val("http://67.205.189.184/#/posts/1");
    },
    hidemodal: function(){
      $(".overlay").remove();
      $("#modalshare").remove();
    },
    copyclipboard: function(){
      var copyTextarea = document.querySelector('.urlval');
      copyTextarea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
    }
  });

  export default CommentView;
