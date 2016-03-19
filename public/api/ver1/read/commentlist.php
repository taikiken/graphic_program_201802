<?php

include $INCLUDEPATH."local.php";
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

if($y["status"]["user_message"]==""){

	if(strlen($type)==0){
		if(strlen($commentid)==0){
			
			$sql=sprintf("select *,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid order by rank desc limit %s offset %s",
			sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("pageid=%s and commentid=0 and flag=1",$pageid),""),$length,$offset);
			$nsql=sprintf("select count(*) as n from (select userid from u_comment where pageid=%s and commentid=0 and flag=1) as t1,(select id from repo_n where qid=2 and flag=1) as t2 where t1.userid=t2.id",$pageid);
		}else{
			
			$sql=sprintf("select *,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid",
			sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("pageid=%s and id=%s and flag=1",$pageid,$commentid),""));
			$nsql="";
		}
	}elseif(preg_match("/(normal|official)/",$type,$r)){
		
		switch($type){
			case "normal":$user=6;break;
			case "official":$user=5;break;
		}
	
		$sql=sprintf("select *,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid order by rank desc limit %s offset %s",
		sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("pageid=%s and commentid=0 and flag=1",$pageid),sprintf(" and cid=%s",$user)),$length,$offset);	
		$nsql=sprintf("select count(*) as n from (select id,userid from u_comment where pageid=%s and commentid=0 and flag=1) as t1,(select id from repo_n where qid=2 and flag=1 and cid=%s) as t2 where t1.userid=t2.id",$pageid,$user);
	
	}elseif(preg_match("/self/",$type,$r)){
		
		$sql=sprintf("select *,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid order by regitime desc limit %s offset %s",
		sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("flag=1 and id in (select id from u_comment where pageid=%s and userid=%s and commentid=0 and flag=1 union select commentid as id from u_comment where pageid=%s and userid=%s and commentid!=0 and flag=1 group by commentid)",$pageid,$uid,$pageid,$uid),""),$length,$offset);
		$nsql=sprintf("select count(*) as n from (select id from u_comment where pageid=%s and userid=%s and commentid=0 and flag=1 union select commentid as id from u_comment where pageid=%s and userid=%s and commentid!=0 and flag=1 group by commentid) as t",$pageid,$uid,$pageid,$uid);
		
	}

	$o->query($sql);
	while($f=$o->fetch_array())$p[]=$f;
	
	if(strlen($nsql)>0){
		$o->query($nsql);
		$f=$o->fetch_array();
		$count=$f["n"];
	}else{
		$count=count($p);
	}
	
	for($i=0;$i<count($p);$i++){
	
		$s[$i]=set_commentinfo($p[$i]);
		
		$sql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=%s and flag=1",$pageid,$p[$i]["id"]);
		$o->query($sql);
		$f=$o->fetch_array();
		$s[$i]["reply"]["count"]=$f["n"];
		
		if($f["n"]>0){
			$n=0;
			if(!preg_match("/self/",$type,$r)){
				$sql=sprintf("select *,(good+bad) as rank from (select id,comment,pageid,userid,(select name_e from pm_ where id=(select m1 from repo_n where id=u_comment.pageid)) as slug,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime,to_char(regitime,'MM月DD日 HH24時MI分') as date,extract(dow from regitime) as weekday,(select count(reaction) from u_reaction where reaction=1 and commentid=u_comment.id and flag=1) as good,(select count(reaction) from u_reaction where reaction=2 and commentid=u_comment.id and flag=1) as bad%s from u_comment where pageid=%s and commentid=%s and flag=1) as t1,(select id as userid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.userid=t2.userid order by relativetime desc",
				$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",$pageid,$p[$i]["id"]);
			}else{
				$sql=sprintf("select *,(good+bad) as rank from (select id,comment,pageid,userid,(select name_e from pm_ where id=(select m1 from repo_n where id=u_comment.pageid)) as slug,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime,to_char(regitime,'MM月DD日 HH24時MI分') as date,extract(dow from regitime) as weekday,(select count(reaction) from u_reaction where reaction=1 and commentid=u_comment.id and flag=1) as good,(select count(reaction) from u_reaction where reaction=2 and commentid=u_comment.id and flag=1) as bad%s from u_comment where pageid=%s and commentid=%s and userid=%s and flag=1) as t1,(select id as userid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.userid=t2.userid order by relativetime desc",
				$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",$pageid,$p[$i]["id"],$uid);
			}
			$o->query($sql);
			while($f=$o->fetch_array()){	
				$s[$i]["reply"]["comments"][$n]=set_commentinfo($f,$p[$i]["id"]);
				$n++;
			}
		}else{
			$s[$i]["reply"]=array();
		}
	}
}else{
	$s=(object)$s;	
}

$y["response"]["count"]=(int)$count;
$y["response"]["comments"]=$s;

if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];

print_json($y,$_SERVER['HTTP_REFERER']);

?>