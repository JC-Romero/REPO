
$(document).ready(function () {
    var windw = this;
    $.fn.followTo = function (elem) {
        var $this = this,
            $window = $(windw),
            $bumper = $(elem),
            bumperPos = $bumper.offset().top,
            thisHeight = $this.outerHeight(),
            setPosition = function () {
                if ($window.scrollTop() > (bumperPos - thisHeight)) {
                    $this.css({
                        position: 'absolute',
                        top: (bumperPos - thisHeight),
                    });
                } else {
                    $this.css({
                        position: 'fixed',
                        top: 0,
                    });
                }
            };
        $window.resize(function () {
            bumperPos = pos.offset().top;
            thisHeight = $this.outerHeight();
            setPosition();
        });
        $window.scroll(setPosition);
        setPosition();
    };
    $('#scrollingElement').followTo('#stopper');
});
$(window).scroll(function () {
    $("#fadeButton").css("opacity", 1 - $(window).scrollTop() / 50);
    $("#showMoreFade").css("opacity", 1 - $(window).scrollTop() / 50);
});
$(document).ready(function () {
    $("#infiniteSlides").slick({
        speed: 25000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        infinite: true,
        cssEase: 'linear',
        arrows: false,
        swipe: false,
        swipeToSlide: false,
        touchMove: false,
        pauseOnHover: false,
        draggable: false,
        dots: false,
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
});

(function ($) {
    $.fn.visible = function (partial) {
        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;
        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };
})
    (jQuery);
var win = $(window);
var allMods = $(".animatedCard");
allMods.each(function (i, el) {
    var el = $(el);
    if (el.visible(true)) {
        el.removeClass("visible");
    }
});

win.scroll(function (event) {
    allMods.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("visible");
        }
    });
});