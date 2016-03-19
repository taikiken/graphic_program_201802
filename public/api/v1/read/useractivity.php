<?php

include $INCLUDEPATH."local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=set_userid(auth());
$offset=isset($_REQUEST["offset"])?$_REQUEST["offset"]:0;
$length=isset($_REQUEST["length"])?$_REQUEST["length"]:10;

if(strlen($uid)>0){
	
	$tmptable=sprintf("select t1.id from (select id,userid,(select flag from repo_n where id=userid) as userflag,activityid from u_activity where activity=1 and userid=%s and flag=1) as t1,(select id from u_comment where flag=1) as t2 where t1.activityid=t2.id and userflag=1 union select t1.id from (select id,userid,(select flag from repo_n where id=userid) as userflag,activityid from u_activity where activity in(2,3) and userid=%s and flag=1) as t1,(select id from u_reaction where flag=1) as t2 where t1.activityid=t2.id and userflag=1 union select t1.id from (select id,userid,(select flag from repo_n where id=userid) as userflag,activityid from u_activity where activity=4 and userid=%s and flag=1) as t1,(select id from u_bookmark where flag=1) as t2 where t1.activityid=t2.id and userflag=1",$uid,$uid,$uid);
	$sql=sprintf("select * from (select *,(select title from repo_n where id=pageid) as title,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime,to_char(regitime,'MM月DD日 HH24時MI分') as date,extract(dow from regitime) as weekday from u_activity where id in(%s)) as t1,(select id as userid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.userid=t2.userid order by regitime desc limit %s offset %s",$tmptable,$length,$offset);
	$nsql=sprintf("select count(*) as n from (%s) as t",$tmptable);
	
	$o->query($sql);
	while($f=$o->fetch_array())$p[]=$f;
	
	$o->query($nsql);
	$f=$o->fetch_array();
	$count=$f["n"];
	
	$fls=array("id","commentid","userid","comment","regitime","isotime","relativetime","pid","typeid","type","name","profile","icon");
	for($i=0;$i<count($fls);$i++){
		$e[]=sprintf("c1.%s,c2.%s as %s_",$fls[$i],$fls[$i],$fls[$i]);
	}
	$e=implode(",",$e);
	
	for($i=0;$i<count($p);$i++){
	
		$s[$i]=set_activity($p[$i]);
		if($p[$i]["activity"]!=4){
			
			$sql=sprintf("select %s,pageid from (select * from (select id,flag,commentid,userid,pageid,comment,regitime,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime,to_char(regitime,'MM月DD日 HH24時MI分') as date,extract(dow from regitime) as weekday from u_comment where id=%s) as t1,(select id as pid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.userid=t2.pid) as c1 left join (select * from (select id,flag,commentid,userid,comment,regitime,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime from u_comment) as t1,(select id as pid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.userid=t2.pid) as c2 on c1.commentid=c2.id",$e,
			$p[$i]["activity"]==1?$p[$i]["activityid"]:sprintf("(select commentid from u_reaction where id=%s)",$p[$i]["activityid"]));
			
			$o->query($sql);
			$f=$o->fetch_array();
			
			if(strlen($f["id_"])==0){
				$s[$i]["article"]["comments"]=set_commentinfo($f,0,1);
			}else{
				$replyid=$f["id_"];
				$s[$i]["article"]["comments"]=set_commentinfo(mod_replyfield($fls,$f),0,1);
				$s[$i]["article"]["reply"]=set_commentinfo($f,$replyid,1);
			}
		}
	}
}else{
	$s=(object)$s;	
}

$y["response"]["count"]=(int)$count;
$y["response"]["activities"]=$s;

if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];

print_json($y,$_SERVER['HTTP_REFERER']);

?>