var backgroundURL;

getBackgroundPhoto();

function getBackgroundPhoto(){
    var apiKey = 'b2969414c7c7419adb001b18f881a371';
    var url = 'http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key='+ apiKey +'&user_id=mikeferchak&photoset_id=72157629217619129&format=json&privacy_filter=1&media=photos&jsoncallback=?';
    $.getJSON(url, function(data){
        console.log(data);
        var randomItem = Math.floor(data.photoset.photo.length * Math.random());
        var item = data.photoset.photo[randomItem];
        var backgroundURL = 'http://farm'+ item.farm +'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret+'_b.jpg';
    });
}


$(document).ready(function() {
  var originalHeaderHeight = parseInt($("header h1").css("font-size"), 10);
  var originalHeaderWidth = $("header h1").innerWidth();
  var headerAspect = originalHeaderHeight / originalHeaderWidth;
  var lsz = 2000; // Default height in px of the light source

  // rotateCrap();
  doThings();
  setBackgroundPhoto();

  // Initialize all of the things
  function doThings(){
    responsiveHeader();
    repositionlightsource();
    loopthroughallshadowelements();
  }

  function setBackgroundPhoto(){
    $('body').css('background-image', 'url('+pictureUrl+')');
  }

  // Do things when window is resized
  $(window).resize(function() {
    doThings();
  });

  // Draggable light source
  $('#sun').draggable( {
    cursor: 'move',
    containment: 'document',
    addClasses: 'dragging',
    drag: loopthroughallshadowelements,
    stop: loopthroughallshadowelements
  });

  // Responsive giant header
  function responsiveHeader(){
    if ($(window).width() > 800) {
      resizeHeader(1); // normal screen
    }
    else if ($(window).width() > 400) {
      resizeHeader(2.2); // ipad
    }
    else {
      resizeHeader(3.6); // iphone
    }
  }

  // Resizing that crap automatically
  function resizeHeader(sizeAdjustmentMultiplier){
    newHeaderHeight = headerAspect * $("header").innerWidth() * sizeAdjustmentMultiplier;
    $("header h1").css({"font-size": newHeaderHeight});
  }

  // Rotate all of the things a little bit
  function rotateCrap(){
    $("footer div, span").each(function(index, element){
      $(element).css({'-webkit-transform': 'rotate('+ (Math.random() - 0.5) +'deg)'});
    });
  }

  // Center the light source when the page loads
  function repositionlightsource() {
    $("#sun").css({"left":(($(window).width()/2)-50)});
  }

  // Loop through all of the shadowable elements, and call the shadow function
  function loopthroughallshadowelements(){
    $(".shadowtext span").each(function(index, element){
      calculateshadow(index, element, "12", "1", "text");
    });
    $("footer div").each(function(index, element){
      calculateshadow(index, element, "9", ".4", "box");
    });
    // $("footer div a").each(function(index, element){
    //   calculateshadow(index, element, "3", ".3", "inset");
    // });
  }

  // Figure out them shadows
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

    var blur = distance * height / 1500;
    var darkness = 20 * darknessFactor / (Math.sqrt(distance));
    var shadowvalue = -(bxoffset) + "px " + -(byoffset) + "px " + blur + "px rgba(0,0,0,"+darkness+")";

    if( type === "inset" )  {
      $(element).css({'box-shadow': 'inset '+shadowvalue, 'background-image': awesomeGradient("0.6","0.1")});
    }
    if(type === "box")  {
      $(element).css({'box-shadow': 'inset '+ shadowvalue, 'background-image': awesomeGradient("0.8","0.2")});
    }
    if(type === "text")  {
      $(element).css({'text-shadow': shadowvalue});
    }
    function awesomeGradient(opacity1, opacity2) {
      if(!opacity1) {opacity = "1";}
      if(!opacity2) {opacity = "0.6";}
      return(
        '-webkit-radial-gradient('+(lsx - offset.left)+'px '+(lsy - offset.top)+'px, 200px 200px, rgba(249, 248, 245, '+opacity1+'), rgba(247, 247, 247, '+opacity2+'))'
      );
    }
  }

  function setBackgroundPhoto(){
    var apiKey = 'b2969414c7c7419adb001b18f881a371';
    var url = 'http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key='+ apiKey +'&user_id=mikeferchak&photoset_id=72157629217619129&format=json&privacy_filter=1&media=photos&jsoncallback=?';
    $.getJSON(url, function(data){
        console.log(data);
        var randomItem = Math.floor(data.photoset.photo.length * Math.random());
        var item = data.photoset.photo[randomItem];
        var pictureUrl = 'http://farm'+ item.farm +'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret+'_b.jpg';
        $('body').css('background-image', 'url('+pictureUrl+')');
        //$('img#background').attr('src', pictureUrl).addClass('active');
    });
  }

});