<?php
/**
 * パラボード 日程一覧 - desktop
 * - 汎用 - form + list
 * @since 2018-01-30
 */
?>
<?php
// para-sports module
include_once __DIR__ . '/../module/_functions.php';

// pull-down data
$pull_down = get_pull_down();
var_dump($pull_down);
?>
<form action="javascript:void(0)" class="paraboard__selector">
  <?php
  // 日程・結果一覧
  // TODO: select - option from `/api/v1/competition_pulldown`
  ?>
</form>