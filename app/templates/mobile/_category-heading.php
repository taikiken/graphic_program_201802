<?php
// ----------------------------------------------------
// SP版 Powerd by エリアの追加
// https://github.com/undotsushin/undotsushin/issues/1211
if ( !$page['theme']['images']['sp'] ) :
?>
<?php if ( isset($page['category']['title_img']) && $page['category']['title_img'] ) : ?>
<div class="title_banner-powerdby">
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
</div>
<?php endif; ?>
<?php
endif;
// eof: SP版 Powerd by エリアの追加
// ---------------------------------------------------- ?>
