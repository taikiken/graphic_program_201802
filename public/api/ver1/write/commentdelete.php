<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$commentid=set_commentdelete($_REQUEST["pageid"],$uid,$_REQUEST["commentid"],$_REQUEST["replyid"]);

if($y["status"]["code"]===200){
	
	$sql[]=sprintf("update u_activity set flag=0,notice=0,regitime=now() where activity=1 and activityid=%s;",$commentid);
	$sql[]=sprintf("update u_ranking set flag=0 where commentid=%s and exists (select * from u_ranking where commentid=%s);",$commentid,$commentid);
	$sql[]=sprintf("update u_comment set flag=0,regitime=now() where (id=%s or commentid=%s) and flag=1;",$commentid,$commentid);
	$o->query(implode("\n",$sql));

	$e=$o->affected_rows2();
	if(!$e)set_servererror();
}

$y["response"]=(object)$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>