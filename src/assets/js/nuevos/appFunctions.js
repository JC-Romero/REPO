var scene = document.getElementById('scene');
var parallax = new Parallax(scene);

$(document).ready(function () {
    var $rowVideos = $("#rowVideosApp");
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
    });
});