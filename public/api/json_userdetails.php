<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();


$sql=sprintf("select id as uid,t1 as email,cid as typeid,(select name from repo where id=repo_n.cid) as type,title as name,t2 as profile,img1 as icon from repo_n where id=%s",!$_REQUEST["userid"]?$uid:$_REQUEST["userid"]);
$o->query($sql);
$f=$o->fetch_array();

$s["id"]=(int)$f["uid"];
$s["name"]=mod_HTML($f["name"]);
$s["email"]=mod_HTML($f["email"]);
$s["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
$s["bio"]=checkstr($f["profile"]);
$s["url"]=sprintf("%s/mypage/",$domain,$f["uid"]);

$s["type"]["id"]=(int)$f["typeid"];
$s["type"]["label"]=$f["type"];

$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,name_e from pm_ where cid=20) as t2 where t1.categoryid=t2.id order by id",!$_REQUEST["userid"]?$uid:$_REQUEST["userid"]);
$o->query($sql);

$n=0;
while($f=$o->fetch_array()){
	$s["interest"][$n]["id"]=$f["id"];
	$s["interest"][$n]["slug"]=$f["name_e"];
	$s["interest"][$n]["label"]=$f["name"];
	$n++;
}

$y=array();

$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";
$y["response"]=$s;


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>