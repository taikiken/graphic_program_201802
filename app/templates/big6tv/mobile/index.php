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
  <title>東京六大学野球 BIG6.TV | SPORTS BULL</title>
  <meta name="apple-itunes-app" content="app-id=1086719653">
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

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="canonical" href="https://sportsbull.jp/big6tv/">
  <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>

  <?php
  endif;
  // -----------------------------------------
  ?>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">

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
<div class="whole theme_big6">
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
// include_once __DIR__."/../../mobile/_header.php";
?>

<?php
// ------------------------------------------------
// SP カテゴリー
// ------------------------------------------------
?>
<div id="body-section" class="body-sec">
  <div class="body-sec-inner">
    <div class="special-summary" style="background-color: #000;">
      <h1 class="special-summary-heading"><img src="/assets/sp/images/big6/summary-heading.png" alt="response.description"></h1>
    </div><!-- /.special-summary -->

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

                  <td class="matches-date-unit">
                    <span class="matches-date">
                      <?php echo $gameData['date_display']; ?>
                    </span><br />
                    <span class="matches-time">
                      <?php echo $gameData['starttime']; ?>
                    </span>
                  </td>

                  <?php foreach( $gameData['game'] as $game ) : ?>
                  <td class="matches-match-unit">
                    <ul class="matches-match">
                      <li>
                        <i class="matches-match__teamname--<?php echo $game['team'][0]['nameI']; ?>">
                          <?php echo $game['team'][0]['name']; ?>
                        </i>
                      </li>
                      <li>
                        <span class="result">
                          <?php echo $game['team'][0]['score']; ?> - <?php echo $game['team'][1]['score']; ?>
                        </span>
                      </li>
                      <li>
                        <i class="matches-match__teamname--<?php echo $game['team'][1]['nameI']; ?>">
                          <?php echo $game['team'][1]['name']; ?>
                        </i>
                      </li>
                    </ul><!-- /.matches-match -->

                    <div class="matches-btn-highlight">
                      <?php if ( $game['gameid'] ) : ?>
                        <a href="/p/<?php echo $game['gameid']; ?>/"><span>ハイライト</span></a>
                      <?php else : ?>
                        <a class="disable" href="javascript:void(0);"><span>ハイライト</span></a>
                      <?php endif; ?>
                    </div><!-- /.matches-btn-highlight -->

                  </td>
                  <?php endforeach; ?>

                  <?php // 1日の試合が1試合しかない場合の空セル ?>
                  <?php if ( count($gameData['game']) < 2 ) : ?>
                    <td></td>
                  <?php endif; ?>

                </tr>
              <?php endforeach; ?>
            <?php endforeach; ?>

          </tbody>
        </table><!-- /.matches-list -->
      </section><!-- /.matches -->

      <section class="standings">
        <h2 class="standings-heading">
          順位表<span class="note">全日程終了 5/31</span>
        </h2>
        <table class="standings-list">
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
          <?php foreach( $page['big6tv']['rankingData']['ranking'] as $key => $value ) : ?>
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
      </section>
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

<?php
include_once __DIR__."/../../_debug.php";
?>