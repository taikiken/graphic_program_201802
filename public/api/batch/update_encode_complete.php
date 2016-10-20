<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$id=bind($_GET["id"]);
$time=bind($_GET["time"]);
$media=bind($_GET["media"]);

$sql=sprintf("insert into u_encoded(filename,bucket,playtime,flag,u_time,m_time) values('%s','%s',%s,1,now(),now());",$id,$media,$time);
$o->query($sql);

if(!preg_match("/dev/",$servername)){
	get_contents(sprintf("https://dev.sportsbull.jp/api/batch/update_encode_complete.php?id=%s&time=%s&media=%s",$id,$time,$media));
}

?>