<?php
/**
 * desktop: pyeongchang2018 専用 category template
 * User: @taikiken
 * Date: 2017/12/21
 * Time: 17:43
 * ref: UNDO_SPBL-291 【バックエンド】平昌オリンピック対応 - ルーティング
 * ref: UNDO_SPBL-293 【ウェブ】平昌オリンピック対応 - ページ作成
 */
?>
<?php
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
include_once __DIR__.'/_category-heading.php';
?>
<div class="body-sec">

  <div class="body-sec-inner">
    <section class="main-sec">

      <?php
      // medals
      include_once __DIR__ . '/../pyeongchang2018/module/_pyeongchang2018_medals.php';
      ?>

      <div id="Widget_articles_tag-1" class="Widget_articles_tag" data-style="photo" data-tag="平昌五輪2018フォトギャラリー" data-offset="0"></div>

      <div class="board-large">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php
      // `/category/pyeongchang2018/` - 広告表示しない
      global $on_pyeongchang2018;
      $on_pyeongchang2018 = true;
      ?>
      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->
  </div><!-- /.body-sec-inner -->
</div><!-- /.body-sec -->

<script src="/assets/widgets/articles-index/Widget_articles_tag.js"></script>