<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$f=set_user($uid,'');

if($y["status"]["code"]===200){
	
	$category=array();
	$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,name_e from u_categories) as t2 where t1.categoryid=t2.id order by id",$f["userid"]);
	$o->query($sql);
	
	$n=0;
	while($p=$o->fetch_array()){
		$category[$n]["id"]=(int)$p["id"];
		$category[$n]["slug"]=$p["name_e"];
		$category[$n]["label"]=$p["name"];
		$n++;
	}
	$f["interest"]=$category;
	$s=set_userinfo($f,1);

}else{
	
	if(preg_match("/com\.limret\.undotsushin/",$_SERVER['HTTP_USER_AGENT'])){
	
		$y["status"]["code"]=200;
		$y["status"]["message_type"]="error";
		$y["status"]["user_message"]="ユーザが指定されておりません。";
		$y["status"]["developer_message"]="ユーザIDが取得できない。";
		
		$empty["id"]="";
		$empty["name"]="";
		$empty["email"]="";
		$empty["profile_picture"]="http://dev.undotsushin.com/users/img/icon_noimg.png";
		$empty["bio"]="";
		$empty["url"]="";
		$empty["type"]=(object)array();
		$empty["interest"]=array();
	
		$s=$empty;
		
	}else{
		$s=(object)$s;
	}
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>