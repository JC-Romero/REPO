var scene = document.getElementById('scene');
var parallax = new Parallax(scene);

$(document).ready(function () {
    /*    var $rowVideos = $("#rowVideosApp");
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
        fade: true,
        infinite: true,
        pauseOnHover: false,
        swipe: true,
        touchMove: true,
        swipeToSlide: true
    });
    //ticking machine
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
    // End ticking machine

    $('.progressBarContainer div').click(function () {
        clearInterval(tick);
        var goToThisIndex = $(this).find("span").data("slickIndex");
        $('.single-item').slick('slickGoTo', goToThisIndex, false);
        startProgressbar();
    });
    var $rowPayments = $("#paymentsSlider");
    var $fixScrollCarousel = $("#scrollCarousel");
    var $appCards = $(".appCards");
    var $appImageDownload = $(".appImageDownload");
    var $appFaqs = $(".appFaqs");
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
        } else {
            $fixScrollCarousel.removeClass('unfixedScrollerCarousel');
        }
    });
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
    if ($(this).scrollTop() > 1500) {
        $("#firstScrollerMessage").addClass('hideText')
        $("#secondScrollerMessage").removeClass('showText')
    } else {
        $("#firstScrollerMessage").removeClass('hideText')
        $("#secondScrollerMessage").removeClass('showText')
    }
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 1510) {
        $("#secondScrollerMessage").addClass('showText')
    } else {
        $("#secondScrollerMessage").removeClass('showText')
    }
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 2010) {
        $("#thirdScrollerMessage").addClass('showText');
        $("#secondScrollerMessage").removeClass('showText')
    } else {
        $("#thirdScrollerMessage").removeClass('showText')
        $("#secondScrollerMessage").addClass('showText')
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