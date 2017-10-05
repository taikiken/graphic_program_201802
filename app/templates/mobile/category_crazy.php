<?php
// ------------------------------------------------
// SP カテゴリー
// ------------------------------------------------
?>
<div id="body-section" class="body-sec">
  <div class="body-sec-inner">
    <?php
    // ----------------------------------------------------
    // 記事一覧: sp theme.images
    if ( $page['theme']['images']['sp'] ) :
      ?>
      <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page['category']['theme']['background_color'] : ''; ?>">
        <h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['sp']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
      </div>
      <?php
    endif;
    // eof: 記事一覧: sp theme.images
    // ---------------------------------------------------- ?>
    <div id="pickup-container"></div><!-- /pickup -->

    <?php
    // SP版 Powerd by エリアの追加
    // https://github.com/undotsushin/undotsushin/issues/1211
    include_once __DIR__.'/_category-heading.php';
    ?>
    <?php
    // https://github.com/undotsushin/undotsushin/issues/1210
    // CMS から一面・すべてのバナーを設定できるようにする #1210
    // @since 2016-11-02
    if ($page['category']['slug'] == 'all') {
      include_once __DIR__ . '/_cms_banner.php';
    }
    ?>
    <section class="main-sec">

      <?php
      // ----------------------------------------------------
      // 記事一覧: sp banner
      if ( !empty($page['category']['banner']['sp']['image']) && !empty($page['category']['banner']['sp']['link']) ) :
        ?>
        <div class="sponsor-link">
          <a href="<?php echo $page['category']['banner']['sp']['link']; ?>" target="_blank" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '<?php echo $page['category']['banner']['sp']['link']; ?>', true);"><img src="<?php echo $page['category']['banner']['sp']['image']; ?>" alt="<?php echo $page['category']['banner']['sp']['text'] ? $page['category']['banner']['sp']['text'] : '' ?>"></a>
        </div>
        <?php
      endif;
      // eof: 記事一覧: sp banner
      // ---------------------------------------------------- ?>
        <section class="section_crazy_pickup">
            <div class="ttl-wrapper">
                <h2 class="ttl pickup"><i></i>注目のアスリート</h2>
<?php /*<p class="more sp_hide"><a href="/crazy/list/">すべての選手を見る</a></p>*/?>
            </div>

            <div class="pickup_player_list">
                <ul class="thumb_area">
                    <li><?php /*<a href="/crazy/detail/14/">*/?>
                            <div class="img"><img src="/assets/img/pickup_14.png" alt=""></div>
                            <div class="txt_area">
                                <h3 class="name">川崎宗則</h3>
                                <p class="genre">野球</p>
                            </div>
<?php /*</a>*/?></li>

                    <li><?php /*<a href="/crazy/detail/1/">*/?>
                            <div class="img"><img src="/assets/img/pickup_1.png" alt=""></div>
                            <div class="txt_area">
                                <h3 class="name">遠藤保仁</h3>
                                <p class="genre">サッカー</p>
                            </div>
<?php /*</a>*/?></li>

                    <li><?php /*<a href="/crazy/detail/13/">*/?>
                            <div class="img"><img src="/assets/img/pickup_13.png" alt=""></div>
                            <div class="txt_area">
                                <h3 class="name">田臥勇太</h3>
                                <p class="genre">バスケットボール</p>
                            </div>
<?php /*</a>*/?></li>

                    <li><?php /*<a href="/crazy/detail/4">*/?>
                            <div class="img"><img src="/assets/img/pickup_4.png" alt=""></div>
                            <div class="txt_area">
                                <h3 class="name">山中慎介</h3>
                                <p class="genre">ボクシング</p>
                            </div>
<?php /*</a>*/?></li>
                </ul>
            </div>

<?php /*<div class="more_btn pc_hide"><a href="/crazy/list/"><i></i>すべての選手を見る</a></div>*/?>
        </section>

        <section class="section_crazy_recommend">
            <div class="ttl-wrapper">
                <h2 class="ttl recommend"><i></i>編集部おすすめの記事</h2>
            </div>

            <div class="recommend_list">
                <ul class="thumb_area">
                </ul>
            </div>
        </section>

      <div id="js-headline"></div>
      <div id="category-container"></div>
      <div id="board-container-more"></div>
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->

<script src="https://code.jquery.com/jquery-git.min.js"></script>
<script src="/assets/js/libs/crazy.js"></script>