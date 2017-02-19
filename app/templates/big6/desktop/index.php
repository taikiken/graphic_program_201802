<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=1280">
  <script src="/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>" id="sagen" data-browser="true" data-orientation="true"></script>
  <title>東京六大学野球 big6.tv | SPORTS BULL</title>
  <meta name="description" content="東京六大学野球 LIVE配信・ハイライト動画をスポーツブルで。">
  <meta name="keywords" content="東京六大学野球, 法政大学, 立教大学, 東京大学, 早稲田大学, 慶應大学, 明治大学, LIVE配信, ハイライト動画, スポーツ, メディア, ニュース, 動画, sports, media">
  <!-- sns ogp -->
  <meta property="og:title" content="東京六大学野球 big6.tv | SPORTS BULL">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://sportsbull.jp/assets/images/common/og_image.png">
  <meta property="og:url" content="https://sportsbull.jp/big6/">
  <meta property="og:description" content="東京六大学野球 LIVE配信・ハイライト動画をスポーツブルで。">
  <!-- twitter card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@sportsbull_jp">
  <!-- favicon -->
  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="canonical" href="https://sportsbull.jp/big6/">
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
      <h1 class="big6-summary-heading"><img src="/assets/images/big6/heading.png" alt="東京6大学野球 2017 春季リーグ戦 日程・結果 / 勝敗表"></h1>

      <div class="big6-summary-banner">
        <a href="hoge"><img src="/assets/images/big6/bnr-streaming.png" alt=""></a>
      </div><!-- /.big6-summary-banner -->
    </div><!-- /.big6-summary -->

    <section class="main-sec">
        <section class="matches">
          <h2 class="matches-heading">直近の試合日程・結果</h2>
          <?php print_r($page['big6']['scheduleData']); ?>
          <table class="matches-list for-detail">
            <thead class="matches-thead">
              <tr>
                <th colspan="2">試合日</th>
                <th>第1試合</th>
                <th>第2試合</th>
              </tr>
            </thead>
            <tbody class="matches-tbody">
              <tr>
                <td class="matches-week" rowspan="2">第1週</td>
                <td class="matches-date-unit">
                  <span class="matches-date">3/23 (土)</span><br />
                  <span class="matches-time">11:00</span>
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="hosei">法大</i></li>
                    <li><span class="result">3 - 4</span></li>
                    <li><i class="rikkio">立大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="tokyo">東大</i></li>
                    <li><span class="result">2 - 1</span></li>
                    <li><i class="waseda">早大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
              </tr>
              <tr>
                <td class="matches-date-unit">
                  <span class="matches-date">3/24 (日)</span><br />
                  <span class="matches-time">11:00</span>
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="keio">慶大</i></li>
                    <li><span class="result">88 - 88</span></li>
                    <li><i class="meiji">明大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="rikkio">立大</i></li>
                    <li><span class="result">vs</span></li>
                    <li><i class="waseda">早大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a class="disable" href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
              </tr>
              <tr>
                <td class="matches-week" rowspan="2">第2週</td>
                <td class="matches-date-unit">
                  <span class="matches-date">3/23 (土)</span><br />
                  <span class="matches-time">11:00</span>
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="hosei">法大</i></li>
                    <li><span class="result">3 - 4</span></li>
                    <li><i class="rikkio">立大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="tokyo">東大</i></li>
                    <li><span class="result">2 - 1</span></li>
                    <li><i class="waseda">早大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
              </tr>
              <tr>
                <td class="matches-date-unit">
                  <span class="matches-date">3/24 (日)</span><br />
                  <span class="matches-time">11:00</span>
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="keio">慶大</i></li>
                    <li><span class="result">88 - 88</span></li>
                    <li><i class="meiji">明大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="rikkio">立大</i></li>
                    <li><span class="result">vs</span></li>
                    <li><i class="waseda">早大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a class="disable" href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
              </tr>
            </tbody>
          </table><!-- /.matches-list -->
        </section><!-- /.matches -->

        <hr />

        <section class="standings">
          <h2 class="standings-heading">
            順位表<span class="note">全日程終了 5/31</span>
          </h2>
          <table class="standings-list for-detail">
            <thead class="standings-thead">
              <tr>
                <th>順位</th>
                <th>&nbsp;</th>
                <th>試合</th>
                <th>勝利</th>
                <th>敗戦</th>
                <th>引分</th>
                <th>勝点</th>
                <th>勝率</th>
              </tr>
            </thead>
            <tbody class="standings-tbody">
            <?php foreach( $page['big6']['rankingData']['ranking'] as $key => $value ) : ?>
              <tr class="standings-<?php echo ++$key; ?>">
                <td class="standings-num"><span><?php echo $value['rank']; ?></span></td>
                <td class="standings-team"><img src="/assets/sp/images/big6/icon-<?php echo $value['slug']; ?>.png" alt="<?php echo $value['name']; ?>大学"></td>
                <td class="standings-games"><?php echo $value['game']; ?></td>
                <td class="standings-win"><?php echo $value['win']; ?></td>
                <td class="standings-lose"><?php echo $value['lose']; ?></td>
                <td class="standings-draw"><?php echo $value['draw']; ?></td>
                <td class="standings-points"><?php echo $value['point']; ?></td>
                <td class="standings-rate"><?php echo $value['winningPercentage']; ?></td>
              </tr>
            <?php endforeach; ?>
            </tbody>
          </table>
        </section><!-- /.standings -->

    </section><!-- /.main-sec -->

    <section class="side-sec">
      <?php include_once __DIR__."/../../desktop/_sidebar_ad.php"; ?>
    </section><!-- /.side-sec -->


  </div>
</div><!-- /.body-sec -->



<?php

include_once __DIR__."/../../desktop/_footer.php";
include_once __DIR__."/../../_debug.php";

?>