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
}

$sql="select id,keyword from repo_n where cid=1";
$o->query($sql);
while($f=$o->fetch_array()){
	$tx[]=sprintf("update repo_n set m1=%s where id=%s;",categorysearch($r,$f["keyword"]),$f["id"]);
}

$tx=implode("\n",$tx);
echo $tx;

$o->query($tx);

?>