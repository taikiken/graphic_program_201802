<?php
/**
 * パラボード 日程一覧 - desktop - category top
 * category 一覧へ insert
 * @since 2018-01-30
 */
?>
<?php
include_once __DIR__ . '/../para-board/module/_functions.php';

$api_result = get_recent();
echo '<!--';
var_dump($api_result);
$response = $api_result['response'];
echo '-->';
if (!empty($response)) :
?>
<div class="paraboard__widjet">
  <header class="paraboard__widjet__header">
    <h2 class="paraboard__widjet__header__heading"><img src="/assets/images/para-board/widjet-heading.png" alt="PARA BOARD パラボード"></h2>
    <div class="paraboard__widjet__header__sub">
      <h3 class="paraboard__widjet__header__sub__heading">直近の日程結果<span>※前後20日</span></h3>
      <div class="paraboard__widjet__header__sub__btn"><a href="/para-board/"><span>試合日程・結果一覧</span></a></div>
    </div>
  </header>
  <table class="paraboard__widjet__list">
    <tbody>
    <?php
    $para_list = $response['list'];
    foreach ($para_list as $para_date => $para_games) :
      $th_rowspan = count($para_games);

      $tr_index = 0;
      // tr loop
      foreach ($para_games as $para_game) :
    ?>
      <tr>
        <?php
        // th
        if ($tr_index == 0) :
        ?>
          <th class="paraboard__widjet__list__date"<?php echo $th_rowspan != 1 ? ' rowspan="' . $th_rowspan . '"' : '' ?>>
            <?php
            echo $para_date;
            ?>
          </th>
        <?php
        endif;
        // /th
        ?>
        <td class="paraboard__widjet__list__game">
          <a href="/para-board/<?php echo $para_game['id']; ?>/" class="paraboard__widjet__list__game__link">
            <header class="paraboard__widjet__list__game__header">
              <span class="paraboard__widjet__list__icon"><img src="<?php echo $para_game['icon']; ?>" alt=""></span>
              <p class="paraboard__widjet__list__game__header__category">
                <?php
                echo $para_game['sport_name'];
                ?>
              </p>
              <h4 class="paraboard__widjet__list__game__header__heading">
                <?php
                echo $para_game['competition_name'];
                ?>
              </h4>
            </header>
            <div class="paraboard__widjet__list__game__btn"><span>詳しく見る</span></div>
          </a>
        </td>
      </tr>
      <?php
        $tr_index += 1;
      endforeach;
      // /tr
      ?>
    <?php
    endforeach;
    ?>
    </tbody>
  </table>
</div>

<?php
endif;
// パラボード 日程一覧 - 直近
?>