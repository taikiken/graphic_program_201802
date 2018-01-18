<?php
/*
 * SP 検索結果
 */
?>
<div class="body-sec result">
  <div class="body-sec-inner">
    <?php
    // since 2017-12-18
    // お知らせ表示
    // ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
    ?>
    <div id="js-announce-container"></div>
    <div class="category-heading">
      <h1><?php echo $page['title']; ?></h1>
    </div><!-- /.category-heading -->

    <section class="main-sec">
      <div class="board-large search-container">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->