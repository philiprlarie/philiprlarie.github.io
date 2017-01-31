$(function () {
  var $navBar = $('nav');
  $navBar.find('a').click(function (event) {
    event.preventDefault();
    var $section = $($(event.currentTarget).attr('href'));
    if ($section.length === 0) {
      return;
    }
    var pos = $section.offset().top - $navBar.height() - 1;
    $('.mobile-nav').attr('style', 'display: none !important');
    $('.mobile-nav').removeClass('open');
    $('body, html').animate({ scrollTop: pos });
  });

  // make navbar opaque when we are on top of document (TODO refactor this)
  var target = $('#about').offset().top - $navBar.height();
  setInterval(function () {
    if ($(window).scrollTop() >= target) {
      $('nav').addClass('opaque');
    } else {
      $('nav').removeClass('opaque');
    }
  }, 100);

  $('.glyphicon-menu-hamburger').click(function (event) {
    var $mobileNav = $('.mobile-nav');
    if ($mobileNav.hasClass('open')) {
      $mobileNav.attr('style', 'display: none !important');
      $mobileNav.removeClass('open');
    } else {
      $mobileNav.removeAttr('style');
      setTimeout(function () { // in timeout so that element definitely has dispay set before animation starts or else sometimes it might miss the animation
        $mobileNav.addClass('open');
      }, 10);
    }
  });

  $(window).scroll(function (event) {
    $('.project-links-mobile').each(function () {
      var $this = $(this);
      var pos = $this.offset().top - $(window).scrollTop();
      if (pos < 200) {
        $this.addClass('links-active');
      } else {
        $this.removeClass('links-active');
      }
    });
  });
});
