<?php

// 最終更新日
$update = strtotime($page['big6tv']['rankingData']['lastupdate']);
$update = date('n/j H:i', $update);

?>

        <section class="standings">
          <h2 class="standings-heading">
            '17春 順位表<span class="note">更新 <?php echo $update; ?></span>
          </h2>
          <table class="standings-list for-detail">
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
            <?php if ( $page['big6tv']['rankingData']['ranking'] ) : ?>
              <?php foreach( $page['big6tv']['rankingData']['ranking'] as $key => $value ) : ?>
                <tr class="standings-<?php echo ( intval($value['game']) > 0 ) ? ++$key : '-'; ?>">
                  <td class="standings-num"><span><?php echo ( intval($value['game']) > 0 ) ? $value['rank'] : '-'; ?></span></td>
                  <td class="standings-team"><img src="/assets/sp/images/big6/icon-<?php echo $value['slug']; ?>.png" alt="<?php echo $value['name']; ?>大学"></td>
                  <td class="standings-games"><?php echo $value['game']; ?></td>
                  <td class="standings-win"><?php echo $value['win']; ?></td>
                  <td class="standings-lose"><?php echo $value['lose']; ?></td>
                  <td class="standings-draw"><?php echo $value['draw']; ?></td>
                  <td class="standings-points"><?php echo $value['point']; ?></td>
                  <td class="standings-rate"><?php echo $value['winningPercentage']; ?></td>
                </tr>
              <?php endforeach; ?>
            <?php endif; ?>
            </tbody>
          </table>
        </section><!-- /.standings -->
