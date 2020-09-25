
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
var changeParent = function () {
    if ($('.progressBar>div').hasClass('inProgress')) {
        $('.progressBar').parent().css(
            'width', '120%')
    }
};
$(document).ready(function () {
    $("#unboxCarouselContainer").slick({
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
});
