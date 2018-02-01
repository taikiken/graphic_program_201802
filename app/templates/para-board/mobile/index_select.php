<?php
/**
 * パラボード 日程一覧 - mobile
 * @since 2018-01-30
 */
?>
<?php
// 汎用 header
include_once __DIR__."/../../mobile/_header.php";
?>

<div class="body-sec">
  <div class="body-sec-inner">
    <div class="special-summary">
      <h1 class="special-summary-heading"><img src="/assets/sp/images/para-board/special-summary.jpg" alt="パラボード"></h1>
    </div>
    パラボード 日程一覧 /id/year/
    <?php
    // 日程・結果一覧
    // form
    $para_schedule_id = $page['para_sports_id'];
    $para_schedule_year_index = -1;
    $para_schedule_year = $page['para_year'];
    // form
//    include_once __DIR__ . '/_index_form.php';
    // list
//    include_once __DIR__ . '/_index_list.php';
    ?>
  </div>
</div>

<?php
// 汎用 footer
include_once __DIR__."/../../mobile/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>
