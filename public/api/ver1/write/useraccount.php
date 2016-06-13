<?php

include "local.php";
include "tool.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();

set_useraccount($uid);
$ermsg=array();

if($_SERVER["REQUEST_METHOD"]=="POST"){
	
	$email=trim($_POST["email"]);
	$emailcheck=check_email($email,$uid);
	if($emailcheck==""){
		$sv[$sn[]="t1"]=$email;
	}else{
		$ermsg["email"]=$emailcheck;
	}
	
	$passwd=trim($_POST["password"]);
	if(strlen($passwd)>0){
		$passwdcheck=check_passwd($passwd);
		if($passwdcheck==""){
			$sv[$sn[]="passwd"]=md5($MAGIC_STRING.$passwd);	
		}else{
			$ermsg["password"]=$passwdcheck;
		}
	}
	
	$name=trim($_POST["name"]);
	if(strlen($name)>0){
		$sv[$sn[]="title"]=$name;
	}else{
		$ermsg["name"]="名前は必須項目です。";
	}

	if(strlen($_FILES["profile_picture"]["tmp_name"])>0){
		
		if(preg_match("/image\/(gif|jpeg|png)/i",$_FILES["profile_picture"]["type"])){
		
			$ext=checkFileType($_FILES["profile_picture"]);
			$filename=sprintf("%s.%s",md5("ut".$email),$ext);
			if(move_uploaded_file($_FILES["profile_picture"]["tmp_name"],$USERS."/raw/".$filename)){
				
				imgDresize($USERS."/raw/".$filename,$USERS."/img/".$filename,array($SIZE,$SIZE),$ext,"","","","");
				$sv[$sn[]="img1"]=$filename;
			}else{
				$ermsg["profile_picture"]="ファイルのアップロードに失敗しました。";
			}
		}else{
			$ermsg["profile_picture"]="使用できる画像はJPG, PNG, GIFファイルのみになります。";
		}
	}

	if(count($ermsg)>0){
		set_status(array("code"=>400,"message_type"=>"error","user_message"=>"入力内容が間違っています。","developer_message"=>"リクエストデータに不正値がある"));
		while(list($k,$v)=each($ermsg))$s["errors"][][$k]=$v;
		
	}else{
				
		$bio=trim($_POST["bio"]);
		$sv[$sn[]="t2"]=$bio;
	
		$q=array();	
		while(list($k,$v)=each($sv)){
			$v=stripslashes($v);
			$v=str_replace("―","-",$v);
			$v=str_replace(array("\r\n","\r"),"\n",$v);
			$v=bind($v);
			$q[]=sprintf("%s='%s'",$k,$v);
		}
		
		if(count($q)>0){
			
			$sql=sprintf("update u_member set %s where id=%s;",implode(",",$q),$uid);
			$o->query($sql);
			$e=$o->affected_rows2();
			
			if($e){
				set_status(array("user_message"=>"会員情報を更新しました。"));
			}else{
				set_servererror();
			}
		}else{
			set_status(array("user_message"=>"変更箇所はありませんでした。"));
		}
	}
}

if(count($s)==0){

	$sql=sprintf("select id as userid,t1 as email,cid as typeid,(select name from repo where id=u_member.cid) as type,title as name,t2 as profile,img1 as icon from u_member where id=%s",$uid);
	$o->query($sql);
	$f=$o->fetch_array();

	$s=set_userinfo($f,0);
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>