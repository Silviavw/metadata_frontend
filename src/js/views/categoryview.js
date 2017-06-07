import {View} from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const CategoryView = View.extend({
    el: 'body',
    events: {
        'click .rmtag' : 'remove',
        'keypress .categoryadd' : 'addcategory',
        'click .glyphicon': 'back'
    },
    initialize: function(options) {
      this.options = options;
      this.render();
    },
    remove: function(e){
      $(e.currentTarget).parent().remove();
    },
    addcategory: function(e){
      if(e.which == 13) {
        e.preventDefault();
        var word = $(e.currentTarget).clone().children().remove().end().text();
        $(".categoryadd").append('<span class="tag-categorie" contenteditable="false">'+word+'<a class="rmtag">x</a></span>');
      }
    },
    render: function(){
      $('.headercontainer').append('<span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>');
    },
    back: function(){
      window.location.href='http://localhost/afstuderen/backbone_afstudeeropdracht/#/questions';
      location.reload();
    }
	});

  export default CategoryView;
