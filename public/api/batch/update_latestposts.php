<?php

/* 10分おきに集計 */

include $INCLUDEPATH."local.php";
	
$o=new db;
$o->connect();

$sql="select id from pm_ where cid=20";
$o->query($sql);
while($f=$o->fetch_array()){
	$s[]=sprintf("update u_latestpost set pageid=t.id from (select m1,id from repo_n where (m1=%s or m2=%s) and m_time > now() - interval '10 day' and flag=1 order by m_time desc limit 1 offset 0) as t where u_latestpost.m1=t.m1;",$f["id"],$f["id"]);
}

$s=implode("\n",$s);
$o->query($s);

?>