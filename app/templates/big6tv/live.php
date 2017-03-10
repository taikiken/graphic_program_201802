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
  var interval      = 3000; // polling感覚
  var isPlaying     = null;

  var intervalTimer = window.setInterval(function() {

    $.ajax({
      url      : '/api/big6tv/live',
      type     : 'get',
      dataType : 'json',
      cache    : true, // jQueryのcache設定これじゃなかったっけ..
      data : {
        cache : Math.random() // cache効かないようなので意図的にパラメータつける
      }
    })
    .done(function (data) {

      var response      = data.response.live;
      var response_flag = false;

      // レスポンスのisPlayingがboolでもstringでも判定できるように
      if ( response.isPlaying == true || response.isPlaying == 'true' ) {
        response_flag = true;
      }

      if ( isPlaying !== response_flag ) {

        isPlaying = response_flag;

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
      console.log('live - ajax : fail');
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
    console.log('live - reset');
  }


  /**
  * プレイヤー部分にalt画像を表示する
  */
  function initAlt( data ) {
    // 単に中身の要素を空にして親要素の背景にposterおいてるだけ
    $embed.css('background-image','url(' + data.alt.large + ')');
    console.log('live - initAlt', data.alt.large);
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
    var ad_url = <?php echo ( $page['ua'] == 'desktop' ) ? 'data.video.ad_url.pc' : 'data.video.ad_url.sp'; ?>;

    // advantage広告タグ用 - URLの末尾が `page=` ならtimestampを付与してリクエストする
    if ( ad_url !== '') {
      var date = new Date() ;
      if ( ad_url.match(/page=$/) ) {
        ad_url += date.getTime();
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
    if (navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i)) {
      startEvent = 'touchend';
    }

    if ( startEvent == 'touchend' ) {

      player.one(startEvent, function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
        console.log('live - play : sp');
      });

    } else {

      setTimeout(function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
        console.log('live - play : pc');
      }, 1000);

    }

    player.on('play', function() {
      console.log('live - play');
    });

    player.on('pause', function() {
      console.log('live - pause');
    });

    player.on('ended', function() {
      console.log('live - ended');
    });

    player.on('adsready', function() {
      console.log('live - adsready');
    });

    // TODO
    // エラー捕捉してごめんなさい画像出す
    // ごめんなさい画像は準備中

    console.log('live - initVideo', data);
  }


})(jQuery);
</script>
