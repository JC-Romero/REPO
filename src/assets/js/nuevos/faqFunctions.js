//faqs
var faqsToggle = function (item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, e) {
    $("#" + item1).fadeIn(300);
    $("#" + item2).hide();
    $("#" + item3).hide();
    $("#" + item4).hide();
    $("#" + item5).addClass('activeFaq');
    $("#" + item6).removeClass('activeFaq');
    $("#" + item7).removeClass('activeFaq');
    $("#" + item8).removeClass('activeFaq');
    $("#" + item9).addClass('mobileactiveFaq');
    $("#" + item10).removeClass('mobileactiveFaq');
    $("#" + item11).removeClass('mobileactiveFaq');
    $("#" + item12).removeClass('mobileactiveFaq');
    event.preventDefault();
};
var mobileFaqsToggle = function (item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, e) {
    $("#" + item1).fadeIn(300);
    $("#" + item2).hide();
    $("#" + item3).hide();
    $("#" + item4).hide();
    $("#" + item5).addClass('mobileactiveFaq');
    $("#" + item6).removeClass('mobileactiveFaq');
    $("#" + item7).removeClass('mobileactiveFaq');
    $("#" + item8).removeClass('mobileactiveFaq');
    $("#" + item9).addClass('activeFaq');
    $("#" + item10).removeClass('activeFaq');
    $("#" + item11).removeClass('activeFaq');
    $("#" + item12).removeClass('activeFaq');
    event.preventDefault();
};
$('#faqsAccordion').collapse({});