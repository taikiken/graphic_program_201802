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


<?php include __DIR__.'/../_standings.php'; ?>


<section class="misc">
  <h2 class="misc-heading">各大学の動画・ニュース</h2>
  <ul class="misc-list">
    <li class="misc-item"><a href="/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%B3%95%E6%94%BF%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-hosei.png" alt="法政大学"></a></li>
    <li class="misc-item"><a href="/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%97%A9%E7%A8%B2%E7%94%B0%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-waseda.png" alt="早稲田大学"></a></li>
    <li class="misc-item"><a href="/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E7%AB%8B%E6%95%99%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-rikkio.png" alt="立教大学"></a></li>
    <li class="misc-item"><a href="/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%85%B6%E6%87%89%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-keio.png" alt="慶応大学"></a></li>
    <li class="misc-item"><a href="/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%9D%B1%E4%BA%AC%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-tokyo.png" alt="東京大学"></a></li>
    <li class="misc-item"><a href="/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%98%8E%E6%B2%BB%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-meiji.png" alt="明治大学"></a></li>
  </ul>
</section><!-- /.misc -->