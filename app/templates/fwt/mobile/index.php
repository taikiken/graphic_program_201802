<?php
// app webview かを `?app=(ios|android)` から判定します
// ==============================
$from_webview = false;
if (isset($_GET['app'])) {
  if ($_GET['app'] == 'ios' || $_GET['app'] == 'android') {
    $from_webview = true;
  }
}
?>

<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
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
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="canonical" href="<?php echo $page['og_url']; ?>">

  <?php
  endif;
  // -----------------------------------------
  ?>

  <?php include_once __DIR__.'/../../_env.php'; ?>

   <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>

  <link rel="stylesheet" href="/assets/sp/css/<?php echo $page['template_classname']; ?>/ui.css?v=<?php echo $page['version']; ?>">
  <link href="https://fonts.googleapis.com/css?family=Mukta+Vaani:800" rel="stylesheet">

  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>


  <?php include_once __DIR__.'/../../_head_bottom.php'; ?>

</head>
<body class="appbnr-disable">
<div class="whole <?php echo $page['template_classname']; ?>">
  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <header class="head-sec app_hidden">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->
  <?php
  endif;
  // -----------------------------------------
  ?>

<?php
// ------------------------------------------------
// SP カテゴリー
// ------------------------------------------------
?>

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

          <div class="fwt--sp-banner">
            <!-- /531683568/fwt-ad/fwt-sp-rectangle -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/fwt-ad/fwt-sp-rectangle', [300, 250], 'div-gpt-ad-1515143370843-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>

            <div id='div-gpt-ad-1515143370843-0' style='height:250px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515143370843-0'); });
            </script>
            </div>
            <!-- // /531683568/fwt-ad/fwt-sp-rectangle -->
          </div>

        </div><!-- /.main-sec -->

      </div><!-- /.body-sec-inner -->
    </div><!-- /.fwt-bg-container -->
  </div><!-- /.body-sec -->

  <?php
  // app in webview 時に .foot-sec を非表示にする
  if (!$from_webview) :
  ?>

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

  <footer class="foot-sec app_hidden">
    <?php
    include_once __DIR__."/../../mobile/_footer-sec-inner.php";
    ?>
  </footer><!-- /.foot-sec -->

  <?php
  // -----------------------------------------
  endif;
  ?>

</div><!-- /.whole -->

<?php
// app in webview 時に .foot-sec を非表示にするので FB いらない
if (!$from_webview) :
?>
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '842032129256034',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>
<?php
endif;
// -----------------------------------------
?>

<script src="/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>

<!-- アコーディオン -->
<script>
$(function(){
  $("#accordion li > div").on("click", function() {
    $(this).next().slideToggle(200,"swing");
    $(this).toggleClass("active");
  });
});

$(function(){
  $("#readMore").on("click",function(){
    $(this).hide();
    $(this).prev("p").addClass('active');
  })
});
</script>

<!-- アプリで非表示にする -->
<script>
  var platform = SPBL_ENV.platform;
  if (platform === 'app_android' || platform === 'app_ios') {
    $(function(){
      $(".app_hidden").hide();
    });
  }
</script>

</body>
</html>

<?php
include_once __DIR__."/../../_debug.php";
?>