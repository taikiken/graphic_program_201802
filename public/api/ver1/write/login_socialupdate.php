<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();

$id=bind($_POST["id"]);
$token=bind($_POST["token"]);
$service=bind($_POST["service"]);
$type=bind($_POST["type"]);

$field="";
if($service=="facebook"){
	$field=1;
}elseif($service=="twitter"){
	$field=3;
}

$f=set_socialupdate($uid,$type,$field);

if($y["status"]["code"]===200){
	
	if($type=="update"){
		$sql=sprintf("update u_member set b%s='%s',b%s='%s' where id=%s",$field,$id,($field+1),$token,$uid);
	}else{
		$sql=sprintf("update u_member set b%s=null,b%s=null where id=%s;",$field,($field+1),$uid);
	}
	$o->query($sql);	
	$e=$o->affected_rows2();
	if($e){
		set_status(array("user_message"=>sprintf("%sと%sしました。",ucfirst($service),$type=="update"?"連携":"の連携を解除")));
	}else{
		set_servererror();
	}
}

$y["response"]=(object)array();
print_json($y,$_SERVER['HTTP_REFERER']);

?>