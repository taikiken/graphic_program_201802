  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <?php if ( $page['ua'] == 'mobile' ) : ?>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <?php endif; ?>

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

  <!-- app install banner -->
  <meta name="apple-itunes-app" content="app-id=1086719653">

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
  <?php
  /*
  home screen 登録 しても web app mode だと cookie を引きつけず link click で safari に移動し使いづらい
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  */
  ?>
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/images/common/favicon.ico">
