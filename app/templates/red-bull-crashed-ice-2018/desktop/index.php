<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <title><?php echo strip_tags($page['title']).' | '.$page['site_name']; ?></title>
  <meta name="keywords" content="<?php echo $page['keywords']; ?>">
  <meta name="description" content="<?php echo $page['og_description']; ?>">
  <!-- sns ogp -->
  <meta property="og:site_name" content="<?php echo $page['site_name']; ?>">
  <meta property="og:type" content="<?php echo $page['og_type']; ?>">
  <meta property="og:title" content="<?php echo $page['og_title']; ?>">
  <meta property="og:image" content="<?php echo $page['og_image']; ?>">
  <meta property="og:url" content="<?php echo $page['og_url']; ?>">
  <meta property="og:description" content="<?php echo $page['og_description']; ?>">
  <meta property="og:locale" content="ja_JP" />
  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@sportsbull_jp">
  <!-- favicon -->
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="canonical" href="<?php echo $page['og_url']; ?>">

  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/libs/jquery2/jquery.min.js?v="></script>
  <link rel="stylesheet" href="/assets/css/<?php echo $page['template_classname']; ?>/ui.css?v=<?php echo $page['version']; ?>">

  <script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    (function() {
      var gads = document.createElement('script');
      gads.async = true;
      gads.type = 'text/javascript';
      var useSSL = 'https:' == document.location.protocol;
      gads.src = (useSSL ? 'https:' : 'http:') +
        '//www.googletagservices.com/tag/js/gpt.js';
      var node = document.getElementsByTagName('script')[0];
      node.parentNode.insertBefore(gads, node);
    })();
  </script>

  <script>
   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

   ga('create', 'UA-74679267-1', 'auto');
   ga('require', 'GTM-KJ33JM9');
   ga('require', 'linkid');
   ga('require', 'displayfeatures');
   ga('send', 'pageview');

  </script>
<?php
include_once __DIR__ . '/../../_env.php';
?>
</head>
<body>
<div id="whole" class="whole <?php echo $page['template_classname']; ?>">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <div class="body-sec">
    <div class="special-summary">
      <div class="special-summary-inner">
        <h1 class="special-summary-heading"><img src="/assets/images/red-bull-crashed-ice-2018/summary-logo.png" alt="RED BULL CRASHED ICE 2018"></h1>
        <p class="special-summary-copy1"><img src="/assets/images/red-bull-crashed-ice-2018/summary-copy1.png" alt="xxxxx"></p>
        <p class="special-summary-copy2"><img src="/assets/images/red-bull-crashed-ice-2018/summary-copy2.png" alt="xxxxx"></p>
      </div><!-- /.special-summary-inner -->
    </div><!-- /.special-summary -->

    <?php /*
      <div class="live-streaming__container">
        <div class="live-streaming">
          <img src="/assets/images/red-bull-crashed-ice-2018/live_streaming-poster.jpg" alt="">
        </div><!-- /.live-streaming -->
      </div><!-- /.live-streaming__container -->
    */ ?>

    <!-- レッドブルTV
    <div class="redbulltv__wrap">
      <div class="redbulltv__container">
        <iframe src="https://www.redbull.tv/embed/live/AP-1TZ5UWHPH1W11?stream=AP-1TYXZB9SS1W11" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
     -->

    <?php
      include_once dirname(__DIR__) . "/_include/live.php";
    ?>

    <div class="body-sec-inner">
      <section class="main-sec">

        <?php
        // static_contents
        // ===========================================
       include_once dirname(__DIR__) . '/_include/_static_contents.php';
        // ===========================================
        ?>

        <div class="sponsor-link column2">
          <div class="sponsor-link-item">
            <!-- /531683568/redbull_ad/crashed-ice-pc-footer-rectangle1 -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/redbull_ad/crashed-ice-pc-footer-rectangle1', [300, 250], 'div-gpt-ad-1520248301324-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1520248301324-0' style='height:250px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1520248301324-0'); });
            </script>
            </div>
            <!-- // /531683568/redbull_ad/crashed-ice-pc-footer-rectangle1 -->
          </div>
          <div class="sponsor-link-item">
            <!-- /531683568/redbull_ad/crashed-ice-pc-footer-rectangle2 -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/redbull_ad/crashed-ice-pc-footer-rectangle2', [300, 250], 'div-gpt-ad-1520248336389-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1520248336389-0' style='height:250px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1520248336389-0'); });
            </script>
            </div>
            <!-- // /531683568/redbull_ad/crashed-ice-pc-footer-rectangle2 -->
          </div>
        </div><!-- /.sponsor-link -->
      </section><!-- /.main-sec -->

      <section class="side-sec">
        <div id="sidebar-moving-container">

          <div class="sponsor-link">
            <!-- /531683568/redbull_ad/crashed-ice-sidebar-rectangle -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/redbull_ad/crashed-ice-sidebar-rectangle', [300, 250], 'div-gpt-ad-1520248097904-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1520248097904-0' style='height:250px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1520248097904-0'); });
            </script>
            </div>
            <!-- // /531683568/redbull_ad/crashed-ice-sidebar-rectangle -->
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

<script src="/assets/js/red-bull-crashed-ice-2018.bundle.js?v=<?php echo $page['version']; ?>"></script>

<script>
// ▼文字列を省略して「…」を付与
jQuery(function($) {
  $('.related__post p.related__post__text').each(function() {
    var $target = $(this);
    // オリジナルの文章を取得する
    var html = $target.html();
    // 対象の要素を、高さにautoを指定し非表示で複製する
    var $clone = $target.clone();
    $clone
      .css({
        //display: 'none',
        //position : 'absolute',
        position : 'fixed',
        top : 0,
        left:0,
        //overflow : 'visible'
      })
      .width($target.width())
      .height('4.5em');
    // DOMを一旦追加
    $target.after($clone);
    // 指定した高さになるまで、1文字ずつ消去していく
    while((html.length > 0) && ($clone.height() < $target.height())) {
      html = html.substr(0, html.length - 1);
      //$clone.html(html + '...');
      $target.html(html + '...');
    }
    // 文章を入れ替えて、複製した要素を削除する
    //$target.html($clone.html());
    $clone.remove();
  });
});
</script>

<style>

.related__post p.related__post__text {
  overflow: hidden;
  width: 414px;
  height: 4.5em!important;
}


</style>


<?php
// # パンくずリスト
// ==============================
  $BREADCRUMB = array(
    array(
      'label' => 'RED BULL CRASHED ICE EDMONTON ライブ配信',
      'path'  => '/red-bull-crashed-ice-2018/'
    ),
  );
?>

<?php

include_once __DIR__."/../../desktop/_footer.php";
include_once __DIR__."/../../_debug.php";

?>