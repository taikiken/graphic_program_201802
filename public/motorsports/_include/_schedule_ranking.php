<?php
/**
 * 日程結果: <section class="point_rank">
 * Author: @taikiken
 * Date: 2017/07/20
 * Time: 18:33
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

$schedule_ranking = $schedule_response->ranking;
if (!isset($schedule_ranking)) {
  return;
}

$schedule_driver = $schedule_ranking->driver;
$schedule_team = $schedule_ranking->team;

$receive_data_count = 0;
$receive_data_driver = false;
$receive_data_team = false;
if (isset($schedule_driver)) {
  $receive_data_driver = true;
  $receive_data_count += 1;
}
if (isset($schedule_team)) {
  $receive_data_team = true;
  $receive_data_count += 1;
}

if ($receive_data_count == 0) {
  return;
}
?>
<section class="point_rank">
  <h2 class="point_rank__heading mod-headingA">ポイントランキング</h2>
  <?php
  // 上部 nav
  // ----------------------------------
  ?>
  <nav class="point_rank__nav">
    <ul class="point_rank__nav__list"<?php echo $receive_data_count == 2 ? ' id="js-point_rank__nav__list"' : '' ?>>
      <?php
      if ($receive_data_driver) :
      ?>
      <li class="point_rank__nav__item"><a class="point_rank__nav--driver js-tab-link selected" href="#point_rank--driver">ドライバーランキング</a></li>
      <?php
      endif;
      if ($receive_data_team) :
      ?>
      <li class="point_rank__nav__item"><a class="point_rank__nav--team  js-tab-link" href="#point_rank--team">チームランキング</a></li>
      <?php
      endif;
      ?>
    </ul>
  </nav>
  <?php
  // driver
  // ----------------------------------
  if ($receive_data_driver) :
  ?>
  <table id="point_rank--driver" class="point_rank__table mod-table selected">
    <thead>
    <tr>
      <th class="point_rank__table__th">順位</th>
      <th class="point_rank__table__th">ドライバー</th>
      <th class="point_rank__table__th">チーム</th>
      <th class="point_rank__table__th">ポイント</th>
    </tr>
    </thead>
    <tbody>
    <?php
    foreach ($schedule_driver as $driver) :
    ?>
      <tr>
        <td><?php echo $driver->no; ?></td>
        <td><?php echo $driver->driver; ?></td>
        <td><?php echo $driver->team; ?></td>
        <td><?php echo $driver->point; ?></td>
      </tr>
    <?php
    endforeach;
    ?>
    </tbody>
  </table>
  <?php
  endif;
  // team
  // ----------------------------------
  if ($receive_data_team) :
  ?>
  <table id="point_rank--team" class="point_rank__table mod-table<?php echo $receive_data_count == 1 ? ' selected' : ''; ?>">
    <thead>
    <tr>
      <th class="point_rank__table__th">順位</th>
      <th class="point_rank__table__th">チーム</th>
      <th class="point_rank__table__th">ポイント</th>
    </tr>
    </thead>
    <tbody>
    <?php
    foreach ($schedule_team as $team) :
    ?>
      <tr>
        <td><?php echo $team->no; ?></td>
        <td><?php echo $team->team; ?></td>
        <td><?php echo $team->point; ?></td>
      </tr>
    <?php
    endforeach;
    ?>
    </tbody>
  </table>
  <?php
  endif;
  ?>
</section>