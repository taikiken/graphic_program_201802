<div class="category-heading">
  <h1>
    <?php echo $page['title']; ?>
    <?php if ( isset($page['category']['title_img']) && $page['category']['title_img'] ) : ?>
      <span class="category-heading-image">
        <img src="<?php echo $page['category']['title_img']; ?>" alt="" />
      </span>
    <?php endif; ?>
  </h1>
</div><!-- /.category-heading -->


<div class="body-sec">
  <div class="body-sec-inner">
    <section class="main-sec">
      <div class="board-large">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">
      <div class="sponsor-link"><a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-sponsor_1.jpg" alt=""></a></div>

      <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="運動通信アプリ版 データ先読みで、電車でもサクサク記事が読める！"></a></div>

      <div id="widget-ranking-container"></div><!--/ranking-->

      <div id="widget-recommend-container"></div><!--/videos-->

      <div class="sponsor-link nadir"><a href="hoge" target="_blank"><img src="/assets/images/dummy/bnr-sponsor_2.jpg" alt=""></a></div>
    </section><!-- /.side-sec -->
  </div>
</div><!-- /.body-sec -->