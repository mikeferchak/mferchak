//= require jquery.min
//= require modernizr
//= require awesome_shadows
//= require_self

var lsz;

$(document).ready(function() {
  lsz = 1000; // Default height in px of the light source

  loopthroughallshadowelements();

  $(window).resize(function() {
    loopthroughallshadowelements();
  });

  $(window).scroll(function() {
    loopthroughallshadowelements();
  });
});