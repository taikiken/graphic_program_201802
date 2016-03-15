<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();

$y["status"]["code"]=500;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";		

if(strlen($uid)>0){
	
	$sql=sprintf("update repo_n set flag=0,b1=null,b2=null,b3=null,b4=null where id=%s",$uid);
	$o->query($sql);
	$e=$o->affected_rows2();
	
	if($e){
		$y["status"]["code"]=200;
		$y["status"]["user_message"]="退会が完了しました。";
		$y["status"]["message_type"]="success";
	}else{
		$y["status"]["code"]=500;
		$y["status"]["user_message"]="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
		$y["status"]["message_type"]="error";
	}
	
}else{
	$y["status"]["code"]=400;
	$y["status"]["user_message"]="ユーザが存在しません";
	$y["status"]["message_type"]="error";	
}

$y["response"]=(object)array();

if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}


?>