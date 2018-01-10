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
  平昌オリンピック・ハイライト・テンプレート
  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="board-large">
        <div id="js-pyeongchang-highlight-container"></div>
      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">

      平昌オリンピック・サイドバー
      <?php include_once __DIR__."/../../desktop/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->
  </div><!-- /.body-sec-inner -->
</div><!-- /.body-sec -->

<?php
// 汎用 footer
include_once __DIR__."/../../desktop/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>
