<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth($H["Authorization"]);
$offset=isset($_REQUEST["offset"])?$_REQUEST["offset"]:0;
$length=isset($_REQUEST["length"])?$_REQUEST["length"]:10;

if($_REQUEST["api"]=="category"){

	$sql="select id,name,name_e from pm_ where cid=20 and flag=1 order by n";
	$o->query($sql);
	while($f=$o->fetch_array()){
		$caa[$f["name_e"]]=$f["id"];
	}

	$c=$_REQUEST["category"]=="all"?"":sprintf(" and m1=%s",$caa[$_REQUEST["category"]]);
	
	if(!isset($_REQUEST["type"])){

		$sql=sprintf("select t1.*,t2.* from (select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n where cid=1 and flag=1%s) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid order by relativetime limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$c,$length,$offset);
		
		$nsql=sprintf("select count(*) as n from repo_n where cid=1 and flag=1%s",$c);
		
	}elseif($_REQUEST["type"]=="ranking"){
		
		$sql=sprintf("select rt1.n,rt2.* from u_ranking as rt1,(select %s* from (select t1.*,t2.* from (select id,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n where cid=1 and flag=1%s) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid) as t3) as rt2 where rt1.id=rt2.id order by n desc,relativetime limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$c,$length,$offset);
		
		$nsql=sprintf("select count(*) as n from repo_n where cid=1 and flag=1%s",$c);

	}elseif($_REQUEST["type"]=="video"){

		$sql=sprintf("select t1.*,t2.* from (select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n where cid=1 and flag=1 and (t8 is not null or youtube is not null)%s) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid order by relativetime limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$c,$length,$offset);

		$nsql=sprintf("select count(*) as n from repo_n where cid=1 and flag=1 and t8 is not null or youtube is not null%s",$c);
	}
	
}elseif($_REQUEST["api"]=="self"){

	/* まだ手を付けていない */
	
	$c=isset($_REQUEST["c"])?$_REQUEST["c"]:"home";
	
	if($c=="home"){

		$sql=sprintf("select t1.*,t2.* from (select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n where cid=1 and flag=1) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid order by relativetime limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$length,$offset);
		
		$nsql="select count(*) as n from repo_n where cid=1 and flag=1";

	}elseif($c=="headline"){

		$sql=sprintf("select t1.*,t2.* from (select tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=8 and flag=1) as tt2,(select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n) as tt1 where tt2.d2=tt1.id) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid order by sort limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$length,$offset);
		
		$nsql="select count(*) as n from repo_n where cid=8 and flag=1";

	}elseif($c=="pickup"){

		$sql=sprintf("select t1.*,t2.* from (select tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=9 and flag=1) as tt2,(select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n) as tt1 where tt2.d2=tt1.id) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid order by sort limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$length,$offset);
		
		$nsql="select count(*) as n from repo_n where cid=9 and flag=1";
		
	}
	
}elseif($_REQUEST["api"]=="search"){

	$q=str_replace(array(" ","　","|","、"),",",trim(strip_tags($_REQUEST["q"])));
	$q=explode(",",$q);
	for($i=0;$i<count($q);$i++){
		$q[$i]=sprintf("txt like '%s%s%s'","%",$q[$i],"%");
	}
	$q=implode(" and ",$q);
	
	$sql=sprintf("select st02.* from (select id from u_index where %s) as st01,(select t1.*,t2.* from (select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n where cid=1 and flag=1) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid) as st02 where st01.id=st02.id order by relativetime limit %s offset %s",$q,$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$length,$offset);
	$nsql=sprintf("select count(*) as n from (select id from u_index where %s) as t1,(select id from repo_n where cid=1 and flag=1) as t2 where t1.id=t2.id",$q);

}elseif($_REQUEST["api"]=="home"){

	$c=isset($_REQUEST["c"])?$_REQUEST["c"]:"home";
	
	if($c=="home"){

		$sql=sprintf("select t1.*,t2.* from (select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n where cid=1 and flag=1) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid order by relativetime limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$length,$offset);

		$nsql="select count(*) as n from repo_n where cid=1 and flag=1";

	}elseif($c=="headline"){

		$sql=sprintf("select t1.*,t2.* from (select tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=8 and flag=1) as tt2,(select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n) as tt1 where tt2.d2=tt1.id) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid order by sort limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$length,$offset);

		$nsql="select count(*) as n from repo_n where cid=8 and flag=1";

	}elseif($c=="pickup"){

		$sql=sprintf("select t1.*,t2.* from (select tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=9 and flag=1) as tt2,(select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n) as tt1 where tt2.d2=tt1.id) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid order by sort limit %s offset %s",
		$uid!=""?sprintf(",(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$length,$offset);

		$nsql="select count(*) as n from repo_n where cid=9 and flag=1";

	}
}elseif($_REQUEST["api"]=="bookmark"){
	
		$sql=sprintf("select bm01.*,bm02.orders from (select t1.*,t2.* from (select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n where cid=1 and flag=1 and id in (select pageid from u_bookmark where userid=%s and flag=1)) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid) as bm01,(select pageid,regitime as orders from u_bookmark where userid=%s and flag=1) as bm02 where bm01.id=bm02.pageid order by orders desc limit %s offset %s",
		$uid!=""?sprintf("(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,",$uid):"",$uid,$uid,$length,$offset);
		
		$nsql=sprintf("select count(*) as n from repo_n where cid=1 and flag=1 and id in(select pageid from u_bookmark where userid=%s and flag=1)",$uid);
}

$o->query($nsql);
$f=$o->fetch_array();
$count=$f["n"];


$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;
for($i=0;$i<count($p);$i++){

	$s[$i]["id"]=(int)$p[$i]["id"];
	$s[$i]["date"]=$p[$i]["isotime"];
	$s[$i]["display_date"]=get_relativetime($p[$i]["relativetime"],$p[$i]["date"],$p[$i]["weekday"]);
	$s[$i]["title"]=mod_HTML($p[$i]["title"]);
	$s[$i]["description"]=get_summary($p[$i]["b1"],$p[$i]["body"]);
	$s[$i]["category"]["label"]=$p[$i]["category"];
	$s[$i]["category"]["slug"]=$p[$i]["slug"]; 
	$s[$i]["url"]=sprintf("%s/%s/%s",$domain,"p",$p[$i]["id"]);
	$s[$i]["is_bookmarked"]=strlen($p[$i]["is_bookmark"])>0?true:false;
	$s[$i]["media_type"]=(strlen($p[$i]["video"])>0||strlen($p[$i]["youtube"])>0)?"video":"image";

	$s[$i]["media"]["images"]["thumbnail"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/thumbnail2/%s",$domain,$p[$i]["img1"]):"";
	$s[$i]["media"]["images"]["medium"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/thumbnail1/%s",$domain,$p[$i]["img1"]):"";
	$s[$i]["media"]["images"]["large"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/img/%s",$domain,$p[$i]["img1"]):"";
	$s[$i]["media"]["images"]["original"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/raw/%s",$domain,$p[$i]["img1"]):"";
	$s[$i]["media"]["images"]["caption"]=checkstr($p[$i]["t1"],1);
	
	$s[$i]["media"]["video"]["url"]=strlen($p[$i]["video"])>0?sprintf("%s/prg_img/img/%s",$domain,$p[$i]["video"]):"";
	$s[$i]["media"]["video"]["youtube"]=checkstr($p[$i]["youtube"],1);
	$s[$i]["media"]["video"]["caption"]=checkstr($p[$i]["videocaption"],1);
	
	$s[$i]["user"]["id"]=(int)$p[$i]["uid"];
	$s[$i]["user"]["name"]=mod_HTML($p[$i]["name"]);
	$s[$i]["user"]["profile_picture"]=strlen($p[$i]["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$p[$i]["icon"]):"";
	$s[$i]["user"]["bio"]==checkstr($p[$i]["profile"]);
	$s[$i]["user"]["url"]=sprintf("%s/mypage/",$domain);
	
	$s[$i]["user"]["type"]["id"]=(int)$p[$i]["typeid"];
	$s[$i]["user"]["type"]["label"]=$p[$i]["type"];
	
	$sql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=0 and flag=1",$p[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$s[$i]["comments_count"]=$f["n"];
	
	if($f["n"]>0){

		$sql=sprintf("

select t1.*,t2.*,(good+bad) as popular,%s from 

	(select id,
			pageid,
			userid,
			to_char(regitime,'YYYY-MM-DD HH24:MI:SS') as regitime,
			extract(epoch from (now()-regitime)/60) as relativetime,to_char(regitime,'MM月DD日 HH24時MI分') as date,extract(dow from regitime) as weekday,
			comment,
			(select count(id) as n from u_reaction where commentid=u_comment.id and reaction=1 and flag=1) as good,
			(select count(id) as n from u_reaction where commentid=u_comment.id and reaction=2 and flag=1) as bad 
		from u_comment where pageid=%s and commentid=0 and flag=1) as t1,

	(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon,(select name from repo where id=cid) as label from repo_n where qid=2 and flag=1) as t2 

where t1.userid=t2.uid order by popular desc limit 6 offset 0",
	
$uid!=""?sprintf("(select id from u_reaction where userid=%s and commentid=t1.id and reaction=1 and flag=1) as isgood,(select id from u_reaction where userid=%s and commentid=t1.id and reaction=2 and flag=1) as isbad",$uid,$uid):"null as isgood,null as isbad",$p[$i]["id"]);
		
		$o->query($sql);

		$n=0;

		while($f=$o->fetch_array()){
			$s[$i]["comments_popular"][$n]["id"]=(int)$f["id"];
			$s[$i]["comments_popular"][$n]["date"]=str_replace(" ","T",$f["regitime"])."+09:00";
			$s[$i]["comments_popular"][$n]["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
			$s[$i]["comments_popular"][$n]["body"]=mod_HTML($f["comment"],2);
			$s[$i]["comments_popular"][$n]["body_escape"]=mod_HTML($f["comment"]);
			$s[$i]["comments_popular"][$n]["is_like"]=strlen($f["isgood"])>0?true:false;
			$s[$i]["comments_popular"][$n]["is_bad"]=strlen($f["isbad"])>0?true:false;
			$s[$i]["comments_popular"][$n]["like"]=(int)$f["good"];
			$s[$i]["comments_popular"][$n]["bad"]=(int)$f["bad"];
			$s[$i]["comments_popular"][$n]["url"]=sprintf("%s/%s/%s/comment/%s",$domain,"p",$p[$i]["id"],$f["id"]);

			$s[$i]["comments_popular"][$n]["user"]["id"]=(int)$f["userid"];
			$s[$i]["comments_popular"][$n]["user"]["name"]=mod_HTML($f["name"]);
			$s[$i]["comments_popular"][$n]["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon"]):"";
			$s[$i]["comments_popular"][$n]["user"]["bio"]==checkstr($f["profile"]);
			$s[$i]["comments_popular"][$n]["user"]["url"]=sprintf("%s/mypage/",$domain);
			
			$s[$i]["comments_popular"][$n]["user"]["type"]["id"]=(int)$f["typeid"];
			$s[$i]["comments_popular"][$n]["user"]["type"]["label"]=$f["label"];

			$n++;
		}
		
	}else{
		$s[$i]["comments_popular"]=array();
	}
	
}

$y=array();

$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]["count"]=(int)$count;
$y["response"]["articles"]=$s;

if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];



if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>