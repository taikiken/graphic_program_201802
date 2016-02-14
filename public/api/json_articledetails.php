<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth($H["Authorization"]);
$id=$_REQUEST["id"];

$sql=sprintf("select t1.*,t2.* from (select id,title,body,b1,m1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday,t10,t11,t12,t13,t14,youtube%s from repo_n where id=%s and flag=1) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid",
$uid!=""?sprintf(",(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark",$uid):"",$id);

$o->query($sql);

$f=$o->fetch_array();

$s["id"]=(int)$f["id"];
$s["date"]=$f["isotime"];
$s["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
$s["title"]=mod_HTML($f["title"]);
$s["description"]=get_summary($f["b1"],$f["body"]);
$s["body"]=tmod($f["body"]);
$s["body_escape"]=stripbr($f["body"]);
$s["category"]["label"]=$f["category"]; 
$s["category"]["slug"]=$f["slug"]; 
$s["url"]=sprintf("%s/%s/%s",$domain,"p",$f["id"]);
$s["is_bookmarked"]=strlen($f["is_bookmarked"])>0?true:false;
$s["media_type"]=strlen($f["video"])>0||strlen($f["youtube"])>0?"video":"image";

/*
$s["media"]["images"]=array();
$nn=0;
for($j=1;$j<=5;$j++){
	if(strlen($f["img".$j])>0){
		$s["media"]["images"][$nn]["thumbnail"]=checkstr(sprintf("%s/prg_img/thumbnail3/%s",$domain,$f["img".$j]));
		$s["media"]["images"][$nn]["medium"]=checkstr(sprintf("%s/prg_img/thumbnail1/%s",$domain,$f["img".$j]));
		$s["media"]["images"][$nn]["large"]=checkstr(sprintf("%s/prg_img/thumbnail2/%s",$domain,$f["img".$j]));
		$s["media"]["images"][$nn]["caption"]=checkstr($f["t1"],1);
		$nn++;
	}
}
*/

$s["media"]["images"]["thumbnail"]=strlen($f["img1"])>0?sprintf("%s/prg_img/thumbnail2/%s",$domain,$f["img1"]):"";
$s["media"]["images"]["medium"]=strlen($f["img1"])>0?sprintf("%s/prg_img/thumbnail1/%s",$domain,$f["img1"]):"";
$s["media"]["images"]["large"]=strlen($f["img1"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["img1"]):"";
$s["media"]["images"]["original"]=strlen($f["img1"])>0?sprintf("%s/prg_img/raw/%s",$domain,$f["img1"]):"";
$s["media"]["images"]["caption"]=checkstr($f["t1"],1);

$s["media"]["video"]["url"]=strlen($f["video"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["video"]):"";
$s["media"]["video"]["caption"]=checkstr($f["videocaption"],1);

$s["media"]["youtube"]=checkstr($f["youtube"],1);

$s["user"]["id"]=(int)$f["uid"];
$s["user"]["name"]=mod_HTML($f["name"]);
$s["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon"]):"";
$s["user"]["bio"]==checkstr($f["profile"]);
$s["user"]["url"]=sprintf("%s/mypage/",$domain);

$s["user"]["type"]["id"]=(int)$f["typeid"];
$s["user"]["type"]["label"]=$f["type"];

$s["keywords"]=array();
for($i=10;$i<=14;$i++){
	if(strlen($f["t".$i])>0)$s["keywords"][]=$f["t".$i];
}

$sql=sprintf("select t1.*,t2.* from (select id,title,body,b1,img1,(select name from repo where id=d1) as type,d2,t1,swf as video,t6 as videocaption,img6 as videoimg,(select name from pm_ where id=m1) as category,(select name_e from pm_ where id=m1) as slug,extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday%s from repo_n where cid=1 and flag=1 and m1=%s and id!=%s) as t1,(select id as uid,cid as typeid,title as name,t2 as profile,img1 as icon from repo_n where qid=2 and flag=1) as t2 where t1.d2=t2.uid order by relativetime limit 4 offset 0",
$uid!=""?sprintf(",(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark",$uid):"",$f["m1"],$f["id"]);
$o->query($sql);

$s["related_articles"]=array();
$n=0;

while($f=$o->fetch_array()){

	$s["related_articles"][$n]["id"]=(int)$f["id"];
	$s["related_articles"][$n]["date"]=$f["isotime"];
	$s["related_articles"][$n]["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
	$s["related_articles"][$n]["title"]=mod_HTML($f["title"]);
	$s["related_articles"][$n]["description"]=get_summary($f["b1"],$f["body"]);
	$s["related_articles"][$n]["category"]["label"]=$f["category"];
	$s["related_articles"][$n]["category"]["slug"]=$f["slug"]; 
	$s["related_articles"][$n]["url"]=sprintf("%s/%s/%s",$domain,"p",$f["id"]);
	$s["related_articles"][$n]["is_bookmarked"]=strlen($f["is_bookmark"])>0?true:false;
	$s["related_articles"][$n]["media_type"]=strlen($f["video"])>0||strlen($f["youtube"])>0?"video":"image";

	$s["related_articles"][$n]["media"]["images"]["thumbnail"]=strlen($f["img1"])>0?sprintf("%s/prg_img/thumbnail2/%s",$domain,$f["img1"]):"";
	$s["related_articles"][$n]["media"]["images"]["medium"]=strlen($f["img1"])>0?sprintf("%s/prg_img/thumbnail1/%s",$domain,$f["img1"]):"";
	$s["related_articles"][$n]["media"]["images"]["large"]=strlen($f["img1"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["img1"]):"";
	$s["related_articles"][$n]["media"]["images"]["original"]=strlen($f["img1"])>0?sprintf("%s/prg_img/raw/%s",$domain,$f["img1"]):"";
	$s["related_articles"][$n]["media"]["images"]["caption"]=checkstr($f["t1"],1);
	
	$s["related_articles"][$n]["media"]["video"]["url"]=strlen($f["video"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["video"]):"";
	$s["related_articles"][$n]["media"]["video"]["caption"]=checkstr($f["videocaption"],1);
	$s["related_articles"][$n]["media"]["youtube"]=checkstr($f["youtube"],1);

	$s["related_articles"][$n]["user"]["id"]=(int)$f["uid"];
	$s["related_articles"][$n]["user"]["name"]=mod_HTML($f["name"]);
	$s["related_articles"][$n]["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon"]):"";
	$s["related_articles"][$n]["user"]["bio"]==checkstr($f["profile"]);
	$s["related_articles"][$n]["user"]["url"]=sprintf("%s/mypage/%s",$domain);
	
	$s["related_articles"][$n]["user"]["type"]["id"]=(int)$f["typeid"];
	$s["related_articles"][$n]["user"]["type"]["label"]=$f["type"];
	
	$n++;
	
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