<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$id=bind($_REQUEST["id"]);
$f=set_article($id,$uid);


if($y["status"]["code"]===200){
	
	$s=set_articleinfo($f,1);
	
	//ランキングは外部処理にしたい
	wlog($ACLOGTXT,array(strlen($f["m1"])>0?$f["m1"]:0,strlen($f["m2"])>0?$f["m2"]:0,$id,$s["media_type"]=="image"?0:1,date("Y-m-d H:i:s",strtotime($f["m_time"])),date("Y-m-d H:i:s")));

	$s["keywords"]=array();
	for($i=10;$i<=14;$i++)if(strlen($f["t".$i])>0)$s["keywords"][]=$f["t".$i];
	
	$sql=sprintf("select * from %s",sprintf($articletable,set_isbookmark($uid),sprintf(" and m1=%s order by m_time desc limit 4 offset 0",$f["m1"])));
	$o->query($sql);
	while($f=$o->fetch_array()){
		$s["related_articles"][]=set_articleinfo($f,1);
	}
	
}else{
	$s=(object)$s;
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>