<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="pragma" content="no-cache">
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
  <link href="https://fonts.googleapis.com/css?family=Mukta+Vaani:800" rel="stylesheet">

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
    <div class="fwt-bg-container">
      <?php
        // static_contents
        // ===========================================
        include_once dirname(__DIR__) . '/_include/_static_live.php';
        // ===========================================
      ?>

      <div class="body-sec-inner">
        <div class="main-sec">
          <?php
            // static_contents
            // ===========================================
           include_once dirname(__DIR__) . '/_include/_static_main.php';
            // ===========================================
          ?>

          <ul class="fwt--footer-rectangle">
            <li>

              <!-- /531683568/fwt-ad/fwt-pc-footer-rectangle1 -->
              <script>
                googletag.cmd.push(function() {
                  googletag.defineSlot('/531683568/fwt-ad/fwt-pc-footer-rectangle1', [300, 250], 'div-gpt-ad-1515647523981-0').addService(googletag.pubads());
                  googletag.pubads().enableSingleRequest();
                  googletag.enableServices();
                });
              </script>
              <div id='div-gpt-ad-1515647523981-0' style='height:250px; width:300px;'>
              <script>
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515647523981-0'); });
              </script>
              </div>
              <!-- // /531683568/fwt-ad/fwt-pc-footer-rectangle1 -->

            </li>
            <li>

              <!-- /531683568/fwt-ad/fwt-pc-footer-rectangle2 -->
              <script>
                googletag.cmd.push(function() {
                  googletag.defineSlot('/531683568/fwt-ad/fwt-pc-footer-rectangle2', [300, 250], 'div-gpt-ad-1515647582515-0').addService(googletag.pubads());
                  googletag.pubads().enableSingleRequest();
                  googletag.enableServices();
                });
              </script>
              <div id='div-gpt-ad-1515647582515-0' style='height:250px; width:300px;'>
              <script>
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515647582515-0'); });
              </script>
              </div>
              <!-- // /531683568/fwt-ad/fwt-pc-footer-rectangle2 -->

            </li>
          </ul>

        </div><!-- /.main-sec -->

        <?php
          // static_contents
          // ===========================================
          include_once dirname(__DIR__) . '/_include/_static_sidebar.php';
          // ===========================================
        ?>

      </div><!-- /.body-sec-inner -->
    </div><!-- /.fwt-bg-container -->
  </div><!-- /.body-sec -->

<script src="/assets/js/related_sidebar_by_env.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php
// # パンくずリスト
// ==============================
  $BREADCRUMB = array(
    array(
      'label' => 'Freeride World Tour 2018 ライブ配信',
      'path'  => '/fwt/'
    ),
  );
?>


<script>
// ▼文字列を省略して「…」を付与
jQuery(function($) {
  $('.fwt--related p').each(function() {
    var $target = $(this);
    // オリジナルの文章を取得する
    var html = $target.html();
    // 対象の要素を、高さにautoを指定し非表示で複製する
    var $clone = $target.clone();
    $clone
      .css({
        display: 'none',
        position : 'absolute',
        overflow : 'visible'
      })
      .width($target.width())
      .height('auto');
    // DOMを一旦追加
    $target.after($clone);
    // 指定した高さになるまで、1文字ずつ消去していく
    while((html.length > 0) && ($clone.height() > $target.height())) {
      html = html.substr(0, html.length - 1);
      $clone.html(html + '...');
    }
    // 文章を入れ替えて、複製した要素を削除する
    $target.html($clone.html());
    $clone.remove();
  });
});
</script>

<style>
.fwt--related p {
  overflow: hidden;
  width: 428px;
  height: 4.5em;
}
</style>

<?php

include_once __DIR__."/../../desktop/_footer.php";
include_once __DIR__."/../../_debug.php";

?>