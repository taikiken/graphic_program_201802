<?php
// app webview かを `?app=(ios|android)` から判定します
// ==============================
  $from_webview = false;
  if (isset($_GET['app'])) {
    if ($_GET['app'] == 'ios' || $_GET['app'] == 'android') {
      $from_webview = true;
    }
  }
?>

<!DOCTYPE html>
<html dir="ltr" lang="ja">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# <?php echo $page['og_type']; ?>: http://ogp.me/ns/<?php echo $page['og_type']; ?>#">
  <meta charset="UTF-8">

  <?php include_once __DIR__."/../_head.php"; ?>




  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <!-- <script src="/assets/js/libs/jquery2/jquery.min.js?v="></script> -->

  <script src="/assets/js/<?php echo $page['template_classname']; ?>/libs.js?v=<?php echo $page['version']; ?>"></script>

  <link rel="stylesheet" href="/assets/css/<?php echo $page['template_classname']; ?>/ui.css?v=<?php echo $page['version']; ?>">

  <link rel="stylesheet" href="/assets/css/basic.css?v=<?php echo $page['version']; ?>" media="only screen and (min-width: 769px)">
  <link rel="stylesheet" href="/assets/sp/css/basic.css?v=<?php echo $page['version']; ?>" media="only screen and (max-width: 768px)">

  <link rel="stylesheet" href="/stats/assets/univbb/css/videoPlayer.css" />

  <script type='text/javascript'>
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    (function() {
    var gads = document.createElement('script');
    gads.async = true;
    gads.type = 'text/javascript';
    var useSSL = 'https:' == document.location.protocol;
    gads.src = (useSSL ? 'https:' : 'http:') +
    '//www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
    })();
  </script>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-74679267-1', 'auto');
    ga('require', 'GTM-KJ33JM9');
    ga('require', 'linkid');
    ga('require', 'displayfeatures');
    ga('send', 'pageview');
  </script>

  <script>
    var isApp = false;
    (function(){
    var param = window.location.search;
    if ( /app=ios/i.test(param) ) {
    document.querySelector('html').classList.add("undotsushin-ios");
    isApp = true;
    }
    if ( /app=android/i.test(param) ) {
    document.querySelector('html').classList.add("undotsushin-android");
    isApp = true;
    }

    if ( isApp ) {
    document.querySelector('html').classList.add("is-app");
    }
    })();
  </script>

  <?php include_once __DIR__ . '/../_env.php'; ?>
</head>

