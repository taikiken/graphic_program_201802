<?php

// カテゴリー一覧の時のみ表示 / webview では表示しない
if ( $page['template'] == 'category' || $page['template'] !== 'webview' ) :
  include __DIR__.'/../_sns.php';
endif;

?>

<section class="matches">
  <h2 class="matches-heading">直近の試合日程・結果</h2>
  <table class="matches-list for-category">
    <thead class="matches-thead">
      <tr>
        <th>試合日</th>
        <th>第1試合</th>
        <th>第2試合</th>
      </tr>
    </thead>
    <tbody class="matches-tbody">

      <?php foreach( $page['big6tv']['scheduleLatest'] as $gameCount => $gameData ) : ?>
        <tr>

          <?php include __DIR__.'/../_matches-match-unit.php'; ?>

        </tr>
      <?php endforeach; ?>

    </tbody>
  </table><!-- /.matches-list -->

  <div class="matches-btn-allmatches">
    <a href="/big6tv/" id="js-matches-btn-link">2017年春季リーグ ハイライト動画を見る</a>
  </div>
</section><!-- /.matches -->

<?php
// app detector - html tag に class 追加 undotsushin-android or undotsushin-ios
?>
<script type="text/javascript" charset="utf-8">
(function ( window ){
  'use strict';
  var document = window.document;
  var banner;

  if (navigator.userAgent.match(/undotsushin-(android|ios)/)) {
    banner = document.getElementById('js-matches-btn-link');
    if (banner) {
      banner.href += '?app=ios';
    }
  }
}( window ));
</script>

<?php include __DIR__.'/../_standings.php'; ?>


<?php include __DIR__.'/../_misc.php'; ?>