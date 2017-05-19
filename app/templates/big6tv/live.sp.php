<?php
/*

# LIVE配信モジュール - SP用

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
<?php include __DIR__.'/_sns.php'; ?>

<?php
/*

以下は streampack用のコード
( crazyの時にいつもheadでよんでるやつ )

*/
?>
<link href="//vjs.zencdn.net/5.3/video-js.min.css" rel="stylesheet">
<link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ads.css" />
<link rel="stylesheet" href="/assets/ima_plugin/css/videojs.ima.css" />
<link rel="stylesheet" href="/assets/ima_plugin/css/ima-style.css" />

<script src="//vjs.zencdn.net/5.3/video.min.js"></script>
<script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>

<script src="/assets/js/libs/hls/videojs-contrib-hls.min.js"></script>
<script src="/assets/ima_plugin/js/videojs.hls.js"></script>
<script src="/assets/ima_plugin/js/videojs.ads.js"></script>
<script src="/assets/ima_plugin/js/videojs.ima.js"></script>


<style>
  body.vjs-full-window {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  .video-js.vjs-fullscreen {
    position: fixed;
    overflow: hidden;
    z-index: 1000;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100% !important;
    height: 100% !important;
  }
  .video-js:-webkit-full-screen {
    width: 100% !important;
    height: 100% !important;
  }
  .video-js.vjs-fullscreen.vjs-user-inactive {
    cursor: none;
  }

  .vjs-poster {
    display: none !important;
  }

  .video-js .vjs-big-play-button {
    z-index: 9999;
    top: 50%;
    left: 50%;
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

  // 広告再生済みかどうか
  var isAdPlayed      = false;
  var isAndroid       = false;

  // 初回実行
  var intervalTimer = window.setInterval( init, interval );
  init();


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
      log('live - ajax');
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
    var player = videojs('content_video');
    var options = {
      id          : 'content_video',
      adTagUrl    : ad_url,
      requestMode : 'ondemand'
    };

    player.ima(options);

    var contentPlayer =  document.getElementById('content_video_html5_api');
    if ((navigator.userAgent.match(/iPad/i) ||
          navigator.userAgent.match(/Android/i)) &&
        contentPlayer.hasAttribute('controls')) {
      contentPlayer.removeAttribute('controls');
    }


    var startEvent = 'click';
    var isMobile   = false;

    if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) ) {
      isMobile   = true;
      $('#content_video_ima-controls-div').prev().hide();
      startEvent = 'click';
    }

    if ( navigator.userAgent.match(/Android/i) ) {
      isMobile   = true;
      isAndroid  = true;
      startEvent = 'touchend';
    }

    if ( isMobile ) {

      player.one(startEvent, function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
        log('live - play : sp');
      });

    } else {

      setTimeout(function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
        log('live - play : pc');
      }, 500);

    }

    player.on('play', function() {
      ga('send', 'event', 'live', 'begin', data.video.source , 0, {nonInteraction: true} );
      log('live - play');
    });

    player.on('pause', function() {
      log('live - pause');
    });

    player.on('ended', function() {
      ga('send', 'event', 'live', 'complete', data.video.source , 0, {nonInteraction: true} );
      log('live - ended');
    });

    player.on('adsready', function() {
      isAdPlayed = true;
      ga('send', 'event', 'live', 'adsready', ad_url , 0, {nonInteraction: true} );
      log('live - adsready');
    });

    player.on('error', function() {
      reset();
      initAlt( data.error.large );

      var error = this.player().error();

      if ( error ) {
        ga('send', 'event', 'live', 'error', error.code + ' | ' + error.type + ' | ' +  error.message + ' | ' + navigator.userAgent , 0, {nonInteraction: true} );
      }

      if ( isAndroid ) {
        isAdPlayed = true;
        initVideo( data );
      }

      log('live - error');
    });


    log('live - initVideo', data);
  }


})(jQuery);
</script>