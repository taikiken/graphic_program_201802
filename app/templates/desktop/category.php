<?php
// ----------------------------------------------------
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
// https://github.com/undotsushin/undotsushin/issues/645#issuecomment-223527274
if ( !$page['theme']['images']['pc'] ) :
?>
<div class="category-heading">
  <h1>
    <?php echo $page['title']; ?>
    <?php if ( isset($page['category']['title_img']) && $page['category']['title_img'] ) : ?>
      <span class="category-heading-image">
        <?php
        // @since 2016-09-17
        $title_img_link = false;
        if (isset($page['category']['title_img_link']) && $page['category']['title_img_link']) :
          $title_img_link = true;
        ?>
          <a href="<?php echo $page['category']['title_img_link']; ?>" target="_blank">
        <?php endif; ?>
        <img src="<?php echo $page['category']['title_img']; ?>" alt="" />
        <?php
        if ($title_img_link) :
        ?>
          </a>
        <?php endif; ?>
      </span>
    <?php endif; ?>
  </h1>
</div><!-- /.category-heading -->
<?php
endif;
// eof: PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
// ---------------------------------------------------- ?>


<div class="body-sec">
  <?php
  // ----------------------------------------------------
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
      // 3. ヘッドラインが設定できる
      // @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
      // @since 2016-09-20
      // {@link ViewCategory.js}, {@link ViewCategoryOption.js}
      ?>
      <div id="js-headline"></div>
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