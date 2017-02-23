<?php
/*

# LIVE配信モジュール

- カテゴリー情報APIの `live` にAPIのエンドポイントがあるなら以下を読み込む
- ['live']['isPlaying'] == 1 ならプレイヤーを表示 / 0 なら alt画像を表示する

*/
?>

<?php

// 配信中なら
if ( $page['big6tv']['liveData']['live']['isPlaying'] == '1' ) :

?>

<div class="live-streaming">
  <video
    id="content_video"
    class="video-js vjs-default-skin"
    poster="<?php echo $page['big6tv']['liveData']['live']['alt']['large']; ?>"
    controls preload="auto" width="640" height="360">
    <source
      src="<?php echo $page['big6tv']['liveData']['live']['video']['source']; ?>"
      type="application/x-mpegURL"></source>
  </video>
</div><!-- /.live-streaming -->


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

ライブ部分幅フィット

*/
?>
<style>
  .live-streaming {
    position: relative;
    height: 0;
    padding-top: 56.25%;
    z-index: 1;
  }

  #content_video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>


<?php
/*

streampack初期化コード

*/
?>
<script>
// videojsを初期化する: videojs(ID_VIDEO_TAG)
var player = videojs('content_video');

// IMAのオプションを宣言する。
// id: ID video tag
// adTagUrl: URLは広告動画の内容、動画のルール(動画の前、後、間に表示)を格納します。Undotsushinプロジェクトの場合には、ＤＢから取得されます。
var options = {
    id: 'content_video',
    adTagUrl: '<?php echo $page['big6tv']['liveData']['live']['video']['ad']; ?>',
    requestMode : 'ondemand'
};

player.ima(options);

// 携帯電話に各制御を押します。
var contentPlayer =  document.getElementById('content_video_html5_api');
if ((navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)) &&
    contentPlayer.hasAttribute('controls')) {
  contentPlayer.removeAttribute('controls');
}

// 動画再生をクリックして、広告を初期化しますが、初めて動画を再生する時だけに適用します。
var startEvent = 'click';
if (navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i)) {
  startEvent = 'touchend';
}

player.one(startEvent, function() {
    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();
    player.play();
});

// 動画再生のイベントを聞き入れます。
player.on('play', function() {
    console.log('Play Video');
});

// 動画一時停止のイベントを聞き入れます。
player.on('pause', function() {
    console.log('Pause Video');
});
// 動画完了のイベントを聞き入れます。
player.on('ended', function() {
    console.log('End Video');
});

// 広告が準備できたイベントを聞き入れます。
player.on('adsready', function() {
    console.log('adsready');
});
</script>


<?php

// 配信してないならposter画像のみ表示
else :

?>

<div class="live-streaming" style="background:url(<?php echo $page['big6tv']['liveData']['live']['alt']['large']; ?>) center center no-repeat; background-size: cover;">
</div><!-- /.live-streaming -->

<?php endif; ?>