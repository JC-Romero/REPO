
$(window).scroll(function () {
    if ($(this).scrollTop() > 550) {
        $('#detailBar').removeClass("hide");
        $('#detailBar').addClass("appear");
    }
    else {
        $('#detailBar').removeClass("appear");
        $('#detailBar').addClass("hide");
    }
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 700) {
        $('#insideBar').removeClass("small");
        $('#insideBar').addClass("grow");
    }
    else {
        $('#insideBar').removeClass("grow");
        $('#insideBar').addClass("small");
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 800) {
        $("#packageName").fadeIn(500);
        $("#priceAndDiscount").fadeIn(500);
        $("#buyButton").addClass('col-sm-12 col-md-12 col-lg-3 col-xl-3');
    }
    else {
        $("#packageName").hide();
        $("#priceAndDiscount").hide();
        $("#buyButton").removeClass('col-sm-12 col-md-12 col-lg-3 col-xl-3');
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 850) {
        $('#insideBar').addClass('changeColor');
        $('#insideBar').addClass('towhiteBack');
    }
    else {
        $('#insideBar').removeClass('changeColor');
        $('#insideBar').removeClass('towhiteBack');
    }
});
