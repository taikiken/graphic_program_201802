<?php
// ------------------------------------------------
// SP カテゴリー
// ------------------------------------------------
?>
<div id="body-section" class="body-sec">
  <div class="body-sec-inner">
    <?php
    // since 2017-12-18
    // お知らせ表示
    // ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
    ?>
    <div id="js-announce-container"></div>
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


        <?php
        // ----------------------------------------------------
        // 記事一覧: sp banner
        if ( !empty($page['category']['banner']['sp']['image']) && !empty($page['category']['banner']['sp']['link']) ) :
        ?>
        <div class="sponsor-link" style="padding:15px 3.125%">
            <a href="/motorsports/crazy-for-racing/" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '/motorsports/crazy-for-racing/', true);"><img src="/motorsports/crazy-for-racing/assets/img/640x100.png" alt="CRAZY FOR RACING"></a>
        </div>
        <?php
    endif;
      // eof: 記事一覧: sp banner
      // ---------------------------------------------------- ?>

      <?php
      // https://github.com/undotsushin/undotsushin/issues/1914
      ?>
      <div class="motorsports__category-btns">
        <ul class="motorsports__category-btns__list">
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/f1/"><img src="/assets/sp/images/motorsports/btn-category_f1.png" alt="F1 / FORMULA 1 レース日程・結果"></a>
          </li>
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/sgt/"><img src="/assets/sp/images/motorsports/btn-category_sgt.png" alt="SGT / Super GT レース日程・結果"></a>
          </li>
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/wec/"><img src="/assets/sp/images/motorsports/btn-category_wec.png" alt="WEC / FIA WORLD ENDURANCE CHAMPIONSHIP レース日程・結果"></a>
          </li>
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/wrc/"><img src="/assets/sp/images/motorsports/btn-category_wrc.png" alt="WRC / FIA WORLD RALLY CHAMPIONSHIP レース日程・結果"></a>
          </li>
        </ul><!-- /.motorsports__category-btns__list -->
      </div><!-- /.motorsports__category-btns -->

      <div id="js-headline"></div>
      <div id="category-container"></div>
      <div id="board-container-more"></div>
      <?php
      // since 2018-01-015 - 一面や一覧系の末広告タグ
      include_once __DIR__ . '/_ad_below_more.php';
      ?>
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->