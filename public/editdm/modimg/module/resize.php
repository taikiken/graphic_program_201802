<?php

include $INCLUDEPATH."local.php";

$fp=fopen("./img.txt","a");
fputs($fp,sprintf("[%s,%s,%s,\"%s\"],\n",$_POST["rx"],$_POST["ry"],$_POST["rp"],$_POST["copyright"]));
fclose($fp);

echo "e=".imgFresize(
	$RAWIMG.$_POST["img"],
	$IMG[$_POST["flags"]].$_POST["img"],
	$_POST["w"],
	$_POST["h"],
	$_POST["rx"],
	$_POST["ry"],
	$_POST["orw"],
	$_POST["orh"],
	$_POST["copytype"],
	$_POST["copyright"],
	$_POST["thumno"],
	$_POST["thumpos"],
	$_POST["dRotation"],
	$_POST["rp"]
);

?>