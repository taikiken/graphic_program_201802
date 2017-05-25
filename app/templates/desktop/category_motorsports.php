<?php
/**
 * desktop: motorsports category template
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
          <a href="<?php echo $page['category']['banner']['pc']['link']; ?>" target="_blank" onclick="UT.Ga.click('category.banner', 'banner_link', 'click', '<?php echo $page['category']['banner']['pc']['link']; ?>', true);"><img src="<?php echo $page['category']['banner']['pc']['image']; ?>" alt="<?php echo $page['category']['banner']['pc']['text'] ? $page['category']['banner']['pc']['text'] : '' ?>"></a>
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
      // motor sports navigation
      // @since 2017-05-26
      ?>
      <nav class="motorsports__category-btns">
        <ul class="motorsports__category-btns__list">
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/f1/">
              <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_f1-bg.png" alt=""></span>
              <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_f1-text.png" alt="F1 / FORMULA 1 レース日程・結果"></span>
              <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
            </a>
          </li>
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/sgt/">
              <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_sgt-bg.png" alt=""></span>
              <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_sgt-text.png" alt="SGT / Super GT レース日程・結果"></span>
              <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
            </a>
          </li>
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/wec/">
              <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_wec-bg.png" alt=""></span>
              <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_wec-text.png" alt="WEC / FIA WORLD ENDURANCE CHAMPIONSHIP レース日程・結果"></span>
              <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
            </a>
          </li>
          <li class="motorsports__category-btns__item">
            <a class="motorsports__category-btns__link" href="/motorsports/wrc/">
              <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_wrc-bg.png" alt=""></span>
              <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_wrc-text.png" alt="WRC / FIA WORLD RALLY CHAMPIONSHIP レース日程・結果"></span>
              <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
            </a>
          </li>
        </ul>
      </nav><!-- /.motorsports__category-btns -->

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
