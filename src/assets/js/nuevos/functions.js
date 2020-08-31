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
var removeOverflow = function () {
    $("body").css({
        'overflow': 'hidden'
    });

};
var addOverflow = function () {
    $("body").css({
        'overflow': 'auto'
    });
};

var openMenu = function (e) {
    showMenu();
    changeIconClose();
    removeOverflow();
    event.preventDefault();
};
var closeMenu = function (e) {
    hideMenu();
    changeIconOpen();
    addOverflow();
    event.preventDefault();
};
