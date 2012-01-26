$(document).ready(function() {
  var bodyWidth = $(window).width()-20;
  var originalHeaderWidth = $("header h1").outerWidth();
  var originalHeaderHeight = parseInt($("header h1").css("font-size"),10);
  var headerAspect = originalHeaderHeight / originalHeaderWidth;
  var newHeaderHeight = headerAspect * bodyWidth * 0.9;
  var ipadWidth = 800;
  var iphoneWidth = 400;

  responsiveLol(ipadWidth, iphoneWidth);

  //do things when window is resized
  $(window).resize(function() {
    responsiveLol(ipadWidth, iphoneWidth);
    loopthroughallshadowelements();
    repositionlightsource();
  });

  function responsiveLol(ipad, iphone){
    //console.log("responsiveLol");
    //alert($(window).width());
    if ($(window).width() > ipad) {
      $("header").removeClass("futurephone");
      resizeHeader(1);
    }
    else if ($(window).width() > iphone) {
      $("header").addClass("futurephone");
      var originalHeaderWidth = $("header h1 span").first().outerWidth();
      var originalHeaderHeight = parseInt($("header h1 span").first().css("font-size"),10);
      resizeHeader(2);
    }
    else {
      $("header").addClass("futurephone");
      var originalHeaderWidth = $("header h1 span").first().outerWidth();
      var originalHeaderHeight = parseInt($("header h1 span").first().css("font-size"),10);
      resizeHeader(3);
    }
  }

  function resizeHeader(multiplier){
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

// $('h1 span, ').draggable( {
//     cursor: 'move',
//     containment: 'document',
//     drag: calculateshadow,
//     stop: loopthroughallshadowelements
// });

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