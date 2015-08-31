(function () {
  if (typeof Navigation === "undefined") {
    window.Navigation = {};
  }

  var NavBar = Navigation.NavBar = function ($el) {
    this.$el = $el;
    this.bindClicks();
  };

  NavBar.prototype.bindClicks = function() {
    this.$el.on("click", "a", this.scrollTo.bind(this));
  };

  NavBar.prototype.scrollTo = function (event) {
    event.preventDefault();
    var id = $(event.currentTarget).attr('href');
    var $id = $(id);
    if ($id.length === 0){
      return;
    }

    var pos = $(id).offset().top - 46;

    $('body, html').animate({ scrollTop: pos });
  };

})();
