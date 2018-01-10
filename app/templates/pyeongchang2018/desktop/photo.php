<?php
/**
 * desktop: pyeongchang2018 専用 template - `/pyeongchang2018/photo/`
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
    <section class="main-sec">
      <div class="board-large">

        <div class="gallery--photo">
          <header class="gallery__header">
            <h2 class="gallery__heading">フォトギャラリー</h2>
            <p class="gallery__link">2/9~2/25</p>
          </header><!-- /.gallery__header -->

          <div id="Widget_articles_tag-2" class="Widget_articles_tag" data-style="photo" data-tag="平昌五輪2018フォトギャラリー" data-offset="0" data-length="9999"></div>
        </div>

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/../../desktop/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->
  </div><!-- /.body-sec-inner -->
</div><!-- /.body-sec -->

<script src="/assets/js/related_sidebar_by_env.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/widgets/articles-index/Widget_articles_tag.js?v=<?php echo $page['version']; ?>"></script>

<?php
// 汎用 footer
include_once __DIR__."/../../desktop/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>