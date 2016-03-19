<?php

include $INCLUDEPATH."local.php";
include "public/check.php";

$o=new db;
$o->connect();

$f=set_login($_REQUEST["email"],$_REQUEST["password"]);

if($y["status"]["code"]===200){

	if(strlen($f["t20"])>0){
		$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,n from pm_ where cid=20 and flag=1) as t2 where t1.categoryid=t2.id order by n;",$f["id"]);
		$o->query($sql);
		while($e=$o->fetch_array()){
			$interestcategory[]=$e["name"];
		}
	}else{
		$interestcategory=array();
	}
	
	$s["id"]=$f["id"];
	$s["name"]=$f["title"];
	$s["profile_picture"]=sprintf("%s/prg_img/img/%s",$ImgPath,$f["img1"]);
	$s["bio"]=$f["t2"];
	$s["url"]=sprintf("%s/mypage/",$domain);
	$s["type"]["id"]=$f["cid"];
	$s["type"]["label"]=$f["label"];
	$s["interest"]["category"]=$interestcategory;
	$s["access_token"]=$f["a15"];
	$s["session_token"]="";
	
}else{
	$s=(object)$s;
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>