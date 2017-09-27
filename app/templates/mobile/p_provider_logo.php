<?php
/**
 * メンテナンス性を上げるために別ファイルにします
 * @since 2017-09-11
 * by @taikiken
 */
// ----------------------------------------------------
// 記事詳細: pc 媒体ロゴ
if ( !empty( $page['post'] ) && !empty( $page['post']['user'] ) ) :

  $is_post_usr_logo = !empty( $page['post']['user']['logo'] );

  $post_user_logo_link = '';
  if ( $is_post_usr_logo && !empty( $page['post']['user']['logo']['link'] ) ) {
    $post_user_logo_link = $page['post']['user']['logo']['link'];
  }
  ?>
  <div class="provider mt30">
    <?php
    // user.logo.image
    if ( $is_post_usr_logo && !empty( $page['post']['user']['logo']['img'] ) ) :
      if ( empty($post_user_logo_link) ) :
        // link が存在しないので画像だけ表示します ?>
        <i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt=""></i>
      <?php else: // link + image を表示 ?>
        <a href="<?php echo $post_user_logo_link; ?>" target="_blank" onclick="UT.Ga.click('provider-logo', 'provider_link', 'click', '<?php echo $post_user_logo_link; ?>', true);"><i class="provider-logo"><img src="<?php echo $page['post']['user']['logo']['img']; ?>" alt=""></i></a>
      <?php endif; ?>
    <?php endif; //----[image] ?>
    <div class="provider-data">
      <?php
      // user.name
      if ( !empty($page['post']['user']['name']) ) : ?>
        <p class="provider-name"><?php echo $page['post']['user']['name']; ?></p>
      <?php endif; //----[name]

      // user.logo.link
      // link が存在する時のみ表示します
      if ( !empty( $page['post']['user']['logo'] ) && !empty( $page['post']['user']['logo']['link'] ) ) : ?>
        <p class="provider-url"><a href="<?php echo $page['post']['user']['logo']['link']; ?>" target="_blank" onclick="UT.Ga.click('provider-logo', 'provider_link', 'click', '<?php echo $post_user_logo_link; ?>', true);">ウェブサイト</a></p>
      <?php endif; //----[link] ?>
    </div>
  </div><!-- /.provider -->
<?php endif;
// eof: 記事詳細: pc 媒体ロゴ
// ---------------------------------------------------- ?>