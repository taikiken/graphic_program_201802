<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."tool.php";

$o=new db;
$o->connect();

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$ermsg=array();
$s="";
	
$email=trim($_POST["email"]);
$emailcheck=check_email($email);
if($emailcheck==""){
	$sv[$sn[]="t1"]=$email;
}else{
	$ermsg["email"]=$emailcheck;
}

$passwd=trim($_POST["password"]);
$passwdcheck=check_passwd($passwd);
if($passwdcheck==""){
	$access_token=md5($email.$passwd);
	$sv[$sn[]="a15"]=$access_token;
	$sv[$sn[]="passwd"]=md5($MAGIC_STRING.$passwd);	
}else{
	$ermsg["password"]=$passwdcheck;
}

$name=trim($_POST["name"]);
if(strlen($name)>0){
	$sv[$sn[]="title"]=$name;
}else{
	$ermsg["name"]="名前は必須項目です。";
}

if(count($ermsg)>0){

	$y["status"]["code"]=500;
	$y["status"]["user_message"]="入力内容が間違っています。";
	$y["status"]["developer_message"]="リクエストデータに不正値がある";
	
	while(list($k,$v)=each($ermsg)){
		$s["errors"][][$k]=$v;
	}

}else{
	
	$bio=trim($_POST["bio"]);
	$sv[$sn[]="t2"]=$bio;

	if($_FILES){
		$ext=checkFileType($_FILES["profile_picture"]);
		$filename=sprintf("%s.%s",md5("ut".$email),$ext);
		if(move_uploaded_file($_FILES["profile_picture"]["tmp_name"],$SERVERPATH."/prg_img/raw/".$filename)){
			imgDresize($SERVERPATH."/prg_img/raw/".$filename,$SERVERPATH."/prg_img/img/".$filename,array($SIZE,$SIZE),$ext,"","","","");
			$sv[$sn[]="img1"]=$filename;
		}else{
			$ermsg[]="ファイルのアップロードに失敗しました。";
		}
	}
	
	if(count($_POST["interest"])>0){
		$sv[$sn[]="t20"]=implode(",",$_POST["interest"]);
		$interest=$_POST["interest"];
	}
	
	while(list($k,$v)=each($sv)){
		$v=stripslashes($v);
		$v=addslashes($v);
		$v=str_replace("\'","''",$v);
		$v=preg_replace("/(\r\n|\r)/","\n",$v);
		$sv[$k]=sprintf("'%s'",$v);
	}
	
	$sv[$sn[]="m_time"]="now()";
	$sv[$sn[]="u_time"]="now()";
	$sv[$sn[]="flag"]="1";
	$sv[$sn[]="qid"]="2";
	$sv[$sn[]="cid"]="6";
	$sv[$sn[]="n"]="(select max(n)+1 from repo_n where cid=6 and qid=2)";
	
	$o->query("begin");
	
	$sql=sprintf("insert into repo_n(%s) values(%s);",implode(",",$sn),implode(",",$sv));
	$o->query($sql);
	
	$e=$o->affected_rows2();
	
	if($e){
		
		$sql=sprintf("select id from repo_n where t1='%s'",$email);
		$o->query($sql);
		$f=$o->fetch_array();
		$ID=$f["id"];
		
		for($i=0;$i<count($interest);$i++){
			$sl[]=sprintf("insert into u_category(categoryid,userid,flag,regitime) values(%s,%s,1,now());",$interest[$i],$ID);
		}
		$sl=implode("\n",$sl);
		$o->query($sl);
		
		$e=$o->affected_rows2();
		
		if($e){
			
			$o->query("commit");
			
			$sql=sprintf("select name from pm_ where id in (%s) and flag=1 order by n",implode(",",$interest));
			$o->query($sql);
			while($f=$o->fetch_array()){
				$interestcategory[]=$f["name"];
			}
			
			$s["id"]=$ID;
			$s["name"]=$name;
			$s["profile_picture"]=sprintf("%s/prg_img/img/%s",$domain,$filename);
			$s["bio"]=$bio;
			$s["url"]=sprintf("%s/mypage/",$domain,$ID);
			$s["type"]["id"]=6;
			$s["type"]["label"]="一般ユーザ";
			$s["interest"]["category"]=$interestcategory;
			$s["access_token"]=$access_token;
			$s["session_token"]="";
			
			
		}else{
			$o->query("abort");
			$y["status"]["code"]=500;
			$y["status"]["user_message"]="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
			$y["status"]["developer_message"]="データベースへの接続に失敗しました。";
		}
	}else{
		$o->query("abort");
		$y["status"]["code"]=500;
		$y["status"]["user_message"]="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
		$y["status"]["developer_message"]="データベースへの接続に失敗しました。";
	}
}


$y["response"]=$s;


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>