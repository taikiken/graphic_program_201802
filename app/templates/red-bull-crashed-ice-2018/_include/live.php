<?php
/*

# LIVE配信モジュール

*/

$live = array(
  // liveAPIのエンドポイント
  // https://aws-plus.backlog.jp/view/UNDO_SPBL-479#comment-1190993637
  'endpoint' => UT_ENV !== 'PRODUCTION' ? "'https://dev-img.sportsbull.jp/static/crashedice/live.json'" : "'https://img.sportsbull.jp/static/crashedice/live.json'"
);

?>
<script>
<?php // /assets/player/js/vplayer.js 内で利用するプレイヤーAPIのエンドポイント ?>
window.PLAYER_API_ENDPOINT = <?php echo $live['endpoint']; ?>;
</script>

<div class="live-streaming__container">
  <div class="live-streaming js-live <?php echo ( $page['ua'] == 'desktop' ) ? 'live-streaming--pc' : 'live-streaming--sp'; ?>"></div><!-- /.live-streaming -->
</div><!-- /.live-streaming__container -->

<!-- video.js -->
<script src="//cdnjs.cloudflare.com/ajax/libs/video.js/5.19.1/video.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.5.0/videojs-contrib-hls.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/videojs-resolution-switcher/0.4.2/videojs-resolution-switcher.js"></script>
<!-- //video.js -->

<!-- ads - sdk -->
<script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
<!-- //ads - sdk -->

<!-- ads - ad -->
<script src="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/5.0.3/videojs.ads.js"></script>
<!-- //ads - ad -->

<!-- ads - ima -->
<link href="//cdnjs.cloudflare.com/ajax/libs/videojs-ima/0.5.0/videojs.ima.min.css" rel="stylesheet" />
<script src="//cdnjs.cloudflare.com/ajax/libs/videojs-ima/0.5.0/videojs.ima.js"></script>
<!-- //ads - ima -->

<!-- Player original CSS-->
<link href="//cdnjs.cloudflare.com/ajax/libs/video.js/5.19.1/video-js.css" rel="stylesheet">
<!-- Video switcher CSS -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/videojs-resolution-switcher/0.4.2/videojs-resolution-switcher.css">
<!-- Google IMA CSS -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/5.0.3/videojs.ads.css" />
<!-- Player skin custom CSS -->
<link href="/stats/assets/univbb/css/videojs.custom.css" rel="stylesheet">
<!-- Player skin custom CSS for Ads -->
<link rel="stylesheet" href="/stats/assets/univbb/css/videojs.ima.css" />
<link rel="stylesheet" href="/stats/assets/univbb/css/video.css" />

<script src="/assets/player/js/libs.js"></script>
<script src="/assets/player/js/videojs.ga.js"></script>
<script src="/assets/player/js/vplayer_red-bull-crashed-ice-2018.js"></script>

<div id="liveVideo">
  <p class="video_alt"></p>
  <div class="video__wrapper">
    <video id="content_video" class="video-js vjs-default-skin" preload="none" controls playsinline></video>
  </div>
</div>
