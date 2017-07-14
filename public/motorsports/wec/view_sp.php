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

  <link rel="stylesheet" href="/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">

  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <?php // #1876 - Google Optimize ?>
  <style>.async-hide { opacity: 0 !important} </style>
  <script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
  h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
  (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
  })(window,document.documentElement,'async-hide','dataLayer',4000,
  {'GTM-KJ33JM9':true});</script>
  <?php // Google Optimize ?>

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

          <section class="matches">
            <h2 class="matches__heading mod-headingA">ル・マン24時間レース</h2>
            <table class="matches__table mod-table">
              <thead>
                <tr>
                  <th class="matches__table__th">順位</th>
                  <th class="matches__table__th">ドライバー</th>
                  <th class="matches__table__th">チーム</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>ティモ・ベルンハルト／ブレンドン・ハートレー／アール・バンバー</td>
                  <td>ポルシェ</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>オリバー・ジャービス／ホーピン・タン／トーマス・ローラン</td>
                  <td>ジャッキー・チェンDCレーシング</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>デイビッド・チェン／トリスタン・コメンディ／アレックス・ブランドル</td>
                  <td>ジャッキー・チェンDCレーシング</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>ネルソン・パンチアティシ／ピエール・ラグエス／アンドレ・ネグラオ</td>
                  <td>シグナテック・アルピーヌ・マムート</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>フェリペ・アルバカーキ／ウイリアム・オーウェン／ヒューゴ・サデリー</td>
                  <td>ユナイテッド・オートスポート</td>
                </tr>
              </tbody>
            </table><!-- /.matches__table -->
          </section><!-- /.matches -->

          <section class="point_rank">
            <h2 class="point_rank__heading mod-headingA">ポイントランキング</h2>

            <nav class="point_rank__nav">
              <ul class="point_rank__nav__list" id="js-point_rank__nav__list">
                <li class="point_rank__nav__item"><a class="point_rank__nav--driver js-tab-link selected" href="#point_rank--driver">ドライバーランキング</a></li>
                <li class="point_rank__nav__item"><a class="point_rank__nav--team  js-tab-link" href="#point_rank--team">チームランキング</a></li>
              </ul>
            </nav><!-- /.point_rank__nav -->

            <table id="point_rank--driver" class="point_rank__table mod-table selected">
              <thead>
                <tr>
                  <th class="point_rank__table__th">順位</th>
                  <th class="point_rank__table__th">ドライバー</th>
                  <th class="point_rank__table__th">チーム</th>
                  <th class="point_rank__table__th">ポイント</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>ブレンドン・ハートレー／ティモ・ベルンハルト／アール・バンバー</td>
                  <td>ポルシェ</td>
                  <td>83</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>セバスチャン・ブエミ／アンソニー・デビッドソン／中嶋一貴</td>
                  <td>トヨタ</td>
                  <td>66</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>ホーピン・タン／トーマス・ローラン／オリバー・ジャービス</td>
                  <td>ジャッキー・チェンDCレーシング</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>デイビット・チェン／トリスタン・ゴメンディ／アレックス・ブランドル</td>
                  <td>ジャッキー・チェンDCレーシング</td>
                  <td>31</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>ニール・ジャニ／ニック・タンディ／アンドレ・ロッテラー</td>
                  <td>ポルシェ</td>
                  <td>28</td>
                </tr>
              </tbody>
            </table><!-- /.point_rank__table -->

            <table id="point_rank--team" class="point_rank__table mod-table">
              <thead>
                <tr>
                  <th class="point_rank__table__th">順位</th>
                  <th class="point_rank__table__th">チーム</th>
                  <th class="point_rank__table__th">ポイント</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>ポルシェ</td>
                  <td>111</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>トヨタ</td>
                  <td>78.5</td>
                </tr>
              </tbody>
            </table><!-- /.point_rank__table -->
          </section><!-- /.point_rank -->

          <section class="team_driver">
            <h2 class="team_driver__heading">TOYOTA GAZOO Racing WEC 2017年 チーム&amp;ドライバー</h2>
            <div class="team_driver__body team_driver__body--ratio1">
              <div class="column">
                <h3 class="team_driver__body__heading">ドライバー</h3>
                <p>TS050 HYBRID 7号車<br />
                マイク・コンウェイ / 小林 可夢偉 / ホセ・マリア・ロペス</p>
                <p>TS050 HYBRID 8号車<br />
                セバスチャン・ブエミ / 小林 可夢偉 / 中嶋 一貴</p>
                <p>TS050 HYBRID 9号車<br />
                ステファン・サラザン / 国本 雄資 / ニコラス・ラピエール</p>
              </div><!-- /.column -->
            </div><!-- /.team_driver__body -->
          </section><!-- /.team_driver -->

          <section class="race_info" id="js-race_info">
            <h2 class="race_info__heading mod-headingA">レース日程・結果</h2>

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>シルバーストン</dt>
                <dd>4月14日-16日</dd>
              </dl><!-- /.race_info__accordion--trigger -->
              <div class="race_info__accordion--body">
                <table class="race_info__table mod-table">
                  <thead>
                    <tr>
                      <th class="race_info__table__th">イベント</th>
                      <th class="race_info__table__th">開催日</th>
                      <th class="race_info__table__th">日本時間</th>
                      <th class="race_info__table__th">1位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>フリー走行1</td>
                      <td>4月14日（金）</td>
                      <td>19:45 ~</td>
                      <td>アンソニー・デビッドソン／中嶋一貴／セバスチャン・ブエミ（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>4月14日（金）</td>
                      <td>24:45 ~</td>
                      <td>アンソニー・デビッドソン／中嶋一貴／セバスチャン・ブエミ（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>4月15日（土）</td>
                      <td>17:40 ~</td>
                      <td>アンソニー・デビッドソン／中嶋一貴／セバスチャン・ブエミ（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>4月15日（土）</td>
                      <td>21:00 ~</td>
                      <td>小林可夢偉／マイク・コンウェイ／ホセ・マリア・ロペス（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>4月16日（日）</td>
                      <td>20:00 ~</td>
                      <td>アンソニー・デビッドソン／中嶋一貴／セバスチャン・ブエミ（トヨタ）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>スパ・フランコルシャン</dt>
                <dd>5月4日-6日</dd>
              </dl><!-- /.race_info__accordion--trigger -->
              <div class="race_info__accordion--body">
                <table class="race_info__table mod-table">
                  <thead>
                    <tr>
                      <th class="race_info__table__th">イベント</th>
                      <th class="race_info__table__th">開催日</th>
                      <th class="race_info__table__th">日本時間</th>
                      <th class="race_info__table__th">1位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>フリー走行1</td>
                      <td>5月4日（金）</td>
                      <td>18:45 ~</td>
                      <td>小林可夢偉／マイク・コンウェイ／ホセ・マリア・ロペス（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>5月4日（金）</td>
                      <td>24:30 ~</td>
                      <td>小林可夢偉／マイク・コンウェイ／ホセ・マリア・ロペス（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>5月5日（土）</td>
                      <td>17:25 ~</td>
                      <td>アンソニー・デビッドソン／中嶋一貴／セバスチャン・ブエミ（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>5月5日（土）</td>
                      <td>21:50 ~</td>
                      <td>アンドレ・ロッテラー／ニール・ジャニ／ニック・タンディ（ポルシェ）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>5月6日（日）</td>
                      <td>21:30 ~</td>
                      <td>アンソニー・デビッドソン／中嶋一貴／セバスチャン・ブエミ（トヨタ）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>ル・マン24時間レース</dt>
                <dd>6月14日-18日</dd>
              </dl><!-- /.race_info__accordion--trigger -->
              <div class="race_info__accordion--body">
                <table class="race_info__table mod-table">
                  <thead>
                    <tr>
                      <th class="race_info__table__th">イベント</th>
                      <th class="race_info__table__th">開催日</th>
                      <th class="race_info__table__th">日本時間</th>
                      <th class="race_info__table__th">1位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>フリー走行</td>
                      <td>6月14日（水）</td>
                      <td>23:00 ~</td>
                      <td>ニール・ジャニ／アンドレ・ロッテラー／ニック・タンディ（ポルシェ）</td>
                    </tr>
                    <tr>
                      <td>予選1回目</td>
                      <td>6月15日（木）</td>
                      <td>29:00 ~</td>
                      <td>マイク・コンウェイ／小林可夢偉／ステファン・サラザン（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>予選2回目</td>
                      <td>6月15日（木）</td>
                      <td>26:00 ~</td>
                      <td>マイク・コンウェイ／小林可夢偉／ステファン・サラザン（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>予選3回目</td>
                      <td>6月16日（金）</td>
                      <td>29:00 ~</td>
                      <td>マイク・コンウェイ／小林可夢偉／ステファン・サラザン（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>ウォームアップ</td>
                      <td>6月17日（土）</td>
                      <td>16:00 ~</td>
                      <td>セバスチャン・ブエミ／アンソニー・デビッドソン／中嶋一貴（トヨタ）</td>
                    </tr>
                    <tr>
                      <td>決勝レース</td>
                      <td>6月17日（土）〜6月18日（日）</td>
                      <td>22:00 ~</td>
                      <td>ティモ・ベルンハルト／アール・バンバー／ブレンドン・ハートレー（ポルシェ）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>ニュルブルクリンク</dt>
                <dd>7月14日-16日</dd>
              </dl><!-- /.race_info__accordion--trigger -->
              <div class="race_info__accordion--body">
                <table class="race_info__table mod-table">
                  <thead>
                    <tr>
                      <th class="race_info__table__th">イベント</th>
                      <th class="race_info__table__th">開催日</th>
                      <th class="race_info__table__th">日本時間</th>
                      <th class="race_info__table__th">1位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>フリー走行1</td>
                      <td>7月14日（金）</td>
                      <td>18:35 ~</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>7月14日（金）</td>
                      <td>23:15 ~</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>7月15日（土）</td>
                      <td>16:45 ~</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>7月15日（土）</td>
                      <td>21:55 ~</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>7月16日（日）</td>
                      <td>20:00 ~</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>メキシコシティ</dt>
                <dd>9月1日-3日</dd>
              </dl><!-- /.race_info__accordion--trigger -->
              <div class="race_info__accordion--body">
                <table class="race_info__table mod-table">
                  <thead>
                    <tr>
                      <th class="race_info__table__th">イベント</th>
                      <th class="race_info__table__th">開催日</th>
                      <th class="race_info__table__th">日本時間</th>
                      <th class="race_info__table__th">1位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>フリー走行1</td>
                      <td>9月1日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>9月1日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>9月2日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>9月2日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>9月3日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>オースティン</dt>
                <dd>9月14日-16日</dd>
              </dl><!-- /.race_info__accordion--trigger -->
              <div class="race_info__accordion--body">
                <table class="race_info__table mod-table">
                  <thead>
                    <tr>
                      <th class="race_info__table__th">イベント</th>
                      <th class="race_info__table__th">開催日</th>
                      <th class="race_info__table__th">日本時間</th>
                      <th class="race_info__table__th">1位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>フリー走行1</td>
                      <td>9月14日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>9月14日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>9月15日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>9月15日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>9月16日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>富士</dt>
                <dd>10月13日-15日</dd>
              </dl><!-- /.race_info__accordion--trigger -->
              <div class="race_info__accordion--body">
                <table class="race_info__table mod-table">
                  <thead>
                    <tr>
                      <th class="race_info__table__th">イベント</th>
                      <th class="race_info__table__th">開催日</th>
                      <th class="race_info__table__th">日本時間</th>
                      <th class="race_info__table__th">1位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>フリー走行1</td>
                      <td>10月13日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>10月13日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>10月14日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>10月14日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>10月15日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>上海</dt>
                <dd>11月3日-5日</dd>
              </dl><!-- /.race_info__accordion--trigger -->
              <div class="race_info__accordion--body">
                <table class="race_info__table mod-table">
                  <thead>
                    <tr>
                      <th class="race_info__table__th">イベント</th>
                      <th class="race_info__table__th">開催日</th>
                      <th class="race_info__table__th">日本時間</th>
                      <th class="race_info__table__th">1位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>フリー走行1</td>
                      <td>11月3日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>11月3日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>11月4日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>11月4日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>11月5日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>バーレーン</dt>
                <dd>11月16日-18日</dd>
              </dl><!-- /.race_info__accordion--trigger -->
              <div class="race_info__accordion--body">
                <table class="race_info__table mod-table">
                  <thead>
                    <tr>
                      <th class="race_info__table__th">イベント</th>
                      <th class="race_info__table__th">開催日</th>
                      <th class="race_info__table__th">日本時間</th>
                      <th class="race_info__table__th">1位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>フリー走行1</td>
                      <td>11月16日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>11月16日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>11月17日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>11月17日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>11月18日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->
          </section><!-- /.race_info -->
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
    <div class="foot-sec-inner">
      <?php
      // SEO対策 / パンくずリストを設置する #776
      include_once __DIR__."/../_breadcrumb.php"; ?>
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
          <div class="fb-page" data-href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/" data-width="500" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/"><a href="https://www.facebook.com/<?php echo $page['sns']['facebook']; ?>/"><?php echo $page['site_name']; ?></a></blockquote></div></div>
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

<script src="/assets/js/motorsports_app.bundle.js?v=<?php echo $page['version']; ?>"></script>

</body>
</html>
<?php
include_once __DIR__."/../../../app/templates/_debug.php";
?>
