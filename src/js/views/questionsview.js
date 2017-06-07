import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Question from '../models/question';

const QuestionsView = View.extend({
  el: 'body',
  events: {
      'click .detailview' : 'detailpage'
  },
  template: _.template($('#questionsoverviewTemplate').html()),
    initialize: function(options) {
      this.options = options
      this.render();
    },
    render: function(){
      var question = new Question({url: 'http://67.207.94.162/api.php/question'});
      question.fetch({
        success: function(collection, response) {
          $('.tax').html(this.template(response));
          $("tbody tr").each(function() {
              var id = $(this).children()[0].innerHTML;
              $(this).append("<td><a class='detailview'>bewerk</a></td>")
          });
        }.bind(this)
      })
    },
    detailpage: function(e){
      var id = e.currentTarget.offsetParent.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
      window.location.href='http://localhost/afstuderen/backbone_afstudeeropdracht/#/question/'+id;
      location.reload();
    }
	});

  export default QuestionsView;
