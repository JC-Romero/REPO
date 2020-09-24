//Home
$(document).ready(function () {
    var $secondaryVideo = $("#secondaryVideo");
    var $window = $(window);
    $window.scroll(function () {
        if ($secondaryVideo.is(":in-viewport")) {
            console.log('en reproduccion');
            $secondaryVideo[0].play();
        } else {
            $secondaryVideo[0].pause();
            console.log('pausado');
        }
    });
});