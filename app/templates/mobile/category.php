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
    include_once __DIR__ . '/_cms_banner.php';
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
      <div id="js-headline"></div>
      <div id="category-container"></div>
      <div id="board-container-more"></div>
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->