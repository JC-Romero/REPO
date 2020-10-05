$(document).ready(function () {
    console.log('entra aqui');
    var $secondaryVideo = $("#secondaryVideo");
    $('body').scroll(function () {
        if ($secondaryVideo.is(":in-viewport")) {
            $secondaryVideo[0].play();
            console.log('playing');
        } else {
            $secondaryVideo[0].pause();
            console.log('paused');
        }
    });
});