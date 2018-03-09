'use strict';

var options = {
  autoplay: false,
  controls: true,
  fluid: false, //[NOTE] This option is for responsive http://blog.videojs.com/Video-js-5-s-fluid-mode-and-playlist-picker/
  plugins: {
    videoJsResolutionSwitcher: {
      default: 0
    }
  },
  nativeControlsForTouch: false
};
var isFirstPlay = true;
var sources;

//IE10 & IE11 detection
var ua = window.navigator.userAgent.toLowerCase();
var isIE = ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0;
if (isIE) {
  options['techOrder'] = ["flash"]; //-> IE 11
}

// To detect Safari 11
function get_browser() {
  var ua = navigator.userAgent,
    tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: tem[1] || '' };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      return { name: 'Opera', version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1]
  };
}

var viewtype = function () {
  var type;
  if (ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0 || ua.indexOf('windows phone') > 0) {
    type = 'sp';
  } else {
    type = 'pc';
  }
  return type;
}();

//Overriding Android native HLS support:
if (navigator.userAgent.match(/android/i)) {
  videojs.options.hls.overrideNative = true;
  videojs.options.html5.nativeAudioTracks = false;
  videojs.options.html5.nativeVideoTracks = false;
}

var player;
var superagent = window.superagent;
var firstLoad = false;

// Remove controls from the player on iPad to stop native controls from stealing
// our click
var contentPlayer;

//Container Initialization, called only once.
var startEvent;

var setPlayerEvent = function setPlayerEvent() {
  $('.content_video_ima-ad-container video[title=\'Advertisement\']').css({ top: 0, left: 0 });
  $('.content_video_ima-ad-container div:eq(0)').css({ pointerEvents: 'none' });
  contentPlayer = document.getElementById('content_video_html5_api');
  if ((navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) && contentPlayer.hasAttribute('controls')) {
    contentPlayer.removeAttribute('controls');
  }
  startEvent = 'click';
  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) {
    startEvent = 'touchend';
  }
  //Handling first user click/touch
  player.one(startEvent, function () {
    isFirstPlay = false;
    $('.content_video_ima-ad-container div:eq(0)').css({ pointerEvents: 'auto' });
    // if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) {
    //   $('.content_video_ima-ad-container div:eq(0)').css({pointerEvents: 'none'});
    // }
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
      //iPhone & iPads
      player.play();
    } else {
      //Desktop & Android
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
      player.play();
    }

    // Disabled subtitles/closed caption for Safari.
    // document.getElementsnpmByClassName("vjs-captions-button")[0].style.display = "none";
  });

  //For playing after resolution has been changed, for Chrome and Firefox
  player.on(['contentupdate'], function () {
    if (!navigator.userAgent.match(/Android/i)) {
      if (!isFirstPlay) {
        player.play();
      }
    }
  });

  player.on(['loadedmetadata'], function () {
    if (navigator.userAgent.match(/android/i)) {
      player.play();
    }
  });

  //iPhone
  player.on(['canplay'], function () {
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
      player.play();
    }
  });

  //Deskop Safari : if autoplay == false, the video doesn't start after ad ended.
  player.on(['adend'], function () {
    //For flash tech only
    if (isIE) {
      player.updateSrc(sources);
    }
    //Desktop Safari
    player.play();

    // Disabled subtitles/closed caption for Safari.
    document.getElementsByClassName("vjs-captions-button")[0].style.display = "none";
  });

  // This is for Safari 11
  player.on(['adend'], function () {
    try {
      player.muted(false);
      player.play();
    } catch (e) {
      player.play();
    }
  });
};

var getTime = function getTime() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  var sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
  return '' + year + month + day + hour + min + sec;
};

var count = 0;
//PLayer Initialization
var videoLoad = function videoLoad() {
  // --- [2017-10-18]
  var hostname = location.hostname;
  var api = 'https://dev-img.sportsbull.jp/static/crashedice/live.json';
  if (hostname === 'sportsbull.jp' || hostname === 'stg.sportsbull.jp') {
    api = 'https://img.sportsbull.jp/static/crashedice/live.json';
  }
  // ---
  var time = getTime();
  superagent.get(api).query({
    date: time
  }).end(function (err, res) {
    // console.log(res.body.response)
    var video = res.body.response.live.video;
    var isPlaying = res.body.response.live.isPlaying;
    // const isPlaying = true;
    var ads_options = {
      id: 'content_video',
      adLabel: '広告',
      adTagUrl: viewtype === 'pc' ? video.ad_url.pc : video.ad_url.sp,
      timeout: 3000
    };
    // console.log(viewtype, video['sources_sp'])
    var sourcesType = viewtype === 'sp' ? video['sources_sp'] : video['sources'];
    // console.log(sourcesType)
    sources = sourcesType.map(function (element, index) {
      return {
        src: element.url,
        type: 'application/x-mpegURL',
        label: element.label,
        res: element.res
      };
    });
    if (isPlaying) {
      if (!firstLoad) {
        firstLoad = true;
        $('#content_video').attr('poster', res.body.response.live.alt.large);
        player = videojs('content_video', options);
        player.src({
          src: video.source,
          type: 'application/x-mpegURL'
        });

        // // This is for Safari 11.
        // var browser = get_browser();
        // if (!navigator.userAgent.match(/iPhone/i) && browser.name == 'Safari' && browser.version == 11) {
        //   player.muted(true);
        //   player.setAttribute('muted', 'muted');
        // }

        player.updateSrc(sources);
        player.ima(ads_options);
        player.ga(); // Google Analytics Integration
        player.videoJsResolutionSwitcher();
        player.one('ready', function () {
          if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            player.ima.initializeAdDisplayContainer();
            player.ima.requestAds();
            // Hide loading spinner during playing ads due to google-IMA bug?
            player.loadingSpinner.hide();
          }
        });
        setPlayerEvent();
      }
      $('.video__wrapper').show();
      $('.video_alt').hide();
    } else {
      if (player) player.pause();
      var img = $('<img/>', { src: res.body.response.live.alt.large, alt: '' });
      $('.video_alt').empty();
      $('.video_alt').append(img);
      $('.video__wrapper').hide();
      $('.video_alt').show();
    }
    setTimeout(function () {
      videoLoad();
    }, res.body.response.live.interval * 1000);
  });
};
videoLoad();
