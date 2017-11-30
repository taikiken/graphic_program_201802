<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">


<?php include_once __DIR__."/../_head.php"; ?>

<?php if(count($page['photo']) > 0):?>
  <link rel="stylesheet" href="/assets/css/style_pc.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs.js?v=<?php echo $page['version']; ?>"></script>
<?php endif;?>
  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

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
   ga('require', 'GTM-KJ33JM9');
   ga('require', 'linkid');
   ga('require', 'displayfeatures');
   ga('send', 'pageview');

  </script>

<?php
// video.js 読み込み
include_once __DIR__.'/_header_video.php';
?>

<?php
// header 表示条件 & template_classname に使用する template 名称を $template_name へ
$template_name = $page['template'];

// .whole へ追加する CSS class を設定します
$whole_classes = array();

// $page['template_classname'] に設定されている CSS class を追加します
if ( !empty( $page['template_classname'] ) ) {
  $whole_classes[] = $page['template_classname'];
}
// 記事詳細
if ( $template_name == 'p' || $template_name == 'comment' ) {

  // 記事詳細へ識別 CSS class 追加
  $whole_classes[] = 'post-single';

  // theme 設定 class を追加
  // JSON レスポンスの theme.base を CSS class へ追加します
  if ( $page['theme']['base'] ) {
    $whole_classes[] = $page['theme']['base'];
  }
}

// in category
if ( $template_name == 'category' ) {

    //crazy athletes除外
    if($page['category']['slug'] != 'crazy') {
      // @since 2016-09-01
      // https://github.com/undotsushin/undotsushin/issues/1053
      $whole_classes[] = 'layout-list';
      // ---[end 2016-09-01]---

      // template_classname があれば
      if ( !empty($page['template_classname']) && !in_array($page['template_classname'], $whole_classes) ) {
        $whole_classes[] = $page['template_classname'];
      }

  // @see https://github.com/undotsushin/undotsushin/issues/1891#issuecomment-298291706
  // @since 2017-05-08 - category slug を追加する
        $whole_classes[] = $page['category']['slug'];
    }
} elseif ( $template_name == 'search' ) {
  // @since 2016-09-01
  // https://github.com/undotsushin/undotsushin/issues/1053
  $whole_classes[] = 'layout-list';
  // ---[end 2016-09-01]---
} elseif ( $template_name == 'index' ) {
  // @since 2016-09-01
  // https://github.com/undotsushin/undotsushin/issues/1053
  $whole_classes[] = 'home';
  // ---[end 2016-09-01]---
} elseif ( $template_name == 'p' ) {
  // @since 2016-09-30
  $whole_classes[] = 'layout-detail';
  // 記事詳細 `big6tv` の時に `theme_big6` を whole へ追加する
  // @since 2017-03-24
  $page_category = $page['category'];
  if (isset($page_category) && $page_category['slug'] == 'big6tv' && !in_array('theme_big6', $whole_classes)) {
    $whole_classes[] = 'theme_big6';
  }

  // @see https://github.com/undotsushin/undotsushin/issues/1891#issuecomment-298291706
  // @since 2017-05-08 - category slug を追加する
    if($page_category['slug'] != 'crazy')
    {
        $whole_classes[] = $page_category['slug'];
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
  $template_name == 'logout' ||
  $template_name == 'crazy'
) :
?>
  <header id="header-container" class="head-sec">
    <div class="head-sec-inner">
      <aside class="f-left clearfix">
        <div id="head-search-container"></div><!-- /.head-search -->
      </aside>

      <h1><a href="/">スポーツブル（スポブル）</a></h1>

      <aside class="f-right clearfix">
        <div id="user-profile-container"></div><!--/.user-profile-container-->
      </aside>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <nav id="global-nav-container" class="gnav-sec">
    <ul>
      <li id="home" class="gnav-home"><a href="/">一面</a></li>

      <?php foreach( $page['site_categories'] as $category ) {
        // https://github.com/undotsushin/undotsushin/issues/645#issuecomment-224162616
        // タブの表示順はAPI通りにする
        ?>
        <li id="<?php echo $category['slug']; ?>" class="gnav-<?php echo $category['slug']; ?>">
          <a href="/category/<?php echo $category['slug']; ?>/"><?php echo $category['label']; ?></a>
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
