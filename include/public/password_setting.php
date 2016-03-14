<?php

$o=new db;
$o->connect();

$err="";
$err2="";
$complete=0;

if(isset($_GET["m"])){

	$hash=preg_replace('/\s/','',$_GET["m"]);
	$sql=sprintf("select userid,case when regitime > now() - interval '24 hour' then 1 else 0 end as expire from u_reminder where hash='%s';",$hash);
	$o->query($sql);
	$f=$o->fetch_array();

	$userid=$f["userid"];
	if(strlen($f["userid"])>0){
		if($f["expire"]==1){
			$sql=sprintf("select flag from repo_n where id=%s",$userid);
			$o->query($sql);
			$f=$o->fetch_array();
			if(strlen($f["flag"])>0){
				if($f["flag"]==0)$err="すでに退会されています。。";
			}else{
				$err="ユーザが存在しません。";
			}
		}else{
			$err="パスワードリセットの有効期限が過ぎています。";
		}
	}else{
		$err="指定されたURLは無効です。";
	}

}elseif(isset($_POST["setting-form-pw1"])){

	$userid=trim($_POST["userid"]);
	$hash=trim($_POST["hash"]);
	$passwd=trim($_POST["setting-form-pw1"]);
	$err2=check_passwd($passwd);

	if($err2==""){
		if($_POST["setting-form-pw1"]==$_POST["setting-form-pw2"]){

			include "conf/config.php";
			$pass=md5($MAGIC_STRING.$passwd);

			$sql=sprintf("update repo_n set passwd='%s' where id=%s",$pass,$userid);
			$o->query($sql);
			$e=$o->affected_rows2();

			if($e){
				$sql=sprintf("delete from u_reminder where hash='%s'",$hash);
				$o->query($sql);
				$e=$o->affected_rows2();
				if($e)$complete=1;
			}else{
				$err2="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
			}
		}else{
			$err2="パスワードが一致しません。";
		}
	}
}


?>