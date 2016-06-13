<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
set_useraccount($uid);
	
if($y["status"]["code"]===200){

	$sql=sprintf("update u_member set flag=0,b1=null,b2=null,b3=null,b4=null where id=%s;",$uid);
	$o->query($sql);
	$e=$o->affected_rows2();
	
	if($e){

		$_SESSION=array();
		$params=session_get_cookie_params();
		
		setcookie(session_name(),'',time()-42000,"/");
		session_destroy();
		set_status(array("user_message"=>"退会処理が完了しました。"));

	}else{
		set_servererror();
	}
}

$y["response"]=(object)$s;
print_json($y,$_SERVER['HTTP_REFERER']);


?>