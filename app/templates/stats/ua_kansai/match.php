<?php
include __DIR__."/getData.php";
$gameId = $_GET["gameId"];
$dataArray = getData::getMatch($gameId);
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  <meta charset="UTF-8">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no">
  <script src="/assets/js/libs/sagen/sagen.min.js" id="sagen" data-browser="true"></script>
  <script src="/assets/js/app_divide.bundle.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <title><?=$dataArray["playFirstName"]?> vs <?=$dataArray["drawFirstName"]?> - 関西学生アメリカンフットボールリーグ | 速報 &amp; データ | スポーツブル (スポブル)</title>
  <script src="/assets/js/libs/vendor.react.js"></script>
  <script src="/assets/js/bundle/main.bundle.js"></script>

  <meta name="keywords" content="関西学生アメリカンフットボールリーグ, 関西アメフト, 日程結果, スポーツ, メディア, ニュース, 動画, sports, media,<?=$dataArray["playFirstName"]?>,<?=$dataArray["drawFirstName"]?>">
  <meta name="description" content="<?=$dataArray["playFirstName"]?> vs <?=$dataArray["drawFirstName"]?>。関西学生アメリカンフットボールリーグ 試合速報&データ見るならスポーツブル(スポブル)で。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。">

  <meta property="fb:app_id" content="842032129256034">
  <meta property="og:site_name" content="スポーツブル / SPORTS BULL">
  <meta property="og:type" content="article">
  <meta property="og:title" content="<?=$dataArray["playFirstName"]?> vs <?=$dataArray["drawFirstName"]?> - 関西学生アメリカンフットボールリーグ | 速報 & データ | スポーツブル (スポブル)">
  <meta property="og:image" content="https://sportsbull.jp/assets/stats/ua_kansai/images/ogp.jpg">
  <meta property="og:url" content="https://sportsbull.jp/stats/ua_kansai/match/?gameId=<?=$gameId?>">
  <meta property="og:description" content="<?=$dataArray["playFirstName"]?> vs <?=$dataArray["drawFirstName"]?>。関西学生アメリカンフットボールリーグ 試合速報&データ見るならスポーツブル(スポブル)で。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。">
  <meta property="og:locale" content="ja_JP" />

  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@sportsbull_jp">
  <meta name="twitter:title" content="<?=$dataArray["playFirstName"]?> vs <?=$dataArray["drawFirstName"]?> - 関西学生アメリカンフットボールリーグ | 速報 & データ | スポーツブル (スポブル)">
  <meta name="twitter:image" content="https://sportsbull.jp/assets/stats/ua_kansai/images/ogp.jpg">
  <meta name="twitter:url" content="https://sportsbull.jp/stats/ua_kansai/match/?gameId=<?=$gameId?>">
  <meta name="twitter:description" content="<?=$dataArray["playFirstName"]?> vs <?=$dataArray["drawFirstName"]?>。関西学生アメリカンフットボールリーグ 試合速報&データ見るならスポーツブル(スポブル)で。スポーツブルは、インターネットスポーツメディアです。数十社の良質なスポーツ媒体と連携し、話題のスポーツニュース記事、動画をいち早くお届けします。また、ここでしか見ることの出来ないオリジナル記事や、番組を配信しています。スマートフォンはもちろん、PC、タブレットでもお楽しみいただけます。">

  <link rel="canonical" href="">
  <link rel="apple-touch-icon" sizes="180x180" href="https://sportsbull.jp/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="https://sportsbull.jp/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="https://sportsbull.jp/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">


  <!-- 表示確認用 / -->
  <link rel="stylesheet" href="/assets/css/tmp/head_foot_demo.css" media="only screen and (min-width: 769px)">
  <link rel="stylesheet" href="/assets/sp/css/tmp/head_foot_demo.css" media="only screen and (max-width: 768px)">
  <!-- / 表示確認用 -->

  <link rel="stylesheet" href="/assets/css/basic.css" media="only screen and (min-width: 769px)">
  <link rel="stylesheet" href="/assets/sp/css/basic.css" media="only screen and (max-width: 768px)">

  <!-- 関西アメフト用css,js -->
  <link rel="stylesheet" href="/assets/stats/ua_kansai/css/ui.css">
  <!-- <link rel="stylesheet" href="/assets/stats/ua_kansai/js/demo.js"> -->
  <link rel="stylesheet" href="/assets/stats/ua_kansai/css/style.css">
  <!-- optimize -->
  <style>.async-hide { opacity: 0 !important} </style>
  <script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
  h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
  (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
  })(window,document.documentElement,'async-hide','dataLayer',4000,
  {'GTM-KJ33JM9':true});</script>
  <!-- //optimize -->

  <!-- ad/dfp -->
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
  <!-- ad/dfp -->

  <!-- ad/appvador -->
  <script>
    googletag.cmd.push(function() {
      googletag.defineSlot('/531683568/appvador', [320, 180], 'div-gpt-ad-1501126889988-0').addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
    });
  </script>
  <!-- //ad/appvador -->

  <!-- ad/dfp - pc/rectangle -->
  <script>
    googletag.cmd.push(function() {
      googletag.defineSlot('/531683568/npb-pc-rectangle', [300, 250], 'div-gpt-ad-1492577512561-0').addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
    });
  </script>
  <!-- //ad/dfp - pc/rectangle -->

  <!-- ad/npb-sp-anchor -->
  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-8613117509675807",
      enable_page_level_ads: true
    });
  </script>
  <!-- // ad/npb-sp-anchor -->

  <!-- ga -->
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
  <!-- //ga -->

