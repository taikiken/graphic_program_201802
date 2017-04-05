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
    <a href="/big6tv/" id="js-matches-btn-link">全試合日程を見る</a>
  </div>
</section><!-- /.matches -->

<?php
// app detector - html tag に class 追加 undotsushin-android or undotsushin-ios
?>
<!-- <script type="text/javascript" src="/assets/js/app_divide.bundle.js?v=<?php echo $page['version']; ?>"></script> -->
<script type="text/javascript" charset="utf-8">
(function ( window ){
  'use strict';
  var document = window.document;
  var Sagen = window.Sagen;
  var html = document.documentElement;
  var banner;

  if (navigator.userAgent.match(/undotsushin-(android|ios)/)) {
    banner = document.getElementById('js-matches-btn-link');
    if (banner) {
      banner.href += '?app=ios';
    }
  }
  // if (Sagen.Dom.hasClass(html, 'undotsushin-android') || Sagen.Dom.hasClass(html, 'undotsushin-ios')) {
  //   banner = document.getElementById('js-matches-btn-link');
  //   if (banner) {
  //     banner.href += '?app=ios';
  //   }
  // }
}( window ));
</script>

<?php include __DIR__.'/../_standings.php'; ?>


<?php include __DIR__.'/../_misc.php'; ?>