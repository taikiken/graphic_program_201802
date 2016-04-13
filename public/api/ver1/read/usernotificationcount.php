<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=set_userid(auth());
if(strlen($uid)>0){

	$sql=sprintf("
	select count(t1.reuserid) as n from 
	(select id as uid from u_member where id=%s and flag=1) as t2,
	(select reuserid,(select title from repo_n where id=pageid and flag=1) as title,(select flag from u_member where id=reuserid) as uflag from u_activity where reuserid=%s and flag=1 and activity!=4 and notice=1) as t1
	where t2.uid=t1.reuserid",$uid,$uid);

	$o->query($sql);
	$f=$o->fetch_array();
	$count=(int)$f["n"];
	
}else{
	$count=0;	
}

$y["response"]["count"]=$count;
print_json($y,$_SERVER['HTTP_REFERER']);

?>