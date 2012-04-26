//awesome_shadows.js

// Center the light source when the page loads
function repositionlightsource() {
  $("#sun").css({"left":(($(window).width()/2)-50)});
}

function loopthroughallshadowelements(){
  var elements = {
    'header':           {'height': '30',  'darknessFactor':'1',   'type':'inset'},
    '.shadowtext span': {'height': '12',  'darknessFactor':'1',   'type':'text'},
    'footer div':       {'height': '15',  'darknessFactor':'0.9', 'type':'box'},
    'footer div h2':    {'height': '10',  'darknessFactor':'1',   'type':'text-inset'},
    'footer div a':     {'height': '10',  'darknessFactor':'1',   'type':'text-inset'}
  }
  $.each(elements, function(key, value){
    $(key).each(function(index, element){
      calculateshadow(index, element, value.height, value.darknessFactor, value.type);
    });
  });
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
  var blur = distance * height / 1000;
  var darkness = 15 * darknessFactor / (Math.sqrt(distance));
  var shadowvalue = -(bxoffset) + "px " + -(byoffset) + "px " + blur + "px rgba(0,0,0,"+darkness+")";
  var shadowvalueLight = -(bxoffset) + "px " + -(byoffset) + "px " + blur + "px rgba(255,255,255,"+darkness+")";
  if( type === "inset" )  {
    $(element).css({'box-shadow': 'inset '+shadowvalue, 'background-image': awesomeGradient("0.2","0")});
  }
  if(type === "box")  {
    $(element).css({'box-shadow': shadowvalue, 'background-image': awesomeGradient("0.8","0.2")});
  }
  if(type === "text")  {
    $(element).css({'text-shadow': shadowvalue});
  }
  if(type === "text-inset")  {
    $(element).css({'text-shadow': shadowvalueLight});
  }
  function awesomeGradient(opacity1, opacity2) {
    if(!opacity1) {opacity = "1";}
    if(!opacity2) {opacity = "0.6";}
    return(
      '-webkit-radial-gradient('+(lsx - offset.left)+'px '+(lsy - offset.top)+'px, 250px 250px, rgba(249, 248, 245, '+opacity1+'), rgba(247, 247, 247, '+opacity2+'))'
    );
  }
}