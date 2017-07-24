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

  <link rel="canonical" href="https://sportsbull.jp/motorsports/<?php echo $option_directory; ?>/">
  <link rel="stylesheet" href="/assets/css/ui.css?v=<?php echo $page['version']; ?>">

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

          <!--
          モータースポーツJSON連携
          ref. https://github.com/undotsushin/undotsushin/issues/1916
          nowの方です
          -->
          <section class="matches">
            <h2 class="matches__heading mod-headingA">第5戦　スペインGP</h2>
            <table class="matches__table mod-table">
              <thead>
                <tr>
                  <th class="matches__table__th">イベント</th>
                  <th class="matches__table__th">開催日</th>
                  <th class="matches__table__th">日本時間</th>
                  <th class="matches__table__th">1位</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>フリー走行1</td>
                  <td>5/12（金）</td>
                  <td>17：00～</td>
                  <td>L.ハミルトン / メルセデスAMG</td>
                </tr>
                <tr>
                  <td>フリー走行2</td>
                  <td>5/12（金）</td>
                  <td>17：00～</td>
                  <td>L.ハミルトン / メルセデスAMG</td>
                </tr>
                <tr>
                  <td>フリー走行3</td>
                  <td>5/12（金）</td>
                  <td>17：00～</td>
                  <td>L.ハミルトン / メルセデスAMG</td>
                </tr>
                <tr>
                  <td>予選</td>
                  <td>5/12（金）</td>
                  <td>17：00～</td>
                  <td>L.ハミルトン / メルセデスAMG</td>
                </tr>
                <tr>
                  <td>決勝</td>
                  <td>5/12（金）</td>
                  <td>17：00～</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table><!-- /.matches__table -->
          </section><!-- /.matches -->

          <!--
          モータースポーツJSON連携
          ref. https://github.com/undotsushin/undotsushin/issues/1916
          postの方です
          -->
          <section class="matches">
            <h2 class="matches__heading mod-headingA">イギリスGP</h2>
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
                  <td>ルイス・ハミルトン</td>
                  <td>メルセデス</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>バルテリ・ボッタス</td>
                  <td>メルセデス</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>キミ・ライコネン</td>
                  <td>フェラーリ</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>マックス・フェルスタッペン</td>
                  <td>レッドブル</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>ダニエル・リカルド</td>
                  <td>レッドブル</td>
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
                  <td>セバスチャン・ベッテル</td>
                  <td>フェラーリ</td>
                  <td>177</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>ルイス・ハミルトン</td>
                  <td>メルセデス</td>
                  <td>176</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>バルテリ・ボッタス</td>
                  <td>メルセデス</td>
                  <td>154</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>ダニエル・リカルド</td>
                  <td>レッドブル</td>
                  <td>117</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>キミ・ライコネン</td>
                  <td>フェラーリ</td>
                  <td>98</td>
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
                  <td>メルセデス</td>
                  <td>330</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>フェラーリ</td>
                  <td>275</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>レッドブル</td>
                  <td>174</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>フォースインディア</td>
                  <td>95</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>ウイリアムズ</td>
                  <td>41</td>
                </tr>
              </tbody>
            </table><!-- /.point_rank__table -->
          </section><!-- /.point_rank -->

          <section class="race_info" id="js-race_info">
            <h2 class="race_info__heading mod-headingA">レース日程・結果</h2>

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>オーストラリアGP</dt>
                <dd>3月24日-26日</dd>
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
                      <td>3月24日（金）</td>
                      <td>10:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>3月24日（金）</td>
                      <td>14:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>3月25日（土）</td>
                      <td>12:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>3月25日（土）</td>
                      <td>15:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>3月26日（日）</td>
                      <td>14:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>中国GP</dt>
                <dd>4月7日-9日</dd>
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
                      <td>4月7日（金）</td>
                      <td>11:00 ~</td>
                      <td>マックス・フェルスタッペン（レッドブル）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>4月7日（金）</td>
                      <td>15:00 ~</td>
                      <td>中止</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>4月8日（土）</td>
                      <td>13:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>4月8日（土）</td>
                      <td>16:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>4月9日（日）</td>
                      <td>15:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>バーレーンGP</dt>
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
                      <td>20:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>4月14日（金）</td>
                      <td>24:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>4月15日（土）</td>
                      <td>21:00 ~</td>
                      <td>マックス・フェルスタッペン（レッドブル）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>4月15日（土）</td>
                      <td>24:00 ~</td>
                      <td>バルテリ・ボッタス（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>4月16日（日）</td>
                      <td>24:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>ロシアGP</dt>
                <dd>4月28日-30日</dd>
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
                      <td>4月28日（金）</td>
                      <td>17:00 ~</td>
                      <td>キミ・ライコネン（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>4月28日（金）</td>
                      <td>21:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>4月29日（土）</td>
                      <td>18:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>4月29日（土）</td>
                      <td>21:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>4月30日（日）</td>
                      <td>21:00 ~</td>
                      <td>バルテリ・ボッタス（メルセデス）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>スペインGP</dt>
                <dd>5月12日-14日</dd>
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
                      <td>5月12日（金）</td>
                      <td>17:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>5月12日（金）</td>
                      <td>21:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>5月13日（土）</td>
                      <td>18:00 ~</td>
                      <td>キミ・ライコネン（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>5月13日（土）</td>
                      <td>21:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>5月14日（日）</td>
                      <td>21:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>モナコGP</dt>
                <dd>5月25日-28日</dd>
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
                      <td>5月25日（木）</td>
                      <td>17:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>5月25日（木）</td>
                      <td>21:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>5月27日（土）</td>
                      <td>18:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>5月27日（土）</td>
                      <td>21:00 ~</td>
                      <td>キミ・ライコネン（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>5月28日（日）</td>
                      <td>21:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>カナダGP</dt>
                <dd>6月9日-11日</dd>
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
                      <td>6月9日（金）</td>
                      <td>23:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>6月9日（金）</td>
                      <td>27:00 ~</td>
                      <td>キミ・ライコネン（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>6月10日（土）</td>
                      <td>23:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>6月10日（土）</td>
                      <td>26:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>6月11日（日）</td>
                      <td>27:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>アゼルバイジャンGP</dt>
                <dd>6月23日-25日</dd>
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
                      <td>6月23日（金）</td>
                      <td>18:00 ~</td>
                      <td>マックス・フェルスタッペン（レッドブル）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>6月23日（金）</td>
                      <td>22:00 ~</td>
                      <td>マックス・フェルスタッペン（レッドブル）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>6月24日（土）</td>
                      <td>19:00 ~</td>
                      <td>バルテリ・ボッタス（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>6月24日（土）</td>
                      <td>22:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>6月25日（日）</td>
                      <td>22:00 ~</td>
                      <td>ダニエル・リカルド（レッドブル）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>オーストリアGP</dt>
                <dd>7月7日-9日</dd>
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
                      <td>7月7日（金）</td>
                      <td>17:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>7月7日（金）</td>
                      <td>21:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>7月8日（土）</td>
                      <td>18:00 ~</td>
                      <td>セバスチャン・ベッテル（フェラーリ）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>7月8日（土）</td>
                      <td>21:00 ~</td>
                      <td>バルテリ・ボッタス（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>7月9日（日）</td>
                      <td>21:00 ~</td>
                      <td>バルテリ・ボッタス（メルセデス）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>イギリスGP</dt>
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
                      <td>17:00 ~</td>
                      <td>バルテリ・ボッタス（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>7月14日（金）</td>
                      <td>21:00 ~</td>
                      <td>バルテリ・ボッタス（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>7月15日（土）</td>
                      <td>18:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>7月15日（土）</td>
                      <td>21:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>7月16日（日）</td>
                      <td>21:00 ~</td>
                      <td>ルイス・ハミルトン（メルセデス）</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>ハンガリーGP</dt>
                <dd>7月28日-30日</dd>
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
                      <td>7月28日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>7月28日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>7月29日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>7月29日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>7月30日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>ベルギーGP</dt>
                <dd>8月25日-27日</dd>
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
                      <td>8月25日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>8月25日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>8月26日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>8月26日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>8月27日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>イタリアGP</dt>
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
                <dt>シンガポールGP</dt>
                <dd>9月15日-17日</dd>
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
                      <td>9月15日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>9月15日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>9月16日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>9月16日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>9月17日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>マレーシアGP</dt>
                <dd>9月29日-10月1日</dd>
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
                      <td>9月29日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>9月29日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>9月30日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>9月30日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>10月1日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>日本GP</dt>
                <dd>10月6日-8日</dd>
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
                      <td>10月6日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>10月6日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>10月7日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>10月7日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>10月8日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>アメリカGP</dt>
                <dd>10月20日-22日</dd>
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
                      <td>10月20日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>10月20日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>10月21日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>10月21日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>10月22日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>メキシコGP</dt>
                <dd>10月27日-29日</dd>
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
                      <td>10月27日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>10月27日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>10月28日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>10月28日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>10月29日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>ブラジルGP</dt>
                <dd>11月10日-12日</dd>
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
                      <td>11月10日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>11月10日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>11月11日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>11月11日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>11月12日（日）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table><!-- /.race_info__table -->
              </div><!-- /.race_info__accordion--body -->
            </div><!-- /.js-race_info__container -->

            <div class="js-race_info__container">
              <dl class="race_info__accordion--trigger">
                <dt>アブダビGP</dt>
                <dd>11月24日-26日</dd>
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
                      <td>11月24日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行2</td>
                      <td>11月24日（金）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>フリー走行3</td>
                      <td>11月25日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>予選</td>
                      <td>11月25日（土）</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>決勝</td>
                      <td>11月26日（日）</td>
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
