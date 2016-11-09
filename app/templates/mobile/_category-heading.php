<?php
// ----------------------------------------------------
// SP版 Powered by エリアの追加
// https://github.com/undotsushin/undotsushin/issues/1211
/*
if ( !$page['theme']['images']['sp'] ) :
?>
<?php if ( isset($page['category']['title_img']) && $page['category']['title_img'] ) : ?>
<div class="title_banner-powered_by">
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
*/
// eof: SP版 Powered by エリアの追加
// ---------------------------------------------------- ?>
<?php
// @since 2016-11-02
// JSON key 変更に伴い変更します
// https://github.com/undotsushin/undotsushin/issues/1211#issuecomment-255299583
// https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
$title_banner = $page['category']['title_banner']['sp'];
if (!empty($title_banner['image'])) :
  $is_title_banner_link = false;
?>
<div class="title_banner-powered_by">
  <?php
  if (!empty($title_banner['link'])) :
  $title_banner_link = true;
  ?>
    <a href="<?php echo $title_banner['link']; ?>" target="_blank">
  <?php
  endif;
  ?>
    <img src="<?php echo $title_banner['image']; ?>" alt="<?php echo $title_banner['text']; ?>">
  <?php
  if ($title_banner_link) :
  ?>
    </a>
  <?php
  endif;
  ?>
</div>
<?php
endif;
// eof: PC版 Powered by エリアの追加
// ---------------------------------------------------- ?>
