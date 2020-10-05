$(document).ready(function () {
    var $secondaryVideo = $("#secondaryVideo");
    var $stopVideo = $("#stopVideo");
    var $playVideo = $("#playVideo");
    var $window = $('body');
    $window.scroll(function () {
        if ($stopVideo.is(":in-viewport")) {
            $secondaryVideo[0].pause();
        } else if ($playVideo.is(":in-viewport")) {
            $secondaryVideo[0].play();
        } else {
            $secondaryVideo[0].pause();
        }
    });
});