<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=set_userid(auth());
$offset=isset($_REQUEST["offset"])?$_REQUEST["offset"]:0;
$length=isset($_REQUEST["length"])?$_REQUEST["length"]:10;

if($y["status"]["code"]===200){

	$sql=sprintf("
	select * from 
	(select *,(select title from repo_n where id=pageid and flag=1) as title,(select flag from u_member where id=userid) as uflag from u_activity where reuserid=%s and flag=1 and activity in(1,2,3) order by regitime desc limit %s offset %s) as t1,
	(select id as uid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from u_member where flag=1) as t2 
	where t2.uid=t1.userid order by t1.regitime desc;",$uid,$length,$offset);

	$nsql=sprintf("
	select count(t1.reuserid) as n from 
	(select id as uid from u_member where id=%s and flag=1) as t2,
	(select reuserid,(select title from repo_n where id=pageid and flag=1) as title,(select flag from u_member where id=reuserid) as uflag from u_activity where reuserid=%s and flag=1 and activity in(1,2,3)) as t1
	where t2.uid=t1.reuserid",$uid,$uid);

/*
	$sql=sprintf("
	select * from (
	select id,userid,reuserid,pageid,activity,activityid,notice,flag,regitime,(select title from repo_n where id=pageid and flag=1) as title from u_activity where activity=1 and reuserid=%s and flag=1 and activityid is not null and (select flag from u_member where id=userid)=1 union all 
	select id,userid,reuserid,pageid,activity,activityid,notice,flag,regitime,(select title from repo_n where id=pageid and flag=1) as title from u_activity where activity in(2,3) and reuserid=%s and flag=1 and activityid is not null and (select flag from u_member where id=userid)=1) as t1,
	(select id as uid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from u_member where qid=2 and flag=1) as t2
	where t1.userid=t2.uid order by regitime desc limit %s offset %s",$uid,$uid,$length,$offset);
	
	$nsql=sprintf("
	select count(*) as n from (
	select userid,(select title from repo_n where id=pageid and flag=1) as title from u_activity where activity=1 and reuserid=%s and flag=1 and activityid is not null and (select flag from u_member where id=userid)=1 union all 
	select userid,(select title from repo_n where id=pageid and flag=1) as title from u_activity where activity in(2,3) and reuserid=%s and flag=1 and activityid is not null and (select flag from u_member where id=userid)=1) as t1,
	(select id as uid from u_member where qid=2 and flag=1) as t2
	where t1.userid=t2.uid",$uid,$uid);
*/

	$o->query($sql);
	while($f=$o->fetch_array())$p[]=$f;
	
	$o->query($nsql);
	$f=$o->fetch_array();
	$count=$f["n"];
	
	$fls=array("id","commentid","userid","comment","regitime","flag","pid","typeid","type","name","profile","icon");
	for($i=0;$i<count($fls);$i++){
		$e[]=sprintf("c1.%s,c2.%s as %s_",$fls[$i],$fls[$i],$fls[$i]);
	}
	$e=implode(",",$e);
	
	for($i=0;$i<count($p);$i++){
	
		$s[$i]=set_activity($p[$i]);
		if($p[$i]["activity"]!=4){
	
			$sql=sprintf("select %s,pageid from 
				(select * from 
					(select id,flag,commentid,userid,pageid,comment,regitime from u_comment where id=%s) as t1,
					(select id as pid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from u_member where qid=2 and flag=1) as t2 where t1.userid=t2.pid) as c1 
				left join (select * from (select id,flag,commentid,userid,comment,regitime from u_comment) as t1,(select id as pid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from u_member where qid=2 and flag=1) as t2 where t1.userid=t2.pid) as c2 on c1.commentid=c2.id",
			$e,$p[$i]["activity"]==1?$p[$i]["activityid"]:sprintf("(select commentid from u_reaction where id=%s)",$p[$i]["activityid"]));

			$o->query($sql);
			$f=$o->fetch_array();
			
			if(strlen($f["id_"])==0){
				$s[$i]["article"]["comments"]=set_commentinfo($f,0);
			}else{
				$replyid=$f["id_"];
				$s[$i]["article"]["comments"]=set_commentinfo(mod_replyfield($fls,$f),0);
				$s[$i]["article"]["reply"]=set_commentinfo($f,0,$replyid);
			}
		}
	}
}else{
	$s=(object)$s;	
}

$y["response"]["count"]=(int)$count;
$y["response"]["notifications"]=$s;

if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];

print_json($y,$_SERVER['HTTP_REFERER']);

?>