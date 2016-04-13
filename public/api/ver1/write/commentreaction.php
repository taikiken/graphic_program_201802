<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$commentid=bind($_REQUEST["comment_id"]);
$type=$_REQUEST["reaction"]=="like"?1:2;
$method=$_SERVER["REQUEST_METHOD"];

$f=set_reaction($_REQUEST["reaction"],$commentid,$uid,$method);
$ranking=sprintf("update u_ranking set 
good=(select count(*) as n from u_reaction where commentid=%s and flag=1 and reaction=1 and (select flag from u_member where id=u_reaction.userid)=1),
bad=(select count(*) as n from u_reaction where commentid=%s and flag=1 and reaction=2 and (select flag from u_member where id=u_reaction.userid)=1),
rank=reply+(select count(*) as n from u_reaction where commentid=%s and flag=1 and (select flag from u_member where id=u_reaction.userid)=1)
where commentid=%s and exists (select * from u_ranking where commentid=%s);",$commentid,$commentid,$commentid,$commentid,$commentid);

if($y["status"]["code"]===200){

	if($method=="PUT"){
	
		if(strlen($f["reaction"])==0){
			$sql[]=sprintf("insert into u_reaction(commentid,userid,reaction,flag,regitime) values(%s,%s,%s,1,now());",$commentid,$uid,$type);
			$sql[]=$ranking;
			$sql[]=sprintf("insert into u_activity(userid,reuserid,pageid,activity,activityid,notice,flag,regitime) select %s,(select userid from u_comment where id=%s),(select pageid from u_comment where id=%s),%s,currval('u_reaction_id_seq'),1,1,now();",$uid,$commentid,$commentid,($type+1));
		}else{
			$sql[]=sprintf("update u_reaction set reaction=%s,flag=1,regitime=now() where id=%s;",$type,$f["id"]);
			$sql[]=$ranking;
			$sql[]=sprintf("update u_activity set flag=1,regitime=now(),activity=%s,notice=1 where activity in (2,3) and activityid=%s;",($type+1),$f["id"]);	
		}
	}else{
	
		$sql[]=sprintf("update u_reaction set flag=0,regitime=now() where id=%s;",$f["id"]);
		$sql[]=$ranking;
		$sql[]=sprintf("update u_activity set flag=0,notice=0,regitime=now() where activity=%s and activityid=%s;",($f["reaction"]+1),$f["id"]);
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