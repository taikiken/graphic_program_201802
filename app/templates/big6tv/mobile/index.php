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
  <meta property="og:image" content="https://sportsbull.jp/_/big6tv/og_image/og_image.png">
  <meta property="og:url" content="https://sportsbull.jp/big6tv/">
  <meta property="og:description" content="東京六大学野球 LIVE配信・ハイライト動画をスポーツブルで。">
  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@sportsbull_jp">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">

  <?php include_once __DIR__.'/../../_env.php'; ?>

  <link rel="canonical" href="https://sportsbull.jp/big6tv/">
  <script src="/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>

  <?php
  endif;
  // -----------------------------------------
  ?>
  <?php
  // app webview を UA 判定する JS を追加します - `app_ua_detector.bundle.js`
  // @since 2017-08-21
  ?>
  <script src="/assets/js/app_ua_detector.bundle.js"></script>
  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">

  <?php include_once __DIR__.'/../../_head_bottom.php'; ?>

</head>
<body class="appbnr-disable">
<div class="whole theme_big6">
  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <header class="head-sec for-web">
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
      <h1 class="special-summary-heading"><img src="/assets/sp/images/big6/heading.jpg" alt="東京六大学野球 2017 春季リーグ戦 日程・結果 / 勝敗表"></h1>

      <div class="big6-summary-banner">
        <a href="/category/big6tv/">
          <?php if ( $page['big6tv']['liveData']['live']['isPlaying'] ) : ?>
            <img src="/assets/sp/images/big6/bnr-streaming_playing.png?isPlaying=true" alt="">
          <?php else : ?>
            <img src="/assets/sp/images/big6/bnr-streaming_resting.png?isPlaying=false" alt="">
          <?php endif; ?>
        </a>
      </div><!-- /.big6-summary-banner -->
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

                  <?php include __DIR__.'/../_matches-match-unit.php'; ?>

                </tr>
              <?php endforeach; ?>
            <?php endforeach; ?>

          </tbody>
        </table><!-- /.matches-list -->
      </section><!-- /.matches -->

      <?php include __DIR__.'/../_standings.php'; ?>

    </section><!-- /.main-sec -->
  </div>
</div><!-- /.body-sec -->

  <?php
  // app in webview 時に .foot-sec を非表示にする
  if (!$from_webview) :
  ?>
  <footer class="foot-sec for-web">
    <?php include_once __DIR__.'/../../mobile/_footer-sec-inner.php'; ?>
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
<!-- for facebook -->
<script src="/assets/facebook/init.js?v=<?php echo $page['version']; ?>"></script>
<!-- // for facebook -->
<?php
endif;
// -----------------------------------------
?>

<script src="/assets/js/picks.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/js/app_divide.bundle.js?v=<?php echo $page['version']; ?>"></script>

</body>
</html>

<?php
include_once __DIR__."/../../_debug.php";
?>
