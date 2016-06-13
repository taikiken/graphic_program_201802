<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$s=trim($_POST["s"]);
$s=str_replace(array("＞","＜"),array(">","<"),$s);
$o->query($s);

while($f=$o->fetch_array()){
	$p[]=sprintf("<li>%s:%s</li>",$f["id"],$f["title"]);
}

$y["n"]=count($p);
$y["d"]=@implode("",$p);

header('Content-Type: application/json; charset=utf-8');
echo json_encode($y,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

?>