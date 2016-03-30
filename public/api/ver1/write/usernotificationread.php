<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
set_useraccount($uid);
	
if($y["status"]["code"]===200){
	
	$sql=sprintf("select count(*) as n from u_activity where reuserid=%s and flag=1 and notice=1;",$uid);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if($f["n"]>0){
		$sql=sprintf("update u_activity set notice=0 where reuserid=%s;",$uid);
		$o->query($sql);
		$e=$o->affected_rows2();
		if($e){
			set_status(array("user_message"=>"お知らせ未読数をクリアしました。"));
		}else{
			set_servererror();
		}
	}
}

$y["response"]=(object)$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>