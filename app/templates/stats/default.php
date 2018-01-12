<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <?php
  if (0) :
    // app_ua_detector.bundle.js を使います
    // @since 2017-08-23
  ?>
  <script src="/assets/js/app_divide.bundle.js"></script>
  <?php
  endif;
  ?>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <?php
  // app in webview 時に head内不要なタグを非表示にする
  if (!$from_webview) :
  ?>
  <title><?php echo strip_tags($page['title']).' | '.$page['site_name']; ?></title>
  <meta name="keywords" content="<?php echo $page['keywords']; ?>">
  <meta name="description" content="<?php echo $page['og_description']; ?>">

  <meta property="fb:app_id" content="<?php echo $page['app_id']; ?>">
  <meta property="og:site_name" content="<?php echo $page['site_name']; ?>">
  <meta property="og:type" content="<?php echo $page['og_type']; ?>">
  <meta property="og:title" content="<?php echo $page['og_title']; ?>">
  <meta property="og:image" content="<?php echo $page['og_image']; ?>">
  <meta property="og:url" content="<?php echo $page['og_url']; ?>">
  <meta property="og:description" content="<?php echo $page['og_description']; ?>">
  <meta property="og:locale" content="ja_JP" />

  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@<?php echo $page['sns']['twitter']; ?>">
  <meta name="twitter:title" content="<?php echo $page['og_title']; ?>">
  <meta name="twitter:image" content="<?php echo $page['og_image']; ?>">
  <meta name="twitter:url" content="<?php echo $page['og_url']; ?>">
  <meta name="twitter:description" content="<?php echo $page['og_description']; ?>">
  <link rel="canonical" href="<?php echo $page['og_url']; ?>">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">

  <?php include_once __DIR__.'/../_env.php'; ?>

  <script src="/assets/js/libs/vendor.react.js"></script>
  <script src="/assets/js/bundle/main.bundle.js"></script>

  <?php
  endif;
  // -----------------------------------------
  ?>
  <?php
  // app webview を UA 判定する JS を追加します - `app_ua_detector.bundle.js`
  // @since 2017-08-21
  ?>
  <script src="/assets/js/app_ua_detector.bundle.js"></script>

  <?php include_once __DIR__.'/../_head_bottom.php'; ?>

  <link rel="stylesheet" href="/assets/css/stats/ui.css?v=<?php echo $page['version']; ?>" media="only screen and (min-width: 769px)">
  <link rel="stylesheet" href="/assets/sp/css/stats/ui.css?v=<?php echo $page['version']; ?>" media="only screen and (max-width: 768px)">

  <!-- appvador -->
  <script>
    googletag.cmd.push(function() {
      googletag.defineSlot('/531683568/appvador', [320, 180], 'div-gpt-ad-1501126889988-0').addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
    });
  </script>
  <!-- //appvador -->

  <script>
    googletag.cmd.push(function() {
      googletag.defineSlot('/531683568/npb-pc-rectangle', [300, 250], 'div-gpt-ad-1492577512561-0').addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
    });
  </script>

<?php // #1860 記事詳細アンカー広告
echo <<<__EOL__
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-8613117509675807",
    enable_page_level_ads: true
  });
</script>
__EOL__;
?>

</head>
<body>

<?php /* # appvaoder */ ?>
<!-- /531683568/appvador -->
<div id='div-gpt-ad-1501126889988-0'>
<style>#div-gpt-ad-1501126889988-0 * { line-height:0; }</style>
<script>
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1501126889988-0'); });
</script>
<script type="text/javascript" src="//cdn.apvdr.com/js/apv-ifbstr.min.js"></script>
</div>
<?php /* // appvaoder */ ?>

<?php
// @since 2017-07-16
// .whole へ tennis|golf|mlb 追加する
$whole_classes = array();
$whole_classes[] = 'whole';
$whole_classes[] = 'stats';
// tennis|golf|mlb
if (isset($page['prop_category'])) {
  $whole_classes[] = $page['prop_category'];
}
// mlb: schedule|standing|leaders|playerlist|game
if (isset($page['prop_identity'])) {
  $whole_classes[] = $page['prop_identity'];
}
?>
<div id="whole" class="<?php echo join( ' ', $whole_classes);?>">

  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <header class="head-sec for-web">
    <div class="head-sec-inner">
      <h1><a href="https://sportsbull.jp/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->
  <?php
  endif;
  // -----------------------------------------
  ?>

<?php include_once __DIR__.'/'.$page['template']; ?>

<?php
// # footer
// ==============================
// app in webview 時に .foot-sec を非表示にする
if (!$from_webview) :

  $BREADCRUMB = array(
    array(
      'label' => strip_tags($page['title']),
      'path'  => './'
    )
  );

  // footer dom
  include_once __DIR__.'/../_footer-responsive.php';

endif;
?>

</div><!-- /.whole -->

<!-- for facebook -->
<script src="/assets/facebook/init.js?v=<?php echo $page['version']; ?>"></script>
<!-- // for facebook -->

<script src="/assets/js/global.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>
</body>
</html>
