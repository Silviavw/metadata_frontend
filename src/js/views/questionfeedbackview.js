import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Question from '../models/question';

const QuestionfeedbackView = View.extend({
  el: 'body',
  template: _.template($('#feedbackTemplate').html()),
  events: {
      'click .opslaan' : 'save'
  },
    initialize: function(options) {
      this.options = options;
      this.render();
    },
    render: function(){
      console.log("REMOVER THIS SHIT",$(".modalshare"));
      $("#modalshare, .overlay").remove();

      var question = new Question({url: 'http://localhost/afstuderen/php-crud-api/api.php/question/1'});
      question.fetch({
        success: function(collection, response) {
          $('.vraag').text(response.question);
          $('.antwoord').text(response.answer);
          console.log(response);
          $('.tax').html(this.template(response));
        }.bind(this)
      })
    },
    save: function(){

      $('.opslaan').attr("disabled", "disabled");

      var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost/afstuderen/php-crud-api/api.php/comment",
          "method": "POST",
          "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
          },
          "data": {
            "comment": $('.commentarea').val(),
            "username": $('.namefield').val(),
            "questionid": 1,
            "approved": false
          }
        }

      $.ajax(settings).done(function (response) {
          setTimeout('$(".opslaan").removeAttr("disabled")', 1500);
      });
    }
	});

  export default QuestionfeedbackView;
