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
    if ($(window).width() > ipad) {
      $("header").removeClass("futurephone");
      $("header").addClass("pwned");
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
    var newHeaderHeight = headerAspect * $(window).width() * 1 * multiplier;
    $("header h1").css({"font-size": newHeaderHeight});
    $("header h1").fadeIn(2000);
  }


var lsz = 2000;

repositionlightsource();
loopthroughallshadowelements();

$('#sun').draggable( {
    cursor: 'move',
    containment: 'document',
    drag: loopthroughallshadowelements,
    stop: loopthroughallshadowelements
});

function repositionlightsource() {
    $("#sun").css({"left":(($(window).width()/2)-50)});
}

function loopthroughallshadowelements(){
    $(".shadowtext span").each(function(index, element){
      calculateshadow(index, element, "12", "1", "text");
    });
    $("footer div").each(function(index, element){
      calculateshadow(index, element, "9", ".6", "box");
    });
    $("footer div a").each(function(index, element){
      calculateshadow(index, element, "8", ".3", "inset");
    });
}

function calculateshadow(index, element, height, darknessFactor, type){
        var offset = $(element).offset();
        var sunoffset = $('#sun').offset();

        var bx = offset.left + ($(element).width()/2);
        var by = offset.top + ($(element).height()/2);
        var lsx = sunoffset.left + ($("#sun").width()/2);
        var lsy = sunoffset.top + ($("#sun").width()/2);
        var xdiff = lsx-bx;
        var ydiff = lsy-by;
        var zdiff = lsz-height;
        var bxangle = Math.atan(xdiff/zdiff);
        var bzangle = Math.atan(ydiff/zdiff);
        var bxoffset = Math.tan(bxangle) * height;
        var byoffset = Math.tan(bzangle) * height;
        var distance = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff));

        var blur = distance * height / 800;
        var darkness = 20 * darknessFactor / (Math.sqrt(distance));
        var shadowvalue = -(bxoffset) + "px " + -(byoffset) + "px " + blur + "px rgba(0,0,0,"+darkness+")";

        if( type === "inset" )  {
          $(element).css({'box-shadow': 'inset '+shadowvalue, 'background-image': awesomeGradient("0.8","0.2")});
        }
        if(type === "box")  {
          $(element).css({'box-shadow': shadowvalue, 'background-image': awesomeGradient("1","0.6")});
        }
        if(type === "text")  {
          $(element).css('text-shadow',shadowvalue);
        }

        function awesomeGradient(opacity1, opacity2) {
          if(!opacity1) {opacity = "1";}
          if(!opacity2) {opacity = "0.6";}
          return(
            '-webkit-radial-gradient('+(lsx - offset.left)+'px '+(lsy - offset.top)+'px, 300px 300px, rgba(255, 255, 255, '+opacity1+'), rgba(247, 247, 247, '+opacity2+'))'
          );
        }
  }

});