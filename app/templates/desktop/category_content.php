<?php
/**
 * desktop: 汎用 category template, exclude `motorsports`
 * motorsports category だけ表示が変わるので分岐する
 * User: @taikiken
 * Date: 2017/05/25
 * Time: 16:31
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */
?>
<?php
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
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

<div class="body-sec">
  <?php
  // ----------------------------------------------------
  // 冒頭画像
  // 記事一覧: pc theme.images
  if ( $page['theme']['images']['pc'] ) : ?>
    <div class="special-summary" style="<?php echo $page['theme']['background_color'] ? 'background-color: ' . $page[ 'theme' ][ 'background_color' ] : ''; ?>">
      <h1 class="special-summary-heading"><img src="<?php echo $page['theme']['images']['pc']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
    </div>
    <?php
  endif;
  // eof: 記事一覧: pc theme.images
  // ---------------------------------------------------- ?>

  <?php
  // 2. ピックアップが設定できる
  ?>
  <div id="pickup-container"></div>

  <div class="body-sec-inner">
    <section class="main-sec">
      <?php
      // ----------------------------------------------------
      // 記事一覧: pc banner
      if ( !empty($page['category']['banner']['pc']['image']) && !empty($page['category']['banner']['pc']['link']) ) :
        ?>
        <div class="sponsor-link mt30">
          <a href="<?php echo $page['category']['banner']['pc']['link']; ?>" target="_blank" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '<?php echo $page['category']['banner']['pc']['link']; ?>', true);"><img src="<?php echo $page['category']['banner']['pc']['image']; ?>" alt="<?php echo $page['category']['banner']['pc']['text'] ? $page['category']['banner']['pc']['text'] : '' ?>" style="max-width:100%;" /></a>
        </div>
        <?php
      endif;
      // eof: 記事一覧: pc banner
      // ---------------------------------------------------- ?>

      <?php
      // 3. ヘッドラインが設定できる
      // @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
      // @since 2016-09-20
      // {@link ViewCategory.js}, {@link ComponentCategoryOption.js}
      ?>
      <div id="js-headline"></div>

      <?php
      // para board check - `parasports`
      if ( $page['category']['slug'] === 'parasports' ) :
        include_once __DIR__.'/_category_para_board_calendar.php';
      endif;
      ?>


      <?php if ( $page['category']['slug'] === 'big6tv' ) : ?>
        <?php include_once __DIR__.'/../../../public/big6tv/category/index.html'; ?>
        <div class="headline-heading">
          <h2 class="headline-heading-title"><img src="/assets/images/common/headline-heading_big6.png" alt="HEADLINE NEWS"></h2>
          <span class="headline-heading-ruby">新着記事</span>
        </div>
      <?php endif; ?>

      <?php
      # ref. #2227
      if ( $page['category']['slug'] === 'seriku' ) :
        include_once __DIR__.'/../seriku/desktop/index.php';
      endif;
      ?>

      <?php
      # ref. #2185
      if ( $page['category']['slug'] === 'inhigh' ) :
        include_once __DIR__.'/../inhigh/desktop/index.php';
      endif;
      ?>

      <?php
      # ref. #2321
      if ( $page['category']['slug'] === 'americanfootball' ) :
        include_once __DIR__.'/../stats/ua_kansai/desktop/index.php';
      endif;
      ?>

      <?php
      # ref. #2559
      if ( $page['category']['slug'] === 'basketball' ) :
        $bleague_parts = file_get_contents('https://sportsbull.jp/stats/bleague/webview/pc/');
        echo $bleague_parts;
      endif;
      ?>

      <?php
      # ref. #2264
      if ( $page['category']['slug'] === 'americanfootball' ) :
        include_once __DIR__.'/../stats/ua_kansai/desktop/index.php';
      endif;
      ?>

      <div class="board-large">

        <div id="board-container"></div><!--/archive-->

        <div id="board-container-more"></div><!--/archive-more-->

      </div><!-- /.board-large -->
    </section><!-- /.main-sec -->

    <section class="side-sec">

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->
