<?php

/*

DFPの広告出力管理


# タイトル下部 DFP在庫名
- title_bottom_web_desktop
- title_bottom_web_mobile
- title_bottom_app_ios
- title_bottom_app_android


*/
?>

<script>

  googletag.cmd.push(function() {

    // # Step1. settings

    // UAに応じてサイズとサイズとプラットフォームを定義
    // ------------------------------
    var platform = 'web_mobile';
    var slot_size = [320, 50];

    <?php if ( $page['ua'] === 'desktop' ) : ?>

      platform = 'web_desktop';
      slot_size = [728, 90];

    <?php else : ?>
      var useragent = window.navigator.userAgent;
      if ( /undotsushin-ios/i.test(useragent) ) {
        platform = 'app_ios';
      } else if ( /undotsushin-android/i.test(useragent) ) {
        platform = 'app_android';
      }
    <?php endif; ?>

    // 枠のインスタンス
    var DFP_header_bottom = googletag.defineSlot('/531683568/stats/header', slot_size, 'div-gpt-ad-header_bottom');
    var DFP_title_bottom = googletag.defineSlot('/531683568/stats/title_bottom_' + platform, slot_size, 'div-gpt-ad-title_bottom');


    // targeting
    // ------------------------------
    // 個別にkey-value
    DFP_header_bottom.addService(googletag.pubads()).setTargeting("category", "draft2017").setTargeting("platform", platform);
    DFP_title_bottom.addService(googletag.pubads()).setTargeting("category", "draft2017").setTargeting("platform", platform);

    // まとめてkey-value - 今回はこちらでもよさげ
    // googletag.pubads().setTargeting("category", "draft2017");
    // googletag.pubads().setTargeting("platform", platform);


    // config
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.enableServices();


    // # Step.2 show
    googletag.cmd.push(function() { googletag.display('div-gpt-ad-header_bottom'); });
    googletag.cmd.push(function() { googletag.display('div-gpt-ad-title_bottom'); });


    // # Step.3 Reload
    setInterval(function(){
      googletag.pubads().refresh([DFP_header_bottom]);
      // googletag.pubads().refresh([DFP_title_bottom]); - 六大固定なのでリロードしない
    }, 30000 );

  });


</script>
