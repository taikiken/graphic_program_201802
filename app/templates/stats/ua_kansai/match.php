<?php
include __DIR__."/getData.php";
include __DIR__."/define.php";
//$gameId = $_GET["gameId"];
if(isset($_GET["gameId"])) {
    $gameId = htmlspecialchars($_GET["gameId"], ENT_QUOTES, 'UTF-8');
}
if(isset($_GET["year"])) {
    $year = htmlspecialchars($_GET["year"], ENT_QUOTES, 'UTF-8');
} else {
    $year = $defYear; //define.phpより設定年度を代入
}
if(isset($_GET["season"])) {
    $season = htmlspecialchars($_GET["season"], ENT_QUOTES, 'UTF-8');
} else {
    $season = $defSeason; //define.phpより設定季節を代入
}
//$dataArray = getData::getMatch($gameId);
$dataArray = getData::getMatch($year, $season, $gameId);
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

  <?php include_once __DIR__.'/_head.php'; ?>

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

<!-- 20171119試合特別LIVE -->
<?=$dataArray["live"]?>


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
        <?php if ($dataArray["autoReload"]) : ?>
        <ul class="amefoot_live__reload">
          <li class="refresh-container" style="display: inline;">
            <div id="auto" class="amefoot_live__reload__btn--auto">
              <a href="#auto">
                <span>自動更新(30秒)</span>
              </a>
            </div>
            <div id="manual" class="amefoot_live__reload__btn--manual">
              <a href="#manual" class="selected">
                <span>手動更新</span>
              </a>
            </div>
          </li>
          <li id="reload" class="amefoot_live__reload__btn--reload">
            <a href="#">
              <span>更新</span>
            </a>
          </li>
        </ul>
        <?php endif; ?>
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
                    <th>REC</th>
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
                    <th>REC</th>
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
                    <th>REC</th>
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
                    <th>REC</th>
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
            <!-- /531683568/kansai-amefoot-ad/ua-pc-sidebar-rectabgle -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/kansai-amefoot-ad/ua-pc-sidebar-rectabgle', [300, 250], 'div-gpt-ad-1510649945193-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1510649945193-0' style='height:250px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1510649945193-0'); });
            </script>
            </div>
            <!-- // /531683568/kansai-amefoot-ad/ua-pc-sidebar-rectabgle -->
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

<?php
// # footer
// ==============================

  $BREADCRUMB = array(
    array(
      'label' => '関西アメフト 日程・結果',
      'path'  => '/stats/ua_kansai/'
    ),
    array(
      'label' => $dataArray["date"].' '.$dataArray["playFirstName"].' vs '. $dataArray["drawFirstName"],
      'path'  => '/stats/ua_kansai/match/?gameId='.$gameId
    ),
  );

  // footer dom
  include_once __DIR__.'/../../_footer-responsive.php';
?>

</div><!-- /.whole -->

<!-- for facebook -->
<script src="/assets/facebook/init.js?v=<?php echo $page['version']; ?>"></script>
<!-- // for facebook -->

<script src="/assets/js/libs/jquery2/jquery.min.js"></script>
<script src="/assets/stats/ua_kansai/js/userAgent.js"></script>
<script src="/assets/js/global.bundle.js"></script>
<script src="/assets/stats/ua_kansai/js/amefoot.bundle.js"></script>
<script src="/assets/stats/ua_kansai/js/match.js"></script>
<script src="/assets/popup/js/banner_popup_app.bundle.js?v=<?php echo $page['version']; ?>"></script>
</body>
</html>