<body>
  <div id="whole" class="whole dark <?php echo $page['template_classname']; ?>">
    <?php
    // app in webview 時に非表示にする
      if (!$from_webview) :
    ?>
      <header class="head-sec">
        <div class="head-sec-inner">
          <h1><a href="/">SPORTS BULL</a></h1>
        </div><!-- /.head-sec-inner -->
      </header><!-- /.head-sec -->
    <?php
    endif;
    // -----------------------------------------
    ?>

    <div class="body-sec">
      <div class="bg-container">
        <div class="rb--head">
          <div class="rb--head__wrap01">
            <img src="/assets/images/red-bull-400-2018/logo_rb400.png" alt="">
          </div>
          <div class="rb--head__wrap02">
            <img src="/assets/images/red-bull-400-2018/ttl_rb400.png" alt="" class="rb-hide-pc">
            <img src="/assets/images/red-bull-400-2018/ttl_rb400_pc.png" alt="" class="rb-hide-sp">
          </div>
        </div>
        <div class="rb--movie">
          <div id="VideoPlayer">
            <div id="placeHolder"></div>
          </div>
          <!-- <img src="/assets/images/red-bull-400-2018/rb400_announce.png" alt=""> -->
        </div>

        <div class="body-sec-inner">
          <div class="main-sec">
            <div class="rb--intro">

              <p>スキージャンプ競技場のラージヒルを利用して行う、ヒルクライムレースのRed Bull 400。最高斜度37度の壁に体力の限界が試される。自慢の瞬発力で一気に駆け上がり、一番を目指そう。日本大会の優勝者には、8月25日（土）にオーストリアで開催される世界選手権への出場権が贈られる。</p>

            </div>
            <div class="rb-appli">

                <a href="https://www.redbull.com/jp-ja/events/red-bull-400/red-bull-400-campaign" target="_blank">
                  <img src="/assets/images/red-bull-400-2018/bnr_red_bull.png" alt="" class="rb-hide-pc">
                  <img src="/assets/images/red-bull-400-2018/bnr_red_bull_pc.png" alt="" class="rb-hide-sp">
                </a>

                <?php
                // app in webview 時に .head-sec を非表示にする
                  if (!$from_webview) :
                ?>

                <a href="https://app.adjust.com/paf496?deep_link=sportsbull%3A%2F%2F" target="_blank">
                  <img src="/assets/images/red-bull-400-2018/bnr_spbl_app.png" alt="アプリなら無料ライブ配信開始の通知を受け取れる！" class="rb-hide-pc">
                  <img src="/assets/images/red-bull-400-2018/bnr_spbl_app_pc.png" alt="アプリなら無料ライブ配信開始の通知を受け取れる！" class="rb-hide-sp">
                </a>

                <?php
                  endif;
                // -----------------------------------------
                ?>

            </div>

            <section class="rb--timetable">
              <h2><img src="/assets/images/red-bull-400-2018/ttl_timetable.png" alt="">タイムテーブル</h2>
              <table>
                <tbody>
                  <tr>
                    <th>10:30</th>
                    <td>イベント内容・コース紹介</td>
                  </tr>
                  <tr>
                    <th>11:00</th>
                    <td>競技開始</td>
                  </tr>
                  <tr>
                    <th>16:00</th>
                    <td>競技終了</td>
                  </tr>
                </tbody>
              </table>
              <p class="notice">※ タイムテーブルは、当日の進行により変更になる可能性があります。</p>
            </section>

            <?php if ($page['ua'] !== 'desktop') : ?>
              <div class="rb--sp-banner">
                <!-- /531683568/fwt-ad/fwt-sp-bigbanner2 -->
                <script>
                  googletag.cmd.push(function() {
                  googletag.defineSlot('/531683568/fwt-ad/fwt-sp-bigbanner2', [320, 50], 'div-gpt-ad-1515139762773-0').addService(googletag.pubads());
                  googletag.pubads().enableSingleRequest();
                  googletag.enableServices();
                  });
                </script>
                <div id='div-gpt-ad-1515139762773-0' style='height:50px; width:320px;'>
                  <script>
                    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515139762773-0'); });
                  </script>
                </div>
                <!-- // /531683568/fwt-ad/fwt-sp-bigbanner2 -->
              </div>
            <?php endif; ?>

            <section class="rb--related">
              <h2><img src="/assets/images/red-bull-400-2018/ttl_related.png" alt="">関連記事</h2>
              <ul>
                <li>
                  <a href="/p/250564/">
                    <div class="rb--related__image-wrap">
                      <img src="https://img.sportsbull.jp/thumbnail1/img2018011123260774225000.png" alt="">
                    </div>
                    <div class="rb--related__text-wrap">
                      <h3>【100秒動画】初心者でもわかるFWT【100秒動画】初心者でもわかるFWT</h3>
                      <?php if ($page['ua'] === 'desktop') : ?>
                        <p class="rb-hide-sp">年々進化し続ける「FWT（Freeride World 年々進化し続ける「FWT（Freeride World Tour）」が2018年1月、長野県白馬村※で開催される。運命の大一番を前に「FWT」解説動画が公開。FWT初心者にも入門編として解りやすい100秒動画となっている。年々進化し続ける「FWT（Freeride World 年々進化し続ける「FWT（Freeride World Tour）」が2018年1月、長野県白馬村※で開催される。運命の大一番を前に「FWT」解説動画が公開。FWT初心者にも入門編として解りやすい100秒動画となっている。</p>
                      <?php endif; ?>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/p/250564/">
                    <div class="rb--related__image-wrap">
                      <img src="https://img.sportsbull.jp/thumbnail1/img2018011123260774225000.png" alt="">
                    </div>
                    <div class="rb--related__text-wrap">
                      <h3>【100秒動画】初心者でもわかるFWT【100秒動画】初心者でもわかるFWT</h3>
                      <?php if ($page['ua'] === 'desktop') : ?>
                        <p class="rb-hide-sp">年々進化し続ける「FWT（Freeride World 年々進化し続ける「FWT（Freeride World Tour）」が2018年1月、長野県白馬村※で開催される。運命の大一番を前に「FWT」解説動画が公開。FWT初心者にも入門編として解りやすい100秒動画となっている。年々進化し続ける「FWT（Freeride World 年々進化し続ける「FWT（Freeride World Tour）」が2018年1月、長野県白馬村※で開催される。運命の大一番を前に「FWT」解説動画が公開。FWT初心者にも入門編として解りやすい100秒動画となっている。</p>
                      <?php endif; ?>
                    </div>
                  </a>
                </li>
              </ul>
            </section>

            <ul class="footer-rectangle">
              <li class="rb-hide-sp">

                <!-- /531683568/fwt-ad/fwt-pc-footer-rectangle1 -->
                <script>
                  googletag.cmd.push(function() {
                  googletag.defineSlot('/531683568/fwt-ad/fwt-pc-footer-rectangle1', [300, 250], 'div-gpt-ad-1515647523981-0').addService(googletag.pubads());
                  googletag.pubads().enableSingleRequest();
                  googletag.enableServices();
                  });
                </script>
                <div id='div-gpt-ad-1515647523981-0' style='height:250px; width:300px;'>
                  <script>
                    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515647523981-0'); });
                  </script>
                </div>
                <!-- // /531683568/fwt-ad/fwt-pc-footer-rectangle1 -->

              </li>
              <li>

                <!-- /531683568/fwt-ad/fwt-pc-footer-rectangle2 -->
                <script>
                  googletag.cmd.push(function() {
                  googletag.defineSlot('/531683568/fwt-ad/fwt-pc-footer-rectangle2', [300, 250], 'div-gpt-ad-1515647582515-0').addService(googletag.pubads());
                  googletag.pubads().enableSingleRequest();
                  googletag.enableServices();
                  });
                </script>
                <div id='div-gpt-ad-1515647582515-0' style='height:250px; width:300px;'>
                  <script>
                    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1515647582515-0'); });
                  </script>
                </div>
                <!-- // /531683568/fwt-ad/fwt-pc-footer-rectangle2 -->

              </li>
            </ul>

          </div><!-- /.main-sec -->

          <?php
          // static_contents
          // ===========================================
            include_once dirname(__DIR__) . '/red-bull-400-2018/_include/_static_sidebar.php';
          // ===========================================
          ?>

        </div><!-- /.body-sec-inner -->
      </div><!-- /.fwt-bg-container -->
    </div><!-- /.body-sec -->

    <!-- for facebook -->
    <script src="/assets/facebook/init.js?"></script>
    <!-- // for facebook -->
    <script src="/assets/js/related_sidebar_by_env.bundle.js?v=<?php echo $page['version']; ?>"></script>

    <?php
      // # パンくずリスト
      // ==============================
      $BREADCRUMB = array(
        array(
          'label' => 'Red Bull 400',
          'path'  => '/red-bull-400-2018/'
        ),
      );
    ?>

    <?php
    // app in webview 時に非表示にする
      if (!$from_webview) :
    ?>
      <?php include_once __DIR__."/../_footer-responsive.php"; ?>
    <?php
      endif;
      // -----------------------------------------
    ?>

    <?php include_once __DIR__."/../_debug.php"; ?>

    <script>
      var ua = window.navigator.userAgent.toLowerCase();
      if ( /undotsushin/i.test(ua) ) {
        var help = document.getElementById('live-help-safari11');
        help.parentNode.removeChild(help);
      }
    </script>

    <script src="/assets/js/global.bundle.js"></script>
    <script src="https://code.jquery.com/jquery-git.min.js"></script>


    <script src="/assets/js/<?php echo $page['template_classname']; ?>/videoPlayer.js?v=<?php echo $page['version']; ?>"></script>
    <script>
      $(function() {
        if ($(window).width() <= 768) {
          $("#acMenu dt").on("click", function() {
            $(this).next().slideToggle(500, function() {
              if ((/undotsushin-ios/i.test(window.navigator.userAgent))) {
                window.webkit.messageHandlers.onLoadComplete.postMessage("");
              }
            });
              $(this).toggleClass("active");
          });
        }
      });
    </script>
    <!--
    <script>
      $(function() {
        if ((/undotsushin-(ios|android)/i.test(window.navigator.userAgent))) {
          $('.top-image').css('display', 'none');
          $('#liveVideo').css('display', 'none');
          $('.live-streaming-sns.sp-only').css('display', 'none');
        } else {
          return;
        }
      });
    </script>
    -->

    <script>
    // ▼文字列を省略して「…」を付与
    jQuery(function($) {
      $('.rb--related__text-wrap p').each(function() {
        var $target = $(this);
        // オリジナルの文章を取得する
        var html = $target.html();
        // 対象の要素を、高さにautoを指定し非表示で複製する
        var $clone = $target.clone();
        $clone
          .css({
            //display: 'none',
            //position : 'absolute',
            position : 'fixed',
            top : 0,
            left:0,
            //overflow : 'visible'
          })
          .width($target.width())
          .height('4.5em');
        // DOMを一旦追加
        $target.after($clone);
        // 指定した高さになるまで、1文字ずつ消去していく
        while((html.length > 0) && ($clone.height() < $target.height())) {
          html = html.substr(0, html.length - 1);
          //$clone.html(html + '...');
          $target.html(html + '...');
        }
        // 文章を入れ替えて、複製した要素を削除する
        //$target.html($clone.html());
        $clone.remove();
      });
    });
    </script>
  </div>
</body>
</html>
