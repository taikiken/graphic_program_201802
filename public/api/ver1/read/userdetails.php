<?php

include $INCLUDEPATH."local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$f=set_user($uid,$_REQUEST["userid"]);

if($y["status"]["code"]===200){

	$s["id"]=(int)$f["uid"];
	$s["name"]=mod_HTML($f["name"]);
	$s["email"]=mod_HTML($f["email"]);
	$s["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
	$s["bio"]=checkstr($f["profile"]);
	$s["url"]=sprintf("%s/mypage/",$domain,$f["uid"]);
	$s["type"]["id"]=(int)$f["typeid"];
	$s["type"]["label"]=$f["type"];
	
	$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,name_e from pm_ where cid=20) as t2 where t1.categoryid=t2.id order by id",$f["uid"]);
	$o->query($sql);
	
	$n=0;
	while($f=$o->fetch_array()){
		$s["interest"][$n]["id"]=$f["id"];
		$s["interest"][$n]["slug"]=$f["name_e"];
		$s["interest"][$n]["label"]=$f["name"];
		$n++;
	}

}else{
	$s=(object)$s;
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>