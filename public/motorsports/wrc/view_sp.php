<?php
/**
 * モータースポーツ
 * User: @taikiken
 * Date: 2017/07/07
 * Time: 14:35
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <script src="/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>" id="sagen" data-browser="true" data-orientation="true"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <?php
  // app in webview 時に .head-sec を非表示にする
  if (!$from_webview) :
  ?>
  <title><?php echo strip_tags($page['motorsports']['title']).' | '.$page['site_name']; ?></title>
  <meta name="keywords" content="<?php echo $page['keywords']; ?>">
  <meta name="description" content="<?php echo $page["motorsports"]['og_description']; ?>">
  <!-- sns ogp -->
  <meta property="fb:app_id" content="<?php echo $page['app_id']; ?>">
  <meta property="og:site_name" content="<?php echo $page['site_name']; ?>">
  <meta property="og:type" content="<?php echo $page['og_type']; ?>">
  <meta property="og:title" content="<?php echo $page['motorsports']['og_title']; ?>">
  <meta property="og:image" content="<?php echo $page["motorsports"]['og_image']; ?>">
  <meta property="og:url" content="<?php echo $page["motorsports"]['og_url']; ?>">
  <meta property="og:description" content="<?php echo $page["motorsports"]['og_description']; ?>">
  <meta property="og:locale" content="ja_JP" />
  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@<?php echo $page['sns']['twitter']; ?>">
  <meta name="twitter:title" content="<?php echo $page['motorsports']['og_title']; ?>">
  <meta name="twitter:image" content="<?php echo $page["motorsports"]['og_image']; ?>">
  <meta name="twitter:url" content="<?php echo $page["motorsports"]['og_url']; ?>">
  <meta name="twitter:description" content="<?php echo $page["motorsports"]['og_description']; ?>">
  <!-- favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="apple-touch-icon-precomposed" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="icon" sizes="192x192" href="/assets/sp/images/common/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="canonical" href="https://sportsbull.jp/motorsports/<?php echo $option_directory; ?>/">

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

  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <script>
  var SPBL_ENV = {
    'env'      : '',
    'platform' : 'web_mobile',
    'page'     : 'feature',
    'category' : 'motersports',
    'p'        : 'wrc',
    'provider' : ''
  };
  </script>

  <!-- google -->
  <link rel="stylesheet" href="/assets/google/style.css">
  <script src='https://www.googletagservices.com/tag/js/gpt.js'></script>
  <script src="/assets/google/dfp.js"></script>
  <script src="/assets/google/ga.js"></script>
  <!-- // google -->

</head>
<body class="appbnr-disable">
<div id="whole" class="whole dark motorsports motorsports--<?php echo $option_directory; ?>">
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
// body section
// -------------------------------------------------------------------------------
?>
  <div class="body-sec">
    <div class="body-sec-inner">

      <div class="special-summary">
        <h1 class="special-summary-heading"><img src="/assets/sp/images/motorsports/summary-heading_<?php echo $option_directory; ?>.png" alt="<?php echo strtoupper($page['motorsports']['url']) ?>(FORMULA1) レース日程・結果"></h1>
      </div><!-- /.special-summary -->

      <nav class="motorsports__category-nav">
        <ul class="motorsports__category-nav__list">
          <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--f1" href="/motorsports/f1/"><span>F1 レース日程・結果</span></a></li>
          <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--sgt" href="/motorsports/sgt/"><span>SGT レース日程・結果</span></a></li>
          <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--wec" href="/motorsports/wec/"><span>WEC レース日程・結果</span></a></li>
          <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--wrc" href="/motorsports/wrc/"><span>WRC レース日程・結果</span></a></li>
        </ul><!-- /.motorsports__category-nav__list -->
      </nav><!-- /.motorsports__category-nav -->

      <?php
      // pickup-container - carousel
      // ===========================================
      include_once dirname(__DIR__) . '/_include/_pickup_container.php';
      // ===========================================
      ?>
      <?php
      // TODO: Powered area 必要か確認 - #ref template/mobile/_category-heading.php
      ?>

      <section class="main-sec">

        <div class="sponsor-link">
          <!-- /531683568/motor_sport/motor_sport_subcat_sp -->
          <script>
            googletag.cmd.push(function() {
              googletag.defineSlot('/531683568/motor_sport/motor_sport_subcat_sp', [320, 96], 'div-gpt-ad-1500001270788-0').addService(googletag.pubads());
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
          </script>
          <div id='div-gpt-ad-1500001270788-0' style='height:96px; width:320px;'>
          <script>
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1500001270788-0'); });
          </script>
          </div>
          <!-- // /531683568/motor_sport/motor_sport_subcat_sp -->
        </div><!-- /.sponsor-link -->

        <div class="motorsports_stats">
          <?php
          // matches
          // ===========================================
          include_once dirname(__DIR__) . '/_include/_schedule_match_wrc.php';
          // ===========================================
          ?>

          <?php
          // ranking
          // ===========================================
          include_once dirname(__DIR__) . '/_include/_schedule_ranking.php';
          // ===========================================
          ?>

          <section class="team_driver">
            <h2 class="team_driver__heading">TOYOTA GAZOO Racing WRC 2017年 チーム&amp;ドライバー</h2>
            <div class="team_driver__body team_driver__body--ratio2">
              <div class="column">
                <h3 class="team_driver__body__heading">チーム概要</h3>
                <table class="team_driver__body__table--team">
                  <tbody>
                    <tr>
                      <th>拠点</th>
                      <td>フィンランド</td>
                    </tr>
                    <tr>
                      <th>参戦</th>
                      <td>2017年</td>
                    </tr>
                    <tr>
                      <th>使用タイヤ</th>
                      <td>ミシュラン</td>
                    </tr>
                    <tr>
                      <th>チーム総代表</th>
                      <td>豊田 章男</td>
                    </tr>
                    <tr>
                      <th>チーム代表</th>
                      <td>トミ・マキネン</td>
                    </tr>
                    <tr>
                      <th>チーム副代表</th>
                      <td>嵯峨 宏英</td>
                    </tr>
                  </tbody>
                </table>
              </div><!-- /.column -->

              <div class="column">
                <h3 class="team_driver__body__heading">ドライバー</h3>
                <p>ヤリ-マティ・ラトバラ（フィンランド）<br />
                <span class="team_driver__body__small">コ・ドライバー　ミーカ・アンティラ</span></p>
                <p>ユホ・ハンニネン（フィンランド）<br />
                <span class="team_driver__body__small">コ・ドライバー　カイ・リンドストローム</span></p>
                <p>エサペッカ・ラッピ（フィンランド）<br />
                <span class="team_driver__body__small">コ・ドライバー　ヤンネ・フェルム</span></p>
              </div><!-- /.column -->
            </div><!-- /.team_driver__body -->
          </section><!-- /.team_driver -->

          <?php
          // info
          // ===========================================
          include_once dirname(__DIR__) . '/_include/_schedule_info_wrc.php';
          // ===========================================
          ?>
        </div><!-- /.motorsports_stats -->

        <?php
        // headline-container
        // ===========================================
        include_once dirname(__DIR__) . '/_include/_headline_container_sp.php';
        // ===========================================
        ?>

        <div class="motorsports__category-btns">
          <ul class="motorsports__category-btns__list">
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/f1/"><img src="/assets/sp/images/motorsports/btn-category_f1.png" alt="F1 / FORMULA 1 レース日程・結果"></a>
            </li>
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/sgt/"><img src="/assets/sp/images/motorsports/btn-category_sgt.png" alt="SGT / Super GT レース日程・結果"></a>
            </li>
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/wec/"><img src="/assets/sp/images/motorsports/btn-category_wec.png" alt="WEC / FIA WORLD ENDURANCE CHAMPIONSHIP レース日程・結果"></a>
            </li>
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/wrc/"><img src="/assets/sp/images/motorsports/btn-category_wrc.png" alt="WRC / FIA WORLD RALLY CHAMPIONSHIP レース日程・結果"></a>
            </li>
          </ul><!-- /.motorsports__category-btns__list -->
        </div><!-- /.motorsports__category-btns -->
      </section>

      <section class="side-sec">
        <?php
//        include_once __DIR__."/../../../app/templates/desktop/_sidebar_ad.php";
        ?>
      </section><!-- /.side-sec -->

    </div><!--/.body-sec-inner-->
  </div><!--/.body-sec-->
<?php
// -------------------------------------------------------------------------------
?>

  <?php
  // app in webview 時に .foot-sec を非表示にする
  if (!$from_webview) :
  ?>
  <footer class="foot-sec">
    <?php include_once __DIR__."/../../../app/templates/mobile/_footer-sec-inner.php"; ?>
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
<script src="/assets/facebook/init.js"></script>
<!-- // for facebook -->

<?php
endif;
// -----------------------------------------
?>

<script src="/assets/js/motorsports_app.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>

</body>
</html>
<?php
include_once __DIR__."/../../../app/templates/_debug.php";
?>
