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

  <?php include_once __DIR__."/../../_head.php"; ?>




  <script src="/assets/js/libs/vendor.react.js?v=<?php echo $page['version']; ?>"></script>
  <script src="/assets/js/bundle/main.bundle.js?v=<?php echo $page['version']; ?>"></script>
  <!-- <script src="/assets/js/libs/jquery2/jquery.min.js?v="></script> -->

  <script src="/assets/js/live/libs.js?v=<?php echo $page['version']; ?>"></script>

  <link rel="stylesheet" href="/assets/css/live/<?php echo $page['template_classname']; ?>/ui.css?v=<?php echo $page['version']; ?>">

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

  <?php include_once __DIR__ . '/../../_env.php'; ?>
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
            <img src="/assets/images/live/uci-mtb-world-cup-2018/ttl_rb.png" alt="" class="rb-hide-pc">
            <img src="/assets/images/live/uci-mtb-world-cup-2018/ttl_rb_pc.png" alt="" class="rb-hide-sp">
        </div>
        <div class="rb--movie">
          <div id="VideoPlayer">
            <div id="placeHolder"></div>
          </div>
          <!-- <img src="/assets/images/live/uci-mtb-world-cup-2018/rb_announce.png" alt=""> -->
        </div>

        <div class="body-sec-inner">
          <div class="main-sec">
            <div class="rb--intro">

              <p class="rb--intro__text">大自然の急斜面を下っていく、世界最高峰のマウンテンバイクシリーズ！世界中からエリートクラスの男女ライダーが集結し、頂点を競い合う。誰よりも速く丘を走り下りたライダーが優勝する、シンプルながらも過酷なレース。岩や巨木の障害物を乗り越え、時には大ジャンプしながら疾走するMTBの迫力の映像をお楽しみください。実況は藤原カズヒロ、解説はMTBプロライダーの井手川直樹。</p>

              <p class="rb--intro__hashtag">
                ハッシュタグを付けてtwitterで感想や質問をつぶやこう！<br />
                実況で取り上げてくれるかも…？
                <a href="https://twitter.com/intent/tweet?hashtags=UCIダウンヒル&url=https://sportsbull.jp/live/uci-mtb-world-cup-2018/" target="_blank">「#UCIダウンヒル」</a>
              </p>

              <div class="rb--intro__mc">
                <ul>
                  <li>
                    <img src="/assets/images/live/uci-mtb-world-cup-2018/img_mc01.jpg" alt="">
                    <p>実況:藤原カズヒロ<br />(Sports MC / Team REAL)</p>
                  </li>
                  <li>
                    <img src="/assets/images/live/uci-mtb-world-cup-2018/img_mc02.jpg" alt="">
                    <p>解説:井手川直樹<br />(MTBプロライダー)</p>
                  </li>
                </ul>
              </div>

            </div>
            <div class="rb-appli">

              <?php
              // app in webview 時に .head-sec を非表示にする
                if (!$from_webview) :
              ?>

                <a href="https://app.adjust.com/tv698b4" target="_blank">
                  <img src="/assets/images/live/uci-mtb-world-cup-2018/bnr_spbl_app.png" alt="アプリなら無料ライブ配信開始の通知を受け取れる！" class="rb-hide-pc">
                  <img src="/assets/images/live/uci-mtb-world-cup-2018/bnr_spbl_app_pc.png" alt="アプリなら無料ライブ配信開始の通知を受け取れる！" class="rb-hide-sp">
                </a>

              <?php
                endif;
              // -----------------------------------------
              ?>

              <a href="https://www.redbull.com/jp-ja/events/uci-mtb-world-cup-2018" target="_blank">
                <img src="/assets/images/live/uci-mtb-world-cup-2018/bnr_rb.png" alt="UCI MOUNTAIN BIKE WORLD CUP 2018 についてもっと知る" class="rb-hide-pc">
                <img src="/assets/images/live/uci-mtb-world-cup-2018/bnr_rb_pc.png" alt="UCI MOUNTAIN BIKE WORLD CUP 2018 についてもっと知る" class="rb-hide-sp">
              </a>

            </div>
            <!--
            <section class="rb--timetable">
              <h2><img src="/assets/images/live/uci-mtb-world-cup-2018/ttl_timetable.png" alt="">タイムテーブル</h2>
              <p class="commingsoon">COMMING SOON...</p>
              <!--
              <table>
                <tbody>
                  <tr>
                    <th>19:30</th>
                    <td>ウィメンズ エリート</td>
                  </tr>
                  <tr>
                    <th>20:25</th>
                    <td>インターバル</td>
                  </tr>
                  <tr>
                    <th>21:00</th>
                    <td>メンズ エリート</td>
                  </tr>
                  <tr>
                    <th>22:45</th>
                    <td>配信終了</td>
                  </tr>
                </tbody>
              </table>
              <p class="notice">※ タイムテーブルは、当日の進行により変更になる可能性があります。</p>
              -->
            </section>

            <?php if ($page['ua'] !== 'desktop') : ?>
              <div class="rb--banner">
                <!-- /531683568/redbull_ad/red-bull-live-sp-big-banner -->
                <script>
                  googletag.cmd.push(function() {
                    googletag.defineSlot('/531683568/redbull_ad/red-bull-live-sp-big-banner', [320, 50], 'div-gpt-ad-1525913603821-0').addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                  });
                </script>
                <div id='div-gpt-ad-1525913603821-0' style='height:50px; width:320px;'>
                <script>
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1525913603821-0'); });
                </script>
                </div>
                <!-- // /531683568/redbull_ad/red-bull-live-sp-big-banner -->
              </div>
            <?php else:?>
              <div class="rb--banner">
                <!-- /531683568/redbull_ad/red-bull-live-pc-bigbanner -->
                <script>
                  googletag.cmd.push(function() {
                    googletag.defineSlot('/531683568/redbull_ad/red-bull-live-pc-bigbanner', [728, 90], 'div-gpt-ad-1525914354723-0').addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                  });
                </script>
                <div id='div-gpt-ad-1525914354723-0' style='height:90px; width:728px;'>
                <script>
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1525914354723-0'); });
                </script>
                </div>
                <!-- // /531683568/redbull_ad/red-bull-live-pc-bigbanner -->
              </div>
            <?php endif; ?>

            <section class="rb--archived">
              <h2><img src="/assets/images/live/crankworx-world-tour-2018/ttl_archived.png" alt="ARCHIVED">過去の大会</h2>
              <ul>
                <li>
                  <a href="https://sportsbull.jp/p/339769/" class="movie">
                    <div class="rb--archived__image-wrap">
                      <img src="https://img.sportsbull.jp/thumbnail1/img2018062612583135807900.jpg" alt="">
                    </div>
                    <div class="rb--archived__text-wrap">
                      <h3>【フルタイム動画】6/10 UCI MOUNTAIN BIKE WORLD CUP ダウンヒル レオガング大会</h3>
                      <?php if ($page['ua'] === 'desktop') : ?>
                        <p class="rb-hide-sp">実況:アリー(アクションスポーツMC/Team REAL)<br />解説:九島勇気(MTB BMX プロライダー)</p>
                      <?php endif; ?>
                    </div>
                  </a>
                </li>
