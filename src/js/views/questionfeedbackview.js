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

      var question = new Question({url: 'https://stud.hosted.hr.nl/0878133/php-crud-api/api.php/question/'+this.options.myId});
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
          "url": "https://stud.hosted.hr.nl/0878133/php-crud-api/api.php/comment",
          "method": "POST",
          "headers": {
            "content-type": "application/x-www-form-urlencoded"
          },
          "data": {
            "comment": $('.commentarea').val(),
            "username": $('.namefield').val(),
            "questionid": this.options.myId,
            "approved": false
          }
        }

      $.ajax(settings).done(function (response) {
          setTimeout('$(".opslaan").removeAttr("disabled")', 1500);
      });
    }
	});

  export default QuestionfeedbackView;
