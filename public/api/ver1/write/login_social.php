<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

if($_SERVER["REQUEST_METHOD"]=="GET"){
	
	/*Web*/
	$id=bind($_SESSION["usersinfo"]["id"]);
	$token=bind($_SESSION["usersinfo"]["token"]);
	$service=bind($_SESSION["usersinfo"]["service"]);
	$name=bind($_SESSION["usersinfo"]["name"]);
	$screen_name=bind($_SESSION["usersinfo"]["screen_name"]);
	$email=$_SESSION["usersinfo"]["email"];
	$profile_picture=$_SESSION["usersinfo"]["profile_picture"];
	$bio=$_SESSION["usersinfo"]["bio"];
}else{
	
	/*App*/
	$id=bind($_POST["id"]);
	$token=bind($_POST["token"]);
	$service=bind($_POST["service"]);
}

/*

b1: Facebook ID
b2: Facebook Token
a1: Facebook Name
b3: Twitter ID
b4: Twitter Token
a3: Twitter ScreenName
*/

$field="";
if($service=="facebook"){
	$field=1;
}elseif($service=="twitter"){
	$field=3;
}

set_social($field,$id,$token);

if($y["status"]["code"]===200){
	
	$osql=sprintf("select id as userid,cid as typeid,t20,(select name from repo where id=cid) as type,title as name,t1 as email,t2 as profile,img1 as icon,a15 as token,b2,b4,a1,a3 from u_member where qid=2 and flag=1 and b%s='%s' order by id desc limit 1 offset 0",$field,$id);
	$o->query($osql);
	$f=$o->fetch_array();
	
	if(strlen($f["userid"])>0){
	
		$sql=sprintf("update u_member set b%s='%s'%s where id=%s;",($field+1),$token,strlen($screen_name)>0?sprintf(",a%s='%s'",$field,$screen_name):"",$f["id"]);
		$o->query($sql);
		
		$category=array();
		if(strlen($f["t20"])>0){
			$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,n from u_categories where flag=1) as t2 where t1.categoryid=t2.id order by n;",$f["userid"]);
			$o->query($sql);
			while($e=$o->fetch_array()){
				$category[]=$e["name"];
			}
		}
		$f["interest"]["category"]=$category;
		$y["status"]["user_message"]="ログインしました。";
		$s=set_userinfo($f,1);
		
	}else{
		
		if($_SERVER["REQUEST_METHOD"]=="GET"){
			
			$y["status"]["user_message"]="ユーザ情報を取得しました。";
			$f["name"]=$name;
			$f["email"]=$email;
			$f["icon"]=$profile_picture;
			$f["interest"]["category"]=array();
			$s=set_userinfo($f,1);
			
		}else{
			$y["status"]["code"]=404;
			$y["status"]["user_message"]=sprintf("%sでのユーザ登録がございません。",ucfirst($service));
			$s=(object)$s;
		}
	}
}else{
	$s=(object)$s;
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>