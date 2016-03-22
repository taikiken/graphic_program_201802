<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo ( isset($page['og_type']) ) ? $page['og_type'] : 'article'; ?>: http://ogp.me/ns/<?php echo ( isset($page['og_type']) ) ? $page['og_type'] : 'article'; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true" data-orientation="true"></script>
  <?php
  # ---------------------------------------------------------------------------
  // browser 使用条件 URL
  $about_browser = '/about/browsers/';
  $current_path = parse_url($_SERVER["REQUEST_URI"])['path'];
  if ( $about_browser != $current_path ) {
    // browser 使用条件 URL と同じだったら detector.js 読み込まない
    ?>
  <script src="/assets/js/detector.js" id="detector" data-chrome="48" data-safari="9" data-firefox="44" data-ie="11" data-edge="13" data-ios="8.41" data-android="4.2" data-url="<?php echo $about_browser; ?>"></script>
  <?php }// browser 使用条件 end
  # ---------------------------------------------------------------------------
  ?>
  <title><?php echo ( isset($page['title']) ) ? $page['title'].' | 運動通信' : '運動通信'; ?></title>
  <meta name="description" content="説明文">
  <meta name="keywords" content="キーワード, キーワード, キーワード">

  <!-- sns ogp -->
  <meta property="og:title" content="<?php echo ( isset($page['title']) ) ? $page['title'].' | 運動通信' : '運動通信'; ?>">
  <meta property="og:type" content="<?php echo ( isset($page['og_type']) ) ? $page['og_type'] : 'article'; ?>">
  <meta property="og:image" content="https://undotsushin.com/assets/images/common/og_image.png">
  <meta property="og:url" content="https://www.undotsushin.com/">
  <meta property="og:description" content="説明文">

  <!-- twitter card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@undotsushin">

  <!-- favicon -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/images/common/favicon.ico">

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
  <script src="/assets/js/bundle/main.bundle.js?syn=1"></script>
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
        <li id="all" class="gnav-all"><a href="/category/all/">すべて</a></li>
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