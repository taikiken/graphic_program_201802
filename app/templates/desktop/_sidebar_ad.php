<?php

// 六大学 / 広告表示 調整（Web） #1546
// > アドネットワーク関連の広告（ネイティブアド？）を消したい
// @see https://github.com/undotsushin/undotsushin/issues/1546
// category.slug 'big6tv' search
// @since 2017-03-15
global $template_big6tb;
$template_name = $page['template'];
//$in_big6tv = false;
$in_big6tv = $template_big6tb;
$single_big6tv = false;


if ($template_name == 'category' || $template_name == 'p') :
  $page_category = $page['category'];

  if ( isset($page_category) ) :
    if ( $page_category['slug'] == 'big6tv' ) :
      $in_big6tv = true;
    endif;

    if (
      $page_category['slug'] == 'crazy' ||
      $page_category['slug'] == 'big6tv' ||
      $page_category['slug'] == 'inhightv'
    ) :
      $page['post']['is_sponserd'] = true;
    endif;

  endif;

endif;

?>
<?php
//2017/7/14追加
//ref. https://github.com/undotsushin/undotsushin/issues/1914
//モータースポーツ専用のレクタングル広告
if ($page['template'] == 'motorsports') :
?>

          <div class="sponsor-link">
            <!-- /531683568/motor_sport/motor_sport_sidebar_rectngle -->
            <script>
              googletag.cmd.push(function() {
                googletag.defineSlot('/531683568/motor_sport/motor_sport_sidebar_rectngle', [300, 250], 'div-gpt-ad-1500012606988-0').addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
              });
            </script>
            <div id='div-gpt-ad-1500012606988-0' style='height:250px; width:300px;'>
            <script>
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1500012606988-0'); });
            </script>
            </div>
            <!-- //  /531683568/motor_sport/motor_sport_sidebar_rectngle -->
          </div><!-- /.sponsor-link -->

<?php
endif;
// $page['template'] == 'motorsports' 以外の時に広告を表示する
// --------------------------------
?>
<?php
// `/big6tv`
// 記事詳細 + big6tv - 広告トル
// `/category/pyeongchang2018/` - 広告表示しない - 2017-12-22
if (
    !$single_big6tv &&
    $page['template'] != 'motorsports'
  ) :
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

          </div><!-- /.sponsor-link -->
          <?php endif; ?>
<?php
endif;
// $single_big6tv 以外の時に広告を表示する
// --------------------------------
?>

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
          </div><!-- /.app-bnr -->

<?php
// not big6tv の時のみ広告を表示する
// --------------------------------
if ($in_big6tv) :
  // big6tv 時にバナー
?>
  <div class="side-bnr_big6">
    <ul class="side-bnr_big6-list">
      <li class="side-bnr_big6-item">
        <a href="http://www.xebiodreamcup.com/" target="_blank"><img src="/assets/images/big6/bnr-side-mlb-dream.jpg" alt="MLB DREAMCUP – 軟式野球チームの頂点へ"></a>
      </li>
      <li class="side-bnr_big6-item">
        <a href="http://big6.gr.jp" target="_blank"><img src="/assets/images/big6/bnr-side-big6.png" alt="一般財団法人 東京六大学野球連盟"></a>
      </li>
    </ul>
  </div>
<?php
endif;
// big6tv 時にバナー
// --------------------------------
?>

<?php
// @since 2018-04-10
// tab bar
include_once __DIR__ . '/_sidebar_tab_bar.php';
?>

          <?php
          // ------------------------------------
          // sidebar recommend, オススメ記事
          if (
            $page['template'] == 'category' ||
            $page['template'] == 'search' ||
            $page['template'] == 'p' ||
            // mortorsports 条件を追加 - `/public/motorsports/motorsports_model.php` on 2017-07-06
            $page['template'] == 'motorsports'
          ) : ?>
            <div id="widget-recommend-list-container"></div><!--/recommend-->
          <?php endif; ?>

          <div id="widget-ranking-container"></div><!--/ranking-->

          <?php if ( !$page['post']['is_sponserd'] ) : ?>
            <div id="sponsor-link-ranking" class="sponsor-link sponsor-link-ranking">
              <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35250&targetID=adg_35250&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
            </div>
          <?php endif; ?>



          <?php
          // ------------------------------------
          // sidebar videos, オススメ動画
          // crazy 表示しない
          // https://github.com/undotsushin/undotsushin/issues/862#issuecomment-229568814
          ?>
          <?php if ( $page['category']['slug'] !== 'crazy' ) : ?>
            <div id="widget-recommend-container"></div><!--/videos-->
          <?php endif; ?>

          <?php if ( !$page['post']['is_sponserd'] ) : ?>
            <div id="sponsor-link-recommend" class="sponsor-link sponsor-link-recommend">
              <script src="https://ssl.socdm.com/sdk/js/adg-script-loader.js?id=35251&targetID=adg_35251&displayid=2&adType=PC&width=0&height=0&sdkType=3&async=true&tagver=2.0.0"></script>
            </div>
          <?php endif; ?>



          <?php
          // ------------------------------------
          // sidebar bottom
          ?>
          <?php if ( !$page['post']['is_sponserd'] && $page['ad']['pc']['sidebar_bottom'] ) : ?>
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
