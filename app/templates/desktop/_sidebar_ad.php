<?php
// 六大学 / 広告表示 調整（Web） #1546
// > アドネットワーク関連の広告（ネイティブアド？）を消したい
// @see https://github.com/undotsushin/undotsushin/issues/1546
// category.slug 'big6tv' search
// @since 2017-03-15
$template_name = $page['template'];
$in_big6tv = false;
if ($template_name == 'category') {
  $page_category = $page['category'];
  if ($page_category['slug'] == 'big6tv') {
    $in_big6tv = true;
  }
}
?>

<?php
// `/big6tv`
// 広告トル
if (!$single_big6tv) :
?>
          <?php
          /*
           * https://github.com/undotsushin/undotsushin/issues/720
           * 広告 / PC版画像バナー広告をDFP管理下にする
           */
          ?>
          <?php if ( $page['ad']['pc']['sidebar_top'] ) : ?>
          <div class="sponsor-link">

            <script type='text/javascript'>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/<?php echo $page['ad']['pc']['sidebar_top']; ?>', [300, 250], 'div-gpt-ad-pc_sidebar_top').addService(googletag.pubads());
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
          <?php endif; ?>
<?php
endif;
// $single_big6tv 以外の時に広告を表示する
// --------------------------------
?>

          <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="SPORTS BULLアプリ版(iPhone/Android対応) アプリでサクサク楽しむ！"></a></div>


<?php
// not big6tv の時のみ広告を表示する
// @since 2017-03-15
if (!$in_big6tv && !$single_big6tv) :
?>
          <div class="synSearch-bnr mt20"><a href="http://pickup.syndot.jp/about/?utm_source=undou_pc&utm_medium=banner&utm_campaign=search" target="_blank"><img src="/assets/images/common/bnr-side-synsearch.png" alt="Syn.search チャットで検索？"></a></div>
<?php
endif;
// not big6tv の時のみ広告を表示する
// --------------------------------
?>

          <?php
          // ------------------------------------
          // sidebar recommend, オススメ記事
          if (
            $page['template'] == 'category' ||
            $page['template'] == 'search' ||
            $page['template'] == 'p'
          ) : ?>
            <div id="widget-recommend-list-container"></div><!--/recommend-->
          <?php endif; ?>
          <div id="widget-ranking-container"></div><!--/ranking-->

          <?php if ( $page['category']['slug'] !== 'crazy' ) : ?>
            <?php
            // not big6tv の時のみ広告を表示する
            // @since 2017-03-15
            if (!$in_big6tv && !$single_big6tv) :
            ?>
              <div id="sponsor-link-ranking" class="sponsor-link sponsor-link-ranking">
                <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35250&targetID=adg_35250&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
              </div>
            <?php
            endif;
            // not big6tv の時のみ広告を表示する
            // --------------------------------
            ?>
          <?php endif; ?>

          <?php
          // ------------------------------------
          // sidebar videos, オススメ動画
          // crazy 表示しない
          // https://github.com/undotsushin/undotsushin/issues/862#issuecomment-229568814
          if ( $page['category']['slug'] !== 'crazy' ) :
          ?>
          <div id="widget-recommend-container"></div><!--/videos-->
            <?php
            // not big6tv の時のみ広告を表示する
            // @since 2017-03-15
            if (!$in_big6tv && !$single_big6tv) :
            ?>
              <div id="sponsor-link-recommend" class="sponsor-link sponsor-link-recommend">
                <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35251&targetID=adg_35251&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
              </div>
            <?php
            endif;
            // not big6tv の時のみ広告を表示する
            // --------------------------------
            ?>
          <?php endif; ?>

<?php
// not big6tv の時のみ広告を表示する
// @since 2017-03-15
if (!$in_big6tv && !$single_big6tv) :
?>
          <?php
          // ------------------------------------
          // sidebar bottom
          ?>
          <?php if ( $page['ad']['pc']['sidebar_bottom'] ) :?>
          <div class="sponsor-link nadir">

            <script type='text/javascript'>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/<?php echo $page['ad']['pc']['sidebar_bottom']; ?>', [300, 600], 'div-gpt-ad-pc_sidebar_bottom').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-pc_sidebar_bottom' style='height:600px; width:300px;'>
            <script type='text/javascript'>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-pc_sidebar_bottom'); });
            </script>
            </div>

          </div>
          <?php endif; ?>

<?php
endif;
// not big6tv の時のみ広告を表示する
// --------------------------------
?>
