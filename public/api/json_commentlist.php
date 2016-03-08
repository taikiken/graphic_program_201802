<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();

$offset=isset($_REQUEST["offset"])?$_REQUEST["offset"]:0;
$length=isset($_REQUEST["length"])?$_REQUEST["length"]:10;
$pageid=$_REQUEST["id"];
$type=isset($_REQUEST["type"])?$_REQUEST["type"]:"";
$commentid=isset($_REQUEST["cid"])?$_REQUEST["cid"]:"";

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";
$s=array();

if(strlen($type)==0){
	
	if(strlen($commentid)==0){
		$sql=sprintf("select *,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid order by rank desc limit %s offset %s",
		sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("pageid=%s and commentid=0 and flag=1",$pageid),""),$length,$offset);
		$nsql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=0 and flag=1",$pageid);					
	}else{
		
		if(preg_match('/^[0-9]+$/',$id)){
			$sql=sprintf("select *,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid",
			sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("id=%s and flag=1",$commentid),""));
			$nsql="";
		}else{
			$y["status"]["code"]=404;
			$y["status"]["user_message"]="指定されたページは存在しません。";
			$y["status"]["developer_message"]="IDが存在しない。";
		}
	}

}elseif(preg_match("/(normal|official)/",$type,$r)){
	
	switch($type){
		case "normal":$user=6;break;
		case "official":$user=5;break;
	}
	
	$sql=sprintf("select *,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid order by rank desc limit %s offset %s",
	sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("pageid=%s and commentid=0 and flag=1",$pageid),sprintf(" and cid=%s",$user)),$length,$offset);

	$nsql=sprintf("select count(*) as n from (select id,userid from u_comment where pageid=%s and commentid=0 and flag=1) as t1,(select id from repo_n where cid=%s) as t2 where t1.userid=t2.id",$pageid,$user);

}elseif(preg_match("/self/",$type,$r)){
	
	$sql=sprintf("select *,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid order by rank desc limit %s offset %s",
	sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("flag=1 and id in (select id from u_comment where pageid=%s and userid=%s and commentid=0 union select commentid from u_comment where id in (select max(id) from u_comment where pageid=%s and userid=%s and commentid!=0 group by commentid))",$pageid,$uid,$pageid,$uid),""),$length,$offset);
	
	$nsql=sprintf("select count(*) as n from (select id from u_comment where pageid=%s and userid=%s and commentid=0 union select commentid from u_comment where flag=1 and id in (select max(id) from u_comment where pageid=%s and userid=%s and commentid!=0 group by commentid)) as t",$pageid,$uid,$pageid,$uid);

}else{
	$y["status"]["code"]=400;
	$y["status"]["user_message"]="リクエストに誤りがあります。";
	$y["status"]["developer_message"]="リクエストに不正値がある。";	
}

