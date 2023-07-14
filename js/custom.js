
(function ($) {

  "use strict";

  // MENU
  $('#sidebarMenu .nav-link').on('click', function () {
    $("#sidebarMenu").collapse('hide');
  });

  // CUSTOM LINK
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  });

})(window.jQuery);

//profile button popup
// Get the popup wrapper, link, and card elements
const popupLink1 = document.querySelector('.popup-link-1');
const popupCard = document.querySelector('.popup-card-1');

// Add a click event listener to the link
popupLink1.addEventListener('click', (event) => {
  event.preventDefault();
  if (popupCard.style.display === 'block') {
    popupCard.style.display = 'none';
  } else {
    popupCard.style.display = 'block';
    const linkRect = popupLink1.getBoundingClientRect();
    popupCard.style.top = linkRect.bottom + 'px';
    popupCard.style.left = linkRect.left + 'px';
  }
});

popupCard.addEventListener('click', (event) => {
  event.stopPropagation();
});

document.addEventListener('click', (event) => {
  if (!popupLink1.contains(event.target) && !popupCard.contains(event.target)) {
    popupCard.style.display = 'none';
  }
});
