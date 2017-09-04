<?php
/**
 * [DESKTOP]
 * 地域別記事機能 / 概要 #2318
 * @see https://github.com/undotsushin/undotsushin/issues/2318
 * author: @taikiken
 * Date: 2017/09/04
 * Time: 19:30
 */

// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
include_once __DIR__.'/../desktop/_category-heading.php';

?>

<div class="body-sec">
  <?php
  // ----------------------------------------------------
  // 冒頭画像
  // 記事一覧: pc theme.images
  if ( $page['theme']['images']['pc'] ) : ?>
    <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page[ 'theme' ][ 'background_color' ] : ''; ?>">
      <h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['pc']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
    </div>
    <?php
  endif;
  // eof: 記事一覧: pc theme.images
  // ---------------------------------------------------- ?>

  <?php
  // 2. ピックアップが設定できる
  ?>
  <div id="pickup-container"></div>

  <div class="body-sec-inner">
    <section class="main-sec">

      XXXXXXXXXXXXXXXXXXXXXXXX

    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/../desktop/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->