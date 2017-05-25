<?php
/**
 * モータースポーツ - カルーセル・ヘッドライン
 * User: @taikiken
 * Date: 2017/05/25
 * Time: 14:35
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=1280">
  <script src="/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>" id="sagen" data-browser="true" data-orientation="true"></script>
  <title>XXX | SPORTS BULL</title>
  <meta name="description" content="XXX">
  <meta name="keywords" content="XXX">
  <!-- sns ogp -->
  <meta property="og:title" content="XXX | SPORTS BULL">
  <meta property="og:type" content="<?php echo $page['og_type']; ?>">
  <meta property="og:image" content="XXX">
  <meta property="og:url" content="https://sportsbull.jp/motorsports/<?php echo $option_directory; ?>/">
  <meta property="og:description" content="XXX">
  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@sportsbull_jp">
  <!-- favicon -->
  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="canonical" href="https://sportsbull.jp/motorsports/<?php echo $option_directory; ?>/">
<!--  <script src="/assets/js/libs/vendor.react.js?v=--><?php //echo $page['version']; ?><!--"></script>-->
<!--  <script src="/assets/js/bundle/main.bundle.js?v=--><?php //echo $page['version']; ?><!--"></script>-->
  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">

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
    ga('require', 'linkid');
    ga('require', 'displayfeatures');
    ga('send', 'pageview');

  </script>
</head>
<body>
<div id="whole" class="whole dark layout-list motorsports motorsports-<?php echo $option_directory; ?>">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

<?php
// body section
// -------------------------------------------------------------------------------
?>
  <div class="body-sec">
    <?php
    // pickup-container - carousel
    // ===========================================
    include_once dirname(__DIR__) . '/_include/_pickup_container.php';
    // ===========================================
    ?>
    <div class="body-sec-inner">
      <section class="main-sec">
        <div class="sponsor-link mt30">
          <a href="hoge"><img src="/assets/images/motorsports/bnr-sponsor1.png" alt="xxxxx"></a>
        </div><!-- /.sponsor-link -->
        <?php
        // headline-container
        // ===========================================
        include_once dirname(__DIR__) . '/_include/_headline_container.php';
        // ===========================================
        ?>
      </section>

      <section class="side-sec">
        <?php
//        include_once __DIR__."/../../../app/templates/desktop/_sidebar_ad.php";
        ?>
      </section><!-- /.side-sec -->

    </div><!--/.body-sec-inner-->
  </div><!--/.body-sec-->
<?php
// -------------------------------------------------------------------------------
?>

</div><!-- /.whole -->
</body>
</html>
