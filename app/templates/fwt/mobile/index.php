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
  <script>
    SPBL_ENV.page     = 'feature';
    SPBL_ENV.category = 'fwt';
    SPBL_ENV.p        = '';
  </script>

   <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>

  <link rel="stylesheet" href="/assets/sp/css/<?php echo $page['template_classname']; ?>/ui.css?v=<?php echo $page['version']; ?>">
  <link href="https://fonts.googleapis.com/css?family=Mukta+Vaani:800" rel="stylesheet">

  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>


  <?php include_once __DIR__.'/../../_head_bottom.php'; ?>

<script>
  console.log(SPBL_ENV);
</script>
</head>
<body class="appbnr-disable">
<div class="whole <?php echo $page['template_classname']; ?>">
  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <header class="head-sec">
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


  <footer class="foot-sec app_hidden">
    <div class="foot-sec-inner">
      <?php
      // SEO対策 / パンくずリストを設置する #776
      include_once __DIR__."/../_breadcrumb.php"; ?>
      <div class="foot-pr">
        <div class="foot-pr-inner">
          <figure class="foot-pr-figure"><img src="/assets/sp/images/common/footer-overview-figure.png" alt="無料スポーツニュース&amp;動画アプリの決定版！"></figure>

          <div class="text-block">
            <h3 class="foot-pr-text"><img src="/assets/sp/images/common/footer-overview-text.png" alt=""></h3>
            <ul class="foot-pr-list">
              <li class="foot-pr-item"><a class="foot-pr-link" href="https://app.adjust.com/5je1ts?deep_link=sportsbull%3A%2F%2F" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
              <li class="foot-pr-item"><a class="foot-pr-link" href="https://app.adjust.com/5je1ts?deep_link=sportsbull%3A%2F%2F" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
            </ul>
          </div>
        </div><!-- /.foot-pr-inner -->

        <div class="foot-pr-btn">
          <a href="https://app.adjust.com/5je1ts?deep_link=sportsbull%3A%2F%2F" target="_blank">今すぐダウンロード</a>
        </div><!-- /.foot-pr-btn -->

        <div class="fb-page-plugin">
          <div class="fb-page" data-href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-width="500" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/"><a href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/"><?php echo $page['site_name']; ?></a></blockquote></div></div>
        </div>

      </div><!-- /.foot-pr -->

      <div class="sns-block">
        <ul>
          <li class="sns-fb"><a href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/" target="_blank">facebook</a></li>
          <li class="sns-tw"><a href="https://twitter.com/<?php echo $page['sns']['twitter']; ?>" target="_blank">twitter</a></li>
          <li class="sns-yt"><a href="https://www.youtube.com/channel/<?php echo $page['sns']['youtube']; ?>" target="_blank">youtube</a></li>
        </ul>
      </div><!-- /.sns-block -->

      <p class="copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
    </div><!-- /.foot-sec-inner -->
  </footer><!-- /.foot-sec -->

  <?php
include_once __DIR__."/../${page['ua']}/_footer.php";
  ?>

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