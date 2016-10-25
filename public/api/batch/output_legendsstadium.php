<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$field=array("id","title","img1","a1","a2","a3","a4","a5","flag","u_time");
$n=0;

$sql=sprintf("select %s from repo_n where d2=28",implode(",",$field));
$o->query($sql);
while($f=$o->fetch_array()){
	for($i=0;$i<count($field);$i++){
		$p[$n][$field[$i]]=$f[$field[$i]];
	}
	$n++;
}

echo serialize($p);

?>