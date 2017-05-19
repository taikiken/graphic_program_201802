<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$field=array("id","title","img1","a1","a2","a3","a4","a5","flag","u_time");
$n=0;

$sql="select id,title||'('||(select title from u_media where id=repo_n.d2)||')' as title,img1,a1,a2,a3,a4,a5,flag,u_time from repo_n where m1=114 or m2=114";
$o->query($sql);
while($f=$o->fetch_array()){
	for($i=0;$i<count($field);$i++){
		$p[$n][$field[$i]]=$f[$field[$i]];
	}
	$n++;
}

echo serialize($p);

?>