(function($) {
    "use strict";

    $.fn.bounds = function() {
        var element = this;
        try {
            return ({ top: element.offset().top,
                      right: (element.offset().left + element.outerWidth()),
                      bottom: (element.offset().top + element.outerHeight()),
                      left: element.offset().left});
        } catch (error) {
            return ({ top: undefined,
                      right: undefined,
                      bottom: undefined,
                      left: undefined});
        }
    };

    $.fn.center = function() {
        var element = this.bounds();

        try {
            return ({ x: (element.left + element.right) / 2,
                      y: (element.top + element.bottom) / 2});
        } catch (error) {
            return ({ x: undefined,
                      y: undefined});
        }
    };

    $.fn.addAwesomeShadow = function(height, darkness, type, light_source) {
        var element = this;

        if (typeof(element.attr("awesome_height")) !== 'undefined') {
            height = element.attr("awesome_height");
        } else if (typeof(height) === 'undefined') {
            height = 10;
        }

        if (typeof(element.attr("awesome_darkness")) !== 'undefined') {
            darkness = element.attr("awesome_darkness");
        } else if (typeof(darkness) === 'undefined') {
            darkness = 0.5;
        }

        if (typeof(type) === 'undefined') type = "";
        if (typeof(light_source) === 'undefined') light_source = $('#awesome_light_source');

        var a = element.center(),
            b = light_source.center(),
            b_z = 700,
            delta = {
                x: b.x - a.x,
                y: b.y - a.y,
                z: b_z - height
            },
            a_xangle = Math.atan(delta.x / delta.z),
            b_zangle = Math.atan(delta.y / delta.z),
            a_xoffset = Math.tan(a_xangle) * height,
            a_yoffset = Math.tan(b_zangle) * height,
            distance = Math.sqrt((delta.x * delta.x) + (delta.y * delta.y)),
            blur = (distance * height) / 1000,
            darkness = (15 * darkness) / (Math.sqrt(distance)),
            shadowvalue = -a_xoffset + "px " + -a_yoffset + "px " + blur + "px rgba(0,0,0," + darkness + ")",
            shadowvalueLight = -a_xoffset + "px " + -a_yoffset + "px " + blur + "px rgba(255,255,255," + darkness + ")";

        if (element.hasClass("awesome_shadow") || type === "box") {
            $(element).css({'box-shadow': shadowvalue });
        }
        if (element.hasClass("awesome_inset_shadow") || type === "inset") {
            $(element).css({'box-shadow': 'inset ' + shadowvalue });
        }
        if (element.hasClass("awesome_text_shadow") || type === "text") {
            $(element).css({'text-shadow': shadowvalue});
        }
        if (element.hasClass("awesome_inset_text_shadow") || type === "text_inset") {
            $(element).css({'text-shadow': shadowvalueLight});
        }
    };

    function awesomeShadowsRefresh() {
        var classes = [ ".awesome_shadow",
                        ".awesome_inset_shadow",
                        ".awesome_text_shadow",
                        ".awesome_inset_text_shadow"];

        $(classes.join(", ")).each(function() {
            $(this).addAwesomeShadow();
        });
    }

    function awesomeShadowsInit() {
        var default_lightsource_id = "awesome_light_source";

        if ($('#' + default_lightsource_id).length === 0) {
            $("body").append("<div style='position: fixed; top: -10%; left: 50%;' id='" + default_lightsource_id + "'></div>");
        }

        awesomeShadowsRefresh();

        $(window).on({
            resize: function() {
                awesomeShadowsRefresh();
            },
            scroll: function() {
                awesomeShadowsRefresh();
            }
        });

        $(document).mousemove(function(e){
            $("#awesome_light_source").css({top: e.pageY - 200, left: e.pageX, position: "fixed"});
            awesomeShadowsRefresh();
        });
    }

    awesomeShadowsInit();
})(jQuery);
