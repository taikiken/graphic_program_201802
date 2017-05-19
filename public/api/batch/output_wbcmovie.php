<?php

include $INCLUDEPATH."local.php";
	
$o=new db;
$o->connect();

$sql="select id,swf,u_time from repo_n where swf like 'wbc2017%' or swf like 'WBC2017%' order by u_time desc;";
$o->query($sql);
$i=0;
while($f=$o->fetch_array()){
	if($i==0)$update=$f["u_time"];
	preg_match("/wbc2017_([0-9]+)_/i",$f["swf"],$r);
	if($r[1])$s[$r[1]]=$f["id"];
	$i++;
}

$y["response"]["lastupdate"]=strtotime($update);
$y["response"]["movie"]=$s;

print_json($y,"");

?>