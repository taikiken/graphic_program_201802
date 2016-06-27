<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$pageid=bind($_REQUEST["article_id"]);
$commentid=strlen($_REQUEST["comment_id"])>0?bind($_REQUEST["comment_id"]):0;
$comment=$_REQUEST["body"];

set_commentpost($pageid,$uid,$commentid,$comment);

if($y["status"]["code"]===200){
	
	$sql[]=sprintf("insert into u_comment(pageid,commentid,userid,comment,flag,regitime) values(%s,%s,%s,'%s',1,now());",$pageid,$commentid,$uid,esc($comment));
	$sql[]=sprintf("insert into u_activity(userid,reuserid,pageid,activity,activityid,notice,flag,regitime) select %s,%s,%s,1,currval('u_comment_id_seq'),1,1,now();",
	$uid,$commentid==0?0:sprintf("(select userid from u_comment where id=%s)",$commentid),$pageid);
	if($commentid==0){
		$sql[]=sprintf("insert into u_ranking select nextval('u_ranking_id_seq'),%s,currval('u_comment_id_seq'),0,0,0,0,1,%s,(select cid from u_member where id=%s),1;",$pageid,$uid,$uid);
	}
	$o->query(implode("\n",$sql));
	$e=$o->affected_rows2();
	
	if($e){
		
		$sql=sprintf("select * from (select id,comment,userid,pageid,(select name_e from u_categories where id=(select m1 from repo_n where id=u_comment.pageid)) as slug,regitime from u_comment where pageid=%s and userid=%s and commentid=%s order by regitime desc limit 1 offset 0) as t1,(select id as userid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from u_member where qid=2 and flag=1) as t2 where t1.userid=t2.userid",
		$pageid,$uid,$commentid);
		$o->query($sql);
		
		$f=$o->fetch_array();		
		$f["is_like"]=false;
		$f["is_bad"]=false;
		$f["like"]=0;
		$f["bad"]=0;

		$s=set_commentinfo($f);
		
	}else{
		$s=(object)$s;
		set_servererror();
	}
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>