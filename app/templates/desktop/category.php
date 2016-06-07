<?php
// ----------------------------------------------------
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
// https://github.com/undotsushin/undotsushin/issues/645#issuecomment-223527274
if ( !isset( $page[ 'category' ][ 'theme' ][ 'images' ][ 'pc' ] ) ) :
?>
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
<?php
endif;
// eof: PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
// ---------------------------------------------------- ?>

<div class="body-sec">
  <div class="body-sec-inner">
    <?php
    // ----------------------------------------------------
    // 記事一覧: pc theme.images
    if ( isset($page['category']['theme']['images']['pc']) ) : ?>
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
      if ( isset($page['category']['banner']['pc']['image']) && isset($page['category']['banner']['pc']['link']) ) :
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

      <?php include_once __DIR__."/_sidebar_ad.php"; ?>

    </section><!-- /.side-sec -->

  </div>
</div><!-- /.body-sec -->