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
});
