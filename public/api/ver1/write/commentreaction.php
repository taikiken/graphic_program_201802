<?php

include $INCLUDEPATH."local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$commentid=bind($_REQUEST["comment_id"]);
$type=$_REQUEST["reaction"]=="like"?1:2;
$method=$_SERVER["REQUEST_METHOD"];

$f=set_reaction($_REQUEST["reaction"],$commentid,$uid,$method);

if($y["status"]["code"]===200){

	if($method=="PUT"){
	
		if(strlen($f["reaction"])==0){
			$sql[]=sprintf("insert into u_reaction(commentid,userid,reaction,flag,regitime) values(%s,%s,%s,1,now());",$commentid,$uid,$type);
			$sql[]=sprintf("insert into u_activity(userid,reuserid,pageid,activity,activityid,notice,flag,regitime) select %s,(select userid from u_comment where id=%s),(select pageid from u_comment where id=%s),%s,(select id from u_reaction where userid=%s and commentid=%s order by regitime desc limit 1 offset 0),1,1,now();",$uid,$commentid,$commentid,($type+1),$uid,$commentid);
		}else{
			$sql[]=sprintf("update u_reaction set reaction=%s,flag=1,regitime=now() where id=%s;",$type,$f["id"]);
			$sql[]=sprintf("update u_activity set flag=1,regitime=now(),activity=%s where activity in (2,3) and activityid=%s;",($type+1),$f["id"]);	
		}
	}else{
	
		$sql[]=sprintf("update u_reaction set flag=0 where id=%s;",$f["id"]);
		$sql[]=sprintf("update u_activity set flag=0,regitime=now() where activity=%s and activityid=%s;",($f["reaction"]+1),$f["id"]);
	}
	
	$o->query(implode("\n",$sql));
	$e=$o->affected_rows2();
	
	if($e){		
		$sql=sprintf("select count(*) as n from u_reaction where commentid=%s and reaction=%s and flag=1",$commentid,$type);
		$o->query($sql);
		$f=$o->fetch_array();
		$num=$f["n"];

	}else{
		$num=0;
		set_servererror();
	}
}

$y["response"]=(int)$num;
print_json($y,$_SERVER['HTTP_REFERER']);

?>