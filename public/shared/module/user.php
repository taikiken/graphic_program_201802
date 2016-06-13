<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql=sprintf("select t1,title,img1,t2 from u_member where a15='%s'",$_POST["token"]);
$o->query($sql);

$f=$o->fetch_array();

$s["name"]=$f["title"];
$s["email"]=$f["t1"];
$s["bio"]=$f["t2"];
$s["profile_picture"]=$f["img1"];

header('Content-Type: application/json; charset=utf-8');
echo json_encode($s);

?>