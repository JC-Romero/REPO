$(function () {
    $('.mat-input-outer label').click(function () {
        $(this).prev('input').focus();
    });
    $('.mat-input-outer input').focusin(function () {
        $(this).next('label').addClass('active');
    });
    $('.mat-input-outer input').focusout(function () {
        if (!$(this).val()) {
            $(this).next('label').removeClass('active');
        } else {
            $(this).next('label').addClass('active');
        }
    });
});

var showMenu = function () {
    $("#mobile").fadeToggle(250);
};
var showChannels = function (e) {
    $("#modalChannels").fadeIn(250);
    event.preventDefault();
};
var hideChannels = function (e) {
    $("#modalChannels").fadeOut(250);
    event.preventDefault();
};
var hideMenu = function () {
    $("#mobile").hide();
};
var changeIconClose = function (e) {
    $("#openIcon").hide();
    $("#closeIcon").fadeToggle(250);
    event.preventDefault();
};
var changeIconOpen = function (e) {
    $("#openIcon").fadeToggle(250);
    $("#closeIcon").hide();
    event.preventDefault();
};

var openMenu = function (e) {
    showMenu();
    changeIconClose();
    event.preventDefault();
};
var closeMenu = function (e) {
    hideMenu();
    changeIconOpen();
    event.preventDefault();
};
var showModal = function (item) {
    $("#" + item).fadeToggle(250);
};
var showBootstrapModalFirst = function (item) {
    $("#" + item).modal('show');
};
var hideModal = function (item) {
    $("#" + item).hide();
};
var showCollapsible = function (item, item2) {
    if ($('#' + item).is(":visible")) {
        $('#' + item).hide();
        $('.' + item2).css({
            'transform': 'rotate(180deg)'
        });
    } else {
        $('#' + item).show();
        $('.' + item2).css({
            'transform': 'rotate(-180deg)'
        });
    }
};
var faqsToggle = function (item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, e) {
    $("#" + item1).fadeIn(300);
    $("#" + item2).hide();
    $("#" + item3).hide();
    $("#" + item4).hide();
    $("#" + item5).addClass('activeFaq');
    $("#" + item6).removeClass('activeFaq');
    $("#" + item7).removeClass('activeFaq');
    $("#" + item8).removeClass('activeFaq');
    $("#" + item9).addClass('mobileactiveFaq');
    $("#" + item10).removeClass('mobileactiveFaq');
    $("#" + item11).removeClass('mobileactiveFaq');
    $("#" + item12).removeClass('mobileactiveFaq');
    event.preventDefault();
};
var mobileFaqsToggle = function (item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, e) {
    $("#" + item1).fadeIn(300);
    $("#" + item2).hide();
    $("#" + item3).hide();
    $("#" + item4).hide();
    $("#" + item5).addClass('mobileactiveFaq');
    $("#" + item6).removeClass('mobileactiveFaq');
    $("#" + item7).removeClass('mobileactiveFaq');
    $("#" + item8).removeClass('mobileactiveFaq');
    $("#" + item9).addClass('activeFaq');
    $("#" + item10).removeClass('activeFaq');
    $("#" + item11).removeClass('activeFaq');
    $("#" + item12).removeClass('activeFaq');
    event.preventDefault();
};
var showFilters = function (item, e) {
    if ($('#' + item).is(":visible")) {
        $('#' + item).fadeOut(300);
        $('.filterToggleParagraph').removeClass('closeIconFilters');
    } else {
        $('#' + item).fadeIn(300);
        $('.filterToggleParagraph').addClass('closeIconFilters');
    }
    event.preventDefault();
};

