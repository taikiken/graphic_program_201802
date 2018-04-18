<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

$_include = __DIR__ . '/../../../../include/';

include $_include . 'conf/config.php';
include $_include . 'postgre.php';
include $_include . 'func.php';
$o = new db;
$o->connect();

if (count($_POST['id']) !== 2) {
    $status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"パラメーターが不正です。",
			"developer_message"=>"reaction値に不正値がある。"
		);
        sendResponse($status);
}

$sql = "select id, sort_no from bottom_tab_categories where id in (" . implode(',', $_POST['id']) . ")";
$o->query($sql);
$rows = $o->fetch_all();

    //ここでエラーを返す
if (count($rows) !== 2) {
    $status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"存在ないidが選択されています。",
			"developer_message"=>"reaction値に不正値がある。"
		);
    sendResponse($status);
}

$temp_sort_no = $rows[0]['sort_no'];
$rows[0]['sort_no'] = $rows[1]['sort_no'];
$rows[1]['sort_no'] = $temp_sort_no;

foreach ($rows as $row) {
    $update = sprintf("update bottom_tab_categories set sort_no = %s where id = %s", $row['sort_no'], $row['id']);
    $o->query($update);
}
$status=array(
		"code"=>200,
		"message_type"=>"success",
		"user_message"=>"ソート順を変更しました。",
		"developer_message"=>""
	);
sendResponse($status);



function sendResponse($body){
    http_response_code($body['code']);
    echo json_encode($body);
    exit;
}
?>