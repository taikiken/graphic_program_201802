          <td class="matches-date-unit">
            <span class="matches-date">
              <?php
                $date    = strtotime($gameData['date']);
                $weekday = array( "日", "月", "火", "水", "木", "金", "土" );
                echo date('n/j', $date).' ('.$weekday[date("w", $date)].')';
              ?>
            </span><br />
            <span class="matches-time">
              <?php echo $gameData['starttime']; ?>
            </span>
          </td>

          <?php foreach( $gameData['game'] as $game ) : ?>
          <td class="matches-match-unit">
            <ul class="matches-match">
              <li>
                <i class="matches-match__teamname--<?php echo $game['team'][0]['nameI']; ?>">
                  <?php echo $game['team'][0]['name']; ?>
                </i>
              </li>
              <li>
                <span class="result">
                  <?php echo $game['team'][0]['score']; ?> - <?php echo $game['team'][1]['score']; ?>
                </span>
              </li>
              <li>
                <i class="matches-match__teamname--<?php echo $game['team'][1]['nameI']; ?>">
                  <?php echo $game['team'][1]['name']; ?>
                </i>
              </li>
            </ul><!-- /.matches-match -->

            <div class="matches-btn-highlight">
              <?php if ( $game['hilight'] ) : ?>
                <a href="<?php echo $game['hilight']; ?>" class="matches-btn-highlight-link"><span>ハイライト</span></a>
              <?php else : ?>
                <a href="javascript:void(0);" class="disable" data-status="<?php echo $game['status']; ?>"><span><?php echo $game['status']; ?></span></a>
              <?php endif; ?>
            </div><!-- /.matches-btn-highlight -->

          </td>
          <?php endforeach; ?>

          <?php // 1日の試合が1試合しかない場合の空セル ?>
          <?php if ( count($gameData['game']) < 2 ) : ?>
            <td></td>
          <?php endif; ?>
