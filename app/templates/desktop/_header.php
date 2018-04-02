<?php if ( $page['conditional']['html_start'] ) : ?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
<?php endif; ?>


<?php
if ( $page['conditional']['head'] ) :
  include_once __DIR__."/../_head.php";
endif;
?>


<?php if ( $page['conditional']['head_assets'] ) : ?>
  <?php if(count($page['photo']) > 0):?>
    <link rel="stylesheet" href="/assets/css/style_pc.css?v=<?php echo $page['version']; ?>">
    <script src="/assets/js/libs.js?v=<?php echo $page['version']; ?>"></script>
  <?php endif;?>

  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
<?php endif; ?>


<?php
if ( $page['conditional']['head_bottom'] ) :
  include_once __DIR__."/../_head_bottom.php";
endif;
?>


<?php if ( $page['conditional']['head_video'] ) :
  include_once __DIR__."/_head_video.php";
endif;
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
if ( $template_name == 'p' ) {

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
      <li id="home" class="gnav-home"><a href="/">TOP</a></li>

      <?php foreach( $page['site_tabs'] as $tab ) {
        // https://github.com/undotsushin/undotsushin/issues/645#issuecomment-224162616
        // タブの表示順はAPI通りにする
        ?>
        <li id="<?php echo $tab['slug']; ?>" class="gnav-<?php echo $tab['slug']; ?>">
          <a href="/category/<?php echo $tab['slug']; ?>/"><?php echo $tab['label']; ?></a>
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
  // since 2017-12-18
  // お知らせ表示
  // ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
  ?>
  <div id="js-announce-container"></div>
<?php
endif;
// header 表示条件 end
?>