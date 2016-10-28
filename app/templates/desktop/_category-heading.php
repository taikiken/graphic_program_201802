<?php
// ----------------------------------------------------
// PC版 Powerd by エリアの追加
// https://github.com/undotsushin/undotsushin/issues/1211
if ( !$page['theme']['images']['pc'] ) :
?>
<div class="category-heading">
  <h1>
    <?php echo $page['category']['label']; ?>
    <?php if ( isset($page['category']['title_img']) && $page['category']['title_img'] ) : ?>
      <span class="title_banner-powerdby">
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
// eof: PC版 Powerd by エリアの追加
// ---------------------------------------------------- ?>
