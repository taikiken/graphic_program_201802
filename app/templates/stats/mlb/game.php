<?php
/**
 * author: @taikiken
 * Date: 2017/07/16
 * Time: 14:52
 * - スタッツ / MLB - Phase2 : 速報データ（一球速報除く） #2162
 *  https://github.com/undotsushin/undotsushin/issues/2162
 * - UNDO_MLBSTATS-23 テストデータ：作成
 * https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-23
 * - UNDO_MLBSTATS-51 UNDO_MLBSTATS-22 Phase2：速報データ（一球速報除く）- 日程
 * https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-51
 */
?>
<div class="body-sec">
  <div class="body-sec-inner">
    
    <div class="stats__header stats__header--mlb_live">
      <h1 class="stats__header__title"><a href="/stats/mlb/"><img class="responsive" src="/assets/images/stats/mlb/live-heading@2x.png" alt="MLB速報&amp;データ" /></a></h1>
      <div class="stats__header__btn"><a href="/stats/mlb/"><img class="responsive" src="/assets/images/stats/mlb/live-heading-btn@2x.png" alt="日程・結果に戻る" /></a></div><!-- /.stats__header__btn -->
    </div><!-- /.stats__header -->
    
    <?php
    // -----------------------------------------------
    // GAME: 上部 スコア
    ?>
    <div id="js-mlb-game-overview"></div>

    <section class="main-sec">

    <?php
    // -----------------------------------------------
    // GAME: スコアボード + 自動更新
    ?>
    <div id="js-mlb-game-score"></div>
    
    <div class="stats__banner stats__banner--mlb show-for-large">
      <div><a href="hoge"><img src="/assets/images/stats/tennis/bnr_hero.png" alt=""></a></div>
    </div><!-- /.stats__banner -->

    <div class="stats__banner stats__banner--mlb show-for-small">
      <div><a href="hoge"><img src="/assets/images/stats/tennis/bnr_hero@2x.png" alt=""></a></div>
    </div><!-- /.stats__banner -->
    
    <?php
    // ------------------------------------------------------------------------
    // 日程・動的出力
    ?>
    <div id="js-mlb-game-info"></div>
    <script src="/assets/mlb/js/mlb_stats_app.bundle.js?v=<?php echo $page['version']; ?>"></script>
    <?php
    // ------------------------------------------------------------------------
    ?>
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
