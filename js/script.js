"use strict";function ibg(){for(var e=document.querySelectorAll(".ibg"),l=0;l<e.length;l++)e[l].querySelector(".ibg__img, img")&&(e[l].style.backgroundImage="url("+e[l].querySelector(".ibg__img, img").getAttribute("src")+")")}function initDataModal(){window.allModals={};var e=document.querySelectorAll("[data-open-modal]");if(e)for(var l=0;l<e.length;l++)e[l].addEventListener("click",function(){var t=this.getAttribute("data-open-modal"),o=document.querySelector(t);(o||window.allModals[t])&&(!window.allModals[t]&&o&&(window.allModals[t]=new tingle.modal({closeMethods:["overlay","button","escape"],closeLabel:"Close",cssClass:["custom-class-1","custom-class-2"],onOpen:function(){var e=o.querySelectorAll("[data-close-modal]");if(e)for(var l=0;l<e.length;l++)e[l].addEventListener("click",function(){window.allModals[t].close()})}}),window.allModals[t].setContent(o.innerHTML)),window.allModals[t].open())});var t=document.querySelectorAll("[data-close-modal]");if(t)for(var o=0;o<t.length;o++)t[o].addEventListener("click",function(){var e,l=this.closest(".modal");l&&(e=l.getAttribute("id")),console.log(e),e&&window.allModals[e]&&(console.log(window.allModals[e]),window.allModals[e].close())})}ibg(),document.addEventListener("DOMContentLoaded",function(){var r=document.querySelectorAll(".header");if(r)for(var e=function(e){var l=r[e],t=l.querySelector(".header__burger"),o=l.querySelector(".header__links");t&&o&&t.addEventListener("click",function(){o.classList.toggle("active"),this.classList.toggle("active")});var a=document.querySelector(".header__language");if(a){var n=a.querySelector(".header__language__curent"),s=a.querySelector(".header__language__modal");s&&n&&n.addEventListener("click",function(){s.classList.toggle("active"),this.classList.toggle("active")})}},l=0;l<r.length;l++)e(l);var t=document.querySelector(".carousel-offers");if(t){var o=t.querySelectorAll(".splide__slide"),a=0;o&&(a=o.length%2==0?o.length/2-1:Math.floor(o.length/2));var n=new Splide(".carousel-offers",{waitForTransition:!1,start:a});n.on("mounted",function(){var e=n.Components.Elements.getSlide(a).slide.querySelector(".btn");e&&(e.classList.remove("btn--line"),e.classList.add("btn--full"))}),n.mount(),n.on("active",function(e){var l=e.slide.querySelector(".btn");l&&(l.classList.remove("btn--line"),l.classList.add("btn--full"))}),n.on("moved",function(e){for(var l=n.Components.Elements.slides,t=0;t<l.length;t++){var o=l[t];if(t!=e){var a=o.querySelector(".btn");a&&(a.classList.remove("btn--full"),a.classList.add("btn--line"))}}})}new tingle.modal({closeMethods:["overlay","button","escape"],closeLabel:"Close",cssClass:["custom-class-1","custom-class-2"]});initDataModal()});