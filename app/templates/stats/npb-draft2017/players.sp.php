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
          <aside class="draft-header-bnr-top" style="padding-left:0; padding-right: 0;">
            <ul>
              <li>
                <div id='div-gpt-ad-header_bottom'></div>
              </li>
            </ul>
          </aside>

          <div class="draft-header-main">
            <div class="row">
              <div class="draft-logo"><img src="/assets/images/stats/npb-draft2017/draft-logo@2x.png" alt="DRAFT 2017! NPB supported by リポビタンD"></div>
              <h1><img src="/assets/images/stats/npb-draft2017/player-title@2x.png" alt="プロ野球2017 ドラフト候補選手一覧"></h1>
            </div>
            <p class="lead">高校生、大学生そして社会人・独立リーグと、今年のドラフト候補選手を幅広くリストアップ！</p>
            <p class="lead-credit">powered by  : <span class="lead-credit-logo"><a href="http://sp.baseball.findfriends.jp/" target="_blank"><img src="/assets/images/stats/npb-draft2017/logo-baseballmagazine.png" alt="週刊ベースボール"></a></span></p>
          </div>

          <aside class="draft-header-bnr-bottom" style="padding-left:0; padding-right: 0;">
            <ul>
              <li><a href="https://sportsbull.jp/p/214500/" target="_blank"><img src="/assets/images/stats/npb-draft2017/bnr-highlight@2x.jpg" alt="プロ野球2017 ドラフトハイライト動画" width="728" height="90"></a></li>
              <li>
                <div id='div-gpt-ad-title_bottom'></div>
              </li>
            </ul>
          </aside>

          <!-- draft-nav -->
          <nav class="draft-nav">
            <ul>
              <li>ドラフト候補選手一覧</li>
              <li><a href="result/">ドラフトリアル生速報</a></li>
            </ul>
          </nav>
          <!-- draft-nav -->
        </header>
        <!-- /draft-header -->

        <div id="js-players"></div>

        <div class="note-block">
          <ul>
            <li>※ 表示地域は高校生と社会人はチームが所属している各地区の連盟、大学生は野球部合宿所（合宿所がない場合はグラウンド）の所在地に基づきます。<br>独立リーグはチームの本拠地となる都道府県を記載しています。</li>
          </ul>
        </div>

        <div id="js-modal"></div>
      </section><!-- /.main-sec -->

    </div>
  </div><!-- /.body-sec -->

  <footer class="foot-sec">
    <div class="foot-sec-inner">
      <nav class="foot-breadCrumb">
        <ol itemscope itemtype="http://schema.org/breadCrumbList">
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="/"><span itemprop="name">TOP</span><meta itemprop="position" content="1" /></a></li>
          <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemprop="item" href="./"><span itemprop="name">プロ野球2017 ドラフト候補選手</span><meta itemprop="position" content="2" /></a></li>
        </ol>
      </nav><!-- /.foot-breadCrumb -->

      <div class="foot-pr">
        <div class="foot-pr-inner">
          <figure class="foot-pr-logo"><img src="/assets/sp/images/common/footer-overview-logo.png" alt="SPORTS BULL"></figure>
          <div class="text-block">
            <h3 class="foot-pr-heading">スポーツブルアプリをダウンロード</h3>
            <ul class="foot-pr-list">
              <li class="foot-pr-item"><a class="foot-pr-link" href="https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-applestore.png" alt="App Store" /></a></li>
              <li class="foot-pr-item"><a class="foot-pr-link" href="https://play.google.com/store/apps/details?id=com.undotsushin" target="_blank"><img src="/assets/sp/images/common/footer-overview-btn-googleplay.png" alt="Google play"></a></li>
            </ul>
          </div>
        </div><!-- /.foot-pr-inner -->

        <div class="fb-page-plugin">
          <div class="fb-page" data-href="https://www.facebook.com/sportsbull/" data-width="500" data-height="154" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/sportsbull/"><a href="https://www.facebook.com/sportsbull/">スポーツブル（SPORTS BULL）</a></blockquote></div></div>
        </div>
      </div><!-- /.foot-pr -->

      <div id="pageTop" class="pagetop"><a href="#"><span>このページの先頭へ</span></a></div>

      <nav class="fnav">
        <ul>
          <li><a href="/about/">サービス紹介</a></li>
          <li><a href="/about/privacy/">プライバシーポリシー</a></li>
          <li><a href="/about/company/">会社概要</a></li>
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
    </div><!-- /.foot-sec-inner -->
  </footer><!-- /.foot-sec -->

<link rel="stylesheet" href="/assets/sp/css/stats/npb-draft2017/ui.css?v=<?php echo $page['version']; ?>" media="only screen">
<script src="/assets/draft/js/bull_draft_2017_player.bundle.js?v=<?php echo $page['version']; ?>"></script>
<?php

include_once __DIR__."/ad.php";

include_once __DIR__."/../../${page['ua']}/_footer.php";

// debug
include_once __DIR__."/../../_debug.php";
?>