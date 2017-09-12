'use strict';

var options = {
  autoplay: true,
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

var viewtype = function () {
  var type;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('Windows Phone') > 0) {
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
};

var count = 0;
//PLayer Initialization
var videoLoad = function videoLoad() {
  superagent.get('/api/big6tv/live/2017a').end(function (err, res) {
    var video = res.body.response.live.video;
    var isPlaying = res.body.response.live.isPlaying;
    var ads_options = {
      id: 'content_video',
      adLabel: '広告',
      adTagUrl: viewtype === 'pc' ? video.ad_url.pc : video.ad_url.sp,
      timeout: 3000
    };
    sources = video.sources.map(function (element, index) {
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
//# sourceMappingURL=vplayer.js.map
