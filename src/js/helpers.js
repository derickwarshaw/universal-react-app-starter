const Helpers  = {
  init: () => {
    window.animFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      ((callback) => { window.setTimeout(callback, 1000/60); });

    window.isRetina = function() {
      if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
      }
      return false;
    }();

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.isDevice = true;
    }

    const ua = window.navigator.userAgent;
    const msie = ua ? ua.indexOf("MSIE ") : null;
    if ((msie && msie > 0) || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      window.isIE = true;
    }

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      window.isFirefox = true;
    }

    if (navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
      navigator.userAgent && !navigator.userAgent.match('CriOS')) {
      window.isSafari = true;
    }

    window.isChrome =  function () {
      var isChromium = window.chrome,
        winNav = window.navigator,
        vendorName = winNav.vendor,
        isOpera = winNav.userAgent.indexOf("OPR") > -1,
        isIEedge = winNav.userAgent.indexOf("Edge") > -1,
        isIOSChrome = winNav.userAgent.match("CriOS");

      if(isIOSChrome){
        return true;
      } else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
        return true;
      } else {
        return false;
      }
    }();

    window.isOpera = (navigator.userAgent.match(/Opera|OPR\//) ? true : false);

    // Passive event with fallback
    window.pasiveEvent = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          window.pasiveEvent = { passive: true };
        }
      });
      window.addEventListener("test", null, opts);
    } catch (e) {};
  },
  postInit: () => {
    // Some plugin calls
    objectFitImages();

    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };

    var stickyElements = document.getElementsByClassName('sticky');
    for (var i = stickyElements.length - 1; i >= 0; i--) {
        Stickyfill.add(stickyElements[i]);
    }
  },
  getPosY: (elm) => {
    let test = elm, top = 0;
    while(!!test && test.tagName.toLowerCase() !== 'body') {
      top += test.offsetTop;
      test = test.offsetParent;
    }
    return top;
  },
  getPos: (elm, leftWithRect) => {
    let test = elm;
    let pos = [0, 0];
    while(!!test && test.tagName.toLowerCase() !== 'body') {
      pos[0] += test.offsetLeft;
      pos[1] += test.offsetTop;
      test = test.offsetParent;
    }

    if (elm && leftWithRect) {
      pos[0] = elm.getBoundingClientRect().left;
    }

    return pos;
  },
  scrollToY: (element, toY, speed, easing) => {
    if (speed === 0) {
      if (element) {
        element.scrollTop = toY
      } else {
        window.scrollTo(0, toY);
      }

      return;
    }

    // toY: the target scrollY property of the window
    // speedScroll: time in pixels per second
    // easing: easing equation to use
    let scrollY = element ? element.scrollTop : window.scrollY || document.documentElement.scrollTop,
        scrollTargetY = toY || 0,
        currentTime = 0;


    // min time .1, max time .8 seconds
    let time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / (speed ? speed : 2000), .8));

    const easingEquations = {
      easeOutSine: (pos) => {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeInOutSine: (pos) => {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
      },
      easeInOutQuint: (pos) => {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
      }
    };

    // add animation loop
    const tick = () => {
      currentTime += 1 / 60;
      let p = currentTime / time;
      let t = easingEquations[easing ? easing : 'easeOutSine'](p);

      if (p < 1) {
        animFrame(tick);
        if (element) {
          element.scrollTop = scrollY + ((scrollTargetY - scrollY) * t);
        } else {
          window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        }
      } else {
        if (element) {
          element.scrollTop = scrollTargetY;
        } else {
          window.scrollTo(0, scrollTargetY);
        }
      }
    }
    tick();
  },
  getC: (content, section, field, localeFallback) => {
    if (!content) {
      return localeFallback;
    }
    let sectionContent = content;
    if (section) {
        sectionContent = content[section];
    }

    let fieldFix;
    if (sectionContent) {
      if (sectionContent[field]) {
        fieldFix = sectionContent[field];
      } else if (sectionContent.fields && sectionContent.fields[field]) {
        fieldFix = sectionContent.fields[field];
      }
    }
    return sectionContent && fieldFix ? fieldFix : localeFallback;
  }
};

export default Helpers;
