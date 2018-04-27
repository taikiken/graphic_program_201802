<meta http-equiv="X-UA-Compatible" content="IE=edge">


<?php if ( $page['conditional']['head_viewport'] ) : ?>
  <?php if ( $page['ua'] == 'mobile' ) : ?>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <?php else : ?>
    <meta name="viewport" content="width=1280">
  <?php endif; ?>
<?php endif; ?>


<?php if ( $page['conditional']['head_title'] ) : ?>
  <title><?php
    if ( $page['template'] == 'index' ) :
      echo $page['site_name'];
    else :
      echo strip_tags($page['title']).' | '.$page['site_name'];
    endif;
  ?></title>
<?php endif; ?>


<?php if ( $page['conditional']['head_sagen'] ) : ?>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>" id="sagen" data-browser="true" data-orientation="true"></script>
<?php endif; ?>


<?php if ( $page['conditional']['head_seo'] ) : ?>
  <meta name="keywords" content="<?php echo $page['keywords']; ?>">
  <meta name="description" content="<?php echo $page['og_description']; ?>">
<?php endif; ?>


<?php if ( $page['conditional']['head_ogp'] ) : ?>
  <?php
    /*
     * OS オリジナルのバナーが表示されるので削除します
     * @since 2016-10-03
    <meta name="apple-itunes-app" content="app-id=1086719653">
    */
  ?>
  <!-- sns ogp -->
  <meta property="fb:app_id" content="<?php echo $page['app_id']; ?>">
  <meta property="og:site_name" content="<?php echo $page['site_name']; ?>">
  <meta property="og:type" content="<?php echo $page['og_type']; ?>">
  <meta property="og:title" content="<?php echo $page['og_title']; ?>">
  <meta property="og:image" content="<?php echo $page['og_image']; ?>">
  <meta property="og:url" content="<?php echo $page['og_url']; ?>">
  <meta property="og:description" content="<?php echo $page['og_description']; ?>">
  <meta property="og:locale" content="ja_JP" />

  <?php if ( $page['fb_pages'] && is_array($page['fb_pages']) ) : foreach( $page['fb_pages'] as $key => $value ) : ?>
    <meta property="fb:pages" content="<?php echo $value; ?>" />
  <?php endforeach; endif; ?>

  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@<?php echo $page['sns']['twitter']; ?>">
  <meta name="twitter:title" content="<?php echo $page['og_title']; ?>">
  <meta name="twitter:image" content="<?php echo $page['og_image']; ?>">
  <meta name="twitter:url" content="<?php echo $page['og_url']; ?>">
  <meta name="twitter:description" content="<?php echo $page['og_description']; ?>">
<?php endif; ?>


<?php if ( $page['conditional']['head_canonical'] ) : ?>
<?php if ( $page['canonical'] ) : ?>
  <link rel="canonical" href="<?php echo $page['canonical']; ?>">
<?php elseif ( $page['og_url'] ) : ?>
  <link rel="canonical" href="<?php echo $page['og_url']; ?>">
<?php endif; ?>
<?php endif; ?>


<?php if ( $page['conditional']['head_syn'] ) : ?>
  <!-- syndot -->
  <?php if ( $page['template'] === 'p' ) : ?>
    <meta name="synextbot" content="<?php echo $page['syn_extension']; ?>">
    <?php if ( $page['syn_thumbnail'] ) : ?>
      <meta property="syndot:thumbnail" content="<?php echo $page['syn_thumbnail']; ?>">
    <?php endif; ?>
  <?php endif; ?>
  <!-- //syndot -->
<?php endif; ?>


<?php if ( $page['conditional']['head_icon'] ) : ?>
  <!-- favicon -->
  <?php
    /*
    home screen 登録 しても web app mode だと cookie を引きつげず link click で safari に移動し使いづらい
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    */
  ?>
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $page['site_url_uts']; ?>/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="<?php echo $page['site_url_uts']; ?>/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="<?php echo $page['site_url_uts']; ?>/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="<?php echo $page['site_url_uts']; ?>/favicon.ico">
<?php endif; ?>


<?php
if ( $page['conditional']['head_env'] ) :
  include_once __DIR__.'/_env.php';
endif;
?>