<?php
/**
 * パラボード 日程一覧 - mobile
 * - 汎用 - list
 * @since 2018-02-01
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
?>
  <?php
  // [B]
  if (is_array($para_data_response_list) && count($para_data_response_list) > 0) :
  ?>
  <table class="paraboard__list">
    <tbody>
    <?php
    $para_list = $response['list'];
    foreach ($para_data_response_list as $para_date => $para_games) :

      // tr loop
      foreach ($para_games as $para_game) :
      ?>
        <tr>
          <td class="paraboard__list__game">
            <a href="/para-board/<?php echo $para_game['id']; ?>/<?php echo $para_game['current_year']; ?>" class="paraboard__list__game__link">
              <header class="paraboard__list__game__header">
                <span class="paraboard__list__icon"><img src="<?php echo $para_game['icon']; ?>" alt=""></span>
                <p class="paraboard__list__date"><?php echo $para_date; ?></p>
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
              <div class="paraboard__list__game__btn"><i>詳しく見る</i></div>
            </a>
          </td>
        </tr>
      <?php
      endforeach;
      // /tr
      ?>
    <?php
    endforeach;
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