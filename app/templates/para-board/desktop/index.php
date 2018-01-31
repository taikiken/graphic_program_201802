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
    // form + list8
    include_once __DIR__ . '_index_list.php';
    ?>

  </div>

</div>

<?php
// 汎用 footer
include_once __DIR__."/../../desktop/_footer.php";
?>

