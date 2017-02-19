        <div class="live-streaming">
          <img src="/assets/sp/images/big6/dummy-livestreaming.png" alt="">
        </div><!-- /.live-streaming -->

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
              <tr>
                <td class="matches-date-unit">
                  <span class="matches-date">3/23 (土)</span><br />
                  <span class="matches-time">11:00</span>
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="hosei">法大</i></li>
                    <li><span class="result">3 - 4</span></li>
                    <li><i class="rikkio">立大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="tokyo">東大</i></li>
                    <li><span class="result">2 - 1</span></li>
                    <li><i class="waseda">早大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
              </tr>
              <tr>
                <td class="matches-date-unit">
                  <span class="matches-date">3/24 (日)</span><br />
                  <span class="matches-time">11:00</span>
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="keio">慶大</i></li>
                    <li><span class="result">88 - 88</span></li>
                    <li><i class="meiji">明大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
                <td class="matches-match-unit">
                  <ul class="matches-match">
                    <li><i class="rikkio">立大</i></li>
                    <li><span class="result">vs</span></li>
                    <li><i class="waseda">早大</i></li>
                  </ul><!-- /.matches-match -->

                  <div class="matches-btn-highlight">
                    <a class="disable" href="#"><span>ハイライト</span></a>
                  </div><!-- /.matches-btn-highlight -->
                </td>
              </tr>
            </tbody>
          </table><!-- /.matches-list -->

          <div class="matches-btn-allmatches">
            <a href="/big6/">全試合日程を見る</a>
          </div>
        </section><!-- /.matches -->

        <section class="standings">
          <h2 class="standings-heading">
            順位表<span class="note">全日程終了 5/31</span>
          </h2>
          <table class="standings-list">
            <thead class="standings-thead">
              <tr>
                <th>順位</th>
                <th>&nbsp;</th>
                <th>試合</th>
                <th>勝利</th>
                <th>敗戦</th>
                <th>引分</th>
                <th>勝点</th>
                <th>勝率</th>
              </tr>
            </thead>
            <tbody class="standings-tbody">
            <?php foreach( $page['big6']['rankingData']['ranking'] as $key => $value ) : ?>
              <tr class="standings-<?php echo ++$key; ?>">
                <td class="standings-num"><span><?php echo $value['rank']; ?></span></td>
                <td class="standings-team"><img src="/assets/sp/images/big6/icon-<?php echo $value['slug']; ?>.png" alt="<?php echo $value['name']; ?>大学"></td>
                <td class="standings-games"><?php echo $value['game']; ?></td>
                <td class="standings-win"><?php echo $value['win']; ?></td>
                <td class="standings-lose"><?php echo $value['lose']; ?></td>
                <td class="standings-draw"><?php echo $value['draw']; ?></td>
                <td class="standings-points"><?php echo $value['point']; ?></td>
                <td class="standings-rate"><?php echo $value['winningPercentage']; ?></td>
              </tr>
            <?php endforeach; ?>
            </tbody>
          </table>
        </section><!-- /.standings -->

        <section class="misc">
          <h2 class="misc-heading">各大学の動画・ニュース</h2>
          <ul class="misc-list">
            <li class="misc-item"><a href="https://sportsbull.jp/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%B3%95%E6%94%BF%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-hosei.png" alt="法政大学"></a></li>
            <li class="misc-item"><a href="https://sportsbull.jp/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%97%A9%E7%A8%B2%E7%94%B0%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-waseda.png" alt="早稲田大学"></a></li>
            <li class="misc-item"><a href="https://sportsbull.jp/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E7%AB%8B%E6%95%99%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-rikkio.png" alt="立教大学"></a></li>
            <li class="misc-item"><a href="https://sportsbull.jp/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%85%B6%E6%87%89%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-keio.png" alt="慶応大学"></a></li>
            <li class="misc-item"><a href="https://sportsbull.jp/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%9D%B1%E4%BA%AC%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-tokyo.png" alt="東京大学"></a></li>
            <li class="misc-item"><a href="https://sportsbull.jp/search/%E6%9D%B1%E4%BA%AC%E5%85%AD%E5%A4%A7%E5%AD%A6%20%E6%98%8E%E6%B2%BB%E5%A4%A7%E5%AD%A6"><img src="/assets/sp/images/big6/icon-meiji.png" alt="明治大学"></a></li>
          </ul>
        </section><!-- /.misc -->