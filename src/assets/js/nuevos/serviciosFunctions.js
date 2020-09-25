
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
$(document).ready(function () {
    var $internet = $("#internetSection");
    var $television = $("#tvSection");
    var $app = $("#appSection");
    var $phone = $("#phoneSection");
    var $window = $(window);
    $window.scroll(function () {
        if ($internet.is(":in-viewport")) {
            $('#internetLink').addClass('active');
            $('#tvLink').removeClass('active');
            $('#appLink').removeClass('active');
            $('#phoneLink').removeClass('active');
        } else if ($television.is(":in-viewport")) {
            $('#internetLink').removeClass('active');
            $('#tvLink').addClass('active');
            $('#appLink').removeClass('active');
            $('#phoneLink').removeClass('active');
        } else if ($app.is(":in-viewport")) {
            $('#internetLink').removeClass('active');
            $('#tvLink').removeClass('active');
            $('#appLink').addClass('active');
            $('#phoneLink').removeClass('active');
        } else if ($phone.is(":in-viewport")) {
            $('#internetLink').removeClass('active');
            $('#tvLink').removeClass('active');
            $('#appLink').removeClass('active');
            $('#phoneLink').addClass('active');
        } else {
        }
    });
});
//Servicios
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
var removeNewRemote = function (e) {
    $("#ipadLandscape").removeClass('newRemoteIpad');
    event.preventDefault();
};
var removeNewPhone = function (e) {
    $("#ipadLandscape").removeClass('newPhoneIpad');
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
    hideComputer();
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
    removeNewRemote();
    removeNewPhone();
    removeLandLine();
    removeWifi();
    removeInvoice();
    event.preventDefault();
};
var addRemote = function (e) {
    hideComputer();
    $("#ipadLandscape").addClass('newRemoteIpad');
    $("#phone").addClass('remotePhone');
    $("#toggleDemand").removeClass('active');
    $("#toggleRemote").addClass('active');
    $("#toggleLandline").removeClass('active');
    $("#toggleWifi").removeClass('active');
    $("#toggleInvoice").removeClass('active');
    hideIpadPortrait();
    showIpadLandscape();
    removeOnDemand();
    removeNewPhone();
    removeLandLine();
    removeWifi();
    removeInvoice();
    event.preventDefault();
};

var addLandLine = function (e) {
    hideComputer();
    $("#ipadLandscape").addClass('newPhoneIpad')
    $("#phone").addClass('phoneLandline');
    $("#toggleDemand").removeClass('active');
    $("#toggleRemote").removeClass('active');
    $("#toggleLandline").addClass('active');
    $("#toggleWifi").removeClass('active');
    $("#toggleInvoice").removeClass('active');
    hideIpadPortrait();
    showIpadLandscape();
    removeNewRemote();
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
    removeNewRemote();
    removeNewPhone();
    removeRemote();
    removeLandLine();
    removeInvoice();
    event.preventDefault();
};
var addInvoice = function (e) {
    hideComputer();
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
    removeNewRemote();
    removeNewPhone();
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