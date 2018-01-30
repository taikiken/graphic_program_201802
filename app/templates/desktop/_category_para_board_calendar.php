<?php
/**
 * パラボード 日程一覧 - desktop
 * category 一覧へ insert
 * @since 2018-01-30
 */
?>
<?php
echo 'パラボード 日程一覧';
include_once __DIR__ . '/../para-board/module/_functions.php';
var_dump(api_recent());
$api_result = get_recent();
var_dump($api_result);
?>
