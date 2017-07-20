<?php
/**
 * 日程結果: <section class="matches">
 * Author: @taikiken
 * Date: 2017/07/20
 * Time: 17:34
 * モータースポーツ / Phase2 : 日程結果・ランキング / データ連携 #1916
 * https://github.com/undotsushin/undotsushin/issues/1916
 */

// property
// ==============================
// default 設定を確認する
if (!isset($option_directory)) {
  exit(0);
}

// JSON
// https://dev-img.sportsbull.jp/static/motorsports/f1.json
// https://dev-img.sportsbull.jp/static/motorsports/supergt.json
// https://dev-img.sportsbull.jp/static/motorsports/wrc.json
// https://dev-img.sportsbull.jp/static/motorsports/wec.json
// ==============================
$schedule = $page['schedule'];
if (!isset($schedule)) {
  return;
}
$schedule_response = $schedule->response;
if (!isset($schedule_response)) {
  return;
}

$schedule_result = $schedule_response->result;
if (!isset($schedule_result)) {
  return;
}

$schedule_now = $schedule_result->now;
$schedule_post = $schedule_result->post;

if (!isset($schedule_now) && !isset($schedule_post)) {
  return;
}

$schedule_stats = $schedule_post ? $schedule_post : $schedule_now;
$schedule_competition = $schedule_result->competition;


// ===========================================
// ---------------------
if ($schedule_post) :
  // post
?>
  <section class="matches">
    <?php
    // ---- competition
    if (isset($schedule_competition)) :
      ?>
      <h2 class="matches__heading mod-headingA"><?php echo $schedule_competition; ?></h2>
      <?php
    endif;
    // ---- /competition
    ?>
    <table class="matches__table mod-table">
      <thead>
      <tr>
        <th class="matches__table__th">順位</th>
        <th class="matches__table__th">ドライバー</th>
        <th class="matches__table__th">チーム</th>
      </tr>
      </thead>
      <tbody>
      <?php
      foreach ($schedule_stats as $stats) :
        ?>
        <tr>
          <td><?php echo $stats->no; ?></td>
          <td><?php echo $stats->driver; ?></td>
          <td><?php echo $stats->team ?></td>
        </tr>
        <?php
      endforeach;
      ?>
      </tbody>
    </table>
  </section>
<?php
else:
  // ---------------------
  // now
?>
  <section class="matches">
    <?php
    // ---- competition
    if (isset($schedule_competition)) :
      ?>
      <h2 class="matches__heading mod-headingA"><?php echo $schedule_competition; ?></h2>
      <?php
    endif;
    // ---- /competition
    ?>
    <table class="matches__table mod-table">
      <thead>
      <tr>
        <th class="matches__table__th">イベント</th>
        <th class="matches__table__th">開催日</th>
        <th class="matches__table__th">日本時間</th>
        <th class="matches__table__th">1位</th>
      </tr>
      </thead>
      <tbody>
      <?php
      foreach ($schedule_stats as $stats) :
        ?>
        <tr>
          <td><?php echo $stats->event; ?></td>
          <td><?php echo $stats->date; ?></td>
          <td><?php echo $stats->jtime ?></td>
          <td><?php echo $stats->winner ?></td>
        </tr>
        <?php
      endforeach;;
      ?>
      </tbody>
    </table>
  </section>
<?php
endif;
// ===========================================
?>
