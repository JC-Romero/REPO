$(document).ready(function () {
    console.log('SCRIPT CARGADO CORRECTAMENTE');

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