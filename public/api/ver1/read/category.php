<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$s=array();

$sql=sprintf("select id,name,title,img,description,name_e from u_categories where name_e='%s'",$_REQUEST["category"]);
$o->query($sql);
$category=$o->fetch_array();

$s["id"]=$category["id"];
$s["label"]=mod_HTML($category["name"]);
$s["slug"]=mod_HTML($category["name_e"]);
$s["url"]=sprintf("%s/%s/",$domain,$category["name_e"]);
$s["title_img"]=strlen($category["img"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$category["img"]):"";
$s["title"]=mod_HTML($category["title"]);
$s["description"]=mod_HTML($category["description"]);

$ad=get_advertise($s["id"]);
$ad_put=set_advertise($ad,"list");

$s=$s+$ad_put;

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]=$s;

print_json($y,$_SERVER['HTTP_REFERER']);

?>