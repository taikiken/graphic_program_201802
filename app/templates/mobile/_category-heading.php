<?php
// @since 2016-09-28
// ----------------------------------------------------
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
// https://github.com/undotsushin/undotsushin/issues/645#issuecomment-223527274
if ( !$page['theme']['images']['sp'] ) :
?>
<div class="category-heading">
  <h1>
    <?php echo $page['category']['label']; ?>
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
