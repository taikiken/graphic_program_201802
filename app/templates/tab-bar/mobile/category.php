<?php
/**
 * 競技・種目 ページ - mobile
 * @since 2018-04-11
 */
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">


  <?php include_once __DIR__."/../../_head.php"; ?>

  <?php if(count($page['photo']) > 0):?>

    <link rel="stylesheet" href="/assets/css/style_sp.css?v=<?php echo $page['version']; ?>">
    <script src="/assets/js/libs.js?v=<?php echo $page['version']; ?>"></script>
  <?php endif;?>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
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
    $template_name == 'logout' ||
    $template_name == 'crazy'
  ) {
    $page_has_header = true;
  }
  ?>
  <?php
  if ($page_has_header) :
# ---------------------------------------------------------------------------
# Syn. require module
    ?>
    <script src="/assets/sp/js/libs/synapse/synapse.js?v=<?php echo $page['version']; ?>"></script>
    <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>
    <script src="/assets/sp/js/libs/synapse/extras/jquery.inview.js?v=<?php echo $page['version']; ?>"></script>
  <?php
# end of Syn. require module
# ---------------------------------------------------------------------------
  endif;
  ?>
  <?php
  // app webview を UA 判定する JS を追加します - `app_ua_detector.bundle.js`
  // @since 2017-08-21
  ?>
  <script src="/assets/js/app_ua_detector.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
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
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <?php include_once __DIR__.'/../../_head_bottom.php'; ?>

  <?php
  // .whole へ追加する CSS class を設定します
  $whole_classes = array();

  // $page['template_classname'] に設定されている CSS class を追加します
  if ( !empty( $page['template_classname'] ) ) {
    $whole_classes[] = $page['template_classname'];
  }
  // 記事詳細
  if ( $page['template'] == 'p' || $page['template'] == 'comment') {
    // 記事詳細へ識別 CSS class 追加
    $whole_classes[] = 'post-single';

    // theme 設定 class を追加
    // JSON レスポンスの theme.base を CSS class へ追加します
    if ( $page['theme' ]['base'] ) {
      $whole_classes[] = ['theme']['base'];
    }
  }

  // in category
  if ( $template_name == 'category' ) {
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
  } elseif ( $template_name == 'index' ) {
    // @since 2016-09-01
    // https://github.com/undotsushin/undotsushin/issues/1053
    $whole_classes[] = 'home';
    // ---[end 2016-09-01]---
  } elseif ( $template_name == 'p' ) {
    // @see https://github.com/undotsushin/undotsushin/issues/1891#issuecomment-298291706
    // @since 2017-05-08 - category slug を追加する
    $whole_classes[] = $page['category']['slug'];
  }
  ?>

</head>
<body>
<div id="page" class="whole <?php echo join( ' ', $whole_classes);?>">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1>速報・データ</h1>
    </div><!-- /.head-sec-inner -->
  </header>

<?php
// -----------------------------------------------------------------
// 速報・データ
// response['category']['parent']
// -----------------------------------------------------------------
include_once __DIR__."/../module/functions.php";

$tab_response = $page['tab_response'];
// 出力条件 [A]
if (isset($tab_response) && isset($tab_response['category']) && is_array($tab_response['category']['parent']) && count($tab_response['category']['parent'])) :
?>
<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">

      <?php
      // 出力ループ開始 [0]
      $categories = $tab_response['category']['parent'];
      foreach ($categories as $category) :
        $dispName = $category['dispName'];
        $dispSlug = tab_category_slug_by_label($dispName);
        $children = $category['child'];
        // データチェック [B]
        if (
          isset($dispName) &&
          isset($children) && is_array($children) && count($children)
        ) :

      ?>
        <div class="menu-container category-<?php echo $dispSlug; ?>">
          <h2 class="menu-heading"><?php echo $dispName; ?></h2>
          <ul class="menu-list">
        <?php
        // 出力ループ開始 [1] - 1 child
        foreach($children as $child) :
        ?>
          <li class="menu-item">
            <a href="<?php echo $child['link']; ?>" class="menu-item">
              <span class="menu-item-icon"><img src="<?php echo $child['icon']; ?>" alt=""></span>
              <span class="menu-item-label"><?php echo $child['dispName']; ?></span>
            </a>
          </li>
        <?php
        endforeach;
        // 出力ループ終了 [1]
        ?>
          </ul>
        </div><!-- /.menu-container -->
      <?php
        endif;
        // eof - データチェック [B]
      ?>
      <?php
      endforeach;
      // 出力ループ終了 [0]
      ?>
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->
<?php
endif;
// eof - 出力条件 [A]
// `isset($tab_response) && is_array($tab_response['parent']) && count($tab_response['parent'])`
?>
<?php
// 汎用 footer
include_once __DIR__."/../../mobile/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>