<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true" data-orientation="true"></script>
  <script src="/assets/js/detector.js" id="detector" data-chrome="48" data-safari="9" data-firefox="44" data-ie="11" data-edge="13" data-ios="8.41" data-android="4.2" data-url="/about/browsers/"></script>
  <title><?php echo ( isset($page['title']) ) ? $page['title'].' | 運動通信' : '運動通信'; ?></title>
  <meta name="description" content="説明文">
  <meta name="keywords" content="キーワード, キーワード, キーワード">

  <meta property="og:title" content="<?php echo ( isset($page['title']) ) ? $page['title'].' | 運動通信' : '運動通信'; ?>">
  <meta property="og:type" content="<?php echo ( isset($page['og_type']) ) ? $page['og_type'] : 'article'; ?>">
  <meta property="og:image" content="http://www.undotsushin.com/img/common/sns.png">
  <meta property="og:url" content="http://www.undotsushin.com/">
  <meta property="og:description" content="説明文">

  <link rel="shortcut icon" href="/favicon.ico">
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
  <script src="/assets/js/bundle/main.bundle.js"></script>
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
        <div class="head-search">
          <a class="head-search-btn" href="#">検索する</a>
        </div><!-- /.head-search -->

        <div id="user-profile-container"></div><!--/header-user-->
      </aside>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <nav id="global-nav-container" class="gnav-sec">
    <ul>
      <li id="home" class="gnav-home"><a href="/">一面</a></li>
      <?php if (0) : ?>
        <li class="gnav-crazy"><a href="/crazy/"><img src="/assets/images/common/gnav-crazy.png" alt="CRAZY"></a></li>
      <?php endif;// crazy remove ?>
      <li id="all" class="gnav-all"><a href="/category/all/">すべて</a></li>
      <?php foreach( $page[ 'site_categories' ] as $category ) { ?>
        <li id="<?php echo $category[ 'slug' ]; ?>" class="gnav-<?php echo $category[ 'slug' ]; ?>">
          <a href="/category/<?php echo $category[ 'slug' ]; ?>/"><?php echo $category[ 'label' ]; ?></a>
        </li>
      <?php }//foreach ?>
    </ul>
  </nav><!-- /.gnav-sec -->
</div>
<?php
endif;
// header 表示条件 end
?>