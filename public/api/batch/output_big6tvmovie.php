<?php

$season=$_GET["target"];

include $INCLUDEPATH."local.php";
	
$o=new db;
$o->connect();

$s=array();

$sql=sprintf("select id,swf,u_time from repo_n where swf like 'big6tv%s_%s' and flag=1 order by u_time desc;",$season,"%");
$o->query($sql);
$i=0;
while($f=$o->fetch_array()){
	if($i==0)$update=$f["u_time"];
	preg_match("/big6tv".$season."_([0-9]+)_/i",$f["swf"],$r);
	if($r[1])$s[$r[1]]=$f["id"];
	$i++;
}

$y["response"]["movie"]=$s;

print_json($y,"");

?>