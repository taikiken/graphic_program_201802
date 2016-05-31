<?php
// ------------------------------------------------
// SP カテゴリー
// ------------------------------------------------
?>
<div class="body-sec category">
  <div class="body-sec-inner">
    <?php
    // ----------------------------------------------------
    // 記事一覧: pc
    if ( !empty($page['category']) && !empty($page['category']['theme']) && !empty($page['category']['theme']['images']) && !empty($page['category']['theme']['images']['sp']) ) :
      ?>
      <div class="special-summary" style="<?php echo $page['category']['theme']['background_color'] ? 'background-color: ' . $page[ 'category' ][ 'theme' ][ 'background_color' ] : ''; ?>">
        <h1 class="special-summary-heading"><img src="<?php echo $page['category']['theme']['images']['sp']; ?>" alt="<?php echo $page['og_description'] ? $page['og_description'] : ''; ?>"></h1>
      </div>
      <?php
    endif;
    // eof: 記事一覧: pc
    // ---------------------------------------------------- ?>
    <section class="main-sec">
      <div id="category-container"></div>
    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->