if($y["status"]["user_message"]==""){

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
	
		$s[$i]["id"]=(int)$p[$i]["id"];
	/*
		$s[$i]["rank"]["goog"]=(int)$p[$i]["good"];
		$s[$i]["rank"]["bad"]=(int)$p[$i]["bad"];
		$s[$i]["rank"]["reply"]=(int)$p[$i]["reply"];
		$s[$i]["rank"]["rank"]=(int)$p[$i]["rank"];
	*/
		$s[$i]["date"]=str_replace(" ","T",$p[$i]["isotime"]);
		$s[$i]["display_date"]=get_relativetime($p[$i]["relativetime"],$p[$i]["date"],$p[$i]["weekday"]);
		$s[$i]["body"]=mod_HTML($p[$i]["comment"],2);
		$s[$i]["body_escape"]=mod_HTML($p[$i]["comment"]);
		
		$s[$i]["is_like"]=$p[$i]["isreaction"]!=1?false:true;
		$s[$i]["is_bad"]=$p[$i]["isreaction"]!=2?false:true;
		$s[$i]["like"]=(int)$p[$i]["good"];
		$s[$i]["bad"]=(int)$p[$i]["bad"];
		
		$s[$i]["url"]=sprintf("%s/%s/%s/comment/%s",$domain,"p",$pageid,$p[$i]["id"]);
		
		$s[$i]["user"]["id"]=(int)$p[$i]["userid"];
		$s[$i]["user"]["name"]=mod_HTML($p[$i]["name"]);
		$s[$i]["user"]["profile_picture"]=strlen($p[$i]["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$p[$i]["icon"]):"";
		$s[$i]["user"]["bio"]==checkstr($p[$i]["profile"]);
		$s[$i]["user"]["url"]=sprintf("%s/mypage/",$domain);
		
		$s[$i]["user"]["type"]["id"]=(int)$p[$i]["typeid"];
		$s[$i]["user"]["type"]["label"]=$p[$i]["type"];
		
		$sql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=%s and flag=1",$pageid,$p[$i]["id"]);
		$o->query($sql);
		$f=$o->fetch_array();
		
		$s[$i]["reply"]["count"]=$f["n"];
		
		if($f["n"]>0){
	
			$n=0;
			
			if(!preg_match("/self/",$type,$r)){
				$sql=sprintf("select *,(good+bad) as rank from (select id,comment,userid,(select name_e from pm_ where id=(select m1 from repo_n where id=u_comment.pageid)) as slug,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime,(select count(reaction) from u_reaction where reaction=1 and commentid=u_comment.id and flag=1) as good,(select count(reaction) from u_reaction where reaction=2 and commentid=u_comment.id and flag=1) as bad%s from u_comment where pageid=%s and commentid=%s and flag=1) as t1,(select id as userid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2) as t2 where t1.userid=t2.userid order by relativetime desc",
				$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",$pageid,$p[$i]["id"]);
			}else{
				$sql=sprintf("select *,(good+bad) as rank from (select id,comment,userid,(select name_e from pm_ where id=(select m1 from repo_n where id=u_comment.pageid)) as slug,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime,(select count(reaction) from u_reaction where reaction=1 and commentid=u_comment.id and flag=1) as good,(select count(reaction) from u_reaction where reaction=2 and commentid=u_comment.id and flag=1) as bad%s from u_comment where pageid=%s and commentid=%s and userid=%s and flag=1) as t1,(select id as userid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2) as t2 where t1.userid=t2.userid order by relativetime desc",
				$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",$pageid,$p[$i]["id"],$uid);
			}
			
			$o->query($sql);
			while($f=$o->fetch_array()){
				
				$s[$i]["reply"]["comments"][$n]["id"]=(int)$f["id"];
				$s[$i]["reply"]["comments"][$n]["date"]=str_replace(" ","T",$f["isotime"]);
				$s[$i]["reply"]["comments"][$n]["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
				$s[$i]["reply"]["comments"][$n]["body"]=mod_HTML($f["comment"],2);
				$s[$i]["reply"]["comments"][$n]["body_escape"]=mod_HTML($f["comment"]);
				
				$s[$i]["reply"]["comments"][$n]["is_like"]=$f["isreaction"]!=1?false:true;
				$s[$i]["reply"]["comments"][$n]["is_bad"]=$f["isreaction"]!=2?false:true;
				$s[$i]["reply"]["comments"][$n]["like"]=(int)$f["good"];
				$s[$i]["reply"]["comments"][$n]["bad"]=(int)$f["bad"];
				
				$s[$i]["reply"]["comments"][$n]["url"]=sprintf("%s/%s/%s/comment/%s/%s",$domain,"p",$pageid,$p[$i]["id"],$f["id"]);
				
				$s[$i]["reply"]["comments"][$n]["user"]["id"]=(int)$f["userid"];
				$s[$i]["reply"]["comments"][$n]["user"]["name"]=mod_HTML($f["name"]);
				$s[$i]["reply"]["comments"][$n]["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
				$s[$i]["reply"]["comments"][$n]["user"]["bio"]==checkstr($f["profile"]);
				$s[$i]["reply"]["comments"][$n]["user"]["url"]=sprintf("%s/mypage/",$domain);
				
				$s[$i]["reply"]["comments"][$n]["user"]["type"]["id"]=(int)$f["typeid"];
				$s[$i]["reply"]["comments"][$n]["user"]["type"]["label"]=$f["type"];
				
				$n++;
			
			}
			
		}else{
			$s[$i]["reply"]=array();
		}
		
	}
}

$y["response"]["count"]=(int)$count;
$y["response"]["comments"]=$s;

if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];



if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>