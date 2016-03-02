<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();
$offset=isset($_REQUEST["offset"])?$_REQUEST["offset"]:0;
$length=isset($_REQUEST["length"])?$_REQUEST["length"]:10;

$sql=sprintf("select * from (select *,(select title from repo_n where id=pageid) as title,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime,to_char(regitime,'MM月DD日 HH24時MI分') as date,extract(dow from regitime) as weekday from u_activity where userid=%s and flag=1) as t1,(select id as userid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2) as t2 where t1.userid=t2.userid order by regitime desc limit %s offset %s",
$uid,$length,$offset);

$nsql=sprintf("select count(*) as n from u_activity where userid=%s and flag=1",$uid);

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

	$s[$i]["id"]=(int)$p[$i]["id"];
	$s[$i]["date"]=str_replace(" ","T",$p[$i]["isotime"]);
	$s[$i]["display_date"]=get_relativetime($p[$i]["relativetime"],$p[$i]["date"],$p[$i]["weekday"]);
	$s[$i]["action"]=get_action($p[$i]["activity"],$p[$i]["activityid"]);
	
	$s[$i]["user"]["id"]=(int)$p[$i]["userid"];
	$s[$i]["user"]["name"]=mod_HTML($p[$i]["name"]);
	$s[$i]["user"]["profile_picture"]=strlen($p[$i]["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$p[$i]["icon"]):"";
	$s[$i]["user"]["bio"]==checkstr($p[$i]["profile"]);
	$s[$i]["user"]["url"]=sprintf("%s/mypage/",$domain);
	$s[$i]["user"]["type"]["id"]=(int)$p[$i]["typeid"];
	$s[$i]["user"]["type"]["label"]=$p[$i]["type"];
	
	$s[$i]["article"]["id"]=$p[$i]["pageid"];
	$s[$i]["article"]["title"]=$p[$i]["title"];
	$s[$i]["article"]["url"]=sprintf("%s/%s/%s",$domain,"p",$p[$i]["pageid"]);

	if($p[$i]["activity"]!=4){
		
		$sql=sprintf("select %s from (select * from (select id,commentid,userid,comment,regitime,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime,to_char(regitime,'MM月DD日 HH24時MI分') as date,extract(dow from regitime) as weekday from u_comment where id=%s) as t1,(select id as pid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2) as t2 where t1.userid=t2.pid) as c1 left join (select * from (select id,commentid,userid,comment,regitime,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime from u_comment) as t1,(select id as pid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2) as t2 where t1.userid=t2.pid) as c2 on c1.commentid=c2.id",$e,
		$p[$i]["activity"]==1?$p[$i]["activityid"]:sprintf("(select commentid from u_reaction where id=%s)",$p[$i]["activityid"]));
		$o->query($sql);
		$f=$o->fetch_array();
		
		if(strlen($f["id_"])==0){
		
			$s[$i]["article"]["comments"]["id"]=(int)$f["id"];
			$s[$i]["article"]["comments"]["body"]=mod_HTML($f["comment"],2);
			$s[$i]["article"]["comments"]["url"]=sprintf("%s/%s/%s/comment/%s",$domain,"p",$p[$i]["pageid"],$f["id"]);
			
			$s[$i]["article"]["comments"]["user"]["id"]=(int)$f["userid"];
			$s[$i]["article"]["comments"]["user"]["name"]=mod_HTML($f["name"]);
			$s[$i]["article"]["comments"]["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon"]):"";
			$s[$i]["article"]["comments"]["user"]["bio"]==checkstr($f["profile"]);
			$s[$i]["article"]["comments"]["user"]["url"]=sprintf("%s/mypage/",$domain);
			
			$s[$i]["article"]["comments"]["user"]["type"]["id"]=(int)$f["typeid"];
			$s[$i]["article"]["comments"]["user"]["type"]["label"]=$f["type"];
		
		}else{

			$s[$i]["article"]["comments"]["id"]=(int)$f["id_"];
			$s[$i]["article"]["comments"]["body"]=mod_HTML($f["comment_"],2);
			$s[$i]["article"]["comments"]["url"]=sprintf("%s/%s/%s/comment/%s",$domain,"p",$p[$i]["pageid"],$f["id_"]);
			
			$s[$i]["article"]["comments"]["user"]["id"]=(int)$f["userid_"];
			$s[$i]["article"]["comments"]["user"]["name"]=mod_HTML($f["name_"]);
			$s[$i]["article"]["comments"]["user"]["profile_picture"]=strlen($f["icon_"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon_"]):"";
			$s[$i]["article"]["comments"]["user"]["bio"]==checkstr($f["profile_"]);
			$s[$i]["article"]["comments"]["user"]["url"]=sprintf("%s/mypage/",$domain);
			
			$s[$i]["article"]["comments"]["user"]["type"]["id"]=(int)$f["typeid_"];
			$s[$i]["article"]["comments"]["user"]["type"]["label"]=$f["type_"];
	
			$s[$i]["article"]["reply"]["id"]=(int)$f["id"];
			$s[$i]["article"]["reply"]["body"]=mod_HTML($f["comment"],2);
			$s[$i]["article"]["reply"]["url"]=sprintf("%s/%s/%s/comment/%s/%s",$domain,"p",$p[$i]["pageid"],$f["id_"],$f["id"]);
			
			$s[$i]["article"]["reply"]["user"]["id"]=(int)$f["userid"];
			$s[$i]["article"]["reply"]["user"]["name"]=mod_HTML($f["name"]);
			$s[$i]["article"]["reply"]["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon"]):"";
			$s[$i]["article"]["reply"]["user"]["bio"]==checkstr($f["profile"]);
			$s[$i]["article"]["reply"]["user"]["url"]=sprintf("%s/mypage/",$domain);
			
			$s[$i]["article"]["reply"]["user"]["type"]["id"]=(int)$f["typeid"];
			$s[$i]["article"]["reply"]["user"]["type"]["label"]=$f["type"];

		}
	}
	
}

$y=array();

$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]["count"]=(int)$count;
$y["response"]["activities"]=$s;

if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];



if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>