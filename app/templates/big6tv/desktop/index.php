<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=1280">
  <script src="/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>" id="sagen" data-browser="true" data-orientation="true"></script>
  <title>東京六大学野球 BIG6.TV | SPORTS BULL</title>
  <meta name="description" content="東京六大学野球 LIVE配信・ハイライト動画をスポーツブルで。">
  <meta name="keywords" content="東京六大学野球, 法政大学, 立教大学, 東京大学, 早稲田大学, 慶應大学, 明治大学, LIVE配信, ハイライト動画, スポーツ, メディア, ニュース, 動画, sports, media">
  <!-- sns ogp -->
  <meta property="og:title" content="東京六大学野球 BIG6.TV | SPORTS BULL">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://sportsbull.jp/assets/images/common/og_image.png">
  <meta property="og:url" content="https://sportsbull.jp/big6tv/">
  <meta property="og:description" content="東京六大学野球 LIVE配信・ハイライト動画をスポーツブルで。">
  <!-- twitter card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@sportsbull_jp">
  <!-- favicon -->
  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="canonical" href="https://sportsbull.jp/big6tv/">
  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
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
<div id="whole" class="whole theme_big6">
  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

<?php
// include_once __DIR__."/../../desktop/_header_simple.php";
?>

<div class="body-sec">
  <div class="body-sec-inner">

    <div class="big6-summary">
      <h1 class="big6-summary-heading"><img src="/assets/images/big6/heading.png" alt="東京六大学野球 2017 春季リーグ戦 日程・結果 / 勝敗表"></h1>

      <div class="big6-summary-banner">
        <a href="/category/big6tv/">
          <?php if ( $page['big6tv']['liveData']['live']['isPlaying'] ) : ?>
            <img src="/assets/images/big6/bnr-streaming_playing.png?isPlaying=true" alt="">
          <?php else : ?>
            <img src="/assets/images/big6/bnr-streaming_resting.png?isPlaying=false" alt="">
          <?php endif; ?>
        </a>
      </div><!-- /.big6-summary-banner -->
    </div><!-- /.big6-summary -->

    <section class="main-sec">

        <section class="matches">
          <h2 class="matches-heading">直近の試合日程・結果</h2>
          <table class="matches-list for-detail">
            <thead class="matches-thead">
              <tr>
                <th colspan="2">試合日</th>
                <th>第1試合</th>
                <th>第2試合</th>
              </tr>
            </thead>
            <tbody class="matches-tbody">

              <?php foreach( $page['big6tv']['scheduleData']['gameinfo'] as $weekCount => $weekData ) : ?>
                <?php foreach( $weekData['gamedate'] as $gameCount => $gameData ) : ?>
                  <tr>

                    <?php if( $gameCount === 0 ) : // 週内最初だけ ?>
                    <td class="matches-week" rowspan="<?php echo count($weekData['gamedate']); ?>">
                      <?php echo $weekData['week']; ?>
                    </td>
                    <?php endif; ?>

                    <?php include __DIR__.'/../_matches-match-unit.php'; ?>

                  </tr>
                <?php endforeach; ?>
              <?php endforeach; ?>

            </tbody>
          </table><!-- /.matches-list -->
        </section><!-- /.matches -->


        <?php include __DIR__.'/../_standings.php'; ?>


    </section><!-- /.main-sec -->

    <section class="side-sec">
<?php
// 六大学 / 広告表示 調整（Web） #1546
// > アドネットワーク関連の広告（ネイティブアド？）を消したい
// @see https://github.com/undotsushin/undotsushin/issues/1546
// sidebar 右上広告を消すための変数設定
// @since 2017-03-15
global $single_big6tv;
$single_big6tv = true
?>
      <?php include_once __DIR__."/../../desktop/_sidebar_ad.php"; ?>
    </section><!-- /.side-sec -->


  </div>
</div><!-- /.body-sec -->



<?php

include_once __DIR__."/../../desktop/_footer.php";
include_once __DIR__."/../../_debug.php";

?>