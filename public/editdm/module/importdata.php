<?php

header("Content-Type:text/html; charset=UTF-8");

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$s=$_POST["s"];
$o->query($s);

while($f=$o->fetch_array()){
	$p[]=sprintf("<li>%s:%s</li>",$f["id"],$f["title"]);
}

header("Content-Type:text/html;charset=utf-8");
echo sprintf("{n:%s,d:'%s'}",count($p),@implode("",$p));

?>