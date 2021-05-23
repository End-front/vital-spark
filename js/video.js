"use strict";

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 16.666);
  };
}();

function loadImages(arr, callback) {
  var _self = this;

  this.images = {};
  var loadedImageCount = 0;

  for (var i = 0; i < arr.length; i++) {
    var img = new Image();
    img.onload = imageLoaded;
    img.src = arr[i];
    this.images[i] = img;
  }

  function imageLoaded(e) {
    loadedImageCount++;

    if (loadedImageCount >= arr.length) {
      callback(_self.images);
    }
  }
}

var activeNow = 0;
var paths = [];
var windowWidth = window.innerWidth;

if (windowWidth > 900) {
  for (var i = 0; i < 61; i++) {
    paths.push("./img/frames/desk/".concat(i, ".png"));
  }
} else {
  for (var i = 0; i < 61; i++) {
    paths.push("./img/frames/mob/".concat(i, ".png"));
  }
}

var imgs = [];
var loader = new loadImages(paths, function (imgsk) {
  imgs = imgsk;
  myCustom();
});

function myCustom() {
  var cvParent = document.querySelector("#boxVideo");
  var cv = cvParent.querySelector("canvas");
  var cx = cv.getContext("2d");
  drawImageProp(cx, imgs[0]);

  if (isInternetExplorer()) {
    document.documentElement.classList.add('ie-11');
  }

  cvParent.style.WebkitTransform = 'translateX(-50%)';
  cvParent.style.transform = 'translateX(-50%)';

  function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
    if (arguments.length === 2) {
      x = y = 0;
      w = ctx.canvas.width;
      h = ctx.canvas.height;
    } // default offset is center


    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5; // keep bounds [0.0, 1.0]

    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;
    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,
        // new prop. width
    nh = ih * r,
        // new prop. height
    cx,
        cy,
        cw,
        ch,
        ar = 1; // decide which gap to fill

    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated

    nw *= ar;
    nh *= ar; // calc source rectangle

    cw = iw / (nw / w);
    ch = ih / (nh / h);
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY; // make sure source rectangle is valid

    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih; // fill image in dest. rectangle

    ctx.clearRect(0, 0, 2000, 2000);
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var cvParent = document.querySelector("#boxVideo");
  var cv = cvParent.querySelector("canvas");
  var cx = cv.getContext("2d");
  cv.width = window.devicePixelRatio * cvParent.clientWidth;
  cv.height = cv.width;
  var mobileAspectRatio = 700 / 1440;
  var windowAspectRatio = window.innerWidth / window.innerHeight;

  function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
    if (arguments.length === 2) {
      x = y = 0;
      w = ctx.canvas.width;
      h = ctx.canvas.height;
    } // default offset is center


    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5; // keep bounds [0.0, 1.0]

    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;
    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,
        // new prop. width
    nh = ih * r,
        // new prop. height
    cx,
        cy,
        cw,
        ch,
        ar = 1; // decide which gap to fill

    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated

    nw *= ar;
    nh *= ar; // calc source rectangle

    cw = iw / (nw / w);
    ch = ih / (nh / h);
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY; // make sure source rectangle is valid

    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih; // fill image in dest. rectangle

    ctx.clearRect(0, 0, 2000, 2000);
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
  } // const onscrollevt = () => {
  //   if (document.documentElement.classList.contains('scrolling')) {
  //     return false;
  //   }
  // let dif = (document.querySelector('#boxVideo-end').getBoundingClientRect().top - document.querySelector('#boxVideo-start').getBoundingClientRect().top);
  //   let ff = - document.querySelector('#boxVideo-start').getBoundingClientRect().top / dif;
  // if (ff > 0 && ff < 1 && imgs[Math.floor(ff * 60)]) {
  //   drawImageProp(cx, imgs[Math.floor(ff * 60)])
  //   activeNow = Math.floor(ff * 60)
  //   cvParent.style.WebkitTransform = 'translateY('+ Math.floor(ff * dif) +'px) translateX(-50%)'
  //   cvParent.style.transform = 'translateY('+ Math.floor(ff * dif) +'px) translateX(-50%)'
  // }
  // else if (ff > 0 && ff < 1 && paths[Math.floor(ff * 60)] && imgs.length >= 1) {
  //   drawImageProp(cx, imgs[imgs.length - 1])
  //   cvParent.style.WebkitTransform = 'translateY('+ Math.floor(ff * dif) +'px) translateX(-50%)'
  //   cvParent.style.transform = 'translateY('+ Math.floor(ff * dif) +'px) translateX(-50%)'
  // }
  // else if (ff <= 0 && imgs[0]) {
  //   drawImageProp(cx, imgs[0])
  //   activeNow = 0
  //   cvParent.style.WebkitTransform = 'translateY('+ 0 +'px) translateX(-50%)'
  //   cvParent.style.transform = 'translateY('+ 0 +'px) translateX(-50%)'
  // }
  // else if (ff >= 1 && imgs[60]) {
  //   drawImageProp(cx, imgs[60])
  //   activeNow = 60
  //   cvParent.style.WebkitTransform = 'translateY('+ dif +'px) translateX(-50%)'
  //   cvParent.style.transform = 'translateY('+ dif +'px) translateX(-50%)'
  // }
  // }


  function videoAnim() {
    document.documentElement.classList.remove('ie-11');
    var start = null;
    var dif = document.querySelector('#boxVideo-end').getBoundingClientRect().top - document.querySelector('#boxVideo-start').getBoundingClientRect().top;
    var wrapper = document.querySelector('.custom-block-1');
    wrapper && wrapper.classList.add('isVision');
    requestAnimFrame(function animate(time) {
      if (start === null) start = time;
      var timeFraction = (time - start) / 1500;
      var ff = Math.sin(timeFraction * Math.PI / 2);

      if (ff > 1) {
        ff = 1;
      }

      if (timeFraction > 0 && timeFraction < 1 && imgs[Math.floor(timeFraction * 60)]) {
        drawImageProp(cx, imgs[Math.floor(timeFraction * 60)]);
        cvParent.style.WebkitTransform = 'translateY(' + Math.floor(ff * dif) + 'px) translateX(-50%)';
        cvParent.style.transform = 'translateY(' + Math.floor(ff * dif) + 'px) translateX(-50%)';
      } else if (timeFraction <= 0 && imgs[0]) {
        drawImageProp(cx, imgs[0]);
        cvParent.style.WebkitTransform = 'translateY(' + 0 + 'px) translateX(-50%)';
        cvParent.style.transform = 'translateY(' + 0 + 'px) translateX(-50%)';
      } else if (timeFraction >= 1 && imgs[60]) {
        drawImageProp(cx, imgs[60]);
        cvParent.style.WebkitTransform = 'translateY(' + dif + 'px) translateX(-50%)';
        cvParent.style.transform = 'translateY(' + dif + 'px) translateX(-50%)';
        window.animateReverse = false;
      }

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  function videoAnimReverse() {
    document.documentElement.classList.remove('ie-11');
    var start = null;
    var dif = document.querySelector('#boxVideo-end').getBoundingClientRect().top - document.querySelector('#boxVideo-start').getBoundingClientRect().top;
    requestAnimFrame(function animate(time) {
      if (start === null) start = time;
      var timeFraction = 1 - (time - start) / 1500;
      var ff = Math.sin(timeFraction * Math.PI / 2);

      if (ff < 0) {
        ff = 0;
      }

      if (timeFraction > 0 && timeFraction < 1 && imgs[Math.floor(timeFraction * 60)]) {
        drawImageProp(cx, imgs[Math.floor(timeFraction * 60)]);
        cvParent.style.WebkitTransform = 'translateY(' + Math.floor(ff * dif) + 'px) translateX(-50%)';
        cvParent.style.transform = 'translateY(' + Math.floor(ff * dif) + 'px) translateX(-50%)';
      } else if (timeFraction <= 0 && imgs[0]) {
        drawImageProp(cx, imgs[0]);
        cvParent.style.WebkitTransform = 'translateY(' + 0 + 'px) translateX(-50%)';
        cvParent.style.transform = 'translateY(' + 0 + 'px) translateX(-50%)';
        window.animateStart = false;
      } else if (timeFraction >= 1 && imgs[0]) {
        drawImageProp(cx, imgs[0]);
        cvParent.style.WebkitTransform = 'translateY(' + dif + 'px) translateX(-50%)';
        cvParent.style.transform = 'translateY(' + dif + 'px) translateX(-50%)';
      }

      if (timeFraction > 0) {
        requestAnimationFrame(animate);
      }
    });
  }

  window.animateReverse = true;

  var onscrollevt = function onscrollevt() {
    var block = document.querySelector('#boxVideo-start');
    var blockTop = block && block.getBoundingClientRect().top;

    if (blockTop && blockTop <= 0) {
      if (!window.animateStart) {
        window.animateStart = true;
        videoAnim();
      }
    }

    if (blockTop && blockTop > 150) {
      if (!window.animateReverse) {
        window.animateReverse = true;
        videoAnimReverse();
      }
    }
  };

  function loop() {
    onscrollevt();
    window.requestAnimFrame(loop);
  }

  window.requestAnimFrame(loop);
});

function isInternetExplorer() {
  return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}