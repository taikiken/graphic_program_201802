<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."tool.php";

$o=new db;
$o->connect();

$uid=auth();

$s=array();
$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="会員情報を更新しました。";
$y["status"]["message_type"]="success";
$y["status"]["developer_message"]="";

if($_SERVER["REQUEST_METHOD"]=="POST"){
	
	if(strlen($uid)>0){
	
		$email=trim($_POST["email"]);
		$emailcheck=check_email($email,1);
		if($emailcheck==""){
			$sv[$sn[]="t1"]=$email;
		}else{
			$ermsg["email"]=$emailcheck;
		}
		
		$passwd=trim($_POST["password"]);
		if(strlen($passwd)>0){
			$passwdcheck=check_passwd($passwd);
			if($passwdcheck==""){
				$access_token=md5($email.$passwd);
				$sv[$sn[]="a15"]=$access_token;
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
		
			$ext=checkFileType($_FILES["profile_picture"]);
			$filename=sprintf("%s.%s",md5("ut".$email),$ext);
			if(move_uploaded_file($_FILES["profile_picture"]["tmp_name"],$SERVERPATH."/prg_img/raw/".$filename)){
				imgDresize($SERVERPATH."/prg_img/raw/".$filename,$SERVERPATH."/prg_img/img/".$filename,array($SIZE,$SIZE),$ext,"","","","");
				$sv[$sn[]="img1"]=$filename;
			}else{
				$ermsg["profile_picture"]="ファイルのアップロードに失敗しました。";
			}
		}
	
		if(count($ermsg)>0){
		
			$y["status"]["code"]=400;
			$y["status"]["user_message"]="入力内容が間違っています。";
			$y["status"]["message_type"]="error";
			$y["status"]["developer_message"]="リクエストデータに不正値がある";
			
			while(list($k,$v)=each($ermsg)){
				$s["errors"][][$k]=$v;
			}
		
		}else{
					
			$bio=trim($_POST["bio"]);
			$sv[$sn[]="t2"]=$bio;
		
			$q=array();	
			while(list($k,$v)=each($sv)){
				$v=stripslashes($v);
				$v=str_replace("―","-",$v);
				$v=addslashes($v);
				$v=str_replace("\'","''",$v);
				$v=str_replace(array("\r\n","\r"),"\n",$v);
				$q[]=sprintf("%s='%s'",$k,$v);
			}
			
			if(count($q)>0){
				
				$sql=sprintf("update repo_n set %s where id=%s",implode(",",$q),$uid);
				
				$o->query($sql);
				$e=$o->affected_rows2();
				
				if(!$e){
					$y["status"]["code"]=500;
					$y["status"]["user_message"]="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
					$y["status"]["message_type"]="error";
				}
			}else{
				$y["status"]["code"]=400;
				$y["status"]["user_message"]="変更箇所はありませんでした。";
				$y["status"]["message_type"]="error";
			}
		}
	}else{
		$y["status"]["code"]=400;
		$y["status"]["user_message"]="ユーザが存在しません。";
		$y["status"]["message_type"]="error";
	}
}

if(count($s)==0){

	$sql=sprintf("select id as uid,t1 as email,cid as typeid,(select name from repo where id=repo_n.cid) as type,title as name,t2 as profile,img1 as icon from repo_n where id=%s",$uid);
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
}

$y["response"]=$s;


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>