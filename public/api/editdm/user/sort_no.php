<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

$_include = __DIR__ . '/../../../../include/';

include $_include . 'conf/config.php';
include $_include . 'postgre.php';
include $_include . 'func.php';
$o = new db;
$o->connect();
if ($_POST['type'] == 1){
    $table = "bottom_tab_categories";
}
elseif ($_POST['type'] == 2) {
    $table = "bottom_tab_livescores";
}
if (count($_POST['id']) !== 2) {
    $status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"パラメーターが不正です。",
			"developer_message"=>"reaction値に不正値がある。"
		);
        sendResponse($status);
}

$sql = "select c.id, c.sort_no, n.parent_tab_id, n.type from ".$table." c left join bottom_tab_nodes n on c.id = n.bottom_tab_id "
        . "where c.id in (" . implode(',', $_POST['id']) . ") and type=".$_POST['type'];
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
if ($rows[0]['parent_tab_id'] !== $rows[1]['parent_tab_id']){echo $rows[0]['parent_tab_id'];echo "<br>";echo $rows[1]['parent_tab_id'];
    $status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"存在ないidが選択されています。",
			"developer_message"=>"reaction値に不正値がある。"
		);
    sendResponse($status);
}
if ($rows[0]['type'] !== $rows[1]['type']){
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
    $update = sprintf("update %s set sort_no = %s where id = %s",$table, $row['sort_no'], $row['id']);
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