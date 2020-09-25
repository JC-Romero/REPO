
$(document).ready(function () {
    $("#carouselDocuments").slick({
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        infinite: true,
        cssEase: 'linear',
        arrows: true,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        pauseOnHover: false,
        draggable: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 340,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
});