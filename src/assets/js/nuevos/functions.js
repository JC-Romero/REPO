//All views
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
var showChannels = function (e) {
    $("#modalChannels").fadeIn(250);
    event.preventDefault();
};
var hideChannels = function (e) {
    $("#modalChannels").fadeOut(250);
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
var showModal = function (item) {
    $("#" + item).fadeToggle(250);
};
var showBootstrapModalFirst = function (item) {
    $("#" + item).modal('show');
};
var hideModal = function (item) {
    $("#" + item).hide();
};
//footer mobile collapsibles
var showCollapsible = function (item, item2) {
    if ($('#' + item).is(":visible")) {
        $('#' + item).hide();
        $('#' + item2).removeClass('rotateChevron');
    } else {
        $('#' + item).show();
        $('#' + item2).addClass('rotateChevron')
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
});