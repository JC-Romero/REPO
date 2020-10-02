var scene = document.getElementById('scene');
var parallax = new Parallax(scene);
var $rowPayments = $("#paymentsSlider");
var $fixScrollCarousel = $("#scrollCarousel");
var $appCards = $(".appCards");
var $appImageDownload = $(".appImageDownload");
var $appFaqs = $(".appFaqs");
var $footer = $("#footer");
$(document).ready(function () {
    /*  var $rowVideos = $("#rowVideosApp");
        var $mainBanner = $("#mainSliderLandingApp");
        var $window = $(window);
        $window.scroll(function () {
            if ($rowVideos.is(":in-viewport")) {
                $('#videosCol').addClass('animateInVideoRow');
                $('#videosCol').removeClass('animateOutVideoRow');
            } else if ($mainBanner.is(":in-viewport")) {
                $('#videosCol').addClass('animateOutVideoRow');
                $('#videosCol').removeClass('animateInVideoRow');
            }
        });*/
    $("#appUsesCarousel").slick({
        autoplay: true,
        autoplaySpeed: 9000,
        speed: 500,
        dots: false,
        draggable: true,
        fade: false,
        infinite: true,
        pauseOnHover: false,
        swipe: true,
        touchMove: true,
        swipeToSlide: true,
        adaptiveHeight: true
    });
    var percentTime;
    var tick;
    var time = .1;
    var progressBarIndex = 0;
    $('.progressBarContainer .progressBar').each(function (index) {
        var progress = "<div class='inProgress inProgress" + index + "'></div>";
        $(this).html(progress);
    });
    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        tick = setInterval(interval, 19);
    }
    function interval() {
        if (($('.carouselContainer .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
            progressBarIndex = $('.carouselContainer .slick-track div[aria-hidden="false"]').data("slickIndex");
            startProgressbar();
        } else {
            percentTime += 1 / (time + 5);
            $('.inProgress' + progressBarIndex).css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $('.single-item').slick('slickNext');
                progressBarIndex++;
                if (progressBarIndex > 1) {
                    progressBarIndex = 0;
                }
                startProgressbar();
            }
        }
    }
    function resetProgressbar() {
        $('.inProgress').css({
            width: 0 + '%'
        });
        clearInterval(tick);
    }
    startProgressbar();
    $('.progressBarContainer div').click(function () {
        clearInterval(tick);
        var goToThisIndex = $(this).find("span").data("slickIndex");
        $('.single-item').slick('slickGoTo', goToThisIndex, false);
        startProgressbar();
    });
    var $window = $(window);
    $window.scroll(function () {
        if ($rowPayments.is(":in-viewport")) {
            $fixScrollCarousel.addClass('unfixedScrollerCarousel');
            $fixScrollCarousel.removeClass('fixedScrollerCarousel');
        } else if ($appCards.is(":in-viewport")) {
            $fixScrollCarousel.addClass('unfixedScrollerCarousel');
            $fixScrollCarousel.removeClass('fixedScrollerCarousel');
        } else if ($appImageDownload.is(":in-viewport")) {
            $fixScrollCarousel.addClass('unfixedScrollerCarousel');
            $fixScrollCarousel.removeClass('fixedScrollerCarousel');
        } else if ($appFaqs.is(":in-viewport")) {
            $fixScrollCarousel.addClass('unfixedScrollerCarousel');
            $fixScrollCarousel.removeClass('fixedScrollerCarousel');
        } else if ($footer.is(":in-viewport")) {
            $fixScrollCarousel.addClass('unfixedScrollerCarousel');
            $fixScrollCarousel.removeClass('fixedScrollerCarousel');
        } else {
            $fixScrollCarousel.removeClass('unfixedScrollerCarousel');
        }
    });
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 650) {
        $('#scrollCarousel').addClass("fixedScrollerCarousel");
        $('#scrollCarousel').addClass("showCarousel");
        $('#scrollCarousel').removeClass("hideCarousel");
    }
    else {
        $('#scrollCarousel').removeClass("fixedScrollerCarousel");
        $('#scrollCarousel').removeClass("showCarousel");
        $('#scrollCarousel').addClass("hideCarousel");
    }
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 650) {
        $("#firstScrollerMessage").addClass('showText');
        $("#firstScrollerMessage").removeClass('hideText');
        $("#firstScrollerImage").addClass('showImage');
        $("#firstScrollerImage").removeClass('hideImage');
        $("#secondScrollerMessage").removeClass('showText');
        $("#secondScrollerMessage").addClass('hideText');
        $("#secondScrollerImage").removeClass('showImage');
        $("#secondScrollerImage").addClass('hideImage');
    } else {
        $("#firstScrollerMessage").removeClass('showText');
        $("#firstScrollerMessage").addClass('hideText');
        $("#firstScrollerImage").removeClass('showImage');
        $("#firstScrollerImage").addClass('hideImage');
    }
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 1650) {
        $("#firstScrollerMessage").addClass('hideText');
        $("#firstScrollerMessage").removeClass('showText');
        $("#firstScrollerImage").removeClass('showImage');
        $("#firstScrollerImage").addClass('hideImage');
        $("#secondScrollerImage").addClass('showImage');
        $("#secondScrollerImage").removeClass('hideImage');
        $("#secondScrollerMessage").addClass('showText');
        $("#secondScrollerMessage").removeClass('hideText');
    } else {
        $("#secondScrollerMessage").addClass('hideText');
        $("#secondScrollerMessage").removeClass('showText');
        $("#secondScrollerImage").removeClass('showImage');
        $("#secondScrollerImage").addClass('hideImage');
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 2650) {
        $("#secondScrollerMessage").addClass('hideText');
        $("#secondScrollerMessage").removeClass('showText');
        $("#secondScrollerImage").addClass('hideImage');
        $("#secondScrollerImage").removeClass('showImage');
        $("#thirdScrollerMessage").addClass('showText');
        $("#thirdScrollerMessage").removeClass('hideText');
        $("#thirdScrollerImage").addClass('showImage');
        $("#thirdScrollerImage").removeClass('hideImage');
    } else {
        $("#thirdScrollerMessage").addClass('hideText');
        $("#thirdScrollerMessage").removeClass('showText');
        $("#thirdScrollerImage").removeClass('showImage');
        $("#thirdScrollerImage").addClass('hideImage');
    }
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 3350) {
        $('#upDownRotation').addClass("rotateDown");
        $('#upDownRotation').removeClass("rotateUp");
        $('#downUpRotation').addClass("rotateDown");
        $('#downUpRotation').removeClass("rotateUp");
    }
    else {
        $('#upDownRotation').removeClass("rotateDown");
        $('#upDownRotation').addClass("rotateUp");
        $('#downUpRotation').removeClass("rotateDown");
        $('#downUpRotation').addClass("rotateUp");
    }
});
var showInnerModal = function (item, e) {
    if ($('#' + item).is(":visible")) {
        $('#' + item).fadeOut(300);
        $('.filterToggleParagraph').removeClass('closeIconFilters');
    } else {
        $('#' + item).fadeIn(300);
        $('.filterToggleParagraph').addClass('closeIconFilters');
    }
    event.preventDefault();
};