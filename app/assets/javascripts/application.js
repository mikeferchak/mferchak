//= require jquery.min
//= require jquery.ui.touch-punch-min
//= require jquery-ui-1.8.17.custom.min
//= require jquery.ui.touch-punch-min
//= require modernizr
//= require awesome_shadows
//= require_self

var lsz;

$(document).ready(function() {
  lsz = 1000; // Default height in px of the light source

  rotateCrap();
  doThings();

  // Draggable sun
  $("#sun").draggable({
    start: function(event, ui) {
      console.log('begin dragging');
      loopthroughallshadowelements();
    },
    drag: function(event, ui) {
      console.log('dragging');
      loopthroughallshadowelements();
    }
  });

  // Initialize all of the things!
  function doThings(){
    repositionlightsource();
    loopthroughallshadowelements();
  }

  // Do things when window is resized
  $(window).resize(function() {
    doThings();
  });

  // Rotate all of the things a little bit
  function rotateCrap(){
    $("footer div, span").each(function(index, element){
      $(element).css({'-webkit-transform': 'rotate('+ (Math.random() - 0.5) +'deg)'});
    });
  }

});