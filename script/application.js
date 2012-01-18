$(document).ready(function() {
  var bodyWidth = $(document).width()-20;
  var originalHeaderWidth = $("header h1").outerWidth();
  var originalHeaderHeight = parseInt($("header h1").css("font-size"));
  var headerAspect = originalHeaderHeight / originalHeaderWidth;

  //resize header on page load event
  if ($(document).width() > 500) {
     var newHeaderHeight = headerAspect * $(document).width() * .9;
     $("header h1").css({"font-size": newHeaderHeight+15, "letter-spacing":"-5px"});
  }

  //resize header when window is resized
  $(window).resize(function() {
     if ($(document).width() > 500) {
        var newHeaderHeight = headerAspect * $(document).width() * .9;
        $("header h1").css({"font-size": newHeaderHeight+15, "letter-spacing":"-5px"});
     }
     loopthroughallshadowelements();
     repositionlightsource();
  });

var lsz = 1000;


repositionlightsource();
loopthroughallshadowelements();


$('#sun').draggable( {
    cursor: 'move',
    containment: 'document',
    drag: loopthroughallshadowelements,
    stop: loopthroughallshadowelements
});

function repositionlightsource() {
    $("#sun").css({"left":(($(document).width()/2)-100)});
};

function loopthroughallshadowelements(){
    $(".shadowbox, .shadowtext, .inset").each(calculateshadow);
};

function calculateshadow(){
        var offset = $(this).offset();
        var sunoffset = $('#sun').offset();
        var bx = offset.left + ($(this).width()/2);
        var by = offset.top + ($(this).height()/2);
        var bz = 20;
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
        var darkness = 5 / (Math.sqrt(distance));
        var shadowvalue = -(bxoffset) + "px " + -(byoffset) + "px " + blur + "px rgba(0,0,0,"+darkness+")";

        if( $(this).hasClass("shadowbox") )  {
            $(this).css('box-shadow',shadowvalue);
        }
        if( $(this).hasClass("shadowtext") )  {
            $(this).css('text-shadow',shadowvalue);
        }
        if( $(this).hasClass("inset") )  {
            $(this).css('box-shadow','inset ' + shadowvalue);
        }
  };

  });