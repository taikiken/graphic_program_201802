<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();

$id=trim($_POST["id"]);
$token=trim($_POST["token"]);
$service=trim($_POST["service"]);
$type=trim($_POST["type"]);

$field="";
if($service=="facebook"){
	$field=1;
}elseif($service=="twitter"){
	$field=3;
}

if($uid!=""){
	
	$sql=sprintf("select id,b1,b2,b3,b4 from repo_n where id=%s",$uid);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		if($type=="update"){
			$sql=sprintf("update repo_n set b%s='%s',b%s='%s' where id=%s",$field,$id,($field+1),$token,$uid);
			$o->query($sql);
			
			$e=$o->affected_rows2();
			$code=200;
			$msg=sprintf("%sと連携しました。",ucfirst($service));
		}else{
			$sql=sprintf("update repo_n set b%s=null,b%s=null where id=%s",$field,($field+1),$uid);
			$o->query($sql);
			
			$e=$o->affected_rows2();
			$code=200;
			$msg=sprintf("%sと連携解除しました。",ucfirst($service));
		}
	}else{
		$code=404;
		$msg="ユーザが存在しません。";
	}			
}else{
	$code=404;
	$msg="ユーザが存在しません。";
}


$y=array();
if($ermsg==""){
	$y["status"]["code"]=$code;
	$y["status"]["user_message"]="";
	$y["status"]["message_type"]="success";
	$y["status"]["developer_message"]="";
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