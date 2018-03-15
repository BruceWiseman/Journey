$(document).ready(function() {

  $(window).scroll(function () {
    if ($(window).scrollTop() > $('#headerBanner').height()) {
      $('#navigationBar').addClass('navbar-fixed');
        $('#searchHead').css("padding-top","92px");
    }
    if ($(window).scrollTop() < $('#headerBanner').height()) {
      $('#navigationBar').removeClass('navbar-fixed');
        $('#searchHead').css("padding-top","30px");
    }
  });
});
