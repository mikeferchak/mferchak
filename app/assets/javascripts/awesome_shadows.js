//awesome_shadows.js

// Center the light source when the page loads
function loopthroughallshadowelements(){
  var elements = {
    'header':           {'height': '15',  'darknessFactor':'1',   'type':'inset'},
    '.shadowtext span': {'height': '6',  'darknessFactor':'1',   'type':'text'},
    'footer div':       {'height': '6',  'darknessFactor':'0.2', 'type':'inset'}
  }
  $.each(elements, function(key, value){
    $(key).each(function(index, element){
      calculateshadow(index, element, value.height, value.darknessFactor, value.type);
    });
  });
}

// Figure out them shadows
function calculateshadow(index, element, height, darknessFactor, type){
  var offset = $(element).offset(),
      sunoffset = $('#sun').offset(),
      bx = offset.left + ($(element).width()/2),
      by = offset.top + ($(element).height()/2),
      lsx = sunoffset.left + ($("#sun").width()/2),
      lsy = sunoffset.top + ($("#sun").width()/2),
      xdiff = lsx-bx,
      ydiff = lsy-by,
      zdiff = lsz-height,
      bxangle = Math.atan(xdiff/zdiff),
      bzangle = Math.atan(ydiff/zdiff),
      bxoffset = Math.tan(bxangle) * height,
      byoffset = Math.tan(bzangle) * height,
      distance = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff)),
      blur = distance * height / 1000,
      darkness = 15 * darknessFactor / (Math.sqrt(distance)),
      shadowvalue = -(bxoffset) + "px " + -(byoffset) + "px " + blur + "px rgba(0,0,0,"+darkness+")",
      shadowvalueLight = -(bxoffset) + "px " + -(byoffset) + "px " + blur + "px rgba(255,255,255,"+darkness+")";

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