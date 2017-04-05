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
    <a href="/big6tv/">全試合日程を見る</a>
  </div>
</section><!-- /.matches -->

<div class="clearfix">

  <?php include __DIR__.'/../_standings.php'; ?>
  <?php include __DIR__.'/../_misc.php'; ?>

</div><!-- /.clearfix -->

<div class="headline-heading">
  <h2 class="headline-heading-title"><img src="/assets/images/common/headline-heading_big6.png" alt="HEADLINE NEWS"></h2>
  <span class="headline-heading-ruby">新着記事</span>
</div>