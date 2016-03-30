<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$pageid=bind($_REQUEST["article_id"]);
$method=$_SERVER["REQUEST_METHOD"];
$bookmarkid=set_bookmark($pageid,$uid,$method);

if($y["status"]["code"]===200){
	
	if($method==="PUT"){
	  if(strlen($bookmarkid)==0){
		  $sql[]=sprintf("insert into u_bookmark(pageid,userid,flag,regitime) values(%s,%s,1,now());",$pageid,$uid);
		  $sql[]=sprintf("insert into u_activity(userid,reuserid,pageid,activity,activityid,notice,flag,regitime) select %s,(select d2 from repo_n where id=%s),%s,4,currval('u_bookmark_id_seq'),1,1,now();",$uid,$pageid,$pageid,$pageid,$uid);
	  }else{
		  $sql[]=sprintf("update u_bookmark set flag=1,regitime=now() where id=%s;",$bookmarkid);
		  $sql[]=sprintf("update u_activity set flag=1,regitime=now() where activity=4 and activityid=%s;",$bookmarkid);
	  }
	}else{
	  $sql[]=sprintf("update u_bookmark set flag=0,regitime=now() where id=%s;",$bookmarkid);
	  $sql[]=sprintf("update u_activity set flag=0,regitime=now() where activity=4 and activityid=%s;",$bookmarkid);
	}

	$o->query(implode("\n",$sql));
	$e=$o->affected_rows2();
	if(!$e)set_servererror();
}

$y["response"]=(object)$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>