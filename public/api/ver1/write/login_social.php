<?php

include $INCLUDEPATH."local.php";
include "public/check.php";

$o=new db;
$o->connect();

if($_SERVER["REQUEST_METHOD"]=="GET"){
	
	/*Web*/
	$id=bind($_SESSION["usersinfo"]["id"]);
	$token=bind($_SESSION["usersinfo"]["token"]);
	$service=bind($_SESSION["usersinfo"]["service"]);
	$name=$_SESSION["usersinfo"]["name"];
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
b3: Twitter ID
b4: Twitter Token

*/

$field="";
if($service=="facebook"){
	$field=1;
}elseif($service=="twitter"){
	$field=3;
}

set_social($field,$id,$token);

if($y["status"]["code"]===200){
	
	$sql=sprintf("select id,cid,t20,(select name from repo where id=cid) as label,title,t1,t2,img1,a15,b2,b4 from repo_n where qid=2 and flag=1 and b%s='%s' order by id desc limit 1 offset 0",$field,$id);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		
		if($token!=$f["b".($field+1)]){
			$sql=sprintf("update repo_n set b%s='%s' where id=%s",($field+1),$token,$f["id"]);
			$o->query($sql);
		}
		if(strlen($f["t20"])>0){
			$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,n from pm_ where cid=20 and flag=1) as t2 where t1.categoryid=t2.id order by n",$f["id"]);
			$o->query($sql);
			while($e=$o->fetch_array()){
				$interestcategory[]=$e["name"];
			}
		}else{
			$interestcategory=array();
		}
		
		$s["id"]=$f["id"];
		$s["name"]=$f["title"];
		$s["email"]=$f["t1"];
		$s["profile_picture"]=sprintf("%s/prg_img/img/%s",$ImgPath,$f["img1"]);
		$s["bio"]=$f["t2"];
		$s["url"]=sprintf("%s/mypage/",$domain);
		$s["type"]["id"]=$f["cid"];
		$s["type"]["label"]=$f["label"];
		$s["interest"]["category"]=$interestcategory;
		$s["access_token"]=$f["a15"];
		$s["session_token"]="";
		
	}else{
		
		if($_SERVER["REQUEST_METHOD"]=="GET"){
			$y["status"]["user_message"]="ユーザ情報を取得しました。";
			$s["id"]="";
			$s["name"]=$name;
			$s["email"]=$email;
			$s["profile_picture"]=$profile_picture;
			$s["bio"]=$bio;
			$s["url"]="";
			$s["type"]["id"]="";
			$s["type"]["label"]="";
			$s["interest"]["category"]="";
			$s["access_token"]="";
			$s["session_token"]="";
		}else{
			$y["status"]["user_message"]="";
			$s=(object)$s;
		}
	}			
}else{
	$s=(object)$s;
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>