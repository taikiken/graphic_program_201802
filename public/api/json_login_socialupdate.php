<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();

$id=trim($_POST["id"]);
$token=trim($_POST["token"]);
$service=trim($_POST["service"]);

$field="";
if($service=="facebook"){
	$field=1;
}elseif($service=="twitter"){
	$field=3;
}

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["message_type"]="success";
$y["status"]["developer_message"]="";
$ermsg="";

if($uid!=""){
	if(strlen($f["id"])>0){
		$sql=sprintf("update repo_n set a%s='%s',a%s='%s' where id=%s",$field,$id,($field+1),$token,$uid);
		$o->query($sql);
	}else{
		$code=404;
		$ermsg="ユーザが存在しません。";
	}			
}else{
	$code=404;
	$ermsg="ユーザが存在しません。";
}

if($ermsg==""){
	$y["status"]["code"]=200;
	$y["response"]=(object)array();
}else{
	$y["status"]["code"]=$code;
	$y["status"]["message_type"]="error";
	$y["status"]["user_message"]=$ermsg;
}

if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>