<div class="body-sec">
  <div class="body-sec-inner">

    <section class="main-sec">

      <div class="stats__header stats__header--golf">
        <h1 class="stats__header__title"><a href="./"><img class="responsive" src="/assets/images/stats/golf/heading@2x.png" alt="ゴルフ 速報&スタッツ" /></a></h1>
      </div><!-- /.stats__header -->


      <div class="stats__banner stats__banner--tennis">
        <?php if ( $page['ua'] === 'desktop' ) : ?>
        <!-- /531683568/golf-stats-ad/golf-stats-under-header-PC -->
        <script>
          googletag.cmd.push(function() {
            googletag.defineSlot('/531683568/golf-stats-ad/golf-stats-under-header-PC', [728, 90], 'div-gpt-ad-1498734753639-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        </script>
        <div id='div-gpt-ad-1498734753639-0' style='height:90px; width:728px;'>
        <script>
        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1498734753639-0'); });
        </script>
        </div>
        <!-- // /531683568/golf-stats-ad/golf-stats-under-header-PC -->
        <?php else : ?>
        <!-- /531683568/golf-stats-ad/golf-stats-under-header-SP -->
        <script>
          googletag.cmd.push(function() {
            googletag.defineSlot('/531683568/golf-stats-ad/golf-stats-under-header-SP', [320, 50], 'div-gpt-ad-1498734782114-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        </script>
        <div id='div-gpt-ad-1498734782114-0' style='height:50px; width:320px;'>
        <script>
        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1498734782114-0'); });
        </script>
        </div>
        <!-- // /531683568/golf-stats-ad/golf-stats-under-header-SP -->
        <?php endif; ?>
      </div><!-- /.stats__banner -->


      <div class="stats__nav stats__nav--golf">
        <ul class="stats__nav__list">
          <li class="stats__nav__item_1"><a class="show-for-large" href="./?sj_PageID=pc_2017_schedule_21">国内ゴルフ</a><a class="show-for-small" href="./?sj_PageID=sp_2017_schedule_21">国内ゴルフ</a></li>
          <li class="stats__nav__item_2"><a class="show-for-large" href="./?sj_PageID=pc_2017_schedule_11">海外ゴルフ(海外男子)</a><a class="show-for-small" href="./?sj_PageID=sp_2017_schedule_11">海外ゴルフ(海外男子)</a></li>
          <li class="stats__nav__item_3"><a class="show-for-large" href="./?sj_PageID=pc_2017_schedule_13">海外ゴルフ(海外女子)</a><a class="show-for-small" href="./?sj_PageID=sp_2017_schedule_13">海外ゴルフ(海外女子)</a></li>
        </ul>
      </div>

      <link rel="stylesheet" href="http://sports.stats-japan.jp/tennis/sjparts/css/common-sp.css" />
      <link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf-sp.css" />

      <?php
      /*
        <?php if ( $page['ua'] === 'desktop' ) : ?>
        <link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf.css" />
        <?php else : ?>
        <link rel="stylesheet" href="http://golf.stats-japan.jp/contents/css/sportsbull/sj-golf-sp.css" />
        <?php endif; ?>
      */
      ?>

      <script src="http://golf.stats-japan.jp/parts/sportsbull/main.js"></script>
      <?php
      /*
      //--------------------------------
      ?>
      <script>
        sj_golf.instance.render({
          'hideBcl' : true,
          'page'    :'pc_2017_schedule_21'
        });
      </script>
      <?php
      //--------------------------------
      // ウインドウサイズ `769px 以上` なら `pc_2017_schedule_21`
      // ウインドウサイズ `768px 以下` なら `sp_2017_schedule_21`
      // UAが `other` もしくは `tablet` なら `pc_2017_schedule_21`
      // UAが `ios` `android` `undotsushin-ios` `undotsushin-android` を含むなら `pc_2017_schedule_21`
      // @since 2017-06-29
      */
      ?>
      <script>
        (function(window, sj_golf) {
          'use strict';
          var document = window.document;
          var html = document.documentElement;
          var Sagen = window.Sagen;
          // pc detect
          var pc = Sagen.Dom.hasClass(html, 'other') || Sagen.Dom.hasClass(html, 'tablet');
          // window width detect
          if (window.innerWidth <= 768) {
            pc = false;
          }
          // app detect
          var app = window.navigator.userAgent.match(/undotsushin-ios|undotsushin-android/i);
          if (app) {
            pc = false;
          }
          var page = pc ? 'pc_2017_schedule_21' : 'sp_2017_schedule_21';
          sj_golf.instance.render({
            'hideBcl' : true,
            'page'    : page
          });
        }(window, window.sj_golf));
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
