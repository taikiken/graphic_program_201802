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
  <link href="//vjs.zencdn.net/5.3/video-js.min.css" rel="stylesheet">
  <link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/assets/ima_plugin/css/videojs.ads.css" />
  <link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/assets/ima_plugin/css/videojs.ima.css" />
  <link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/assets/ima_plugin/css/ima-style.css" />

  <script src="//vjs.zencdn.net/5.3/video.min.js"></script>
  <script src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>

  <script src="<?php echo $page['site_url_uts']; ?>/assets/ima_plugin/js/videojs.hls.js"></script>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/ima_plugin/js/videojs.ads.js"></script>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/ima_plugin/js/videojs.ima.js"></script>

<?php elseif($page['category']['slug'] == 'crazy'): ?>
<link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/assets/css/crazy.css">
<?php elseif($page['template'] == 'crazy'): ?>
<link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/assets/css/player.css">
<?php endif; ?>