
<?php
/*
 * https://github.com/undotsushin/undotsushin/issues/720
 * 広告 / PC版画像バナー広告をDFP管理下にする
 */
$pc_sidebar_top = '';
$pc_sidebar_bottom = '';
if ( $page['template'] == 'p' ) {
  // 記事詳細
  $pc_sidebar_top = $page['post']['ad']['pc']['sidebar_top'];
  $pc_sidebar_bottom = $page['post']['ad']['pc']['sidebar_bottom'];
} else {
  $pc_sidebar_top = $page['category']['ad']['pc']['sidebar_top'];
  $pc_sidebar_bottom = $page['category']['ad']['pc']['sidebar_bottom'];
}


// index は必ず表示
$pc_in_home = $page['template'] == 'index';

// ------------------------------------
// sidebar top
if ( !empty($pc_sidebar_top) || $pc_in_home ) :
?>
          <div class="sponsor-link">

            <?php
            /*
            # sidebar_top
            */
            ?>
            <script type='text/javascript'>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/pc_sidebar_top', [300, 250], 'div-gpt-ad-pc_sidebar_top').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-pc_sidebar_top' style='height:250px; width:300px;'>
            <script type='text/javascript'>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-pc_sidebar_top'); });
            </script>
            </div>

          </div>
<?php
endif;
// eof: sidebar top
// ------------------------------------ ?>

          <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="運動通信アプリ版 運動通信をアプリでサクサク楽しむ！"></a></div>

          <div id="widget-ranking-container"></div><!--/ranking-->
          <div id="sponsor-link-ranking" class="sponsor-link sponsor-link-ranking">
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35250&targetID=adg_35250&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
          </div>

          <div id="widget-recommend-container"></div><!--/videos-->
          <div id="sponsor-link-recommend" class="sponsor-link sponsor-link-recommend">
            <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35251&targetID=adg_35251&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
          </div>

<?php
// ------------------------------------
// sidebar bottom
if ( !empty($pc_sidebar_bottom) || $pc_in_home ) :
?>
          <div class="sponsor-link nadir">

            <?php
            /*
            # sidebar_bottom
            */
            ?>
            <script type='text/javascript'>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/pc_sidebar_bottom', [300, 600], 'div-gpt-ad-pc_sidebar_bottom').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            </script>
            <!-- /531683568/pc_sidebar_bottom -->
            <div id='div-gpt-ad-pc_sidebar_bottom' style='height:600px; width:300px;'>
            <script type='text/javascript'>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-pc_sidebar_bottom'); });
            </script>
            </div>

          </div>
<?php
endif;
// eof: sidebar bottom
// ------------------------------------ ?>