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

  <?php include_once __DIR__.'/../../_env.php'; ?>

  <link rel="canonical" href="<?php echo $page['og_url']; ?>">
  <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>

  <?php
  endif;
  // -----------------------------------------
  ?>
  <link rel="stylesheet" href="/assets/sp/css/<?php echo $page['template_classname']; ?>/ui.css?v=<?php echo $page['version']; ?>">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <?php include_once __DIR__.'/../../_head_bottom.php'; ?>

<?php
/*
 * @since 2017-08-19 order によりアプリ webview UA 判定する
 */
?>
<?php
// app webview を UA 判定する JS を追加します - `app_ua_detector.bundle.js`
// @since 2017-08-21
?>
<script src="/assets/js/app_ua_detector.bundle.js"></script>
</head>
<body class="appbnr-disable">
<div class="whole <?php echo $page['template_classname']; ?>">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <div id="body-section" class="body-sec">
    <div class="body-sec-inner">

      <section class="summary">
        <div class="summary__inner">
          <h1 class="summary__heading">
            <picture>
              <source srcset="/assets/sp/images/toj-2018/summary-logo.png 2x">
              <img src="/assets/sp/images/toj-2018/summary-logo.png" alt="NTN presents Tour of Japan 2018">
            </picture>
          </h1>
          <p class="summary__copy--first">
            <picture>
              <source srcset="/assets/sp/images/toj-2018/summary-copy1.png 2x">
              <img src="/assets/sp/images/toj-2018/summary-copy1.png" alt="国内最大規模の自転車ロードレース!全8日間にわたる熱戦を、スポーツブルで無料ライブ配信。">
            </picture>
          </p>
          <p class="summary__copy--second">
            <picture>
              <source srcset="/assets/sp/images/toj-2018/summary-copy2.png 2x">
              <img src="/assets/sp/images/toj-2018/summary-copy2.png" alt="2018.05.20 –05.27">
            </picture>
          </p>
        </div><!-- /.summary-inner -->
      </section><!-- /.summary -->

      <?php
        include_once dirname(__DIR__) . "/_include/live.php";
      ?>

      <section class="main-sec">

        <?php
        // static_contents
        // ===========================================
        include_once dirname(__DIR__) . '/_include/_static_contents_sp.php';
        // ===========================================
        ?>

      </section><!-- /.main-sec -->

      <div class="side-sec">
        <div class="sponsor-link">
          <!-- /531683568/redbull_ad/crashed-ice-sp-rectangle -->
          <script>
            googletag.cmd.push(function() {
              googletag.defineSlot('/531683568/redbull_ad/crashed-ice-sp-rectangle', [300, 250], 'div-gpt-ad-1520248035299-0').addService(googletag.pubads());
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
          </script>
          <div id='div-gpt-ad-1520248035299-0' style='height:250px; width:300px;'>
          <script>
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1520248035299-0'); });
          </script>
          </div>
          <!-- // /531683568/redbull_ad/crashed-ice-sp-rectangle -->
        </div>
      </div>

    </div>
  </div><!-- /.body-sec -->

  <?php
  // # パンくずリスト
  // ==============================
    $BREADCRUMB = array(
      array(
        'label' => $page['title'],
        'path'  => '/red-bull-box-cart-2017/'
      ),
    );
  ?>

  <footer class="foot-sec">
    <?php
    include_once __DIR__."/../../mobile/_footer-sec-inner.php";
    ?>
  </footer><!-- /.foot-sec -->

</div><!-- /.whole -->

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '842032129256034',
      xfbml      : true,
      version    : 'v2.11'
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

<script src="/assets/js/bundle/exe.bundle.js"></script>
<script src="/assets/js/toj-2018.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script>
  var schedule = $('.js-scheduleToggle');
  var scheduleUnit = schedule.find('.schedule__unit');
  var scheduleToggle = scheduleUnit.find('.schedule__header');
  var scheduleBtnHighlight = scheduleUnit.find('.button__highlight');
  var scheduleBtnFulltIme = scheduleUnit.find('.button__fulltime');
  var setDetailHeight = function(target) {
    var mh = target.find('.schedule__detail').find('.schedule__map').outerHeight(true);
    var ih = target.find('.schedule__detail').find('.schedule__info').outerHeight(true);
    if(target.attr('class').match(/is-open/)) {
      target.find('.schedule__detail').height(mh + ih);
    } else {
      target.find('.schedule__detail').height(0);
    }
  }
  var setOpenHeight = function() {
    for(var i = 0; i < scheduleUnit.length; i++) {
      var className = scheduleUnit.eq(i).attr('class');
      if(className.match(/is-open/)) {
        setDetailHeight(scheduleUnit.eq(i));
      }
    }
  }
  scheduleToggle.on('click', function(e) {
    var index = scheduleToggle.index(this);
    scheduleUnit.eq(index).toggleClass('is-open');
    setDetailHeight(scheduleUnit.eq(index));
  });
  scheduleBtnHighlight.on('click', function(e) {
    e.stopPropagation();
  });
  scheduleBtnFulltIme.on('click', function(e) {
    e.stopPropagation();
  })
  $(window).on('resize', function(){
    setOpenHeight();
  });
  setOpenHeight();
</script>
</body>
</html>

<?php
include_once __DIR__."/../../_debug.php";
?>