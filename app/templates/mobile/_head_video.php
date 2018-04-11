<?php
// ---------------------------------------------------------------------------
// brightcove

// @since 2016-11-13
// 記事詳細・次の記事一覧のメインビジュアルを動画に変更
// 常に videojs 関連を読込む
//if ( $page['template'] == 'p' ) :

// @since 2016-01-13
// hotfix @see https://github.com/undotsushin/undotsushin/issues/1468
//if ( $page['template'] == 'p' && $page['post']['media']['video']['player'] == 'brightcove' ) :
if ( $page['template'] == 'p'
  && $page['post']['media']['video']['player'] == 'brightcove'
  && $page['post']['media_vk_refid'] == ''
) :
  // brightcove code をここに
  // JS で非同期で読み込むと付随コードの読み込みが行われない様子
  ?>

  <link href="//cdnjs.cloudflare.com/ajax/libs/video.js/5.19.1/video-js.css" rel="stylesheet">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/videojs-resolution-switcher/0.4.2/videojs-resolution-switcher.css">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/5.0.3/videojs.ads.css" />
  <link href="//iplay-demo.s3.amazonaws.com/samples/big6p/videojs.custom.css" rel="stylesheet">
  <link rel="stylesheet" href="//iplay-demo.s3.amazonaws.com/samples/big6p/videojs.ima.css" />

  <script src="//cdnjs.cloudflare.com/ajax/libs/video.js/5.19.1/video.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.5.0/videojs-contrib-hls.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/videojs-resolution-switcher/0.4.2/videojs-resolution-switcher.js"></script>

  <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/5.0.3/videojs.ads.js"></script>
  <script src="//iplay-demo.s3.amazonaws.com/samples/big6p/videojs.ima.js"></script>


<?php elseif($page['category']['slug'] == 'crazy'): ?>
<link rel="stylesheet" href="/assets/css/crazy.css">
<?php elseif($page['template'] == 'crazy'): ?>
<link rel="stylesheet" href="/assets/css/player.css">
<?php endif; ?>