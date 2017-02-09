<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=1280">
  <script src="/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>" id="sagen" data-browser="true" data-orientation="true"></script>

  <title>サッカー・野球 日本代表公式【W侍】日本代表特集 日本戦全試合ハイライト / 試合速報配信中！ | SPORTS BULL</title>
  <meta name="apple-itunes-app" content="app-id=1086719653">
  <meta name="description" content="毎日配信される膨大な記事の中から、オススメ記事と言いつつ編集長が独断と偏見とたっぷりの真心を込めてお届けします。">
  <meta name="keywords" content="スポーツ,メディア,クレイジー,アスリート,ニュース,動画,sports,media,crazy">
  <!-- sns ogp -->
  <meta property="og:title" content="サッカー・野球 日本代表公式【W侍】日本代表特集 日本戦全試合ハイライト / 試合速報配信中！ | SPORTS BULL">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://sportsbull.jp/assets/images/common/og_image.png">
  <meta property="og:url" content="https://sportsbull.jp/w_samurai/">
  <meta property="og:description" content="毎日配信される膨大な記事の中から、オススメ記事と言いつつ編集長が独断と偏見とたっぷりの真心を込めてお届けします。">
  <!-- twitter card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@sportsbull_jp">
  <!-- favicon -->
  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="canonical" href="https://sportsbull.jp/w_samurai/">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <link rel="stylesheet" href="/assets/css/w_samurai/ui.css?v=<?php echo $page['version']; ?>">

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
<div class="whole theme_newdark w_samurai">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <div class="body-sec">
    <div class="body-sec-inner">

      <section class="main-sec">

        PCメインコンテンツ

      </section><!-- /.main-sec -->

      <section class="side-sec">
        <div id="sidebar-moving-container">

          <?php
          /*
           * https://github.com/undotsushin/undotsushin/issues/720
           * 広告 / PC版画像バナー広告をDFP管理下にする
           */
          ?>
          <?php if ( $page['ad']['pc']['sidebar_top'] ) : ?>
          <div class="sponsor-link">

            <script type='text/javascript'>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/<?php echo $page['ad']['pc']['sidebar_top']; ?>', [300, 250], 'div-gpt-ad-pc_sidebar_top').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-pc_sidebar_top' style='height:250px; width:300px;'>
            <script type='text/javascript'>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-pc_sidebar_top'); });
            </script>
            </div>

          </div>
          <?php endif; ?>

          <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="SPORTS BULLアプリ版(iPhone/Android対応) アプリでサクサク楽しむ！"></a></div>
          <div class="synSearch-bnr mt20"><a href="http://pickup.syndot.jp/about/?utm_source=undou_pc&utm_medium=banner&utm_campaign=search" target="_blank"><img src="/assets/images/common/bnr-side-synsearch.png" alt="Syn.search チャットで検索？"></a></div>

          <?php
          // ------------------------------------
          // sidebar recommend, オススメ記事
          ?>
          <div id="widget-recommend-list-container"></div><!--/recommend-->

          <div id="widget-ranking-container"></div><!--/ranking-->

          <?php if ( $page['category']['slug'] !== 'crazy' ) : ?>
          <div id="sponsor-link-ranking" class="sponsor-link sponsor-link-ranking">
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35250&targetID=adg_35250&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
          </div>
          <?php endif; ?>

          <div id="widget-recommend-container"></div><!--/videos-->
          <div id="sponsor-link-recommend" class="sponsor-link sponsor-link-recommend">
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35251&targetID=adg_35251&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
          </div>

          <?php
          // ------------------------------------
          // sidebar bottom
          ?>
          <?php if ( $page['ad']['pc']['sidebar_bottom'] ) :?>
          <div class="sponsor-link nadir">

            <script type='text/javascript'>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/<?php echo $page['ad']['pc']['sidebar_bottom']; ?>', [300, 600], 'div-gpt-ad-pc_sidebar_bottom').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-pc_sidebar_bottom' style='height:600px; width:300px;'>
            <script type='text/javascript'>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-pc_sidebar_bottom'); });
            </script>
            </div>

          </div>
          <?php endif; ?>

        </div><!--/#sidebar-moving-->
      </section><!-- /.side-sec -->
    </div>
  </div><!-- /.body-sec -->

  <footer class="foot-sec">
    <div class="foot-sec-inner">
      <nav class="foot-breadCrumb">
        <ol itemscope itemtype="http://schema.org/breadCrumbList">
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="1" /></a></li>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="p.php"><span itemprop="name">【W侍】サッカー・野球 日本代表戦 全試合ハイライト / 試合速報配信</span><meta itemprop="position" content="3" /></a></li>
        </ol>
      </nav><!-- /.foot-breadCrumb -->

      <div class="foot-pr">
        <div class="foot-pr-inner">
          <figure><img src="/assets/images/common/footer-overview-figure.png" alt=""></figure>

          <div class="text-block">
            <h3 class="foot-pr-logo"><img src="/assets/images/common/footer-overview-logo.png" alt="SPORTS BULL アプリ版(iPhone/Android)"></h3>
            <ul class="foot-pr-btn">
              <li><a href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
              <li><a href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
            </ul>
            <p class="foot-pr-text">話題のスポーツニュースがサクサク読める、無料のニュースまとめアプリ「スポーツ・ブル」。高品質なスポーツのニュース、動画をいつでもお楽しみ頂けます。スマートフォンアプリをダウンロードして今日のニュースをチェックしましょう。</p>
          </div><!-- /.text-block -->

          <div class="fb-page-plugin">
            <div class="fb-page" data-href="https://www.facebook.com/sportsbull/" data-width="400" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/sportsbull/"><a href="https://www.facebook.com/sportsbull/">スポーツブル（SPORTS BULL）</a></blockquote></div></div>
          </div>
        </div><!-- /.foot-pr-inner -->
      </div><!-- /.foot-pr -->

      <div class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

      <div class="fnav-block">
        <nav class="fnav">
          <h3 class="fnav-logo"><img src="/assets/images/common/footer-fnav-logo.png" alt="SPORTS BULL"></h3>
          <ul>
            <li><a href="/about/">サービス紹介</a></li>
            <li><a href="/about/company/">会社概要</a></li>
            <li><a href="/about/privacy/">プライバシーポリシー</a></li>
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
      </div><!-- /.fnav-block -->
    </div><!-- /.foot-sec-inner -->
  </footer><!-- /.foot-sec -->

</div><!-- /.whole -->

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
/*
 * $page['apiRoot'] を元に API request 先を決定します
 * php側で任意の apiRoot が 設定されている時に
 * UT.app.App.develop(); を行います
 *
*/
//print_r('********************');
//print_r($page['apiRoot']);
//print_r('********************');

if ($page['apiRoot'] != '') :
  // develop mode
  // dev, stg, local から起動の時のみ script tag を有効にします
?>
<script>
( function () {
  'use strict';
  var UT = self.UT;
  // リクエスト先を変更します
  //  UT.app.App.develop( 'https://dev.sportsbull.jp' );
  UT.app.App.develop();
}());
</script>
<?php endif; ?>
  <script src="/assets/js/samurai.bundle.js?v=<?php echo $page['version']; ?>"></script>

</body>
</html>
