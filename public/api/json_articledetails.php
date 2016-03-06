<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();
$id=$_REQUEST["id"];

//ランキング
$o->query(sprintf("insert into u_view(pageid,regitime) values(%s,now());",$id));

$sql=sprintf("select * from %s",sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",sprintf(" and id=%s",$id)));
$o->query($sql);
$f=$o->fetch_array();

$s["id"]=(int)$f["id"];
$s["date"]=$f["isotime"];
$s["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
$s["title"]=mod_HTML($f["title"]);
$s["description"]=get_summary($f["b1"],$f["body"]);
$s["body"]=preg_replace("/\n/","",$f["body"]);
$s["body_escape"]=stripbr($f["body"]);
$s["category"]["label"]=$f["category"]; 
$s["category"]["slug"]=$f["slug"]; 
$s["category2"]["label"]=$f["category2"]; 
$s["category2"]["slug"]=$f["slug2"]; 

$s["categories"][0]["label"]=$f["category"]; 
$s["categories"][0]["slug"]=$f["slug"];
if(strlen($f["category2"])>0){
	$s["categories"][1]["label"]=$f["category2"]; 
	$s["categories"][1]["slug"]=$f["slug2"]; 
}
$s["url"]=sprintf("%s/%s/%s",$domain,"p",$f["id"]);
$s["is_bookmarked"]=strlen($f["is_bookmark"])>0?true:false;

$video=get_videotype($f["video"],$f["youtube"],$f["facebook"]);
$s["media_type"]=strlen($video)>0?"video":"image";
$s["media"]["images"]["thumbnail"]=strlen($f["img1"])>0?sprintf("%s/prg_img/thumbnail2/%s",$ImgPath,$f["img1"]):"";
$s["media"]["images"]["medium"]=strlen($f["img1"])>0?sprintf("%s/prg_img/thumbnail1/%s",$ImgPath,$f["img1"]):"";
$s["media"]["images"]["large"]=strlen($f["img1"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["img1"]):"";
$s["media"]["images"]["original"]=strlen($f["img1"])>0?sprintf("%s/prg_img/raw/%s",$ImgPath,$f["img1"]):"";
$s["media"]["images"]["caption"]=checkstr($f["t1"],1);

$s["media"]["video"]["player"]=$video;
$s["media"]["video"]["url"]=strlen($f["video"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["video"]):"";
$s["media"]["video"]["youtube"]=checkstr($f["youtube"],1);
$s["media"]["video"]["facebook"]=checkstr($f["facebook"],1);
$s["media"]["video"]["caption"]=checkstr($f["videocaption"],1);

$s["user"]["id"]=(int)$f["uid"];
$s["user"]["name"]=mod_HTML($f["name"]);
$s["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
$s["user"]["bio"]==checkstr($f["profile"]);
$s["user"]["url"]=sprintf("%s/mypage/",$domain);

$s["user"]["type"]["id"]=(int)$f["typeid"];
$s["user"]["type"]["label"]=$f["type"];

$s["keywords"]=array();
for($i=10;$i<=14;$i++){
	if(strlen($f["t".$i])>0)$s["keywords"][]=$f["t".$i];
}

$sql=sprintf("select * from %s order by relativetime limit 4 offset 0",
sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",sprintf(" and m1=%s and id!=%s",$f["m1"],$f["id"])));

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
	$s["related_articles"][$n]["category2"]["label"]=$f["category2"];
	$s["related_articles"][$n]["category2"]["slug"]=$f["slug2"]; 
	$s["related_articles"][$n]["url"]=sprintf("%s/%s/%s",$domain,"p",$f["id"]);
	$s["related_articles"][$n]["is_bookmarked"]=strlen($f["is_bookmark"])>0?true:false;
	
	$video=get_videotype($f["video"],$f["youtube"],$f["facebook"]);
	$s["related_articles"][$n]["media_type"]=strlen($video)>0?"video":"image";
	$s["related_articles"][$n]["media"]["images"]["thumbnail"]=strlen($f["img1"])>0?sprintf("%s/prg_img/thumbnail2/%s",$ImgPath,$f["img1"]):"";
	$s["related_articles"][$n]["media"]["images"]["medium"]=strlen($f["img1"])>0?sprintf("%s/prg_img/thumbnail1/%s",$ImgPath,$f["img1"]):"";
	$s["related_articles"][$n]["media"]["images"]["large"]=strlen($f["img1"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["img1"]):"";
	$s["related_articles"][$n]["media"]["images"]["original"]=strlen($f["img1"])>0?sprintf("%s/prg_img/raw/%s",$ImgPath,$f["img1"]):"";
	$s["related_articles"][$n]["media"]["images"]["caption"]=checkstr($f["t1"],1);
	
	$s["related_articles"][$n]["media"]["video"]["player"]=$video;
	$s["related_articles"][$n]["media"]["video"]["url"]=strlen($f["video"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["video"]):"";
	$s["related_articles"][$n]["media"]["video"]["youtube"]=checkstr($f["youtube"],1);
	$s["related_articles"][$n]["media"]["video"]["facebook"]=checkstr($f["facebook"],1);
	$s["related_articles"][$n]["media"]["video"]["caption"]=checkstr($f["videocaption"],1);

	$s["related_articles"][$n]["user"]["id"]=(int)$f["uid"];
	$s["related_articles"][$n]["user"]["name"]=mod_HTML($f["name"]);
	$s["related_articles"][$n]["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
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