$(document).ready(function () {
    var $mainVideo = $("#mainVideo");
    var $secondaryVideo = $("#secondaryVideo");
    var $window = $(window);
    $window.scroll(function () {
        if ($mainVideo.is(":in-viewport")) {
            $mainVideo[0].play();
            $secondaryVideo[0].pause();
        } else if ($secondaryVideo.is(":in-viewport")) {
            $mainVideo[0].pause();
            $secondaryVideo[0].play();
        } else {
            $mainVideo[0].pause();
            $secondaryVideo[0].pause();
        }
    });

    $(window).scroll(function () {
        var scrollMain = $('.titleSecondVideo').offset().top,
            heightMain = $('.titleSecondVideo').outerHeight(),
            windowHeight = $(window).height(),
            trigger = $(this).scrollTop();
        if (trigger > (scrollMain + heightMain - windowHeight)) {
            $("#secondaryVideo")[0].play();
        }
    });

    $(window).scroll(function () {
        var scrollMain2 = $('.imagesAppsContainer').offset().top,
            heightMain2 = $('.imagesAppsContainer').outerHeight(),
            windowHeight2 = $(window).height(),
            trigger2 = $(this).scrollTop();
        if (trigger2 > (scrollMain2 + heightMain2 - windowHeight2)) {
            $("#mainVideo")[0].pause();
        }
    });

    $(window).scroll(function () {
        var scrollMain3 = $('.cardsRow').offset().top,
            heightMain3 = $('.cardsRow').outerHeight(),
            windowHeight3 = $(window).height(),
            trigger3 = $(this).scrollTop();
        if (trigger3 > (scrollMain3 + heightMain3 - windowHeight3)) {
            $("#mainVideo")[0].pause();
            $("#secondaryVideo")[0].pause();
        }
    });
});
$(document).ready(function () {
    $("#citySearch").keyup(function () {
        var x = document.getElementById('cityAutocomplete');
        if ($(this).val() == "") {
            x.style.display = 'none';
        } else {
            x.style.display = 'block';
        }
    });

    $('#cityPicker').on('hidden.bs.modal', function () {
        $('body').css({
            'overflow': 'auto'
        });
    });

    $('#cityPicker').on('show.bs.modal', function () {
        $('body').css({
            'overflow': 'auto'
        });
    });

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
    $('#faqsAccordion').collapse({});
});
$(window).scroll(function () {
    $("#fadeButton").css("opacity", 1 - $(window).scrollTop() / 50);
});
var showPackageContainer = function (item, item2, item3, item4, e) {
    $("#" + item).hide();
    $("#" + item2).fadeIn(500);
    $("#" + item3).removeClass('active');
    $("#" + item4).addClass('active');
    event.preventDefault();
};

var showMorePackages = function (item, item2, item3, e) {
    $("." + item).fadeIn(300);
    $("#" + item2).hide();
    $("#" + item3).show();
    event.preventDefault();
};

