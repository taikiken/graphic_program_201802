<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo ( isset($page['og_type']) ) ? $page['og_type'] : 'article'; ?>: http://ogp.me/ns/<?php echo ( isset($page['og_type']) ) ? $page['og_type'] : 'article'; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true" data-orientation="true"></script>
  <?php
  # ---------------------------------------------------------------------------
  // browser 使用条件 URL
  $about_browser = '/about/browsers/';
  $current_path = parse_url($_SERVER["REQUEST_URI"])['path'];
  if ( $about_browser != $current_path ) {
    // browser 使用条件 URL と同じだったら detector.js 読み込まない
    ?>
    <script src="/assets/js/detector.js" id="detector" data-chrome="48" data-safari="8" data-firefox="44" data-ie="11" data-edge="13" data-ios="8.41" data-android="4.2" data-url="<?php echo $about_browser; ?>"></script>
  <?php } else {
    // browser 使用条件 URL と同じなので html5shiv を読み込む
    ?>
    <!--[if lt IE 9]>
    <script src="/assets/js/libs/html5shiv/html5shiv.min.js"></script>
    <![endif]-->
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

  <?php if ( $page['canonical'] ) : ?>
  <link rel="canonical" href="<?php echo $page['site_url'].$page['canonical']; ?>">
  <?php endif; ?>

  <!-- favicon -->
  <link rel="shortcut icon" href="/assets/images/common/favicon.ico">
  
  <link rel="stylesheet" href="/assets/css/ui.css">
  <script src="/assets/js/libs/vendor.react.js"></script>
  <script src="/assets/js/bundle/main.bundle.js"></script>
</head>
<body>
<div class="whole <?php echo ($page['template_classname']) ? $page['template_classname'] : '';?>">
<?php
// header 表示条件 start
$template_name = $page['template'];

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
  <header class="head-sec">
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
