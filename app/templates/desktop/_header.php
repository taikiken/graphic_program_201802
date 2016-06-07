<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">


<?php include_once __DIR__."/../_head.php"; ?>


  <link rel="stylesheet" href="/assets/css/ui.css">
  <script src="/assets/js/libs/vendor.react.js"></script>
  <script src="/assets/js/bundle/main.bundle.js"></script>

  <script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    (function() {
      var gads = document.createElement('script');
      gads.async = true;
      gads.type = 'text/javascript';
      var useSSL = 'https:' == document.location.protocol;
      gads.src = (useSSL ? 'https:' : 'http:') +
        '//www.googletagservices.com/tag/js/gpt.js';
      var node = document.getElementsByTagName('script')[0];
      node.parentNode.insertBefore(gads, node);
    })();
  </script>

  <script>
   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

   ga('create', 'UA-74679267-1', 'auto');
   ga('require', 'linkid');
   ga('require', 'displayfeatures');
   ga('set', 'dimension1', navigator.userAgent);
   ga('send', 'pageview');

  </script>
<?php
// ---------------------------------------------------------------------------
// brightcove
if ( $page['template'] == 'p' && $page['category']['slug'] == 'crazy' ) :
  // brightcove code をここに
  // JS で非同期で読み込むと付随コードの読み込みが行われない様子
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

  <script src="//players.brightcove.net/3948005094001/rJL6q0az_default/index.min.js"></script>
  <script src="//players.brightcove.net/videojs-ima3/videojs.ima3.min.js"></script>
  <script src="/assets/js/libs/hls/videojs-contrib-hls.min.js"></script>
<?php
endif;
// eof brightcove
// ---------------------------------------------------------------------------

// header 表示条件 & template_classname に使用する template 名称を $template_name へ
$template_name = $page['template'];

// .whole へ追加する CSS class を設定します
$whole_classes = array();

// $page['template_classname'] に設定されている CSS class を追加します
if ( !empty( $page['template_classname'] ) ) {
  $whole_classes[] = $page['template_classname'];
}
// 記事詳細
if ( $template_name == 'p' ) {
  // 記事詳細へ識別 CSS class 追加
  $whole_classes[] = 'post-single';

  // theme 設定 class を追加
  // JSON レスポンスの theme.base を CSS class へ追加します
  if ( !empty( $page[ 'post' ][ 'theme' ][ 'base' ] ) ) {
    $whole_classes[] = $page[ 'post' ][ 'theme' ][ 'base' ];
  }
}

// in category
if ( $template_name == 'category' ) {
  // template_classname があれば
  if ( !empty($page['template_classname']) && !in_array($page['template_classname'], $whole_classes) ) {
    $whole_classes[] = $page[ 'template_classname' ];
  }
}
?>
</head>
<body>
<div id="whole" class="whole <?php echo join( ' ', $whole_classes);?>">
<?php
// header 表示条件
if (
  $template_name == 'index' ||
  $template_name == '404' ||
  $template_name == 'category' ||
  $template_name == 'p' ||
  $template_name == 'comment' ||
  $template_name == 'search' ||
  $template_name == 'settings' ||
  $template_name == 'settings.social' ||
  $template_name == 'settings.account' ||
  $template_name == 'settings.interest' ||
  $template_name == 'settings.deactivate' ||
  $template_name == 'mypage' ||
  $template_name == 'mypage.activities' ||
  $template_name == 'notifications' ||
  $template_name == 'logout'
) :
?>
  <header id="header-container" class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">運動通信 CRAZY FOR SPORTS</a></h1>

      <aside class="f-right clearfix">
        <div id="head-search-container"></div><!-- /.head-search -->
        <div id="user-profile-container"></div><!--/header-user-->
      </aside>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <nav id="global-nav-container" class="gnav-sec">
    <ul>
      <li id="home" class="gnav-home"><a href="/">一面</a></li>

      <?php foreach( $page[ 'site_categories' ] as $category ) {
        // https://github.com/undotsushin/undotsushin/issues/645#issuecomment-224162616
        // タブの表示順はAPI通りにする
        ?>
        <li id="<?php echo $category[ 'slug' ]; ?>" class="gnav-<?php echo $category[ 'slug' ]; ?>">
          <a href="/category/<?php echo $category[ 'slug' ]; ?>/"><?php echo $category[ 'label' ]; ?></a>
        </li>
      <?php }//foreach ?>
    </ul>
  </nav><!-- /.gnav-sec -->

  <?php /*

  #205 - backend フラッシュメッセージ対応完までview側の表示コメントアウト

  <div id="dialogue-notice" class="dialogue-notice">
    <div class="dialogue-notice-inner">
      <div id="dialogue-notice-info" class="dialogue-notice-info">
        <p>パスワードが違います</p>
      </div>
      <div id="dialogue-notice-btn-close" class="dialogue-notice-btn-close"><a href="#dialogue-notice">CLOSE</a></div>
    </div>
  </div><!-- /.dialogue-notice -->

  */?>
<?php
endif;
// header 表示条件 end
?>
