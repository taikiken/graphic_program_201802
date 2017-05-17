<?php
/*

# LIVE配信モジュール

- カテゴリー情報APIの `live` にAPIのエンドポイントがあるなら以下を読み込む
- ['live']['isPlaying'] == 1 ならプレイヤーを表示 / 0 なら alt画像を表示する

*/
?>

<style>
.live-streaming {
  position: relative;
  height: 0;
  padding-top: 56.25%;
  z-index: 1;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

#content_video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<div class="live-streaming js-live"></div><!-- /.live-streaming -->
<p class="live-streaming-note">正常に再生されない、音飛びなどが発生する場合は、再読み込みをしてください。</p>


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

<!--link rel="stylesheet" href="/assets/ima_plugin/css/ima-style.css" /-->


<style>
  .video-js {
    outline: none;
  }
  .video-js .vjs-big-play-button {
    z-index: 9999;
    top: 50%;
    left: 50%;
    margin-left: -45px;
    margin-top: -22.5px;
  }
  .video-js .vjs-live-display {
    line-height: 3;
  }
  .video-js .vjs-audio-button {
    display: none;
  }

  /* #iOS インライン再生中のローディング非表示 */
  .video-js.vjs-ad-playing .vjs-loading-spinner {
    display: none;
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
    preload="auto"
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
  var interval        = <?php echo ( $page['category']['live_interval'] ) ? $page['category']['live_interval'] : 10 ; ?> * 1000; // polling感覚
  var liveEndPoint    = '<?php echo ( $page['category']['live'] ) ? $page['category']['live'] : '/api/big6tv/live'; ?>';

  var video_isPlaying = null;
  var video_source    = '';

  var isPlayed        = false;
  var isAdPlayed      = false;
  var isAdStarted     = false;
  var isAndroid       = false;

  // 初回実行
  var intervalTimer = window.setInterval( init, interval );
  init();

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
    })
    .always(function () {
      // log('live - ajax');
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
    $embed.html( $tmpl_video );
    $embed.find('video').attr('poster', data.alt.large );
    $embed.find('source').attr('src', data.video.source );

    var contentPlayer       = undefined;
    var playerState         = null;
    var playerStateInterval = null;
    var playerResetTimer    = null;

    // ad_url
    // ------------------------------
    var ad_url = '';

    // 広告再生済みなら再度広告設定はしない
    if ( !isAdPlayed && data.video.ad_url ) {
      ad_url = <?php echo ( $page['ua'] == 'desktop' ) ? 'data.video.ad_url.pc' : 'data.video.ad_url.sp'; ?>;

      // advantage広告タグ用 - URLの末尾が `page=` ならtimestampを付与してリクエストする
      if ( ad_url !== '') {
        var date = new Date() ;
        if ( ad_url.match(/page=$/) ) {
          ad_url += date.getTime();
        }
      }
    }


    // player
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

    // ima
    var options = {
      adLabel          : '広告',
      id               : 'content_video',
      adTagUrl         : ad_url,
      requestMode      : 'ondemand',
      prerollTimeout   : 50000,
      debug            : true
    };

    player.ima(options);
    player.ads.videoElementRecycled = function() {
      return;
    }
    log('player.ima', player.ima);


    // controls
    if ( ( navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) ) && contentPlayer.hasAttribute('controls') ) {
      contentPlayer.removeAttribute('controls');
    }


    // bind
    var startEvent = 'click';
    var isMobile   = false;

    if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) {
      isMobile   = true;
      startEvent = 'touchend';

      if ( navigator.userAgent.match(/Android/i) ) {
        isAndroid  = true;
      }
    }


    if ( isMobile ) {

      player.one(startEvent, function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
        log('live - start : sp', new Date());
      });

    } else {

      setTimeout(function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
        log('live - start : pc', new Date());
      }, 500);

    }

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

    player.on('error', function() {
      playerState = 'error';
      log('live - error');
      log('live - networkState', this.player().networkState());

      var error = this.player().error();

      reset();
      initAlt( data.error.large );

      if ( error ) {
        ga('send', 'event', 'live', 'error', error.code + ' | ' + error.type + ' | ' +  error.message + ' | ' + navigator.userAgent , 0, {nonInteraction: true} );
      }

      if ( isAndroid ) {
        isAdPlayed = true;
        initVideo( data );
      }

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
      if ( isAdStarted ) {
        if ( isAdPlayed === false && player.ima.adsManager.getRemainingTime() < 0 ) {
          isAdPlayed = true;
          player.ima.startFromReadyCallback();
          // player.ima.adsManager.stop();
          // player.ima.adsManager.destroy();
          // player.play();
          log('live - adend by getRemainingTime');
        }

        adRemainingTime = player.ima.adsManager.getRemainingTime();
      }

      // 本編再生中に `playsinline` なら video.jsのcontrols非表示
      if ( isAdPlayed && contentPlayer.hasAttribute('playsinline') ) {
        $embed.find('.vjs-control-bar').hide();
      }

      log('live - state/interval', playerState + ' | currentTime - ' + player.currentTime() + ' | ad ReminingTime - ' +  adRemainingTime);

    }, 1000);

    log('live - initVideo', data);
  }


})(jQuery);
</script>
