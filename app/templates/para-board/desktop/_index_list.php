<?php
/**
 * パラボード 日程一覧 - desktop
 * - 汎用 - list
 * @since 2018-01-30
 */
?>
<?php
// para-sports module
include_once __DIR__ . '/../module/_functions.php';

$para_data = $para_query_option == 'recent' ? get_recent_all() : get_recent_id_year($para_schedule_id, $para_schedule_year);
$para_data_response = $para_data['response'];

// [A]
if (!empty($para_data_response)) :
  $para_data_response_list = $para_data_response['list'];

  // [B]
  if (is_array($para_data_response_list) && count($para_data_response_list) > 0) :
?>
  <table class="paraboard__list">
    <tbody>
    <?php
    // [C]
    foreach ($para_data_response_list as $para_date => $para_games) :
      $th_rowspan = count($para_games);

      $tr_index = 0;
      // [D]
      // tr loop
      foreach ($para_games as $para_game) :
        $para_active_flags = $para_game['active_flag'];
    ?>
        <tr>
          <?php
          // th
          if ($tr_index == 0) :
            ?>
            <th class="paraboard__list__date"<?php echo $th_rowspan != 1 ? ' rowspan="' . $th_rowspan . '"' : '' ?>>
              <?php
              echo $para_date;
              ?>
            </th>
          <?php
          endif;
          // /th
          ?>
          <td class="paraboard__list__game">
            <header class="paraboard__list__game__header">
              <span class="paraboard__list__icon"><img src="<?php echo $para_game['icon']; ?>" alt=""></span>
              <p class="paraboard__list__game__header__category">
                <?php
                echo $para_game['sport_name'];
                ?>
              </p>
              <h4 class="paraboard__list__game__header__heading">
                <?php
                echo $para_game['competition_name'];
                ?>
              </h4>
            </header>
            <div class="paraboard__list__game__status">
              <ul class="paraboard__list__game__status__list">
                <li class="paraboard__list__game__status__item"><span class="paraboard__list__game__status__item--result<?php echo $para_active_flags['result'] ? ' enable' : ''; ?>">結果</span></li>
                <li class="paraboard__list__game__status__item"><span class="paraboard__list__game__status__item--overview<?php echo $para_active_flags['summary'] ? ' enable' : ''; ?>">概要</span></li>
                <li class="paraboard__list__game__status__item"><span class="paraboard__list__game__status__item--movie<?php echo $para_active_flags['highlight_movie'] ? ' enable' : ''; ?>">動画</span></li>
                <li class="paraboard__list__game__status__item"><span class="paraboard__list__game__status__item--post<?php echo $para_active_flags['news'] ? ' enable' : ''; ?>">記事</span></li>
                <li class="paraboard__list__game__status__item"><span class="paraboard__list__game__status__item--photo<?php echo $para_active_flags['photo_gallery'] ? ' enable' : ''; ?>">フォト</span></li>
              </ul><!-- /.paraboard__list__game__status__list -->
            </div>
            <div class="paraboard__list__game__btn">
              <a href="/para-board/<?php echo $para_game['id']; ?>/<?php echo $para_game['current_year']; ?>" class="paraboard__list__game__btn__link">
                <i>詳しく見る</i>
              </a>
            </div>
          </td>
        </tr>
      <?php
        $tr_index += 1;
      endforeach;
      // [/D]
      ?>
    <?php
    endforeach;
    // [/C]
    ?>
    </tbody>
  </table>
  <?php
  endif;
  // [/B]
  ?>
<?php
endif;
// [/A]
?>