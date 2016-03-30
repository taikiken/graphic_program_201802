<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();
$sql="select id,name,name_e,img from pm_ where cid=20 and flag=1 order by n";

$o->query($sql);
while($f=$o->fetch_array()){
	$s[]=set_categoryinfo($f);
}

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]["count"]=count($s);
$y["response"]["categories"]=$s;

$fp=fopen("../ver1/static/category.xml","w");
fputs($fp,json_encode($y));
fclose($fp);

?>