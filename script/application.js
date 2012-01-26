$(document).ready(function() {
  var bodyWidth = $(window).width()-20;
  var originalHeaderWidth = $("header h1").outerWidth();
  var originalHeaderHeight = parseInt($("header h1").css("font-size"),10);
  var headerAspect = originalHeaderHeight / originalHeaderWidth;
  var newHeaderHeight = headerAspect * bodyWidth * 0.9;
  var iphoneWidth = 600;

  responsiveLol(iphoneWidth);

  //do things when window is resized
  $(window).resize(function() {
    responsiveLol(iphoneWidth);
    loopthroughallshadowelements();
    repositionlightsource();
  });

  function responsiveLol(width){
    console.log("responsiveLol");
    if ($(window).width() > width) {
      resizeHeader(1);
    }
    else {
      resizeHeader(2);
    }
  }

  function resizeHeader(multiplier){
    multiplier = typeof(multiplier) != 'undefined' ? multiplier : 1;
    var newHeaderHeight = headerAspect * $(window).width() * 0.9 * multiplier;
    $("header h1").css({"font-size": newHeaderHeight});
  }


var lsz = 1000;

repositionlightsource();
loopthroughallshadowelements();

$('#sun').draggable( {
    cursor: 'move',
    containment: 'document',
    drag: loopthroughallshadowelements,
    stop: loopthroughallshadowelements
});

$('h1 span, ').draggable( {
    cursor: 'move',
    containment: 'document',
    drag: calculateshadow,
    stop: loopthroughallshadowelements
});

function repositionlightsource() {
    $("#sun").css({"left":(($(window).width()/2)-50)});
}

function loopthroughallshadowelements(){
    $(".shadowtext span").each(calculateshadow);
}

function calculateshadow(){
        var offset = $(this).offset();
        var sunoffset = $('#sun').offset();
        var bx = offset.left + ($(this).width()/2);
        var by = offset.top + ($(this).height()/2);
        var bz = 10;
        var lsx = sunoffset.left + ($("#sun").width()/2);
        var lsy = sunoffset.top + ($("#sun").width()/2);
        var xdiff = lsx-bx;
        var ydiff = lsy-by;
        var zdiff = lsz-bz;
        var bxangle = Math.atan(xdiff/zdiff);
        var bzangle = Math.atan(ydiff/zdiff);
        var bxoffset = Math.tan(bxangle) * bz;
        var byoffset = Math.tan(bzangle) * bz;
        var distance = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff));
        var blur = distance/60;
        var darkness = 10 / (Math.sqrt(distance));
        var shadowvalue = -(bxoffset) + "px " + -(byoffset) + "px " + blur + "px rgba(0,0,0,"+darkness+")";

        if( $(this).parent().hasClass("shadowbox") )  {
            $(this).css('box-shadow',shadowvalue);
        }
        if( $(this).parent().hasClass("shadowtext") )  {
            $(this).css('text-shadow',shadowvalue);
        }
        if( $(this).parent().hasClass("inset") )  {
            $(this).css('box-shadow','inset ' + shadowvalue);
        }
  }

});