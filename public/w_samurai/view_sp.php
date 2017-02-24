<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <title>W侍 日本代表特集 | SPORTS BULL</title>
  <meta name="apple-itunes-app" content="app-id=1086719653">
  <meta name="description" content="サッカー &amp; 野球 日本代表公式。W侍 全試合ハイライト動画 &amp; 試合速報配信をスポーツブルで。">
  <meta name="keywords" content="サッカー, 野球, 日本代表, W侍, ハイライト動画, 試合速報, スポーツ, メディア, ニュース, 動画, sports, media">
  <!-- sns ogp -->
  <meta property="og:title" content="W侍 日本代表特集 | SPORTS BULL">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://sportsbull.jp/assets/images/w_samurai/ogp.png">
  <meta property="og:url" content="https://sportsbull.jp/w_samurai/">
  <meta property="og:description" content="サッカー &amp; 野球 日本代表公式。W侍 全試合ハイライト動画 &amp; 試合速報配信をスポーツブルで。">
  <!-- twitter card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@sportsbull_jp">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="canonical" href="https://sportsbull.jp/w_samurai/">
  <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>

  <?php
  endif;
  // -----------------------------------------
  ?>
  <link rel="stylesheet" href="/assets/sp/css/w_samurai/ui.css?v=<?php echo $page['version']; ?>">

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
<body class="appbnr-disable">
<div class="whole w_samurai">
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

  <div class="body-sec">
    <div class="body-sec-inner">

      <section class="main-sec">
        <div class="summary">
          <h1 class="summary__heading"><img src="/assets/sp/images/w_samurai/heading.png" alt="【W侍】日本代表特集 サッカー・野球 日本代表公式ハイライト動画 / 試合速報 全試合配信中！"></h1>
        </div><!-- /.summary -->

        <div class="yellfor">
          <div class="yellfor__section yellfor--soccer">
            <h2 class="yellfor__heading"><img src="/assets/sp/images/w_samurai/soccer-heading.png" alt="サッカー日本代表 アジア最終予選 - ROAD TO RUSSIA"></h2>
            <ul class="yellfor__btns">
              <li class="yellfor__btns__item"><a href="https://sportsbull.jp/p/103261/" target="_blank"><img src="/assets/sp/images/w_samurai/soccer-btn_highlight.png" alt="試合日程・ハイライト動画"></a></li>
              <li class="yellfor__btns__item"><img src="/assets/sp/images/w_samurai/soccer-btn_live.png" alt="試合速報 3月23日 UAE戦 COMING SOON"></li>
            </ul><!-- /.yellfor__btns -->
          </div><!-- /.yellfor__section -->

          <div class="yellfor__section yellfor--baseball">
            <h2 class="yellfor__heading"><img src="/assets/sp/images/w_samurai/baseball-heading.png" alt="野球日本代表 2017 WORLD BASEBALL CLASSIC &tm;"></h2>
            <ul class="yellfor__btns">
              <li class="yellfor__btns__item"><a href="https://sportsbull.jp/p/103254/" target="_blank"><img src="/assets/sp/images/w_samurai/baseball-btn_highlight.png" alt="試合日程・ハイライト動画"></a></li>
              <li class="yellfor__btns__item"><a href="https://sportsbull.jp/wbc/" target="_blank"><img src="/assets/sp/images/w_samurai/baseball-btn_live.png" alt="試合速報 3月7日 キューバ戦 COMING SOON"></a></li>
            </ul><!-- /.yellfor__btns -->
          </div><!-- /.yellfor__section -->
        </div><!-- /.yellfor -->

        <aside class="bnr-campaign"><a href="/w_samurai/campaign/"><img src="/assets/sp/images/w_samurai/bnr-campaign.png" alt="サッカー賞品・野球賞品 プレゼントキャンペーン プレゼント応募はこちら"></a></aside>

        <?php
        // app in webview 時に .head-sec を非表示にする
        // if (!$from_webview) :
        ?>
        <?php
        // <aside class="bnr-app for-ios"><a href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/sp/images/w_samurai/bnr-app.png" alt="スポーツブル アプリをダウンロード"></a></aside>
        // <aside class="bnr-app for-android"><a href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/sp/images/w_samurai/bnr-app.png" alt="スポーツブル アプリをダウンロード"></a></aside>
        ?>
        <?php
        // endif;
        // -----------------------------------------
        ?>
        <aside class="bnr-app"><a href="https://app.adjust.com/7hfkzc" target="_blank"><img src="/assets/sp/images/w_samurai/bnr-app.png" alt="スポーツブル アプリをダウンロード"></a></aside>
      </section><!-- /.main-sec -->
    </div>
  </div><!-- /.body-sec -->

  <?php
  // app in webview 時に .foot-sec を非表示にする
  if (!$from_webview) :
  ?>
  <footer class="foot-sec">
    <div class="foot-sec-inner">

      <div class="foot-pr">
        <div class="foot-pr-inner">
          <figure class="foot-pr-logo"><img src="/assets/sp/images/common/footer-overview-logo.png" alt="SPORTS BULL"></figure>
          <div class="text-block">
            <h3 class="foot-pr-heading">スポーツブルアプリをダウンロード</h3>
            <ul class="foot-pr-list">
              <li class="foot-pr-item"><a class="foot-pr-link" href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
              <li class="foot-pr-item"><a class="foot-pr-link" href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
            </ul>
          </div>
        </div><!-- /.foot-pr-inner -->

        <div class="fb-page-plugin">
          <div class="fb-page" data-href="https://www.facebook.com/sportsbull/" data-width="500" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/sportsbull/"><a href="https://www.facebook.com/sportsbull/">スポーツブル（SPORTS BULL）</a></blockquote></div></div>
        </div>

        <div class="foot-pr-bnr"><a href="http://pickup.syndot.jp/about/?utm_source=undou_sp&utm_medium=banner&utm_campaign=search" target="_blank"><img src="/assets/sp/images/common/bnr-footer-synsearch.png" alt="Syn.search チャットで検索？"></a></div>
      </div><!-- /.foot-pr -->

      <div id="js-page_top" class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

      <nav class="fnav">
        <ul>
          <li><a href="/about/">サービス紹介</a></li>
          <li><a href="/about/privacy/">プライバシーポリシー</a></li>
          <li><a href="/about/company/">会社概要</a></li>
          <li><a href="/about/terms/">利用規約</a></li>
        </ul>
      </nav><!-- /.fnav -->

      <div class="sns-block">
        <ul>
          <li class="sns-fb"><a href="https://www.facebook.com/sportsbull/" target="_blank">facebook</a></li>
          <li class="sns-tw"><a href="https://twitter.com/sportsbull_jp" target="_blank">twitter</a></li>
          <li class="sns-yt"><a href="https://www.youtube.com/channel/UCKwqba9IWuSKIk3DIpryOHw" target="_blank">youtube</a></li>
        </ul>
      </div><!-- /.sns-block -->

      <p class="copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
    </div><!-- /.foot-sec-inner -->
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

<script src="/assets/js/picks.bundle.js?v=<?php echo $page['version']; ?>"></script>

</body>
</html>
