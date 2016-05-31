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
    <?php
    // ----------------------------------------------------
    // 記事一覧: pc theme.images
    if ( !empty($page['category']) && !empty($page['category']['theme']) && !empty($page['category']['theme']['images']) && !empty($page['category']['theme']['images']['pc']) ) :
    ?>
    <div class="special-summary" style="<?php echo $page['category']['theme']['background_color'] ? 'background-color: ' . $page[ 'category' ][ 'theme' ][ 'background_color' ] : ''; ?>">
      <h1 class="special-summary-heading"><img src="<?php echo $page['category']['theme']['images']['pc']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
    </div>
    <?php
    endif;
    // eof: 記事一覧: pc
    // ---------------------------------------------------- ?>
    <section class="main-sec">
      <?php
      // ----------------------------------------------------
      // 記事一覧: pc banner
      if ( !empty($page['category']) && !empty($page['category']['banner']) && !empty($page['category']['banner']['pc']) && !empty($page['category']['banner']['pc']['image']) && !empty($page['category']['banner']['pc']['link']) ) :
      ?>
      <div class="sponsor-link mt30">
        <a href="<?php echo $page['category']['banner']['pc']['link']; ?>" target="_blank"><img src="<?php echo $page['category']['banner']['pc']['image']; ?>" alt="<?php echo $page['category']['banner']['pc']['text'] ? $page['category']['banner']['pc']['text'] : '' ?>"></a>
      </div>
      <?php
      endif;
      // eof: 記事一覧: pc banner
      // ---------------------------------------------------- ?>
      <div class="board-large">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">
      <div class="sponsor-link">
        <?php
        /*
        #680 https://github.com/undotsushin/undotsushin/issues/680#issuecomment-217601849
        Adsense 差し替え
        */
        ?>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- デスクトップ - サイドバー - 上 -->
        <ins class="adsbygoogle"
             style="display:inline-block;width:300px;height:250px"
             data-ad-client="ca-pub-8613117509675807"
             data-ad-slot="8203159173"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="運動通信アプリ版 運動通信をアプリでサクサク楽しむ！"></a></div>

      <div id="widget-ranking-container"></div><!--/ranking-->
      <div id="sponsor-link-ranking" class="sponsor-link sponsor-link-ranking">
        <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35250&targetID=adg_35250&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=false&tagver=2.0.0"></script>
      </div>

      <div id="widget-recommend-container"></div><!--/videos-->
      <div id="sponsor-link-recommend" class="sponsor-link sponsor-link-recommend">
        <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35251&targetID=adg_35251&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=false&tagver=2.0.0"></script>
      </div>

      <div class="sponsor-link nadir">
        <?php
        /*
        #680 https://github.com/undotsushin/undotsushin/issues/680#issuecomment-217601849
        Adsense 差し替え
        */
        ?>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- デスクトップ - サイドバー - 下 -->
        <ins class="adsbygoogle"
             style="display:inline-block;width:300px;height:600px"
             data-ad-client="ca-pub-8613117509675807"
             data-ad-slot="5110091971"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->