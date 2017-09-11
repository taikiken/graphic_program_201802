<?php

include "local.php";
include "public/check.php";

$ipaddress=$_SERVER['REMOTE_ADDR'];

if($ipaddress){
	$y["status"]=array(
		"code"=>200,
		"user_message"=>"",
		"developer_message"=>""
	);
}else{
	$y["status"]=array(
		"code"=>404,
		"user_message"=>"IPアドレスが取得できませんでした。",
		"developer_message"=>"IPアドレスが取得できませんでした。"
	);

}
$y["response"]["ip"]=$ipaddress;

print_json($y,$_SERVER['HTTP_REFERER']);

?>