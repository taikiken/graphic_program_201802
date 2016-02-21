<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

/*

-ユーザー情報
-記事カテゴリー
-お知らせ未読数
ホームの冒頭記事（1枚スライド）
ホームのヘッドライン
ホームの記事（ひとまずデフォルト10件）

*/

$uid=auth();

if(strlen($uid)>0){

	$sql=sprintf("select id as uid,cid as typeid,(select name from repo where id=repo_n.cid) as type,title as name,t2 as profile,img1 as icon from repo_n where id=%s",!$_REQUEST["userid"]?$uid:$_REQUEST["userid"]);
	$o->query($sql);
	$f=$o->fetch_array();

	$s["user"]["id"]=(int)$f["uid"];
	$s["user"]["name"]=mod_HTML($f["name"]);
	$s["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon"]):"";
	$s["user"]["bio"]=checkstr($f["profile"]);
	$s["user"]["url"]=sprintf("%s/mypage/",$domain,$f["uid"]);
	
	$s["user"]["type"]["id"]=(int)$f["typeid"];
	$s["user"]["type"]["label"]=$f["type"];
	
	$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,name_e from pm_ where cid=20) as t2 where t1.categoryid=t2.id order by id",$uid);
	$o->query($sql);
	
	$n=0;
	while($f=$o->fetch_array()){
		$s["user"]["interest"][$n]["id"]=$f["id"];
		$s["user"]["interest"][$n]["slug"]=$f["name_e"];
		$s["user"]["interest"][$n]["label"]=$f["name"];
		$n++;
	}
	
}else{
	
	$s["user"]=(object)array();

}


if(strlen($uid)==0){
	$sql="select id,name,name_e from pm_ where cid=20 and flag=1 order by n";
}else{
	$sql=sprintf("select id,name,name_e,n,1 as m from pm_ where id in (select categoryid from u_category where userid=%s and flag=1) and flag=1 union select id,name,name_e,n,2 as m from pm_ where cid=20 and flag=1 and id not in (select categoryid from u_category where userid=%s and flag=1) order by m,n",$uid,$uid);
}

$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;
for($i=0;$i<count($p);$i++){
	$s["cateory"][$i]["id"]=(int)$p[$i]["id"];
	$s["cateory"][$i]["label"]=$p[$i]["name"];
	$s["cateory"][$i]["slug"]=$p[$i]["name_e"];
	$s["cateory"][$i]["url"]=sprintf("%s/category/%s/",$domain,$p[$i]["name_e"]);
}


if(strlen($uid)>0){
	
	$sql=sprintf("select count(flag) as n from u_activity where reuserid=%s and notice=1",$uid);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$s["unread"]=(int)$f["n"];

}else{

	$s["unread"]=0;

}

unset($p);

$sql=sprintf("
select 0 as h,t1.*,t2.* from (select tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=8 and flag=1) as tt2,(select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,facebook,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n) as tt1 where tt2.d2=tt1.id) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid
 union 
select 1 as h,t1.*,t2.* from (select tt1.*,tt2.sort from (select d2,n as sort from repo_n where cid=9 and flag=1) as tt2,(select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,facebook,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday from repo_n) as tt1 where tt2.d2=tt1.id) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid
 union 
(select 2 as h,t1.*,t2.* from (select %sid,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,youtube,facebook,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday, 1 as sort from repo_n where id not in (select d2 from repo_n where qid=7 and flag=1)) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid limit 10 offset 0) order by h,sort,relativetime",
$uid!=""?sprintf($bookmarkfield,$uid):"",$uid!=""?sprintf($bookmarkfield,$uid):"",$uid!=""?sprintf($bookmarkfield,$uid):"");

$hg=array("headline","pickup","latest");

$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;

$nn=0;

