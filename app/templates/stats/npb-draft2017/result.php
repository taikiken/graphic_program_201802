<?php
// draft
// ==============================
/**
 * BGATE-449 ドラフト会議2017 / データの用意
 * https://aws-plus.backlog.jp/view/BGATE-449
 * BGATE-459 ドラフト会議2017 - スポブル展開
 * https://aws-plus.backlog.jp/view/BGATE-459
 * ```
 * URL :
 * ドラフト候補選手 : `/stats/npb-draft2017/`
 * ドラフト速報 : `/stats/npb-draft2017/result/`
 * ```
 * User: @taikiken
 * Date: 2017/10/20
 * Time: 21:23
 */
?>
<?php
// header
include_once __DIR__."/../../${page['ua']}/_header.php";
?>

  <header class="head-sec">
    <div class="head-sec-inner">
      <h1><a href="/">SPORTS BULL</a></h1>
    </div><!-- /.head-sec-inner -->
  </header><!-- /.head-sec -->

  <div class="body-sec">
    <div class="body-sec-inner">
      <section class="main-sec">
        <!-- draft-header -->
        <header class="draft-header">
          <aside class="draft-header-bnr-top">
            <ul>
              <li>
                <div id='div-gpt-ad-header_bottom'></div>
              </li>
            </ul>
          </aside>

          <div class="draft-header-main">
            <div class="draft-logo"><img src="/assets/images/stats/npb-draft2017/draft-logo.png" alt="DRAFT 2017! NPB supported by リポビタンD" width="225" height="207"></div>
            <h1><img src="/assets/images/stats/npb-draft2017/live-title.png" alt="プロ野球2017 ドラフトリアル生速報" width="584" height="163"></h1>
            <p class="lead">確定次第、指名順とともに指名権獲得球団をリアルタイムでお届けいたします。</p>
            <p class="lead-credit">powered by  : <span class="lead-credit-logo"><a href="http://sp.baseball.findfriends.jp/" target="_blank"><img src="/assets/images/stats/npb-draft2017/logo-baseballmagazine.png" alt="週刊ベースボール"></a></span></p>
          </div>

          <aside class="draft-header-bnr-bottom">
            <ul>
              <li>
                <div id='div-gpt-ad-title_bottom'></div>
              </li>
            </ul>
          </aside>

          <!-- draft-nav -->
          <nav class="draft-nav">
            <ul>
              <li><a href="../">ドラフト候補選手一覧</a></li>
              <li>ドラフトリアル生速報</li>
            </ul>
          </nav>
          <!-- draft-nav -->
        </header>
        <!-- /draft-header -->


        <!-- draft-results -->
        <section class="draft-results">
          <!-- draft-results-header -->
          <header class="draft-results-header">
            <h2>ドラフト会議結果</h2>
            <p><span class="draft-status-1"></span>競合による１位確定<span class="position pitcher">投</span>投手<span class="position catcher">捕</span>捕手<span class="position infielder">内</span>内野手<span class="position outfielder">外</span>外野手</p>
          </header>
          <!-- /draft-results-header -->

          <!-- draft-results-body -->
          <div id="js-live"></div>
          <!-- /draft-results-body -->
        </section>
        <!-- /draft-results -->

        <div class="note-block">
          <ul>
            <li>※ 表示地域は高校生と社会人はチームが所属している各地区の連盟、大学生は野球部合宿所（合宿所がない場合はグラウンド）の所在地に基づきます。<br>独立リーグはチームの本拠地となる都道府県を記載しています。</li>
          </ul>
        </div>

        <!-- bottom-bnr-list -->
        <ul class="bottom-bnr-list">
          <li><a href="http://www.tbs.co.jp/baseball-draft/" target="_blank"><img src="/assets/images/stats/npb-draft2017/bnr-tbs.jpg" alt="プロ野球ドラフト会議 10月26日（木）午後4時50分 TBS系列全国ネット放送 supported by リポビタンD" width="728" height="90"></a></li>
          <li><a href="http://www.tbs.co.jp/baseball-draft/tokuban/" target="_blank"><img src="/assets/images/stats/npb-draft2017/bnr-thanks.jpg" alt="ドラフト緊急生特番！お母さんありがとう 10月26日（木）よる7時 TBS系列全国ネット放送" width="728" height="90"></a></li>
        </ul>
        <!-- /bottom-bnr-list -->


        <!-- players-info -->
        <div id="js-modal"></div>
      </section><!-- /.main-sec -->

    </div>
  </div><!-- /.body-sec -->

  <footer id="footer-container" class="foot-sec">
    <div class="foot-sec-inner">
      <nav class="foot-breadCrumb">
        <ol itemscope itemtype="http://schema.org/breadCrumbList">
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="1" /></a></li>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="../"><span itemprop="name">プロ野球2017 ドラフト候補選手</span><meta itemprop="position" content="2" /></a></li>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="./"><span itemprop="name">プロ野球2017 ドラフトリアル生速報</span><meta itemprop="position" content="3" /></a></li>
        </ol>
      </nav><!-- /.foot-breadCrumb -->

      <div class="foot-pr">
        <div class="foot-pr-inner">
          <figure><img src="/assets/images/common/footer-overview-figure.png" alt=""></figure>

          <div class="text-block">
            <h3 class="foot-pr-logo"><img src="/assets/images/common/footer-overview-logo.png" alt="SPORTS BULL アプリ版(iPhone/Android)"></h3>
            <ul class="foot-pr-btn">
              <li><a href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
              <li><a href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
            </ul>
            <p class="foot-pr-text">話題のスポーツニュースがサクサク読める、無料のニュースまとめアプリ「スポーツ・ブル」。高品質なスポーツのニュース、動画をいつでもお楽しみ頂けます。スマートフォンアプリをダウンロードして今日のニュースをチェックしましょう。</p>
          </div><!-- /.text-block -->

          <div class="fb-page-plugin">
            <div class="fb-page" data-href="https://www.facebook.com/sportsbull/" data-width="400" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/sportsbull/"><a href="https://www.facebook.com/sportsbull/">スポーツブル（SPORTS BULL）</a></blockquote></div></div>
          </div>
        </div><!-- /.foot-pr-inner -->
      </div><!-- /.foot-pr -->

      <div id="pageTop" class="pagetop fixed blind"><a href="#"><span>このページの先頭へ<img src="/assets/images/sprite/sprite-footer.png" role="presentation"></span></a></div>

      <div class="fnav-block">
        <nav class="fnav">
          <h3 class="fnav-logo"><img src="/assets/images/common/footer-fnav-logo.png" alt="SPORTS BULL"></h3>
          <ul>
            <li><a href="/about/">サービス紹介</a></li>
            <li><a href="/about/company/">会社概要</a></li>
            <li><a href="/about/privacy/">プライバシーポリシー</a></li>
            <li><a href="/about/terms/">利用規約</a></li>
          </ul>
        </nav><!-- /.fnav -->

        <div class="sns-block">
          <ul>
            <li class="sns-fb"><a href="https://www.facebook.com/sportsbull/" target="_blank">facebook</a></li>
            <li class="sns-tw"><a href="https://twitter.com/sportsbull_jp" target="_blank">twitter</a></li>
            <li class="sns-yt"><a href="https://www.youtube.com/channel/UCKwqba9IWuSKIk3DIpryOHw" target="_blank">youtube</a></li>
          </ul>
        </div><!-- /.sns-block -->

        <p class="copyright">Copyright &copy; SPORTS BULL All rights reserved.</p>
      </div><!-- /.fnav-block -->
    </div><!-- /.foot-sec-inner -->
  </footer><!-- /.foot-sec -->

<link rel="stylesheet" href="/assets/css/stats/npb-draft2017/ui.css?v=<?php echo $page['version']; ?>" media="only screen">
<script id="js-live-bundle" data-interval="10" src="/assets/draft/js/bull_draft_2017_live.bundle.js?v=<?php echo $page['version']; ?>"></script>
<?php

include_once __DIR__."/ad.php";

include_once __DIR__."/../../${page['ua']}/_footer.php";

// debug
include_once __DIR__."/../../_debug.php";
?>