　　　　　　　　　 <li>
                  <a href="https://sportsbull.jp/p/347018/" class="movie">
                    <div class="rb--archived__image-wrap">
                      <img src="https://img.sportsbull.jp/thumbnail1/img2018070914433659097100.png" alt="">
                    </div>
                    <div class="rb--archived__text-wrap">
                      <h3>【フルタイム動画】7/7 UCI MOUNTAIN BIKE WORLD CUP ダウンヒル ヴァル・ディ・ソーレ大会</h3>
                      <?php if ($page['ua'] === 'desktop') : ?>
                        <p class="rb-hide-sp">実況:藤原カズヒロ(Sports MC/Team REAL)<br />解説:井手川直樹(MTBプロライダー)</p>
                      <?php endif; ?>
                    </div>
                  </a>
                </li>
              </ul>
            </section>

            <?php /*
            <section class="rb--related">
              <h2><img src="/assets/images/live/uci-mtb-world-cup-2018/ttl_related.png" alt="">関連記事</h2>
              <ul>
                <li>
                  <a href="/p/312214/" class="movie">
                    <div class="rb--related__image-wrap">
                      <img src="https://img.sportsbull.jp/thumbnail1/img2018050922124162470800.png" alt="">
                    </div>
                    <div class="rb--related__text-wrap">
                      <h3>世界で最も過酷な400M走に「ブルくん」が挑むよ！</h3>
                      <?php if ($page['ua'] === 'desktop') : ?>
                        <p class="rb-hide-sp">久しぶりにあいつが帰ってくる。昨年はボックスカートレースに挑み爪あとを残したブルくん。正直立ってるだけでもしんどいのに、今回は世界で最も過酷な４００M走っちゃうよ！応援してね！</p>
                      <?php endif; ?>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/p/312207/" class="movie">
                    <div class="rb--related__image-wrap">
                      <img src="https://img.sportsbull.jp/thumbnail1/img2018050922045562791400.png" alt="">
                    </div>
                    <div class="rb--related__text-wrap">
                      <h3>【ハイライト動画】Red Bull 400 札幌大会2017</h3>
                      <?php if ($page['ua'] === 'desktop') : ?>
                        <p class="rb-hide-sp">Red Bull 400とは、スキージャンプ競技場のラージヒルを利用して行う、最高斜度３７度のヒルクライムレースである。世界で最も過酷な400M走だ。スポーツブルでライブ配信される今大会をより楽しむため、前大会の様子をチェックだ！</p>
                      <?php endif; ?>
                    </div>
                  </a>
                </li>
              </ul>
            </section>
            */ ?>

            <ul class="footer-rectangle">
              <li class="rb-hide-sp">
                <!-- /531683568/redbull_ad/red-bull-live-pc-footer-rectangle1 -->
                <script>
                  googletag.cmd.push(function() {
                    googletag.defineSlot('/531683568/redbull_ad/red-bull-live-pc-footer-rectangle1', [300, 250], 'div-gpt-ad-1525913731348-0').addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                  });
                </script>

                <div id='div-gpt-ad-1525913731348-0' style='height:250px; width:300px;'>
                <script>
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1525913731348-0'); });
                </script>
                </div>
                <!-- // /531683568/redbull_ad/red-bull-live-pc-footer-rectangle1 -->
              </li>
              <li>
                <!-- /531683568/redbull_ad/red-bull-live-pc-footer-rectangle2 -->
                <script>
                  googletag.cmd.push(function() {
                    googletag.defineSlot('/531683568/redbull_ad/red-bull-live-pc-footer-rectangle2', [300, 250], 'div-gpt-ad-1525913782071-0').addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                  });
                </script>
                <div id='div-gpt-ad-1525913782071-0' style='height:250px; width:300px;'>
                <script>
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1525913782071-0'); });
                </script>
                </div>
                <!-- // /531683568/redbull_ad/red-bull-live-pc-footer-rectangle2 -->
              </li>
            </ul>

          </div><!-- /.main-sec -->

          <?php
          // static_contents
          // ===========================================
            include_once dirname(__DIR__) . '/uci-mtb-world-cup-2018/_include/_static_sidebar.php';
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
          'label' => 'UCI MOUNTAIN BIKE WORLD CUP 2018（ダウンヒル） ライブ配信',
          'path'  => '/live/uci-mtb-world-cup-2018/'
        ),
      );
    ?>

    <?php
    // app in webview 時に非表示にする
      if (!$from_webview) :
    ?>
      <?php include_once __DIR__."/../../_footer-responsive.php"; ?>
    <?php
      endif;
      // -----------------------------------------
    ?>

    <?php include_once __DIR__."/../../_debug.php"; ?>

    <script>
      var ua = window.navigator.userAgent.toLowerCase();
      if ( /undotsushin/i.test(ua) ) {
        var help = document.getElementById('live-help-safari11');
        help.parentNode.removeChild(help);
      }
    </script>

    <script src="/assets/js/global.bundle.js"></script>
    <script src="https://code.jquery.com/jquery-git.min.js"></script>


    <script src="/assets/js/live/<?php echo $page['template_classname']; ?>/videoPlayer.js?v=<?php echo $page['version']; ?>"></script>
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

    <!-- サービスTOP対応 -->



    <script>

      if (navigator.userAgent.match(/spass-app/i)) {
        document.getElementById("serviceTop_hide").style.display ="none";
      }
    </script>

  </div>
</body>
</html>
