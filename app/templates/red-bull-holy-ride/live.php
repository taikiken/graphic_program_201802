<?php
/*

# LIVE配信モジュール

*/

$live = array(
  // liveAPIのエンドポイント
  // https://github.com/undotsushin/undotsushin/issues/2279#issuecomment-321793026

  'endpoint' => UT_ENV !== 'PRODUCTION' ? "'https://dev-img.sportsbull.jp/static/redbull/live.json'" : "'https://img.sportsbull.jp/static/redbull/live.json'",
  'interval' => 20, // polling間隔
);

?>

<div class="live-streaming__container">
  <div class="live-streaming js-live <?php echo ( $page['ua'] == 'desktop' ) ? 'live-streaming--pc' : 'live-streaming--sp'; ?>"></div><!-- /.live-streaming -->
</div><!-- /.live-streaming__container -->

<!-- video.js -->
<link href="//cdnjs.cloudflare.com/ajax/libs/video.js/5.18.4/video-js.min.css" rel="stylesheet" />
<script src="//cdnjs.cloudflare.com/ajax/libs/video.js/5.18.4/video.js"></script>
<!-- //video.js -->

<!-- hls -->
<script src="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.5.0/videojs-contrib-hls.js"></script>
<!-- //hls -->

<!-- ads - sdk -->
<script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
<!-- //ads - sdk -->

<!-- ads - ad -->
<link href="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/4.2.6/videojs.ads.min.css" rel="stylesheet" />
<script src="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/4.2.6/videojs.ads.js"></script>
<!-- //ads - ad -->

<!-- ads - ima -->
<link href="//cdnjs.cloudflare.com/ajax/libs/videojs-ima/0.5.0/videojs.ima.min.css" rel="stylesheet" />
<script src="//cdnjs.cloudflare.com/ajax/libs/videojs-ima/0.5.0/videojs.ima.js"></script>
<!-- //ads - ima -->

<link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ads.css" />
<link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ima.css" />
<link rel="stylesheet" href="/assets/ima_plugin/css/ima-style.css" />

<style>
.live-streaming {
  position: relative;
  height: 0;
  padding-top: 56.25%;
  z-index: 1;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #000;
}

.live-streaming > img {
  position: absolute;
  top: 0;
  left: 0;
}

.live-streaming #content_video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.live-streaming .video-js {
  outline: none;
}
.live-streaming .video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -45px;
  margin-top: -22.5px;
}
.live-streaming .video-js .vjs-live-display {
  line-height: 3;
}
.live-streaming .video-js .vjs-audio-button {
  display: none;
}

/* #iOS インライン再生中のローディング非表示 */
.live-streaming .video-js.vjs-ad-playing .vjs-loading-spinner {
  display: none;
}

.live-streaming--sp .content_video_ima-ad-container iframe {
  width: 0;
  height: 0;
}
</style>


<?php
/*

streampack初期化コード

*/
?>
<script id="live-streaming__video" type="text/template">
  <video
    id="content_video"
    class="video-js vjs-default-skin"
    poster=""
    controls
    preload="none"
    width="640"
    height="360">
    <source
      src=""
      type="application/x-mpegURL"></source>
  </video>
</script>