var showLessPackages = function (item, item2, item3, e) {
    $("." + item).fadeOut(300);
    $("#" + item2).show();
    $("#" + item3).hide();
    event.preventDefault();
};
$(document).ready(function () {
    $("#unboxCarouselContainer").slick({
        autoplay: true,
        autoplaySpeed: 9000,
        dots: true,
        draggable: true,
        fade: true,
        infinite: true,
        pauseOnHover: true,
        swipe: true,
        touchMove: true,
        swipeToSlide: true
    });
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
    $("#carouselDocuments").slick({
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        infinite: true,
        cssEase: 'linear',
        arrows: true,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        pauseOnHover: false,
        draggable: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 340,
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
})(jQuery);
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
var hideComputer = function (e) {
    $("#computer").css({
        "visibility": "hidden"
    });
    event.preventDefault();
};
var showComputer = function (e) {
    $("#computer").css({
        "visibility": "visible"
    });
    $("#computer").fadeIn(300)
    event.preventDefault();
};
var hideIpadLandscape = function (e) {
    $("#ipadLandscape").hide();
    event.preventDefault();
};
var showIpadLandscape = function (e) {
    $("#ipadLandscape").fadeIn(300);
    event.preventDefault();
};
var hideIpadPortrait = function (e) {
    $("#ipadPortrait").hide();
    event.preventDefault();
};
var showIpadPortrait = function (e) {
    $("#ipadPortrait").fadeIn(300);
    event.preventDefault();
};
//Quitar Clases Slider
var removeOnDemand = function (e) {
    $("#computer").removeClass('onDemandComputer');
    $("#phone").removeClass('onDemandPhone');
    $("#IpadLandscape").removeClass('onDemandIpad');
    event.preventDefault();
};
var removeRemote = function (e) {
    $("#ipadPortrait").removeClass('remoteIpad');
    $("#phone").removeClass('remotePhone');
    event.preventDefault();
};
var removeLandLine = function (e) {
    $("#ipadPortrait").removeClass('ipadLandline');
    $("#phone").removeClass('phoneLandline');
    event.preventDefault();
};
var removeWifi = function (e) {
    $("#computer").removeClass('computerWifi');
    $("#phone").removeClass('phoneWifi');
    $("#ipadLandscape").removeClass('ipadWifi');
    event.preventDefault();
};
var removeInvoice = function (e) {
    $("#computer").removeClass('computerInvoice');
    $("#phone").removeClass('phoneInvoice');
    $("#ipadLandscape").removeClass('ipadInvoice');
    event.preventDefault();
};
//Agrega Clases Slider
var addOnDemand = function (e) {
    showComputer();
    $("#computer").addClass('onDemandComputer');
    $("#phone").addClass('onDemandPhone');
    $("#ipadLandscape").addClass('onDemandIpad');
    $("#toggleDemand").addClass('active');
    $("#toggleRemote").removeClass('active');
    $("#toggleLandline").removeClass('active');
    $("#toggleWifi").removeClass('active');
    $("#toggleInvoice").removeClass('active');
    showIpadLandscape();
    hideIpadPortrait();
    removeRemote();
    removeLandLine();
    removeWifi();
    removeInvoice();
    event.preventDefault();
};
var addRemote = function (e) {
    hideComputer();
    $("#ipadPortrait").addClass('remoteIpad');
    $("#phone").addClass('remotePhone');
    $("#toggleDemand").removeClass('active');
    $("#toggleRemote").addClass('active');
    $("#toggleLandline").removeClass('active');
    $("#toggleWifi").removeClass('active');
    $("#toggleInvoice").removeClass('active');
    showIpadPortrait();
    hideIpadLandscape();
    removeOnDemand();
    removeLandLine();
    removeWifi();
    removeInvoice();
    event.preventDefault();
};

var addLandLine = function (e) {
    hideComputer();
    $("#ipadPortrait").addClass('ipadLandline')
    $("#phone").addClass('phoneLandline');
    $("#toggleDemand").removeClass('active');
    $("#toggleRemote").removeClass('active');
    $("#toggleLandline").addClass('active');
    $("#toggleWifi").removeClass('active');
    $("#toggleInvoice").removeClass('active');
    showIpadPortrait();
    hideIpadLandscape();
    removeOnDemand();
    removeRemote();
    removeWifi();
    removeInvoice();
    event.preventDefault();
};
var addWifi = function (e) {
    showComputer();
    $("#computer").addClass('computerWifi');
    $("#phone").addClass('phoneWifi');
    $("#ipadLandscape").addClass('ipadWifi');
    $("#toggleDemand").removeClass('active');
    $("#toggleRemote").removeClass('active');
    $("#toggleLandline").removeClass('active');
    $("#toggleWifi").addClass('active');
    $("#toggleInvoice").removeClass('active');
    showIpadLandscape();
    hideIpadPortrait();
    removeOnDemand();
    removeRemote();
    removeLandLine();
    removeInvoice();
    event.preventDefault();
};
var addInvoice = function (e) {
    showComputer();
    $("#computer").addClass('computerInvoice');
    $("#phone").addClass('phoneInvoice');
    $("#ipadLandscape").addClass('ipadInvoice');
    $("#toggleDemand").removeClass('active');
    $("#toggleRemote").removeClass('active');
    $("#toggleLandline").removeClass('active');
    $("#toggleWifi").removeClass('active');
    $("#toggleInvoice").addClass('active');
    showIpadLandscape();
    hideIpadPortrait();
    removeOnDemand();
    removeRemote();
    removeLandLine();
    event.preventDefault();
};
var activeTopMenu = function (item1, item2, item3, item4) {
    $("#" + item1).addClass('active');
    $("#" + item2).removeClass('active');
    $("#" + item3).removeClass('active');
    $("#" + item4).removeClass('active');
};
var distanceTop = $('#fixed').offset().top;
$(window).scroll(function () {
    if ($(window).scrollTop() >= distanceTop) {
        $('#fixed').addClass("fixedNav").css({
            'left': '0px important',
        });

    } else {
        $('#fixed').removeClass("fixedNav");
    }
});