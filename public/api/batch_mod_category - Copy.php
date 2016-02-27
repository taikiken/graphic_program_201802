<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

function categorysearch($r,$k){
	for($i=0;$i<count($r);$i++){
		for($j=0;$j<count($r[$i][1]);$j++){
			if(preg_match("/".$r[$i][1][$j]."/",$k))$x=$r[$i][0];
		}
	}
	return $x;
}

$sql="select id,name,yobi from pm_ where cid=20 and flag=1 and id<130 and name!='その他競技' order by id desc";
$o->query($sql);
while($f=$o->fetch_array()){
	$s=strlen($f["yobi"])>0?@explode(",",$f["yobi"]):array();
	$s[]=$f["name"];
	$r[]=array($f["id"],$s,$f["name"]);
}

$sql="select id,title,body from repo_n where m1=129";
$o->query($sql);
while($f=$o->fetch_array()){
	
}

$o->query($tx);

?>