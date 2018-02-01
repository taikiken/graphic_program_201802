<?php
/**
 * パラボード 日程一覧 - desktop
 * @since 2018-01-30
 */
?>
<?php
// 汎用 header
include_once __DIR__."/../../desktop/_header.php";
?>
<?php
// PC版で冒頭画像ある場合のカテゴリータイトル表示を省略する
include_once __DIR__.'../../desktop/_category-heading.php';
?>

<div class="body-sec">
  <div class="special-summary">
    <h1 class="special-summary-heading"><img src="/assets/images/para-board/special-summary.jpg" alt="パラボード"></h1>
  </div>

  <div class="body-sec-inner">

    <?php
    // form
    $para_schedule_id = 0;
    $para_schedule_year_index = 0;
    // form
    include_once __DIR__ . '/_index_form.php';
    // list
    $para_query_option = 'recent';
    include_once __DIR__ . '/_index_list.php';
    ?>

  </div>

</div>
<script>
  (function(window) {
    'use strict';
    var UT = window.UT;
    var SPBL_ENV = window.SPBL_ENV || {};
    // TODO - UNDO_SPBL-293 - 平昌マージ後にコメントはずす
    // UT.ui.NavCurrent.init(SPBL_ENV.category, SPBL_ENV.platform === 'web_mobile');
  }(window));
</script>

<?php
// 汎用 footer
include_once __DIR__."/../../desktop/_footer.php";
?>

<?php
// 汎用 debug
include_once __DIR__."/../../_debug.php";
?>

