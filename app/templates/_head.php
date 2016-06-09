  <meta http-equiv="X-UA-Compatible" content="IE=edge">

<?php if ( $page['ua'] == 'mobile' ) : ?>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
<?php endif; ?>

  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true" data-orientation="true"></script>
<?php
# ---------------------------------------------------------------------------
# botと思われるアクセスは判定しない
if ( !$page['ua_is_bot'] ) :

// browser 使用条件 URL
$about_browser = '/about/requirements/';
$current_path = parse_url($_SERVER["REQUEST_URI"])['path'];
if ( $about_browser != $current_path ) {
  // browser 使用条件 URL と同じだったら detector.js 読み込まない
  ?>
  <script src="/assets/js/detector.js" id="detector" data-chrome="48" data-safari="8" data-firefox="44" data-ie="11" data-edge="13" data-ios="8" data-android="4.2" data-url="<?php echo $about_browser; ?>"></script>
<?php }// browser 使用条件 end

endif;

# ---------------------------------------------------------------------------
?>

  <title><?php echo $page['og_title']; ?></title>

  <meta name="keywords" content="<?php echo $page['keywords']; ?>">
  <meta name="description" content="<?php echo $page['og_description']; ?>">

  <meta name="apple-itunes-app" content="app-id=1086719653">

  <!-- sns ogp -->
  <meta property="fb:app_id" content="<?php echo $page['app_id']; ?>">
  <meta property="og:site_name" content="<?php echo $page['site_name']; ?>" />
  <meta property="og:type" content="<?php echo $page['og_type']; ?>">
  <meta property="og:title" content="<?php echo $page['og_title']; ?>">
  <meta property="og:image" content="<?php echo $page['og_image']; ?>">
  <meta property="og:url" content="<?php echo $page['og_url']; ?>">
  <meta property="og:description" content="<?php echo $page['og_description']; ?>">
  <meta property="og:locale" content="ja_JP" />

  <!-- twitter card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@undotsushin">
  <meta name="twitter:title" content="<?php echo $page['og_title']; ?>">
  <meta name="twitter:image" content="<?php echo $page['og_image']; ?>">
  <meta name="twitter:url" content="<?php echo $page['og_url']; ?>">
  <meta name="twitter:description" content="<?php echo $page['og_description']; ?>">


<?php if ( $page['canonical'] ) : ?>
  <link rel="canonical" href="<?php echo $page['canonical']; ?>">
<?php elseif ( $page['og_url'] ) : ?>
  <link rel="canonical" href="<?php echo $page['og_url']; ?>">
<?php endif; ?>


  <!-- favicon -->
<?php
  /*
  home screen 登録 しても web app mode だと cookie を引きつけず link click で safari に移動し使いづらい
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  */
?>
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">