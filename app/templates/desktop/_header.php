<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <title><?php echo ( isset($page['title']) ) ? $page['title'].' | 運動通信' : '運動通信'; ?></title>
  <meta name="description" content="説明文">
  <meta name="keywords" content="キーワード, キーワード, キーワード">

  <meta property="og:title" content="<?php echo ( isset($page['title']) ) ? $page['title'].' | 運動通信' : '運動通信'; ?>">
  <meta property="og:type" content="<?php echo ( isset($page['og_type']) ) ? $page['og_type'] : 'article'; ?>">
  <meta property="og:image" content="http://undotsushin.com/img/common/sns.png">
  <meta property="og:url" content="http://undotsushin.com/">
  <meta property="og:description" content="説明文">

  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="stylesheet" href="/assets/css/ui.css">
  <script src="/assets/js/libs/vendor.react.js"></script>
  <script src="/assets/js/bundle/main.bundle.js"></script>
</head>
<body>
<div class="whole">

  <header class="head-sec">
      <div class="head-sec-inner">
        <h1><a href="/">運動通信 CRAZY FOR SPORTS</a></h1>

        <aside class="f-right clearfix">
          <div id="head-search-container" class="head-search"></div><!-- /.head-search -->

          <div id="user-profile-container"></div><!--/header-user-->

        </aside>
      </div><!-- /.head-sec-inner -->
    </header><!-- /.head-sec -->

  <nav id="global-nav-container" class="gnav-sec">
    <ul>
      <li class="gnav-home"><a href="/">一面</a></li>
<?php if (0) : ?>
      <li class="gnav-crazy"><a href="/crazy/"><img src="/assets/images/common/gnav-crazy.png" alt="CRAZY"></a></li>
<?php endif;// crazy remove ?>
      <li class="gnav-all"><a href="/category/all/">すべて</a></li>
      <?php foreach( $page[ 'site_categories' ] as $category ) { ?>
        <li class="gnav-<?php echo $category[ 'slug' ]; ?>">
          <a href="/category/<?php echo $category[ 'slug' ]; ?>/"><?php echo $category[ 'label' ]; ?></a>
        </li>
      <?php }//foreach ?>
    </ul>
  </nav><!-- /.gnav-sec -->

  <div id="dialogue-notice" class="dialogue-notice">
    <div class="dialogue-notice-inner">
      <div id="dialogue-notice-info" class="dialogue-notice-info">
        <p>パスワードが違います</p>
      </div>
      <div id="dialogue-notice-btn-close" class="dialogue-notice-btn-close"><a href="#dialogue-notice">CLOSE</a></div>
    </div>
  </div><!-- /.dialogue-notice -->
