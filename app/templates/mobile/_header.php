<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">


<?php include_once __DIR__."/../_head.php"; ?>


  <link rel="stylesheet" href="/assets/sp/css/ui.css">
  <?php
  // header 表示条件 設定
  $template_name = $page['template'];
  $page_has_header = false;

  if (
  $template_name == 'index' ||
  $template_name == '404' ||
  $template_name == 'category' ||
  $template_name == 'p' ||
  $template_name == 'comment' ||
  $template_name == 'search' ||
  $template_name == 'signup_login' ||
  $template_name == 'settings' ||
  $template_name == 'settings.social' ||
  $template_name == 'settings.account' ||
  $template_name == 'settings.interest' ||
  $template_name == 'settings.deactivate' ||
  $template_name == 'mypage' ||
  $template_name == 'mypage.activities' ||
  $template_name == 'notifications' ||
  $template_name == 'logout'
  ) {
    $page_has_header = true;
  }
  ?>
<?php
if ($page_has_header) :
# ---------------------------------------------------------------------------
# Syn. require module
?>
<script src="/assets/sp/js/libs/synapse/synapse.js"></script>
<script src="/assets/js/libs/jquery2/jquery.min.js"></script>
<script src="/assets/sp/js/libs/synapse/extras/jquery.inview.js"></script>
<?php
# end of Syn. require module
# ---------------------------------------------------------------------------
endif;
?>
  <script src="/assets/js/libs/vendor.react.js"></script>
  <?php
  /*
   Syn. menu end point 本番環境では
    ```
    /assets/js/bundle/main.bundle.js?syn=1
    ```
    ?syn=1 を削除してください
    テストの時はつけてください
   */
  ?>
  <script src="/assets/js/bundle/main.bundle.js"></script>

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
   ga('send', 'event', 'ua', 'view', navigator.userAgent );

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
    .video-js {
      width: 100%;
      height: auto;
    }
    .video-js video {
      width: 100%;
      height: auto;
    }
  </style>

  <script src="//players.brightcove.net/3948005094001/rJL6q0az_default/index.min.js"></script>
  <script src="//players.brightcove.net/videojs-ima3/videojs.ima3.min.js"></script>
  <script src="/assets/js/libs/hls/videojs-contrib-hls.min.js"></script>
  <?php
endif;
// eof brightcove
// ---------------------------------------------------------------------------
?>
</head>
<body>
<div id="page" class="whole <?php echo ($page['template_classname']) ? $page['template_classname'] : '';?>">
<?php
// header 表示条件 start
if ( $page_has_header ) :
?>
<div class="header-sticky">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">運動通信 CRAZY FOR SPORTS</a></h1>

      <div id="menu-opener" class="menu-opener">
        <a id="side-menu-toggle" href="#side-menu-container"><span></span><span></span><span></span></a>
      </div>

      <aside class="f-right clearfix">
        <span id="search-container-opener"></span>

        <div id="user-profile-container"></div><!--/header-user-->
      </aside>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->
  <div id="head-search-container"></div>
  <nav id="global-nav-container" class="gnav-sec">
    <div id="gnav-sec-inner" class="gnav-sec-inner">
      <ul id="gnav-sec-list">
        <li id="home" class="gnav-home"><a href="/">一面</a></li>
        <?php if (0) : ?>
          <li id="crazy" class="gnav-crazy"><a href="/crazy/"><img src="/assets/images/common/gnav-crazy.png" alt="CRAZY"></a></li>
        <?php endif;// crazy remove ?>
        <?php foreach( $page[ 'site_categories' ] as $category ) { ?>
          <li id="<?php echo $category[ 'slug' ]; ?>" class="gnav-<?php echo $category[ 'slug' ]; ?>">
            <a href="/category/<?php echo $category[ 'slug' ]; ?>/"><?php echo $category[ 'label' ]; ?></a>
          </li>
        <?php }//foreach ?>
      </ul>
    </div><!-- /.gnav-sec-inner -->
  </nav><!-- /.gnav-sec -->
<?php /*

  #205 - backend フラッシュメッセージ対応完までview側の表示コメントアウト

  <div class="dialogue-notice error">
    <div class="dialogue-notice-inner">
      <div class="dialogue-notice-info">
        <p>パスワードが違います</p>
      </div>
      <div class="dialogue-notice-btn-close"><a href="#">CLOSE</a></div>
    </div>
  </div><!-- /.dialogue-notice -->
*/?>
</div><!--/.header-sticky-->
<?php
endif;
// header 表示条件 end
?>