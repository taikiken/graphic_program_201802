<div class="body-sec">
  <div class="body-sec-inner">

    <section class="main-sec">
      <div class="stats__header stats__header--tennis">
        <h1 class="stats__header__title"><a href="./"><img class="responsive" src="/assets/images/stats/tennis/heading@2x.png" alt="テニス 速報&スタッツ" /></a></h1>
      </div><!-- /.stats__header -->

      <div class="stats__banner stats__banner--tennis">
        <a href="./?sj_page=tournament_2017001_men_singles_today">
          <img class="responsive" src="/assets/images/stats/tennis/bnr_hero@2x.png" alt="xxxxx">
        </a>
      </div><!-- /.stats__banner -->

      <div class="stats__nav stats__nav--tennis">
        <ul class="stats__nav__list">
          <li class="stats__nav__item_1"><a href="./">トップ</a></li>
          <li class="stats__nav__item_2"><a href="./?sj_page=schedule_men_top">日程・結果</a></li>
          <li class="stats__nav__item_3"><a href="./?sj_page=ranking_21">ランキング</a></li>
          <li class="stats__nav__item_4"><a href="./?sj_page=players_men_a">選手情報</a></li>
          <li class="stats__nav__item_5"><a href="./?sj_page=player_395610_result">錦織 圭 最新結果</a></li>
        </ul>
      </div>

      <?php
      /*
        <?php if ( $page['ua'] === 'desktop' ) : ?>
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common.css" />
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sportsbull/css/fonts/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis.css" />
        <?php else : ?>
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common-sp.css" />
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sportsbull/css/fonts/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis-sp.css" />
        <?php endif; ?>
      */
      ?>

      <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common-sp.css" />
      <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sportsbull/css/fonts/css/font-awesome.min.css"/>
      <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/sj-tennis-sp.css" />

      <script src="http://sports.stats-japan.jp/tennis/sjparts/js/main/tennis.js"></script>
      <script>
        sj_Tennistour.instance.render({
          'hideBcl' : true
        });
      </script>
    </section><!-- /.main-sec -->

    <section class="side-sec show-for-large">
      <div id="sidebar-moving-container">

        <div class="sponsor-link">
          <!-- /531683568/npb-pc-rectangle -->
          <div id='div-gpt-ad-1492577512561-0' style='height:250px; width:300px;'>
          <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1492577512561-0'); });
          </script>
          </div>
        </div>

        <div class="app-bnr">
          <!-- /531683568/pc_sidebar_top_2nd -->
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
          <!-- // /531683568/pc_sidebar_top_2nd -->
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

<script src="/assets/js/stats_tennis.bundle.js?v=<?php echo $page['version']; ?>"></script>

<?php
/*

# `*.instance.render( option );`

initスクリプト。以下のオプションがとれる

option = {
  'page'    : 'ranking_21', // 表示するページ
  'hideBcl' : true | false, // SJヘッダーの表示非表示 - trueで隠す
};

# `*.instance.callbackPage`

callback。ウィジェットinit後に処理を行いたい場合

```
*.instance.callbackPage = function() {
  // callback - do something
};
```

*/
?>
