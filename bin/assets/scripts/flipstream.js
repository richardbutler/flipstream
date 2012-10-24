
$(function() {
  return new Flipstream($('.flipstream')[0]);
});

var Flipstream,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Flipstream = (function() {

  Flipstream.prototype.selectedPageIndex = 0;

  Flipstream.prototype.selectedElementIndex = 0;

  function Flipstream(target) {
    this.next = __bind(this.next, this);

    this.previous = __bind(this.previous, this);
    this.$target = $(target);
    this.$previousNav = this.$target.find('.previous-nav a').click(this.previous);
    this.$nextNav = this.$target.find('.next-nav a').click(this.next);
    this.$pageContainer = $('.page-container');
    this.$pages = this.$pageContainer.find('.page');
    $('.article .flow').each(function(i, c) {
      return console.log(this);
    });
    this.setSelectedPageIndex(0);
    this.updateIndexes(0);
  }

  Flipstream.prototype.previous = function() {
    var $pagesToTurn;
    if (this.selectedPageIndex === 0) {
      return;
    }
    $pagesToTurn = this.getPagesToTurn();
    $pagesToTurn.removeClass('turned');
    this.setSelectedPageIndex(this.selectedPageIndex - 1);
    return this.updateIndexes(-1);
  };

  Flipstream.prototype.next = function() {
    var $pagesToTurn;
    if (this.selectedElementIndex === this.$pages.length - 1) {
      return;
    }
    this.updateIndexes(+1);
    this.setSelectedPageIndex(this.selectedPageIndex + 1);
    $pagesToTurn = this.getPagesToTurn();
    return $pagesToTurn.addClass('turned');
  };

  Flipstream.prototype.getPagesToTurn = function() {
    var $page1, $page2;
    $page1 = this.$pages[this.selectedElementIndex - 2];
    $page2 = this.$pages[this.selectedElementIndex - 1];
    return $([$page1, $page2]);
  };

  Flipstream.prototype.setSelectedPageIndex = function(index) {
    var _this = this;
    this.selectedPageIndex = index;
    this.selectedElementIndex = index * 2;
    this.$previousNav.html(this.selectedElementIndex).toggleClass('hidden', this.selectedPageIndex === 0);
    this.$nextNav.html(this.selectedElementIndex + 2).toggleClass('hidden', this.selectedElementIndex > this.$pages.length - 1);
    this.$pageContainer.attr('data-page', index);
    this.$pageContainer.attr('data-element', index * 2);
    this.$pages.each(function(i, c) {
      return $(c).toggleClass('selected', i === _this.selectedElementIndex || i === _this.selectedElementIndex - 1);
    });
    return index;
  };

  Flipstream.prototype.updateIndexes = function(delta) {
    var _this = this;
    return this.$pages.each(function(i, c) {
      var sei;
      sei = _this.selectedElementIndex;
      return $(c).toggleClass('underlay', i === _this.selectedElementIndex + 2).css('z-index', _this.$pages.length - Math.abs(i - sei));
    });
  };

  return Flipstream;

})();
