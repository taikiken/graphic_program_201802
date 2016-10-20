<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$offset=isset($_REQUEST["offset"])?$_REQUEST["offset"]:0;
$length=isset($_REQUEST["length"])?$_REQUEST["length"]:10;

$type=isset($_REQUEST["type"])?$_REQUEST["type"]:"";
$pageid=$_REQUEST["id"];
$commentid=isset($_REQUEST["cid"])?$_REQUEST["cid"]:"";

set_comment($type,$pageid,$commentid);

if($y["status"]["code"]===200){

	if(strlen($type)==0){
		if(strlen($commentid)==0){

		$sql=sprintf("select * from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where pageid=%s and flag=1 and userflag=1 order by rank desc limit %s offset %s) as t1,
				(select %sid,comment,userid,pageid,regitime from u_comment where pageid=%s) as t2 
			where t1.commentid=t2.id) as st1,
			(select 
				id as uid,
				cid as typeid,
				(select name from repo where id=cid) as type,
				title as name,
				t2 as profile,
				img1 as icon 
			from u_member where flag=1) as st2
			where st1.userid=st2.uid order by rank desc",$pageid,$length,$offset,set_isreaction($uid),$pageid);
		$nsql=sprintf("select count(*) as n from u_ranking where pageid=%s and flag=1 and userflag=1",$pageid);

/*
		$sql=sprintf("select * from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where pageid=%s and (select flag from u_comment where u_comment.id=u_ranking.commentid)=1 and (select flag from u_member where id=(select userid from u_comment where u_comment.id=u_ranking.commentid))=1  order by rank desc limit %s offset %s) as t1,
				(select %sid,comment,userid,pageid,regitime from u_comment where pageid=%s) as t2 
			where t1.commentid=t2.id) as st1,
			(select 
				id as uid,
				cid as typeid,
				(select name from repo where id=cid) as type,
				title as name,
				t2 as profile,
				img1 as icon 
			from u_member where flag=1) as st2
			where st1.userid=st2.uid order by rank desc",$pageid,$length,$offset,set_isreaction($uid),$pageid);

		$nsql=sprintf("select count(*) as n from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where pageid=%s and (select flag from u_comment where u_comment.id=u_ranking.commentid)=1 and (select flag from u_member where id=(select userid from u_comment where u_comment.id=u_ranking.commentid))=1) as t1,
				(select id,comment,userid,pageid,regitime from u_comment where pageid=%s) as t2 
			where t1.commentid=t2.id) as st1,
			(select 
				id as uid
			from u_member where flag=1) as st2
			where st1.userid=st2.uid",$pageid,$pageid);


			$sql=sprintf("select %s,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.uid order by rank desc limit %s offset %s",
			$commentfield,sprintf($commenttable,set_isreaction($uid),sprintf("pageid=%s and commentid=0 and flag=1",$pageid),""),$length,$offset);
			$nsql=sprintf("select count(*) as n from (select userid from u_comment where pageid=%s and commentid=0 and flag=1) as t1,(select id from u_member where qid=2 and flag=1) as t2 where t1.userid=t2.id",$pageid);
*/
		}else{

		$sql=sprintf("select * from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where flag=1 and userflag=1 and commentid=(select case when commentid=0 then id else commentid end from u_comment where id=%s)) as t1,
				(select %sid,comment,userid,pageid,regitime from u_comment where pageid=%s) as t2 
			where t1.commentid=t2.id) as st1,
			(select 
				id as uid,
				cid as typeid,
				(select name from repo where id=cid) as type,
				title as name,
				t2 as profile,
				img1 as icon 
			from u_member where flag=1) as st2
			where st1.userid=st2.uid",$commentid,set_isreaction($uid),$pageid);
		$nsql=sprintf("select count(*) as n from u_ranking where flag=1 and userflag=1 and commentid=(select case when commentid=0 then id else commentid end from u_comment where id=%s)",$commentid);

/*
		$sql=sprintf("select * from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where commentid=%s and (select flag from u_member where id=(select userid from u_comment where u_comment.id=u_ranking.commentid))=1) as t1,
				(select %sid,comment,userid,pageid,regitime from u_comment where id=%s and flag=1) as t2 
			where t1.commentid=t2.id) as st1,
			(select 
				id as uid,
				cid as typeid,
				(select name from repo where id=cid) as type,
				title as name,
				t2 as profile,
				img1 as icon 
			from u_member where flag=1) as st2
			where st1.userid=st2.uid",$commentid,set_isreaction($uid),$commentid);

		$nsql=sprintf("select count(*) as n from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where commentid=%s and (select flag from u_member where id=(select userid from u_comment where u_comment.id=u_ranking.commentid))=1) as t1,
				(select %sid,comment,userid,pageid,regitime from u_comment where id=%s and flag=1) as t2 
			where t1.commentid=t2.id) as st1,
			(select 
				id as uid
			from u_member where flag=1) as st2
			where st1.userid=st2.uid",$commentid,set_isreaction($uid),$commentid);


			$sql=sprintf("select %s,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.uid",
			$commentfield,sprintf($commenttable,set_isreaction($uid),sprintf("pageid=%s and id=%s and flag=1",$pageid,$commentid),""));
			$nsql="";
*/
		}
	}elseif(preg_match("/(normal|official)/",$type,$r)){
		
		switch($type){
			case "normal":$user=6;break;
			case "official":$user=5;break;
		}

		$sql=sprintf("select * from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where pageid=%s and flag=1 and userflag=1 and cid=%s order by rank desc limit %s offset %s) as t1,
				(select %sid,comment,userid,pageid,regitime from u_comment where pageid=%s) as t2 
			where t1.commentid=t2.id) as st1,
			(select 
				id as uid,
				cid as typeid,
				(select name from repo where id=cid) as type,
				title as name,
				t2 as profile,
				img1 as icon 
			from u_member where flag=1) as st2
			where st1.userid=st2.uid order by rank desc",$pageid,$user,$length,$offset,set_isreaction($uid),$pageid);
		$nsql=sprintf("select count(*) as n from u_ranking where pageid=%s and flag=1 and userflag=1 and cid=%s",$pageid,$user);

/*

		ver.1 種別の判定バグあり

		$sql=sprintf("select * from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where pageid=%s and (select flag from u_comment where u_comment.id=u_ranking.commentid)=1 and (select flag from u_member where id=(select userid from u_comment where u_comment.id=u_ranking.commentid))=1  order by rank desc limit %s offset %s) as t1,
				(select %sid,comment,userid,pageid,regitime from u_comment where pageid=%s) as t2 
			where t1.commentid=t2.id) as st1,
			(select 
				id as uid,
				cid as typeid,
				(select name from repo where id=cid) as type,
				title as name,
				t2 as profile,
				img1 as icon 
			from u_member where cid=%s and flag=1) as st2
			where st1.userid=st2.uid order by rank desc",$pageid,$length,$offset,set_isreaction($uid),$pageid,$user);

		$sql=sprintf("select %s,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.uid order by rank desc limit %s offset %s",
		$commentfield,sprintf($commenttable,set_isreaction($uid),sprintf("pageid=%s and commentid=0 and flag=1",$pageid),sprintf(" and cid=%s",$user)),$length,$offset);	
		$nsql=sprintf("select count(*) as n from (select id,userid from u_comment where pageid=%s and commentid=0 and flag=1) as t1,(select id from u_member where qid=2 and flag=1 and cid=%s) as t2 where t1.userid=t2.id",$pageid,$user);
*/

	}elseif(preg_match("/self/",$type,$r)){
		
		$nsql="";
		if(strlen($uid)>0){
			$sql=sprintf("select * from 
				(select t2.*,t1.good,t1.bad,t1.rank from 
					(select commentid,good,bad,reply,rank from u_ranking where pageid=%s and flag=1 and commentid in(select case when commentid=0 then id else commentid end from u_comment where userid=%s and flag=1) order by rank desc limit %s offset %s) as t1,
					(select %sid,comment,userid,pageid,regitime from u_comment where pageid=%s) as t2 
				where t1.commentid=t2.id) as st1,
				(select 
					id as uid,
					cid as typeid,
					(select name from repo where id=cid) as type,
					title as name,
					t2 as profile,
					img1 as icon 
				from u_member where flag=1) as st2
				where st1.userid=st2.uid order by rank desc",$pageid,$uid,$length,$offset,set_isreaction($uid),$pageid);
			$nsql=sprintf("select count(*) as n from u_ranking where pageid=%s and flag=1 and commentid in(select case when commentid=0 then id else commentid end from u_comment where userid=%s and flag=1)",$pageid,$uid);
		}

/*
		$sql=sprintf("select * from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where pageid=%s and (select flag from u_comment where u_comment.id=u_ranking.commentid)=1) as t1,
				(select %sid,comment,userid,pageid,regitime from u_comment where pageid=%s and userid=%s) as t2 
			where t1.commentid=t2.id order by rank desc limit %s offset %s) as st1,
			(select 
				id as uid,
				cid as typeid,
				(select name from repo where id=cid) as type,
				title as name,
				t2 as profile,
				img1 as icon 
			from u_member where flag=1) as st2
			where st1.userid=st2.uid order by rank desc",$pageid,set_isreaction($uid),$pageid,$uid,$length,$offset);

		$nsql=sprintf("select count(*) as n from 
			(select t2.*,t1.good,t1.bad,t1.rank from 
				(select commentid,good,bad,reply,rank from u_ranking where pageid=%s and (select flag from u_comment where u_comment.id=u_ranking.commentid)=1) as t1,
				(select id,comment,userid,pageid,regitime from u_comment where pageid=%s and userid=%s) as t2 
			where t1.commentid=t2.id) as st1,
			(select 
				id as uid
			from u_member where flag=1) as st2
			where st1.userid=st2.uid",$pageid,$pageid,$uid);


		$sql=sprintf("select %s,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.uid order by regitime desc limit %s offset %s",
		$commentfield,sprintf($commenttable,set_isreaction($uid),sprintf("flag=1 and id in (select id from u_comment where pageid=%s and commentid=0 and flag=1 and userid=%s union select commentid as id from u_comment where pageid=%s and commentid!=0 and flag=1 and userid=%s group by commentid)",$pageid,$uid,$pageid,$uid),""),$length,$offset);

		$nsql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=0 and flag=1 and userid=%s",$pageid,$uid);
*/

	}

	if(strlen($nsql)>0){
		$o->query($nsql);
		$f=$o->fetch_array();
		$count=$f["n"];
	}else{
		$count=0;
	}
	
	if($count>0){
	
		$o->query($sql);
		while($f=$o->fetch_array())$p[]=$f;
		
		for($i=0;$i<count($p);$i++){
		
			$s[$i]=set_commentinfo($p[$i],2);
			
			$sql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=%s and flag=1 and exists (select * from u_member where id=u_comment.userid and flag=1);",$pageid,$p[$i]["id"]);
			$o->query($sql);
			$f=$o->fetch_array();
			$s[$i]["reply"]["count"]=$f["n"];
			
			if($f["n"]>0){
	
				$sql=sprintf("select * from 
					(select %sid,comment,pageid,userid,regitime,(select count(reaction) from u_reaction where commentid=u_comment.id and flag=1 and reaction=1) as good,(select count(reaction) from u_reaction where commentid=u_comment.id and flag=1 and reaction=2) as bad from u_comment where pageid=%s and commentid=%s and flag=1%s) as t1,
					(select id as uid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from u_member where flag=1) as t2 
					where t1.userid=t2.uid order by regitime",
				set_isreaction($uid),$pageid,$p[$i]["id"],!preg_match("/self/",$type)?"":sprintf(" and userid=%s",$uid));

				$o->query($sql);
				while($f=$o->fetch_array()){
					
					$s[$i]["reply"]["comments"][]=set_commentinfo($f,2,$p[$i]["id"]);
				}
			}else{
				$s[$i]["reply"]=array();
			}
		}
	}
}

$y["response"]["count"]=(int)$count;
$y["response"]["comments"]=$s;

if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];

print_json($y,$_SERVER['HTTP_REFERER']);

?>