<script src="https://code.jquery.com/jquery-git.min.js"></script>
<script>
(function($){

  var $embed          = $('.js-live');
  var $tmpl_video     = $('#live-streaming__video').html();

  var liveEndPoint    = <?php echo $live['endpoint']; ?>;
  var interval        = <?php echo $live['interval']; ?> * 1000; // polling 間隔

  var video_isPlaying = null;
  var video_source    = '';

  var isMobile        = false;
  var isAndroid       = false;

  var isPlayed        = false;
  var isAdPlayed      = false;
  var isAdStarted     = false;

  var intervalTimer   = null;

  // mobile / android判定
  // ------------------------------
  if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) {
    isMobile   = true;
    if ( navigator.userAgent.match(/Android/i) ) {
      isAndroid  = true;
    }
  }


  // init
  // ------------------------------
  <?php // initタイミングずらす / mobileで初回ロード時にadtimeout起こる の低減 ?>
  setTimeout( init, 3000 );


  <?php // 本番環境以外の時のみ console.log を出力する  ?>
  function log( message, value ) {
    <?php if ( UT_ENV !== 'PRODUCTION' ) : ?>
    console.log( message, value || '');
    <?php endif; ?>
  }

  /**
  * データ取得してプレイヤーをセットする
  */
  function init() {

    if ( !intervalTimer ) {
      intervalTimer = window.setInterval( init, interval );
    }

    $.ajax({
      url      : liveEndPoint,
      type     : 'get',
      dataType : 'json',
      cache    : true,
      data : {
        cache : Math.random()
      }
    })
    .done(function (data) {

      var response      = data.response.live;

      // レスポンスのisPlayingがboolでもstringでも判定できるように
      if ( response.isPlaying == true || response.isPlaying == 'true' ) {
        response.isPlaying = true;
      }

      if ( video_isPlaying !== response.isPlaying || video_source !== response.video.source ) {

        video_isPlaying = response.isPlaying;
        video_source    = response.video.source;

        if ( video_isPlaying ) {
          reset();
          initVideo( response );
        } else {
          reset();
          initAlt( response.alt.large );
        }

      }

      log('live - ajax : success');

    })
    .fail(function () {
      log('live - ajax : fail');
    });

  }


  /**
  * プレイヤー部分をリセットする
  */
  function reset( data ) {

    // initしたvideojsはdsposeしないと再initできない
    if ( $('#content_video').length ) {
      videojs('content_video').dispose();
    }

    $embed.empty();
    $embed.css('background-image', 'none');
    log('live - reset');
  }


  /**
  * プレイヤー部分にalt画像を表示する
  */
  function initAlt( image ) {
    // 単に中身の要素を空にして親要素の背景にposterおいてるだけ
    $embed.css('background-image','url(' + image + ')');
    log('live - initAlt', image);
  }


  /**
  * プレイヤー部分にvideoタグを出力する
  */
  function initVideo( data ) {

    var contentPlayer       = undefined;
    var playerState         = null;
    var playerStateInterval = null;
    var playerResetTimer    = null;

    var date = new Date();
    var timestamp = date.getTime();

    $embed.html( $tmpl_video );
    $embed.find('video').attr('poster', data.alt.large );
    <?php
    if (0) :
    // hide comment
    ?>
//    $embed.find('source').attr('src', data.video.source + '?timestamp=' + timestamp );
    // @see https://github.com/undotsushin/undotsushin/issues/2279#issuecomment-322675588
    // #1901 desktop版はABR固定 - from `app/templates/big6tv/live.php` line. 268
    <?php
    // hide comment end
    endif;
    ?>
    <?php if ( $page['ua'] == 'desktop' && !isset($_GET['debug']) ) :?>
    $embed.find('source').attr('src', 'https://d3t6uer7w31bug.cloudfront.net/live_sb/rb.m3u8' + '?timestamp=' + timestamp );
    <?php else : ?>
    $embed.find('source').attr('src', data.video.source + '?timestamp=' + timestamp );
    <?php endif ;?>

    // ad_url
    // ------------------------------
    var ad_url = '';

    // 広告再生済みなら再度広告設定はしない
    if ( !isAdPlayed && data.video.ad_url ) {
      ad_url = <?php echo ( $page['ua'] == 'desktop' ) ? 'data.video.ad_url.pc' : 'data.video.ad_url.sp'; ?>;

      // advantage広告タグ用 - URLの末尾が `page=` ならtimestampを付与してリクエストする
      if ( ad_url !== '') {
        if ( ad_url.match(/page=$/) ) {
          ad_url += timestamp;
        }
      }
    }


    // player - init
    // ------------------------------
    // init
    var player = videojs('content_video', {
      textTrackSettings: false,
      hls : {
        overrideNative  : true,
        withCredentials : true
      },
      html5 : {
        nativeAudioTracks : false,
        nativeVideoTracks : false,
        nativeTextTracks  : false
      }
    });

    contentPlayer = document.getElementById('content_video_html5_api');
    log('player', player);


    // player - ima
    // ------------------------------
    var options = {
      adLabel          : '広告',
      id               : 'content_video',
      adTagUrl         : ad_url,
      requestMode      : 'onplay',
      prerollTimeout   : 10000,
      debug            : true,
      loadingSpinner   : true
    };

    if ( isMobile ) {
      options.requestMode = 'ondemand';
    }

    player.ima(options);
    player.ads.videoElementRecycled = function() {
      return;
    }

    log('player.ima', player.ima);


    // controls
    // ------------------------------
    if ( ( navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) ) && contentPlayer.hasAttribute('controls') ) {
      contentPlayer.removeAttribute('controls');
    }


    // start
    // ------------------------------
    var startEvent = 'click';

    if ( isMobile ) {

      player.one(startEvent, function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
        log('live - start : sp/player', new Date());
      });

    } else {

      setTimeout(function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
        log('live - start : pc', new Date());
        return false;
      }, 500);

    }


    // events - default
    // ------------------------------
    player.on('play', function() {
      playerState = 'play';
      if ( isPlayed === false ) {
        isPlayed = true;
        ga('send', 'event', 'live', 'begin', data.video.source , 0, {nonInteraction: true} );
      }

      log('live - play', new Date());
    });

    player.on('pause', function() {
      playerState  = 'pause';
      log('live - pause');
    });

    player.on('waiting', function() {
      if ( playerState === 'progress' ) {
        playerState      = 'waiting';
        playerResetTimer = setTimeout(function() {
          isAdPlayed = true;
          clearInterval(playerStateInterval);
          reset();
          initVideo( data );
        }, 30000);
      }
      log('live - waiting');
    });


    player.on('progress', function() {
      playerState  = 'progress';
      // log('live - progress');
    });


    player.on('ended', function() {
      playerState = 'ended';
      ga('send', 'event', 'live', 'complete', data.video.source , 0, {nonInteraction: true} );
      log('live - ended');
    });


    player.on('error', function() {
      playerState = 'error';
      log('live - error');
      log('live - networkState', this.player().networkState());

      var error = this.player().error();

      if ( error ) {
        ga('send', 'event', 'live', 'error', error.code + ' | ' + error.type + ' | ' +  error.message + ' | ' + navigator.userAgent , 0, {nonInteraction: true} );
      }
    });


    // events - ad
    // ------------------------------
    player.on('adsready', function() {
      playerState = 'adsready';
      ga('send', 'event', 'live', 'adsready', ad_url , 0, {nonInteraction: true} );
      log('live - adsready', player.ads);
    });

    player.on('adstart', function() {
      playerState = 'adstart';
      isAdStarted = true;
      player.volume(1);
      log('live - adstart', player.ads);
    });

    player.on('adend', function() {
      playerState = 'adend';
      isAdPlayed  = true;
      player.play();
      ga('send', 'event', 'live', 'adend', ad_url , 0, {nonInteraction: true} );
      log('live - adend', player.ads);
    });


    // check state
    // ------------------------------
    playerStateInterval = setInterval(function() {

      var adRemainingTime = 0;

      // 強制再読込のリセット
      if ( playerState !== 'waiting' ) {
        clearTimeout(playerResetTimer);
      }

      // iOSで広告終了後にadend取得できない場合に、広告の残時間を判定して再生させる
      if ( isAdStarted && player.ima.adsManager ) {
        if ( isAdPlayed === false && player.ima.adsManager.getRemainingTime() < 0 ) {
          isAdPlayed = true;
          player.ima.startFromReadyCallback();
          log('live - adend by getRemainingTime');
        }

        adRemainingTime = player.ima.adsManager.getRemainingTime();
      }

      // 本編再生中に `playsinline` なら video.jsのcontrols非表示
      if ( isAdPlayed && contentPlayer.hasAttribute('playsinline') ) {
        $embed.find('.vjs-control-bar').hide();
      }

      log('live - state/interval', playerState + ' | currentTime - ' + player.currentTime() + ' | ad ReminingTime - ' +  adRemainingTime);

    }, 3000);

    log('live - initVideo / default', data);
  }


})(jQuery);
</script>
