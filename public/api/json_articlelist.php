<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();
$offset=isset($_REQUEST["offset"])?$_REQUEST["offset"]:0;
$length=isset($_REQUEST["length"])?$_REQUEST["length"]:10;

if($_REQUEST["api"]=="category"){

	$sql="select id,name,name_e from pm_ where cid=20 and flag=1 order by n";
	$o->query($sql);
	while($f=$o->fetch_array()){
		$caa[$f["name_e"]]=$f["id"];
	}

	$c=$_REQUEST["category"]=="all"?"":sprintf(" and (m1=%s or m2=%s)",$caa[$_REQUEST["category"]],$caa[$_REQUEST["category"]]);
	
	if(!isset($_REQUEST["type"])){

		$sql=sprintf("select * from %s order by m_time limit %s offset %s",sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",$c),$length,$offset);
		$nsql=sprintf("select count(*) as n from repo_n where cid=1 and flag=1%s",$c);
		
	}elseif($_REQUEST["type"]=="ranking"){
		
		$sql=sprintf("select tt1.*,(case when num is not null then num else 0 end) as num from (select * from %s) as tt1 left join (select pageid,count(pageid) as num from u_view where regitime > now() - interval '3 day' group by pageid) as tt2 on tt1.id=tt2.pageid order by num desc,m_time limit %s offset %s",sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",$c),$length,$offset);
		$nsql=sprintf("select count(*) as n from repo_n where cid=1 and flag=1%s",$c);

	}elseif($_REQUEST["type"]=="video"){

		$sql=sprintf("select * from %s order by m_time limit %s offset %s",sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",$c." and (t8 is not null or youtube is not null or facebook is not null)"),$length,$offset);
		$nsql=sprintf("select count(*) as n from repo_n where cid=1 and flag=1 and (t8 is not null or youtube is not null or facebook is not null)%s",$c);
	}

}elseif($_REQUEST["api"]=="search"){

	$q=str_replace(array(" ","　","|","、"),",",trim(strip_tags($_REQUEST["q"])));
	$q=explode(",",$q);
	for($i=0;$i<count($q);$i++){
		$q[$i]=sprintf("txt like '%s%s%s'","%",strtolower(mb_convert_kana($q[$i],"KVa")),"%");
	}
	$q=implode(" and ",$q);
	$c="";
	
	$sql=sprintf("select st02.* from (select id from u_index where %s) as st01,(select * from %s) as st02 where st01.id=st02.id order by m_time limit %s offset %s",$q,sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",$c),$length,$offset);
	$nsql=sprintf("select count(*) as n from (select id from u_index where %s) as t1,(select id from repo_n where cid=1 and flag=1) as t2 where t1.id=t2.id",$q);

}elseif($_REQUEST["api"]=="home"||$_REQUEST["api"]=="self"){

	$cx=isset($_REQUEST["c"])?$_REQUEST["c"]:"home";
	
	if($cx=="home"){
		
		if($uid!=""){
			$sql=sprintf("select st02.*,1 as recommend from (select t2.id,t2.m_time from (select categoryid from u_category where userid=%s and flag=1) as t1,(select max(id) as id,m1,max(m_time) as m_time from repo_n where cid=1 and flag=1 and m_time > now() - interval '3 day' group by m1) as  t2 where t1.categoryid=t2.m1 order by m_time desc limit 3 offset 0) as st01,(select * from %s) as st02 where st01.id=st02.id union (select *,0 as recommend from %s) order by recommend desc,m_time limit %s offset %s",
			$uid,sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",""),sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",""),$length,$offset);
		
		}else{
			$sql=sprintf("select * from %s order by relativetime limit %s offset %s",sprintf($articletable,"",""),$length,$offset);
		}
		$nsql="select count(*) as n from repo_n where cid=1 and flag=1";
		
	}elseif($cx=="headline"){

		$sql=sprintf("select * from (select d2,n as sort from repo_n where cid=8 and flag=1) as rt1,(select * from %s) as rt2 where rt1.d2=rt2.id order by sort limit %s offset %s",sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",""),$length,$offset);
		$nsql="select count(*) as n from repo_n where cid=8 and flag=1";

	}elseif($cx=="pickup"){

		$sql=sprintf("select * from (select d2,n as sort from repo_n where cid=8 and flag=1) as rt1,(select * from %s) as rt2 where rt1.d2=rt2.id order by sort limit %s offset %s",sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",""),$length,$offset);
		$nsql="select count(*) as n from repo_n where cid=8 and flag=1";

	}elseif($cx=="personalized"){
		
		$c=$uid!=""?sprintf(" and (m1 in (select categoryid from u_category where userid=%s and flag=1) or m2 in (select categoryid from u_category where userid=%s and flag=1)) and m_time > now() - interval '3 day'",$uid,$uid):"";
		$sql=sprintf("select * from %s order by m_time limit %s offset %s",sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",$c),$length,$offset);
		$nsql=sprintf("select count(*) as n from repo_n where cid=1 and flag=1%s",$c);
	}
}elseif($_REQUEST["api"]=="bookmark"){
	
		$sql=sprintf("select * from (select pageid,regitime from u_bookmark where userid=%s and flag=1) as rt1,(select * from %s) as rt2 where rt1.pageid=rt2.id order by m_time desc limit %s offset %s",$uid,sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",""),$length,$offset);
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
	$s[$i]["category2"]["label"]=$p[$i]["category2"];
	$s[$i]["category2"]["slug"]=$p[$i]["slug2"];

	$s[$i]["categories"][0]["label"]=$p[$i]["category"];
	$s[$i]["categories"][0]["slug"]=$p[$i]["slug"];
	if(strlen($p[$i]["category2"])>0){
		$s[$i]["categories"][1]["label"]=$p[$i]["category2"];
		$s[$i]["categories"][1]["slug"]=$p[$i]["slug2"];
	}

	$s[$i]["url"]=sprintf("%s/%s/%s",$domain,"p",$p[$i]["id"]);
	$s[$i]["is_bookmarked"]=strlen($p[$i]["is_bookmark"])>0?true:false;
	$s[$i]["is_recommend"]=$p[$i]["recommend"]==1?true:false;
	
	$video=get_videotype($p[$i]["video"],$p[$i]["youtube"],$p[$i]["facebook"]);
	$s[$i]["media_type"]=(strlen($video)>0)?"video":"image";
	$s[$i]["media"]["images"]["thumbnail"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/thumbnail2/%s",$ImgPath,$p[$i]["img1"]):"";
	$s[$i]["media"]["images"]["medium"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/thumbnail1/%s",$ImgPath,$p[$i]["img1"]):"";
	$s[$i]["media"]["images"]["large"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$p[$i]["img1"]):"";
	$s[$i]["media"]["images"]["original"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/raw/%s",$ImgPath,$p[$i]["img1"]):"";
	$s[$i]["media"]["images"]["caption"]=checkstr($p[$i]["t1"],1);
	
	$s[$i]["media"]["video"]["type"]=$video;
	$s[$i]["media"]["video"]["url"]=strlen($p[$i]["video"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$p[$i]["video"]):"";
	$s[$i]["media"]["video"]["youtube"]=checkstr($p[$i]["youtube"],1);
	$s[$i]["media"]["video"]["facebook"]=checkstr($p[$i]["facebook"],1);
	$s[$i]["media"]["video"]["caption"]=checkstr($p[$i]["videocaption"],1);
	
	$s[$i]["user"]["id"]=(int)$p[$i]["uid"];
	$s[$i]["user"]["name"]=mod_HTML($p[$i]["name"]);
	$s[$i]["user"]["profile_picture"]=strlen($p[$i]["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$p[$i]["icon"]):"";
	$s[$i]["user"]["bio"]==checkstr($p[$i]["profile"]);
	$s[$i]["user"]["url"]=sprintf("%s/mypage/",$domain);
	
	$s[$i]["user"]["type"]["id"]=(int)$p[$i]["typeid"];
	$s[$i]["user"]["type"]["label"]=$p[$i]["type"];
	
	$sql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=0 and flag=1",$p[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$s[$i]["comments_count"]=(int)$f["n"];
	
	if($f["n"]>0){

		$sql=sprintf("select *,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid order by rank desc limit 6 offset 0",
		sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("pageid=%s and commentid=0 and flag=1",$p[$i]["id"]),""));
		
		$o->query($sql);

		$n=0;

		while($f=$o->fetch_array()){
			$s[$i]["comments_popular"][$n]["id"]=(int)$f["id"];
			$s[$i]["comments_popular"][$n]["date"]=str_replace(" ","T",$f["isotime"]);
			$s[$i]["comments_popular"][$n]["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
			$s[$i]["comments_popular"][$n]["body"]=mod_HTML($f["comment"],2);
			$s[$i]["comments_popular"][$n]["body_escape"]=mod_HTML($f["comment"]);
			$s[$i]["comments_popular"][$n]["is_like"]=$f["isreaction"]!=1?false:true;
			$s[$i]["comments_popular"][$n]["is_bad"]=$f["isreaction"]!=2?false:true;
			$s[$i]["comments_popular"][$n]["like"]=(int)$f["good"];
			$s[$i]["comments_popular"][$n]["bad"]=(int)$f["bad"];
			$s[$i]["comments_popular"][$n]["url"]=sprintf("%s/%s/%s/comment/%s",$domain,"p",$p[$i]["id"],$f["id"]);

			$s[$i]["comments_popular"][$n]["user"]["id"]=(int)$f["userid"];
			$s[$i]["comments_popular"][$n]["user"]["name"]=mod_HTML($f["name"]);
			$s[$i]["comments_popular"][$n]["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
			$s[$i]["comments_popular"][$n]["user"]["bio"]==checkstr($f["profile"]);
			$s[$i]["comments_popular"][$n]["user"]["url"]=sprintf("%s/mypage/",$domain);
			
			$s[$i]["comments_popular"][$n]["user"]["type"]["id"]=(int)$f["typeid"];
			$s[$i]["comments_popular"][$n]["user"]["type"]["label"]=$f["type"];

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