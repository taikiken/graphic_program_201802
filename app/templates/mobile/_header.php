<?php

$conditional_header = array(
  'index',
  '404',
  'category',
  'p',
  'search',
  'signup_login',
  'settings',
  'settings.social',
  'settings.account',
  'settings.interest',
  'settings.deactivate',
  'mypage',
  'mypage.activities',
  'notifications',
  'logout',
  'crazy',
  'inc'
);

if ( !in_array($page['template'], $conditional_header, true) ) :
  $page['conditional']['header'] = false;
  $page['conditional']['gnav']   = false;
endif;

// アプリ判定
if ( $page['ua_app'] ) :
  $page['conditional']['header'] = false;
endif;


?>
<?php if ( $page['conditional']['html_start'] ) : ?>
<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">
<?php endif; ?>


<?php
if ( $page['conditional']['head'] ) :
  include_once __DIR__."/../_head.php";
endif;
?>

<?php if ( $page['conditional']['head_assets'] ) : ?>
  <?php if(count($page['photo']) > 0):?>
    <link rel="stylesheet" href="/assets/css/style_sp.css?v=<?php echo $page['version']; ?>">
    <script src="/assets/js/libs.js?v=<?php echo $page['version']; ?>"></script>
  <?php endif;?>

  <?php if ( $page['template'] === 'inc' ) : ?>
    <link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/inc/assets/<?php echo $page['directory']; ?>/mobile/inc.css/?v=<?php echo $page['version']; ?>">
  <?php else : ?>
    <link rel="stylesheet" href="<?php echo $page['site_url_uts']; ?>/assets/sp/css/ui.css?v=<?php echo $page['version']; ?>">
  <?php endif; ?>
<?php endif; ?>


<?php if ( $page['conditional']['head_bottom'] ) : ?>

  <?php # Syn. require module ?>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/sp/js/libs/synapse/synapse.js?v=<?php echo $page['version']; ?>"></script>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/js/libs/jquery2/jquery.min.js?v=<?php echo $page['version']; ?>"></script>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/sp/js/libs/synapse/extras/jquery.inview.js?v=<?php echo $page['version']; ?>"></script>
  <?php // end of Syn. ?>

  <?php
  // app webview を UA 判定する JS を追加します - `app_ua_detector.bundle.js`
  // @since 2017-08-21
  ?>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/js/app_ua_detector.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>

  <?php
  /*
   Syn. menu end point 本番環境では
    ```
    /assets/js/bundle/main.bundle.js?syn=1
    ```
    ?syn=1 を削除してください
    テストの時はつけてください
   */
  ?>
  <script src="<?php echo $page['site_url_uts']; ?>/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>

  <?php include_once __DIR__."/../_head_bottom.php"; ?>
<?php endif; ?>


<?php if ( $page['conditional']['head_video'] ) :
  include_once __DIR__."/_head_video.php";
endif;
?>



<?php // #1860 記事詳細アンカー広告
if ( $page['template'] == 'p' ) :
  if ( $page['post']['is_sponserd'] === false ) :
    echo <<<__EOL__
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-8613117509675807",
    enable_page_level_ads: true
  });
</script>
__EOL__;
  endif;
endif;
?>


<?php if ( $page['conditional']['body_start'] ) : ?>
  </head>
  <body>
<?php endif; ?>


<?php if ( $page['conditional']['whole'] ) :
  include_once __DIR__."/_whole.php";
endif;
?>


<?php if ( $page['conditional']['header'] ) : ?>
<?php if ( $page['conditional']['header_appbnr'] ) : ?>
<div id="<?php echo $page['html_prefix']; ?>js-header-appbnr-container" class="SPBL_common header-appbnr-container">
  <div class="header-appbnr">
    <div class="header-appbnr-link">
      <?php
      // banner 差替え
      // @see https://github.com/undotsushin/undotsushin/issues/2404#issuecomment-331796551
      ?>
      <!-- /531683568/download-popup/download-header-big-banner -->
      <script>
        googletag.cmd.push(function() {
          googletag.defineSlot('/531683568/download-popup/download-header-big-banner', [320, 50], 'div-gpt-ad-1506323101947-0').addService(googletag.pubads());
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
        });
      </script>
      <div id='div-gpt-ad-1506323101947-0' style='height:50px; width:320px;'>
        <script>
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1506323101947-0'); });
        </script>
      </div>
      <!-- // /531683568/download-popup/download-header-big-banner -->
    </div><!-- /.header-appbnr-link -->
  </div><!-- /.header-appbnr -->
</div>
<?php endif; ?>

<div class="SPBL_common <?php echo $page['html_prefix']; ?>header-sticky">
  <header class="<?php echo $page['html_prefix']; ?>head-sec">
    <div class="<?php echo $page['html_prefix']; ?>head-sec-inner">
      <h1><a href="https://app.adjust.com/y06cg3?deep_link=sportsbull://action?url=https%3A%2F%2Fsportsbull.jp%2F">スポーツブル（スポブル）</a></h1>

      <div id="<?php echo $page['html_prefix']; ?>menu-opener" class="<?php echo $page['html_prefix']; ?>menu-opener">
        <a id="<?php echo $page['html_prefix']; ?>side-menu-toggle" href="#<?php echo $page['html_prefix']; ?>side-menu-container"><span></span><span></span><span></span></a>
      </div>

      <aside class="<?php echo $page['html_prefix']; ?>head-sec-inner-right">
        <span id="<?php echo $page['html_prefix']; ?>search-container-opener"></span>

        <div id="<?php echo $page['html_prefix']; ?>user-profile-container"></div><!--/.user-profile-container-->
      </aside>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->


  <div id="<?php echo $page['html_prefix']; ?>head-search-container" class="SPBL_common <?php echo $page['html_prefix']; ?>head-search-container"></div>


  <nav id="<?php echo $page['html_prefix']; ?>global-nav-container" class="SPBL_common <?php echo $page['html_prefix']; ?>gnav-sec">
    <div id="<?php echo $page['html_prefix']; ?>gnav-sec-inner" class="<?php echo $page['html_prefix']; ?>gnav-sec-inner">
      <ul id="<?php echo $page['html_prefix']; ?>gnav-sec-list">
        <li id="<?php echo $page['html_prefix']; ?>home" class="<?php echo $page['html_prefix']; ?>gnav-home"><a href="<?php echo $page['site_url_uts']; ?>/">TOP</a></li>

        <?php foreach( $page['site_tabs'] as $tab ) {
          // https://github.com/undotsushin/undotsushin/issues/645#issuecomment-224162616
          // タブの表示順はAPI通りにする
          ?>
          <li id="<?php echo $tab['slug']; ?>" class="<?php echo $page['html_prefix']; ?>gnav-<?php echo $tab['slug']; ?>">
            <a href="<?php echo $page['site_url_uts']; ?>/category/<?php echo $tab['slug']; ?>/"><?php echo $tab['label']; ?></a>
          </li>
        <?php }//foreach ?>
      </ul>
    </div><!-- /.gnav-sec-inner -->
  </nav><!-- /.gnav-sec -->

</div><!--/.header-sticky-->
<?php endif; ?>