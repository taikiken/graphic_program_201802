<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

$sql="select id,name,yobi from pm_ where cid=20 and flag=1 and id<130 and name!='その他競技' order by id desc";
$o->query($sql);
while($f=$o->fetch_array()){
	$s=strlen($f["yobi"])>0?@explode(",",$f["yobi"]):array();
	$s[]=$f["name"];
	$r[]=array($f["id"],$s,$f["name"]);
	$R[]=$f["name"];
}

function categorymatching($r,$k){
	
	$exword=$r;
	$exword[]="スポーツ";
	$exword[]="一般スポーツ";
	$exword[]="その他";
	$exword[]="ニュース";
	$exword[]="国内・海外・その他";
	$exword[]="格闘技";
	$exword[]="陸上";
	$exword[]="ウインタースポーツ";
	
	$k=explode(",",$k);
	$w=array();
	
	for($i=0;$i<count($k);$i++){
		$d=trim($k[$i]);
		if(strlen($d)>0){
			$w[]=$d;
			for($j=0;$j<count($exword);$j++){
				if($d==$exword[$j]){
					array_pop($w);
					break;
				}
			}
		}
	}
	
	return $w;
	
}

$sql="select id,keyword from repo_n where cid=1";
$o->query($sql);
while($f=$o->fetch_array()){
	unset($tags);
	$tag=categorymatching($R,$f["keyword"]);
	if(count($tag)>0){
		for($i=0;$i<count($tag);$i++){
			$tags[]=sprintf("t1%s='%s'",$i,esc($tag[$i]));
		}
		$tx[]=sprintf("update repo_n set %s where id=%s;",implode(",",$tags),$f["id"]);
	}
}

$tx=implode("\n",$tx);
$o->query($tx);

?>