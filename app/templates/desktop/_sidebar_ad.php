
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

          <div class="app-bnr"><a href="/about/"><img src="/assets/images/common/bnr-side-app.png" alt="運動通信アプリ版 運動通信をアプリでサクサク楽しむ！"></a></div>

          <?php
          // ------------------------------------
          // sidebar recommend
          if (
            $page['template'] == 'category' ||
            $page['template'] == 'search' ||
            $page['template'] == 'p'
          ) : ?>
            <div id="widget-recommend-list-container"></div><!--/recommend-->
          <?php endif; ?>
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
