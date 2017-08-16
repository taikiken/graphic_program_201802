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
  <title>RED BULL HOLY RIDE 2017 | SPORTS BULL</title>
  <meta name="description" content="説明文">
  <meta name="keywords" content="キーワード, キーワード, キーワード">
  <!-- sns ogp -->
  <meta property="og:title" content="[pagetitle] | SPORTS BULL">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://sportsbull.jp/assets/images/common/og_image.png">
  <meta property="og:url" content="https://sportsbull.jp/red-bull-holy-ride/">
  <meta property="og:description" content="説明文">
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

  <link rel="canonical" href="https://sportsbull.jp/red-bull-holy-ride/">
  <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>

  <?php
  endif;
  // -----------------------------------------
  ?>
  <link rel="stylesheet" href="/assets/sp/css/red-bull-holy-ride/ui.css?v=<?php echo $page['version']; ?>">

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
</head>
<body class="appbnr-disable">
<div class="whole red-bull-holy-ride <?php echo $page['template_classname']; ?>">
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
<div id="body-section" class="body-sec">
  <div class="body-sec-inner">
    <div class="special-summary">
      <h1 class="special-summary-heading"><img src="/assets/sp/images/red-bull-holy-ride/summary-heading.png" alt="RED BULL HOLY RIDE 2017"></h1>
      <p class="special-summary-copy">型破りなMTBダウンヒル・レース「Red Bull <br> Holy Ride 2017」をスポーツブルで無料ライブ配信！</p>
    </div><!-- /.special-summary -->

    <?php include_once __DIR__."/../live.php"; ?>

    <section class="main-sec">

      <div class="holyride__container holyride__container--odd holyride--intro">
        <p class="intro__catch">一般公道を疾走する、型破りなMTBダウンヒル・レースが今年も尾道で開催！<br />
        高低差100メートル、約300段の階段を含む、過去最長約1,400メートルのコースを走り抜ける。</p>

        <div class="intro__link__app"><a href="https://app.adjust.com/rpt1kl?deep_link=sportsbull%3A%2F%2F" target="_blank">アプリでライブ配信開始の通知を受け取る</a></div>

        <div class="intro__banner">
          <a href="https://www.redbull.com/jp-ja/events/red-bull-holy-ride-2017/" target="_blank"><img src="/assets/sp/images/red-bull-holy-ride/intro-banner.jpg" alt="Red Bull TV"></a>
        </div>

        <div class="intro__widjet_twitter">
          <a class="twitter-timeline" href="https://twitter.com/redbulljapan" data-height="300" data-chrome="noheader nofooter" data-link-color="#be0940" data-border-color="#282d35">Tweets by redbulljapan</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div><!-- /.widjet_twitter -->
      </div><!-- /.holyride--intro -->

      <div class="holyride__container holyride__container--even holyride--course">
        <h2 class="course__heading"><img src="/assets/sp/images/red-bull-holy-ride/course-heading.png" alt="レース概要"></h2>

        <figure class="course__map">
          <img src="/assets/sp/images/red-bull-holy-ride/course-figure-map.png" alt="会場マップ">
          <figcaption>
            <p>通常は山中にて行うMTBダウンヒルレースを、聖なる（ホーリーな）場所で行うRed Bull Holy Ride。<br />
            6度目を迎える今大会は、昨年に続いて日本遺産のまち・尾道市千光寺山周辺で開催します。<br />
            今大会は、千光寺公園展望台→尾道城→土堂小学校の高低差約100メートル、最大斜度約30度、石段300段の一般公道を含む大会史上最長となる全長約1,400メートルのコースを設ける予定です。</p>
            <p>予選は1名ずつのタイムトライアル、決勝トーナメントは1レース4名で走る4クロス形式で行います。</p>
            <p class="note">（その他、UCI Cycling Regulations及びJCF Edition 2017に準ずる）</p>
          </figcaption>
        </figure><!-- /.course__map -->

        <div class="course__staff">
          <h3 class="course__staff__heading"><img src="/assets/sp/images/red-bull-holy-ride/course-staff1-heading.png" alt="コースディレクター"></h3>

          <div class="course__staff__container">
            <figure class="course__staff__thumb"><img src="/assets/sp/images/red-bull-holy-ride/course-staff1-figure.png" alt=""></figure>

            <div class="course__staff__data">
              <h4 class="course__staff__data__heading">Y.YANAGIHARA（YANS）</h4>
              <p class="course__staff__data__text">1972年 ７月20日生まれ。<br />
              ’93 全日本シーリズ チャンピオンを始め数々の大会で優勝。<br />
              本大会ではコースディレクター、スポーツディレクターを兼任する。</p>
            </div><!-- /.course__staff__data -->
          </div><!-- /.course__staff__container -->

          <h3 class="course__staff__heading"><img src="/assets/sp/images/red-bull-holy-ride/course-staff2-heading.png" alt="イベントアンバサダー"></h3>

          <div class="course__staff__container">
            <figure class="course__staff__thumb"><img src="/assets/sp/images/red-bull-holy-ride/course-staff2-figure.png" alt=""></figure>

            <div class="course__staff__data">
              <h4 class="course__staff__data__heading">DAN TAKUMA</h4>
              <p class="course__staff__data__text">19XX年 ３月12日生まれ。<br />
              ’98 ハワイアンマウンテンツアー第2スーテージ優勝など輝かしい戦歴をもつ。<br />
              本大会ではアンバサダーの他、解説もつとめる。</p>
            </div><!-- /.course__staff__data -->
          </div><!-- /.course__staff__container -->
        </div><!-- /.course__staff -->
      </div><!-- /.holyride--course -->

      <div class="holyride__container holyride__container--odd holyride--overview">
        <h2 class="overview__heading"><img src="/assets/sp/images/red-bull-holy-ride/overview-heading.png" alt="イベント概要"></h2>

        <table class="overview__data">
          <tbody>
            <tr>
              <th>タイトル</th>
              <td>Red Bull Holy Ride 2017（レッドブル・ホーリーライド2017）</td>
            </tr>
            <tr>
              <th>日時</th>
              <td>8月27日（日）10：30〜16：30（予定）※荒天時は中止</td>
            </tr>
            <tr>
              <th>会場</th>
              <td>広島県尾道市千光寺山周辺（千光寺公園展望台→尾道城→土堂小学校）</td>
            </tr>
            <tr>
              <th>内容</th>
              <td>マウンテンバイク ダウンヒルレース（オープンクラス）</td>
            </tr>
            <tr>
              <th>イベント観戦</th>
              <td>無料</td>
            </tr>
            <tr>
              <th>賞金</th>
              <td>優勝：¥100,000、準優勝：¥50,000、第3位：¥30,000</td>
            </tr>
            <tr>
              <th>主催</th>
              <td>レッドブル・ジャパン株式会社</td>
            </tr>
            <tr>
              <th>後援</th>
              <td>尾道市</td>
            </tr>
            <tr>
              <th>協力</th>
              <td>特定非営利活動法人 市民・自転車フォーラム</td>
            </tr>
          </tbody>
        </table><!-- /.overview__data -->
      </div><!-- /.holyride--overview -->

      <div class="holyride--related holyride__container--even holyride__container">
        <h2 class="related__heading"><img src="/assets/sp/images/red-bull-holy-ride/related-heading.png" alt="関連記事"></h2>

        <div class="related__post">
          <a href="hoge">
            <figure class="related__post__thumb"><img src="/assets/sp/images/red-bull-holy-ride/related-post-figure1.png" alt=""></figure>
            <div class="related__post__text">
              <h3 class="related__post__heading">RedBull HOLY RIDE 2016 ハイライト</h3>
              <p class="related__post__excerpt">昨年に引き続き、6回目となる本大会が広島尾道で開催されるRedBull HOLY RIDE。開催に先駆け、過去の白熱の模様をハイライトで…</p>
              <h4 class="related__post__category">マウンテンバイク</h4>
              <p class="related__post__date">8月8日（火） 22:04</p>
            </div><!-- /.related__post__text -->
          </a>
        </div><!-- /.related__post -->

        <div class="related__post">
          <a href="hoge">
            <figure class="related__post__thumb"><img src="/assets/sp/images/red-bull-holy-ride/related-post-figure2.png" alt=""></figure>
            <div class="related__post__text">
              <h3 class="related__post__heading">RedBull HOLY RIDE 2014 ハイライト</h3>
              <p class="related__post__excerpt">昨年に引き続き、6回目となる本大会が広島尾道で開催されるRedBull HOLY RIDE。開催に先駆け、過去の白熱の模様をハイライトで…</p>
              <h4 class="related__post__category">マウンテンバイク</h4>
              <p class="related__post__date">8月8日（火） 22:04</p>
            </div><!-- /.related__post__text -->
          </a>
        </div><!-- /.related__post -->

        <div class="related__post">
          <a href="hoge">
            <figure class="related__post__thumb"><img src="/assets/sp/images/red-bull-holy-ride/related-post-figure3.png" alt=""></figure>
            <div class="related__post__text">
              <h3 class="related__post__heading">RedBull HOLY RIDE 2013 ハイライト</h3>
              <p class="related__post__excerpt">昨年に引き続き、6回目となる本大会が広島尾道で開催されるRedBull HOLY RIDE。開催に先駆け、過去の白熱の模様をハイライトで…</p>
              <h4 class="related__post__category">マウンテンバイク</h4>
              <p class="related__post__date">8月8日（火） 22:04</p>
            </div><!-- /.related__post__text -->
          </a>
        </div><!-- /.related__post -->

        <div class="related__post">
          <a href="hoge">
            <figure class="related__post__thumb"><img src="/assets/sp/images/red-bull-holy-ride/related-post-figure4.png" alt=""></figure>
            <div class="related__post__text">
              <h3 class="related__post__heading">RedBull HOLY RIDE 2011 ハイライト</h3>
              <p class="related__post__excerpt">昨年に引き続き、6回目となる本大会が広島尾道で開催されるRedBull HOLY RIDE。開催に先駆け、過去の白熱の模様をハイライトで…</p>
              <h4 class="related__post__category">マウンテンバイク</h4>
              <p class="related__post__date">8月8日（火） 22:04</p>
            </div><!-- /.related__post__text -->
          </a>
        </div><!-- /.related__post -->
      </div><!-- /.holyride--related -->

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

<script src="/assets/js/red-bull-holy-ride.bundle.js?v=<?php echo $page['version']; ?>"></script>

</body>
</html>

<?php
include_once __DIR__."/../../_debug.php";
?>