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

    /*AKHM*/
    $('#cd-cobertura-index').on('click',function(){
        $('#cityPicker').modal('show');
    });
});
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
});
$(document).ready(function () {
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
