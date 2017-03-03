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

  #mainContainer {
    border: 1px #fff solid;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0;
    margin: 0;
    padding-top: 30px;
    position: relative;
    width:100%;
  }

  #single-visual-container{
    box-sizing: border-box;
  }
  .vjs-poster{
    display: none !important;
  }
  .video-js{
    background-color: #fff !important;
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
    controls preload="auto" width="640" height="360">
    <source
      src=""
      type="application/x-mpegURL"></source>
  </video>
</script>

<script src="https://code.jquery.com/jquery-git.min.js"></script>
<script>
(function($){

  var $embed        = $('.js-live');
  var $tmpl_video   = $('#live-streaming__video').html();
  var interval      = 3000;
  var isPlaying     = null;

  var intervalTimer = window.setInterval(function() {

    $.ajax({
      url      : '/api/big6tv/live',
      type     : 'get',
      dataType : 'json',
      cache    : true,
      data : {
        cache : Math.random()
      }
    })
    .done(function (data) {

      var response = data.response.live;

      if ( isPlaying !== response.isPlaying ) {

        isPlaying = response.isPlaying;

        if ( isPlaying ) {
          reset();
          initVideo( response );
        } else {
          reset();
          initAlt( response );
        }

      }

    })
    .fail(function () {
      console.log('fail');
    });

  }, interval);


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
    console.log('reset');
  }


  /**
  * プレイヤー部分にalt画像を表示する
  */
  function initAlt( data ) {
    $embed.css('background-image','url(' + data.alt.large + ')');
    console.log('initAlt', data.alt.large);
  }


  /**
  * プレイヤー部分にvideoタグを出力する
  */
  function initVideo( data ) {
    $embed.html( $tmpl_video );
    $embed.find('video').attr('poster', data.alt.large );
    $embed.find('source').attr('src', data.video.source );

    var player = videojs('content_video');

    var options = {
      id          : 'content_video',
      adTagUrl    : data.video.ad,
      requestMode : 'ondemand'
    };

    if ( data.video.ad ) {
      player.ima(options);
    }

    var contentPlayer =  document.getElementById('content_video_html5_api');
    if ((navigator.userAgent.match(/iPad/i) ||
          navigator.userAgent.match(/Android/i)) &&
        contentPlayer.hasAttribute('controls')) {
      contentPlayer.removeAttribute('controls');
    }

    var startEvent = 'click';
    if (navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)) {
      startEvent = 'touchend';
    }

    player.one(startEvent, function() {
      if ( data.video.ad ) {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
      }
      player.play();
    });

    player.on('play', function() {
      console.log('Play Video');
    });

    player.on('pause', function() {
      console.log('Pause Video');
    });

    player.on('ended', function() {
      console.log('End Video');
    });

    player.on('adsready', function() {
      console.log('adsready');
    });

    // TODO
    // エラー捕捉してごめんなさい画像出す
    // ごめんなさい画像は準備中

    console.log('initVideo', data);
  }


})(jQuery);
</script>
