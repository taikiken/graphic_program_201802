<?php
/**
 * パラボード 日程一覧 - mobile
 * category 一覧へ insert
 * @since 2018-01-30
 */
?>

<?php
include_once __DIR__ . '/../para-board/module/_functions.php';

//$api_result = get_recent();
// TODO 404 になるのでテスト用にデータが存在する API を使う
$api_result = get_recent_id_year(0, 2018);
$response = $api_result['response'];
if (!empty($response)) :
?>


<?php
endif;
// パラボード 日程一覧 - 直近
?>
