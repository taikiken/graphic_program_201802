<?php
/**
 * [SP]
 * 地域別記事機能 / 概要 #2318
 * @see https://github.com/undotsushin/undotsushin/issues/2318
 * author: @taikiken
 * Date: 2017/09/04
 * Time: 19:30
 */
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
    // SP版 Powered by エリアの追加
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
      // 地域一覧
      include_once __DIR__ . '/category_area_map.php';
      ?>

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