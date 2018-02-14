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

  <?php
  // # パンくずリスト
  // ==============================
    $BREADCRUMB = array(
      array(
        'label' => 'プロ野球2017 ドラフト候補選手',
        'path'  => '/stats/npb-draft2017/'
      ),
    );
  ?>


  <footer class="foot-sec">
    <?php
    include_once __DIR__."/../../mobile/_footer-sec-inner.php";
    ?>
  </footer><!-- /.foot-sec -->

<link rel="stylesheet" href="/assets/sp/css/stats/npb-draft2017/ui.css?v=<?php echo $page['version']; ?>" media="only screen">
<script src="/assets/draft/js/bull_draft_2017_player.bundle.js?v=<?php echo $page['version']; ?>"></script>
<?php

include_once __DIR__."/ad.php";

include_once __DIR__."/../../${page['ua']}/_footer.php";

// debug
include_once __DIR__."/../../_debug.php";
?>