<?php
/**
 * 日程結果: <section class="race_info" id="js-race_info">
 * Author: @taikiken
 * Date: 2017/07/20
 * Time: 19:04
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

$schedule_schedule = $schedule_response->schedule;
if (!isset($schedule_schedule)) {
  return;
}

if (count($schedule_schedule) == 0) {
  return;
}
?>
<section class="race_info" id="js-race_info">
  <h2 class="race_info__heading mod-headingA">レース日程・結果</h2>
  <?php
  foreach ($schedule_schedule as $schedule) :
  ?>
  <div class="js-race_info__container">
    <dl class="race_info__accordion--trigger">
      <dt><?php echo $schedule->competition; ?></dt>
      <dd><?php echo $schedule->date; ?></dd>
    </dl>
    <div class="race_info__accordion--body">
      <table class="race_info__table mod-table">
        <thead>
        <tr>
          <th class="race_info__table__th">順位</th>
          <th class="race_info__table__th">レーサー/チーム名</th>
        </tr>
        </thead>
        <tbody>
        <?php
        foreach ($schedule->result as $result) :
        ?>
          <tr>
            <td><?php echo $result->no; ?></td>
            <td><?php echo $result->driver; ?></td>
          </tr>
        <?php
        endforeach;
        ?>
        </tbody>
      </table>
    </div>
  </div>
  <?php
  endforeach;
  ?>
</section>
