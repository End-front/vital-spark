"use strict";

ibg();
document.addEventListener('DOMContentLoaded', function () {
  // Menu
  var header = document.querySelectorAll('.header');

  if (header) {
    var _loop = function _loop(index) {
      var element = header[index];
      var burgerMenu = element.querySelector('.header__burger');
      var listLink = element.querySelector('.header__links');
      var listLinkTagA = listLink && listLink.querySelectorAll('a');

      if (burgerMenu && listLink) {
        listLink.classList.add('transition');
        burgerMenu.addEventListener('click', function () {
          listLink.classList.toggle('active');
          this.classList.toggle('active');
        });
      }

      if (listLinkTagA) {
        for (var _index = 0; _index < listLinkTagA.length; _index++) {
          var _element = listLinkTagA[_index];

          _element.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollToCoords(this.getAttribute('href'), {
              margin: 70
            });
          });
        }
      }

      var languageBlock = document.querySelector('.header__language');

      if (languageBlock) {
        var languageBtn = languageBlock.querySelector('.header__language__curent');
        var languageModal = languageBlock.querySelector('.header__language__modal');

        if (languageModal && languageBtn) {
          languageBtn.addEventListener('click', function () {
            languageModal.classList.toggle('active');
            this.classList.toggle('active');
          });
        }
      }
    };

    for (var index = 0; index < header.length; index++) {
      _loop(index);
    }
  } // Carousel


  var carouselOffers = document.querySelector('.carousel-offers');

  if (carouselOffers) {
    var carouselChild = carouselOffers.querySelectorAll('.splide__slide');
    var pos = 0;

    if (carouselChild) {
      pos = carouselChild.length % 2 == 0 ? carouselChild.length / 2 - 1 : Math.floor(carouselChild.length / 2);
    }

    var carouselOffersSplide = new Splide('.carousel-offers', {
      waitForTransition: false,
      start: pos
    });
    carouselOffersSplide.on('mounted', function () {
      var curentSlide = carouselOffersSplide.Components.Elements.getSlide(pos);
      var btn = curentSlide.slide.querySelector('.btn');

      if (btn) {
        btn.classList.remove('btn--line');
        btn.classList.add('btn--full');
      }
    });
    carouselOffersSplide.mount();
    carouselOffersSplide.on('active', function (e) {
      var btn = e.slide.querySelector('.btn');

      if (btn) {
        btn.classList.remove('btn--line');
        btn.classList.add('btn--full');
      }
    });
    carouselOffersSplide.on('moved', function (e) {
      var slides = carouselOffersSplide.Components.Elements.slides;

      for (var _index2 = 0; _index2 < slides.length; _index2++) {
        var element = slides[_index2];
        if (_index2 == e) continue;
        var btn = element.querySelector('.btn');

        if (btn) {
          btn.classList.remove('btn--full');
          btn.classList.add('btn--line');
        }
      }
    });
  } // modal


  initDataModal(); // video

  var boxVideo = document.querySelector('#boxVideo');
  var boxVideoStart = document.querySelector('#boxVideo-start');
  var boxVideoEnd = document.querySelector('#boxVideo-end');
});
window.addEventListener('load', function () {
  document.documentElement.classList.add('loaded');
});

function ibg() {
  var ibg = document.querySelectorAll(".ibg");

  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('.ibg__img, img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('.ibg__img, img').getAttribute('src') + ')';
    }
  }
}

function initDataModal() {
  window.allModals = {};
  var buttons = document.querySelectorAll('[data-open-modal]');

  if (buttons) {
    for (var index = 0; index < buttons.length; index++) {
      buttons[index].addEventListener('click', function () {
        var nameModal = this.getAttribute('data-open-modal');
        var documentModal = document.querySelector(nameModal);

        if (documentModal || window.allModals[nameModal]) {
          if (!window.allModals[nameModal] && documentModal) {
            window.allModals[nameModal] = new tingle.modal({
              closeMethods: ['overlay', 'button', 'escape'],
              closeLabel: "Close",
              cssClass: ['custom-class-1', 'custom-class-2'],
              onOpen: function onOpen() {
                var buttonsClose = window.allModals[nameModal].modal.querySelectorAll('[data-close-modal]');

                if (buttonsClose) {
                  for (var _index3 = 0; _index3 < buttonsClose.length; _index3++) {
                    buttonsClose[_index3].addEventListener('click', function () {
                      window.allModals[nameModal].close();
                    });
                  }
                }
              }
            });
            window.allModals[nameModal].setContent(documentModal.innerHTML);
          }

          window.allModals[nameModal].open();
        }
      });
    }
  } // let buttonsClose = document.querySelectorAll('[data-close-modal]');
  // if (buttonsClose) {
  //   for (let index = 0; index < buttonsClose.length; index++) {
  //     buttonsClose[index].addEventListener('click', function() {
  //       let parent = this.closest('.modal');
  //       let id;
  //       if (parent) {
  //         id = parent.getAttribute('id');
  //       }
  //       console.log(id);
  //       if (id) {
  //         if (window.allModals[id]) {
  //           console.log(window.allModals[id]);
  //           window.allModals[id].close();
  //         }
  //       }
  //     });
  //   }
  // }

}