</head>
<body>

<!-- ad/531683568/appvador -->
<div id='div-gpt-ad-1501126889988-0'>
<style>#div-gpt-ad-1501126889988-0 * { line-height:0; }</style>
<script>
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1501126889988-0'); });
</script>
<script type="text/javascript" src="//cdn.apvdr.com/js/apv-ifbstr.min.js"></script>
</div>
<!-- ad/531683568/appvador -->

<div id="whole" class="whole dark">

  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <div class="body-sec">
    <div class="nav-heade-area">
      <div class="nav-heade">
        <h2><img src="/assets/stats/ua_kansai/images/header.png" alt="関西学生アメフト 試合速報"></h2>
        <div class="btnbox">
          <a href="/stats/ua_kansai/">日程・結果へ</a>
        </div>
      </div>
    </div>

    <div id="result-sec">
      <div class="inner">
        <?=$dataArray["headInner"]?>
      </div><!-- /.inner -->
      <span class="blue-line"></span>
      <span class="red-line"></span>
    </div><!-- /#result-sec -->
    <div class="body-sec-inner">
      <section class="main-sec">

        <div class="stats__banner mt30">
          <div id="ua-pc-big-banner" style='height:90px; width:728px;'>
            <!-- /531683568/kansai-amefoot-ad/ua-pc-big-banner -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/kansai-amefoot-ad/ua-pc-big-banner', [728, 90], 'div-gpt-ad-1504503001230-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1504503001230-0'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1504503001230-0'); });
            </script>
            </div>
            <!-- // /531683568/kansai-amefoot-ad/ua-pc-big-banner -->
          </div>

          <div id="ua-sp-big-banner" style='height:50px; width:320px;'>
            <!-- /531683568/kansai-amefoot-ad/ua-sp-big-banner -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/kansai-amefoot-ad/ua-sp-big-banner', [320, 50], 'div-gpt-ad-1504503049105-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1504503049105-0'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1504503049105-0'); });
            </script>
            </div>
            <!-- // /531683568/kansai-amefoot-ad/ua-sp-big-banner -->
          </div>

          <div id="ua-app-big-banner" style='height:50px; width:320px;'>
            <!-- /531683568/kansai-amefoot-ad/ua-app-big-banner -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/kansai-amefoot-ad/ua-app-big-banner', [320, 50], 'div-gpt-ad-1504503090397-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1504503090397-0'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1504503090397-0'); });
            </script>
            </div>
            <!-- // /531683568/kansai-amefoot-ad/ua-app-big-banner -->
          </div>
        </div><!-- /.stats__banner -->

        <nav id="game-info" class="active-0">
          <ul>
            <li>基本情報</li>
            <li>得点経過</li>
            <li>個人成績</li>
          </ul>
        </nav>
        <div id="basic-info">
          <h3>関連動画</h3>
          <div class="movie">
            <?=$dataArray["movie"]?>
          </div><!-- /.movie -->

          <h3>各クオーター結果</h3>
          <div class="quarter">
            <table>
              <thead>
                <tr>
                  <th width="25%">チーム</th>
                  <th>1Q</th>
                  <th>2Q</th>
                  <th>3Q</th>
                  <th>4Q</th>
                  <th>合計</th>
                </tr>
              </thead>
              <tbody>
                <?=$dataArray["quarter"]?>
              </tbody>
            </table>
          </div><!-- /.quarter -->

          <h3>データ</h3>
          <div class="data">
            <table>
              <?=$dataArray["data"]?>
            </table>
            <div class="digestbtn"><?=$dataArray["digest"]?></div>
          </div><!-- /.data -->
        </div><!-- /#basic-info -->
        <div id="score-info">
          <ul>
            <?=$dataArray["scoreInfo"]?>
          </ul>
        </div><!-- /#score-info -->

        <div id="personal-info">
          <nav id="team-tab" class="active-0">
            <ul>
              <li><?=$dataArray["playFirstName"]?></li>
              <li><?=$dataArray["drawFirstName"]?></li>
            </ul>
          </nav>
          <div class="play-first">
            <h3>ラン<span>合計 <?=$dataArray["personalInfo"]["playFirst"]["run"]["total"]?></span></h3>
            <div class="run">
              <table>
                <thead>
                  <tr>
                    <th>プレイヤー</th>
                    <th>ATT</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>LG</th>
                  </tr>
                </thead>
                <tbody>
                  <?=$dataArray["personalInfo"]["playFirst"]["run"]["data"]?>
                </tbody>
              </table>
            </div><!-- /.run -->

            <h3>パス<span>合計 <?=$dataArray["personalInfo"]["playFirst"]["pass"]["total"]?></span></h3>
            <div class="pass">
              <table>
                <thead>
                  <tr>
                    <th>プレイヤー</th>
                    <th>CP/AT</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>INT</th>
                  </tr>
                </thead>
                <tbody>
                  <?=$dataArray["personalInfo"]["playFirst"]["pass"]["data"]?>
                </tbody>
              </table>
            </div><!-- /.pass -->
            <h3>レシーブ<span>合計 <?=$dataArray["personalInfo"]["playFirst"]["receive"]["total"]?></span></h3>
            <div class="receive">
              <table>
                <thead>
                  <tr>
                    <th>プレイヤー</th>
                    <th>ATT</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>LG</th>
                  </tr>
                </thead>
                <tbody>
                  <?=$dataArray["personalInfo"]["playFirst"]["receive"]["data"]?>
                </tbody>
              </table>
            </div><!-- /.receive -->
          </div><!-- /.play-first -->
          <div class="draw-first">
            <h3>ラン<span>合計 <?=$dataArray["personalInfo"]["drawFirst"]["run"]["total"]?></span></h3>
            <div class="run">
              <table>
                <thead>
                  <tr>
                    <th>プレイヤー</th>
                    <th>ATT</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>LG</th>
                  </tr>
                </thead>
                <tbody>
                  <?=$dataArray["personalInfo"]["drawFirst"]["run"]["data"]?>
                </tbody>
              </table>
            </div><!-- /.run -->

            <h3>パス<span>合計 <?=$dataArray["personalInfo"]["drawFirst"]["pass"]["total"]?></span></h3>
            <div class="pass">
              <table>
                <thead>
                  <tr>
                    <th>プレイヤー</th>
                    <th>CP/AT</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>INT</th>
                  </tr>
                </thead>
                <tbody>
                  <?=$dataArray["personalInfo"]["drawFirst"]["pass"]["data"]?>
                </tbody>
              </table>
            </div><!-- /.pass -->
            <h3>レシーブ<span>合計 <?=$dataArray["personalInfo"]["drawFirst"]["receive"]["total"]?></span></h3>
            <div class="receive">
              <table>
                <thead>
                  <tr>
                    <th>プレイヤー</th>
                    <th>ATT</th>
                    <th>YDS</th>
                    <th>TD</th>
                    <th>LG</th>
                  </tr>
                </thead>
                <tbody>
                  <?=$dataArray["personalInfo"]["drawFirst"]["receive"]["data"]?>
                </tbody>
              </table>
            </div><!-- /.receive -->
          </div>
        </div><!-- /#personal-info -->
      </section><!-- /.main-sec -->

      <section class="side-sec show-for-large">
        <div id="sidebar-moving-container">

          <div class="sponsor-link">
            <!-- ad/531683568/npb-pc-rectangle -->
            <div id='div-gpt-ad-1492577512561-0' style='height:250px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1492577512561-0'); });
            </script>
            </div>
            <!-- // ad/531683568/npb-pc-rectangle -->
          </div>

          <div class="app-bnr">
            <!-- ad/531683568/pc_sidebar_top_2nd -->
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
            <!-- // ad/531683568/pc_sidebar_top_2nd -->
          </div>
          
          <div class="mt30">
            <a href="http://amefootlive.jp/kcafl" target="_blank"><img src="/assets/stats/ua_kansai/images/amefootlive_bnr.jpg" alt="関西学生 アメリカンフットボールリーグLIVE!!" width="300px"></a>
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
      </section>
    </div>
  </div><!-- /.body-sec -->

  <footer id="footer-container" class="foot-sec show-for-large">
    <div class="foot-sec-inner">
      <nav class="foot-breadCrumb">
        <ol itemscope itemtype="http://schema.org/breadCrumbList">
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="1" /></a></li>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/stats/ua_kansai/"><span itemprop="name">関西アメフト 日程・結果</span><meta itemprop="position" content="2" /></a></li>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/stats/ua_kansai/match/?gameId=<?=$gameId?>"><span itemprop="name"><?=$dataArray["date"]?> <?=$dataArray["playFirstName"]?> vs <?=$dataArray["drawFirstName"]?></span><meta itemprop="position" content="2" /></a></li>
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

      <div id="pageTop" class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

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

  <footer class="foot-sec show-for-small">
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
</div><!-- /.whole -->

<!-- for facebook -->
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
<script src="/assets/js/libs/jquery2/jquery.min.js"></script>
<script src="/assets/stats/ua_kansai/js/userAgent.js"></script>
<script src="/assets/js/global.bundle.js"></script>
<script src="/assets/stats/ua_kansai/js/amefoot.bundle.js"></script>
<script src="/assets/stats/ua_kansai/js/match.js"></script>
</body>
</html>