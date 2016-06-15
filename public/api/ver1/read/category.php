<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$sql=sprintf("select id,name,title,img,description,name_e from u_categories where name_e='%s' and flag=1",$_REQUEST["category"]);
$o->query($sql);
$f=$o->fetch_array();

$s=array();
$s=set_categoriesinfo($f);

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]=$s;

print_json($y,$_SERVER['HTTP_REFERER']);

?>