<?php
/**
 * stats - banner 一覧
 * User: @taikiken
 * Date: 2017/06/23
 * Time: 22:58
 * @see https://github.com/undotsushin/undotsushin/issues/2080
 */
// PC / SP 共用
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <script src="/assets/js/app_divide.bundle.js"></script>
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

  <?php include_once __DIR__.'/../../_env.php'; ?>

  <script src="/assets/js/libs/vendor.react.js"></script>
  <script src="/assets/js/bundle/main.bundle.js"></script>

  <link rel="stylesheet" href="/assets/css/stats/banners/ui.css?v=<?php echo $page['version']; ?>" media="only screen and (min-width: 769px)">
  <link rel="stylesheet" href="/assets/sp/css/stats/banners/ui.css?v=<?php echo $page['version']; ?>" media="only screen and (max-width: 768px)">

  <?php
  endif;
  // -----------------------------------------
  ?>

  <?php include_once __DIR__.'/../../_head_bottom.php'; ?>

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

<div id="whole" class="whole stats stats_banners">

  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <header class="head-sec for-web">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->
  <?php
  endif;
  // -----------------------------------------
  ?>

  <div class="body-sec">
    <div class="body-sec-inner">

      <section class="main-sec">

        <h1 class="stats_banners__heading">速報データ一覧</h1>

        <div id="js-stats_banners__categories"></div>

      </section><!-- /.main-sec -->

      <section class="side-sec show-for-large">
        <div id="sidebar-moving-container">

          <div class="sponsor-link">
            <!-- /531683568/npb-pc-rectangle -->
            <div id='div-gpt-ad-1492577512561-0' style='height:250px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1492577512561-0'); });
            </script>
            </div>
          </div>

          <div class="app-bnr">
            <!-- /531683568/pc_sidebar_top_2nd -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/pc_sidebar_top_2nd', [300, 120], 'div-gpt-ad-1494939250039-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1494939250039-0' style='height:120px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1494939250039-0'); });
            </script>
            </div>
            <!-- // /531683568/pc_sidebar_top_2nd -->
          </div>

          <!-- sidebar recommend, オススメ記事 -->
          <div id="widget-recommend-list-container"></div><!--/recommend-->

          <div id="widget-ranking-container"></div><!--/ranking-->

          <div id="sponsor-link-ranking" class="sponsor-link sponsor-link-ranking">
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35250&targetID=adg_35250&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
          </div>

          <div id="widget-recommend-container"></div><!--/videos-->
          <div id="sponsor-link-recommend" class="sponsor-link sponsor-link-recommend">
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35251&targetID=adg_35251&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
          </div>

        </div><!--/#sidebar-moving-->
      </section><!-- /.side-sec -->
    </div>
  </div><!-- /.body-sec -->


  <?php
  // # footer
  // ==============================
  // app in webview 時に .foot-sec を非表示にする
  if (!$from_webview) :

    $BREADCRUMB = array(
      array(
        'label' => strip_tags($page['title']),
        'path'  => '../'
      )
    );

    // footer dom
    include_once __DIR__.'/../../_footer-responsive.php';

  endif;
  ?>

</div><!-- /.whole -->

<!-- for facebook -->
<script src="/assets/facebook/init.js?v=<?php echo $page['version']; ?>"></script>
<!-- // for facebook -->

<script src="/assets/js/bundle/banners_with_json.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/js/stats_banners.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>
</body>
</html>
