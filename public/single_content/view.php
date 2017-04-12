<?php
/**
 * 記事詳細「続きを読む」本文を iframe 化する - view(HTML)
 * User: @taikiken
 * Date: 2017/04/12
 * Time: 15:44
 * @see https://github.com/undotsushin/undotsushin/issues/1475#issuecomment-293174913
 * @see https://github.com/undotsushin/undotsushin/issues/1818
 */
// PC / SP 共用
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<?php
// copy from `/app/template/_head.php`
if ( $page['ua'] == 'mobile' ) : ?>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
<?php else : ?>
  <meta name="viewport" content="width=1280">
<?php endif; ?>
<title><?php echo strip_tags($page['title']).' | '.$page['site_name']; ?></title>

<meta name="keywords" content="<?php echo $page['keywords']; ?>">
<meta name="description" content="<?php echo $page['og_description']; ?>">
<link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">
<?php
// ---------------------------------------------
// copy from `/app/template/desktop/_header.php`
// vjs file
// サッカーカテゴリーではない -> ファイル読み込む
$categories = $page['post']['categories'];
$in_soccer = false;
foreach ($categories as $category) {
  if ($category['slug'] == 'soccer') {
    $in_soccer = true;
  }
}
if (!$in_soccer) :
  // サッカーカテゴリーではない
  if ($page['ua_device'] == 'desktop') :
?>
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
  </style>
  <?php endif;
  // desktop のみスタイル出力
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
  <?php
  if ($page['ua_device'] == 'desktop') :
  ?>
  <style type="text/css">
    #mainContainer{
      border: 1px #fff solid;
      box-sizing: border-box;
      overflow: hidden;
      padding: 30px 0 0 0;
      margin: 0;
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
    .vjs-big-play-button{
      z-index: 9999;
    }
  </style>
  <?php endif;
  // desktop のみスタイル出力
  ?>
<?php
endif;
// サッカーカテゴリーではない
// eof: vjs file
// ---------------------------------------------
?>
<?php
// ---------------------------------------------
// whole class
// .whole へ追加する CSS class を設定します
$whole_classes = array();

// $page['template_classname'] に設定されている CSS class を追加します
if ( !empty( $page['template_classname'] ) ) {
  $whole_classes[] = $page['template_classname'];
}

// 記事詳細へ識別 CSS class 追加
$whole_classes[] = 'post-single';

// theme 設定 class を追加
// JSON レスポンスの theme.base を CSS class へ追加します
if ( $page['theme']['base'] ) {
  $whole_classes[] = $page['theme']['base'];
}
?>
</head>
<body>
<div id="whole" class="<?php echo join( ' ', $whole_classes);?>">
  <div class="post-detail">
    <div class="post-content">
      <?php
      // -----------------[iframe body]-------------------
      ?>
<div class="single-iframe"><?php print_r($page['post']['body']); ?></div>
      <?php
      // -----------------[/iframe body]-------------------
      ?>
    </div><!--/.post-content-->
  </div><!--/.post-detail-->
</div>
<script>
  (function(window) {
    'use strict';
    const document = window.document;
    let prevHeight = -1;
    const resize = () => {
      const height = Math.ceil(Math.max(document.body.scrollHeight, document.documentElement.clientHeight, window.innerHeight || 0));
      if (prevHeight === height) {
        return;
      }
      prevHeight = height;
      window.parent.postMessage({
        height,
        id: <?php echo $page['post']['id'] ?>,
      }, '/');
    };
    const onResize = () => {
      resize();
    };
    const onLoad = () => {
      console.log('iFrame.onLoad id:', <?php echo $page['post']['id'] ?>);
      window.removeEventListener('load', onLoad);
      resize();
      document.body.addEventListener('resize', onResize, false);
    };
    window.addEventListener('load', onLoad, false);
  }(window));
</script>
</body>
</html>