<?php
/**
 * モータースポーツ
 * User: @taikiken
 * Date: 2017/07/07
 * Time: 13:24
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */
?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=1280">
  <script src="/assets/js/libs/sagen/sagen.min.js?v=<?php echo $page['version']; ?>" id="sagen" data-browser="true" data-orientation="true"></script>
  <title><?php echo strip_tags($page['motorsports']['title']).' | '.$page['site_name']; ?></title>
  <meta name="keywords" content="<?php echo $page['motorsports']['keywords']; ?>">
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

  <script>
  var SPBL_ENV = {
    'env'      : '',
    'platform' : 'web_desktop',
    'page'     : 'feature',
    'category' : 'motersports',
    'p'        : 'wec',
    'provider' : ''
  };
  </script>

  <link rel="canonical" href="https://sportsbull.jp/motorsports/<?php echo $option_directory; ?>/">
  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">

  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <!-- google -->
  <link rel="stylesheet" href="/assets/google/style.css">
  <script src='https://www.googletagservices.com/tag/js/gpt.js'></script>
  <script src="/assets/google/dfp.js"></script>
  <script src="/assets/google/ga.js"></script>
  <!-- // google -->

</head>
<body>

<div id="whole" class="whole dark layout-list motorsports motorsports--<?php echo $option_directory; ?>">

  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

<?php
// body section
// -------------------------------------------------------------------------------
?>
  <div class="body-sec">

    <div class="special-summary">
      <h1 class="special-summary-heading"><img src="/assets/images/motorsports/summary-heading_<?php echo $option_directory; ?>.png" alt="<?php echo strtoupper($page['motorsports']['url']) ?>(FORMULA1) レース日程・結果"></h1>
    </div><!-- /.special-summary -->

    <nav class="motorsports__category-nav">
      <ul class="motorsports__category-nav__list">
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--top" href="/category/motorsports/">MOTOR SPORTS TOP</a></li>
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--f1" href="/motorsports/f1/">F1 レース日程・結果</a></li>
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--sgt" href="/motorsports/sgt/">SGT レース日程・結果</a></li>
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--wec" href="/motorsports/wec/">WEC レース日程・結果</a></li>
        <li class="motorsports__category-nav__item"><a class="motorsports__category-nav__link motorsports__category-nav__link--wrc" href="/motorsports/wrc/">WRC レース日程・結果</a></li>
      </ul><!-- /.motorsports__category-nav__list -->
    </nav><!-- /.motorsports__category-nav -->

    <?php
    // pickup-container - carousel
    // ===========================================
    include_once dirname(__DIR__) . '/_include/_pickup_container.php';
    // ===========================================
    ?>
    <div class="body-sec-inner">
      <section class="main-sec">

        <div class="sponsor-link mt30">
          <!-- /531683568/motor_sport/motor_sport_subcat_pc -->
          <script>
            googletag.cmd.push(function() {
              googletag.defineSlot('/531683568/motor_sport/motor_sport_subcat_pc', [728, 90], 'div-gpt-ad-1500001199179-0').addService(googletag.pubads());
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
          </script>
          <div id='div-gpt-ad-1500001199179-0' style='height:90px; width:728px;'>
          <script>
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1500001199179-0'); });
          </script>
          </div>
          <!-- // /531683568/motor_sport/motor_sport_subcat_pc -->
        </div><!-- /.sponsor-link -->

        <div class="motorsports_stats">

          <?php
          // matches
          // ===========================================
          include_once dirname(__DIR__) . '/_include/_schedule_match.php';
          // ===========================================
          ?>

          <?php
          // ranking
          // ===========================================
          include_once dirname(__DIR__) . '/_include/_schedule_ranking.php';
          // ===========================================
          ?>

          <section class="team_driver">
            <h2 class="team_driver__heading">TOYOTA GAZOO Racing WEC 2017年 チーム&amp;ドライバー</h2>
            <div class="team_driver__body team_driver__body--ratio1">
              <div class="column">
                <h3 class="team_driver__body__heading">ドライバー</h3>
                <p>TS050 HYBRID 7号車<br />
                マイク・コンウェイ / 小林 可夢偉 / ホセ・マリア・ロペス</p>
                <p>TS050 HYBRID 8号車<br />
                セバスチャン・ブエミ / アンソニー・デビッドソン / 中嶋 一貴</p>
              </div><!-- /.column -->
            </div><!-- /.team_driver__body -->
          </section><!-- /.team_driver -->

          <?php
          // info
          // ===========================================
          include_once dirname(__DIR__) . '/_include/_schedule_info.php';
          // ===========================================
          ?>
        </div><!-- /.motorsports_stats -->

        <?php
        // headline-container
        // ===========================================
        include_once dirname(__DIR__) . '/_include/_headline_container.php';
        // ===========================================
        ?>

        <nav class="motorsports__category-btns">
          <ul class="motorsports__category-btns__list">
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/f1/">
                <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_f1-bg.png" alt=""></span>
                <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_f1-text.png" alt="F1 / FORMULA 1 レース日程・結果"></span>
                <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
              </a>
            </li>
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/sgt/">
                <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_sgt-bg.png" alt=""></span>
                <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_sgt-text.png" alt="SGT / Super GT レース日程・結果"></span>
                <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
              </a>
            </li>
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/wec/">
                <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_wec-bg.png" alt=""></span>
                <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_wec-text.png" alt="WEC / FIA WORLD ENDURANCE CHAMPIONSHIP レース日程・結果"></span>
                <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
              </a>
            </li>
            <li class="motorsports__category-btns__item">
              <a class="motorsports__category-btns__link" href="/motorsports/wrc/">
                <span class="motorsports__category-btns__link__bg"><img src="/assets/images/motorsports/btn-category_wrc-bg.png" alt=""></span>
                <span class="motorsports__category-btns__link__text"><img src="/assets/images/motorsports/btn-category_wrc-text.png" alt="WRC / FIA WORLD RALLY CHAMPIONSHIP レース日程・結果"></span>
                <span class="motorsports__category-btns__link__arrow"><img src="/assets/images/motorsports/btn-category-arrow.png" alt=""></span>
              </a>
            </li>
          </ul>
        </nav><!-- /.motorsports__category-btns -->
      </section>

      <section class="side-sec">
        <?php
        include_once __DIR__."/../../../app/templates/desktop/_sidebar_ad.php";
        ?>
      </section><!-- /.side-sec -->

    </div><!--/.body-sec-inner-->
  </div><!--/.body-sec-->
<?php
// -------------------------------------------------------------------------------
?>

<script src="/assets/js/motorsports.bundle.js?v=<?php echo $page['version']; ?>"></script>
<script src="/assets/js/motorsports_app.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php
include_once __DIR__."/../../../app/templates/desktop/_footer.php";
include_once __DIR__."/../../../app/templates/_debug.php";
?>
