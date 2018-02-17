<?php
/**
 * パラボード 日程一覧 - desktop
 * @since 2018-01-30
 */
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">

<?php include_once __DIR__."/../../_head.php"; ?>

  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php include_once __DIR__.'/../../_head_bottom.php'; ?>


<?php
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
include_once __DIR__.'../../desktop/_category-heading.php';
?>

<?php
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
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

<div class="body-sec">
  <div class="special-summary">
    <h1 class="special-summary-heading"><img src="/assets/images/para-board/special-summary.jpg" alt="パラボード"></h1>
  </div>

  <div class="body-sec-inner">

    <?php
    // form
    $para_schedule_id = 0;
    $para_schedule_year_index = 0;
    // form
    include_once __DIR__ . '/_index_form.php';
    // list
    $para_query_option = 'recent';
    include_once __DIR__ . '/_index_list.php';
    ?>

  </div>

</div>
<script>
(function(window) {
  'use strict';
  var UT = window.UT;
  var SPBL_ENV = window.SPBL_ENV || {};
  UT.ui.NavCurrent.init(SPBL_ENV.category, SPBL_ENV.platform === 'web_mobile');
}(window));
</script>

<?php
// 汎用 footer
include_once __DIR__."/../../desktop/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>

