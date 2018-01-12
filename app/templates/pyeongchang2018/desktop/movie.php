<?php
/**
 * desktop: pyeongchang2018 専用 template - `/pyeongchang2018/movie/`
 * User: @taikiken
 * Date: 2017/12/21
 * Time: 17:52
 * ref: UNDO_SPBL-291 【バックエンド】平昌オリンピック対応 - ルーティング
 */
?>
<?php
// 汎用 header
include_once __DIR__."/../../desktop/_header.php";
?>
<?php
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
include_once __DIR__.'../../desktop/_category-heading.php';
?>
<div class="body-sec">

  <div class="body-sec-inner">

    <div class="special-summary">
      <h1 class="special-summary-heading"><img src="/assets/images/pyeongchang2018/special-summary.jpg" alt=""></h1>
    </div><!-- /.special-summary -->

    <section class="main-sec">
      <div class="board-large">
        <div id="js-pyeongchang-highlight-container"></div>
      </div><!-- /.board-large -->

      <div>広告バナー</div>

      <div id="js-headline"></div>

      <div class="mt20">
        <?php
        // medals
        include_once __DIR__ . '/../module/_pyeongchang2018_medals.php';
        ?>
      </div>

      <div class="gallery--photo">
        <header class="gallery__header">
          <h2 class="gallery__heading">フォトギャラリー</h2>
          <p class="gallery__link"><a href="/pyeongchang2018/photo/">すべてのフォトギャラリーを見る</a></p>
        </header><!-- /.gallery__header -->

        <div id="Widget_articles_tag-1" class="Widget_articles_tag" data-style="text" data-tag="平昌五輪2018フォトギャラリー" data-offset="0" data-length="4"></div>
      </div><!-- /.gallery--photo -->

      <div>広告バナー</div>
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/../../desktop/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->
  </div><!-- /.body-sec-inner -->
</div><!-- /.body-sec -->

<script src="/assets/widgets/articles-index/Widget_articles_tag.js"></script>

<script>
  (function(window) {
    'use strict';
    var UT = window.UT;
    var SPBL_ENV = window.SPBL_ENV || {};
    if (SPBL_ENV.env === 'development' && location.hostname.indexOf('sportsbull.jp') === -1) {
      UT.app.App.develop();
    }
    UT.view.tags.ViewTagsPyeongchang.init();
    UT.ui.NavCurrent.init(SPBL_ENV.category, SPBL_ENV.platform === 'web_mobile');
  }(window));
</script>
<script src="/assets/js/related_sidebar_by_env.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php
// 汎用 footer
include_once __DIR__."/../../desktop/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>
