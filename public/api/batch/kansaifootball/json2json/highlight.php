<?php

include "local.php";
include "../inc.php";

$o=new db;
$o->connect();

$json=sprintf("%s/highlight.json",$bucket);

$i=0;
$sql=sprintf("select id,swf,img1,title,u_time from repo_n where flag=1 and swf like 'kfoot%s%s' order by u_time desc",$season,"%");
$o->query($sql);
while($f=$o->fetch_array()){
	preg_match("/([0-9]{8}_[0-9]{1})/",$f["swf"],$match);
	$movie[$match[1]]=array(
		"title"=>$f["title"],
		"movie"=>sprintf("https://sportsbull.jp/p/%s/",$f["id"]),
		"img"=>sprintf("https://img.sportsbull.jp/thumbnail1/%s",$f["img1"]),
		"lastupdate"=>date("Y-m-d H:i:s",strtotime($f["u_time"]))
	);
	if($i==0)$lastupdate=date("Y-m-d H:i:s",strtotime($f["u_time"]));
	$i++;
}

$y["lastupdate"]=$lastupdate?$lastupdate:date("Y-m-d H:i:s");
$y["movie"]=$movie?$movie:(object)array();

$is_update=0;
if(!file_exists($json)){
	$is_update=1;
}else{
	$d=get_contents($json);
	$d=json_decode($d,true);
	if(strtotime($d["lastupdate"])<strtotime($lastupdate)){
		$is_update=1;
	}
}

if($is_update==1){
	$y=json_encode($y,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
	file_put_contents($json,$y);
}

?>