for($i=0;$i<count($p);$i++){
	
	if($p[$i]["h"]!=2){
		$nm=$p[$i]["sort"]-1;
	}else{
		$nm=$nn;
		$nn++;
	}
	
	$s[$hg[$p[$i]["h"]]][$nm]["id"]=(int)$p[$i]["id"];
	$s[$hg[$p[$i]["h"]]][$nm]["date"]=$p[$i]["isotime"];
	$s[$hg[$p[$i]["h"]]][$nm]["display_date"]=get_relativetime($p[$i]["relativetime"],$p[$i]["date"],$p[$i]["weekday"]);
	$s[$hg[$p[$i]["h"]]][$nm]["title"]=mod_HTML($p[$i]["title"]);
	$s[$hg[$p[$i]["h"]]][$nm]["description"]=get_summary($p[$i]["b1"],$p[$i]["body"]);
	$s[$hg[$p[$i]["h"]]][$nm]["category"]["label"]=$p[$i]["category"];
	$s[$hg[$p[$i]["h"]]][$nm]["category"]["slug"]=$p[$i]["slug"]; 
	$s[$hg[$p[$i]["h"]]][$nm]["url"]=sprintf("%s/%s/%s",$domain,"p",$p[$i]["id"]);
	$s[$hg[$p[$i]["h"]]][$nm]["is_bookmarked"]=strlen($p[$i]["is_bookmark"])>0?true:false;
	$s[$hg[$p[$i]["h"]]][$nm]["media_type"]=(strlen($p[$i]["video"])>0||strlen($p[$i]["youtube"])>0)?"video":"image";

	$s[$hg[$p[$i]["h"]]][$nm]["media"]["images"]["thumbnail"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/thumbnail2/%s",$domain,$p[$i]["img1"]):"";
	$s[$hg[$p[$i]["h"]]][$nm]["media"]["images"]["medium"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/thumbnail1/%s",$domain,$p[$i]["img1"]):"";
	$s[$hg[$p[$i]["h"]]][$nm]["media"]["images"]["large"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/img/%s",$domain,$p[$i]["img1"]):"";
	$s[$hg[$p[$i]["h"]]][$nm]["media"]["images"]["original"]=strlen($p[$i]["img1"])>0?sprintf("%s/prg_img/raw/%s",$domain,$p[$i]["img1"]):"";
	$s[$hg[$p[$i]["h"]]][$nm]["media"]["images"]["caption"]=checkstr($p[$i]["t1"],1);
	
	$s[$hg[$p[$i]["h"]]][$nm]["media"]["video"]["type"]=get_videotype($p[$i]["video"],$p[$i]["youtube"],$p[$i]["facebook"]);
	$s[$hg[$p[$i]["h"]]][$nm]["media"]["video"]["url"]=strlen($p[$i]["video"])>0?sprintf("%s/prg_img/img/%s",$domain,$p[$i]["video"]):"";
	$s[$hg[$p[$i]["h"]]][$nm]["media"]["video"]["youtube"]=checkstr($p[$i]["youtube"],1);
	$s[$hg[$p[$i]["h"]]][$nm]["media"]["video"]["facebook"]=checkstr($p[$i]["facebook"],1);
	$s[$hg[$p[$i]["h"]]][$nm]["media"]["video"]["caption"]=checkstr($p[$i]["videocaption"],1);
	
	$s[$hg[$p[$i]["h"]]][$nm]["user"]["id"]=(int)$p[$i]["uid"];
	$s[$hg[$p[$i]["h"]]][$nm]["user"]["name"]=mod_HTML($p[$i]["name"]);
	$s[$hg[$p[$i]["h"]]][$nm]["user"]["profile_picture"]=strlen($p[$i]["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$p[$i]["icon"]):"";
	$s[$hg[$p[$i]["h"]]][$nm]["user"]["bio"]==checkstr($p[$i]["profile"]);
	$s[$hg[$p[$i]["h"]]][$nm]["user"]["url"]=sprintf("%s/mypage/",$domain);
	
	$s[$hg[$p[$i]["h"]]][$nm]["user"]["type"]["id"]=(int)$p[$i]["typeid"];
	$s[$hg[$p[$i]["h"]]][$nm]["user"]["type"]["label"]=$p[$i]["type"];
	
	$sql=sprintf("select count(*) as n from u_comment where pageid=%s and commentid=0 and flag=1",$p[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$s[$hg[$p[$i]["h"]]][$nm]["comments_count"]=$f["n"];
	
	if($f["n"]>0){

		$sql=sprintf("select t1.*,t2.*,(good+bad+case when reply is null then 0 else reply end) as rank from %s where t1.userid=t2.userid order by rank desc limit 6 offset 0",
		sprintf($commenttable,$uid!=""?sprintf(",(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction",$uid):"",sprintf("pageid=%s and commentid=0 and flag=1",$p[$i]["id"]),""));
		
		$o->query($sql);

		$n=0;

		while($f=$o->fetch_array()){
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["id"]=(int)$f["id"];
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["date"]=str_replace(" ","T",$f["isotime"]);
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["body"]=mod_HTML($f["comment"],2);
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["is_like"]=$f["isreaction"]!=1?false:true;
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["is_bad"]=$f["isreaction"]!=2?false:true;
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["like"]=(int)$f["good"];
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["bad"]=(int)$f["bad"];
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["url"]=sprintf("%s/%s/%s/comment/%s",$domain,"p",$p[$i]["id"],$f["id"]);

			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["user"]["id"]=(int)$f["userid"];
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["user"]["name"]=mod_HTML($f["name"]);
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon"]):"";
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["user"]["bio"]==checkstr($f["profile"]);
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["user"]["url"]=sprintf("%s/mypage/",$domain);
			
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["user"]["type"]["id"]=(int)$f["typeid"];
			$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"][$n]["user"]["type"]["label"]=$f["type"];

			$n++;
		}
		
	}else{
		$s[$hg[$p[$i]["h"]]][$nm]["comments_popular"]=array();
	}
	
}

$y=array();

$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]=$s;

if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}


?>