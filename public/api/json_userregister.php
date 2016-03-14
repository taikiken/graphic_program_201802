<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."tool.php";

$o=new db;
$o->connect();

$uid=auth();

function mailregister($email,$name){

	$to=$email;
	$subject="【運動通信】会員登録完了のお知らせ";
	$body=sprintf("%s様
	
	この度は、運動通信Crazy for sports www.undotsushin.com にご登録いただき、誠にありがとうございます。
	
	会員登録が完了しましたのでお知らせいたします。
	下記登録内容をご確認の上、大切に保管ください。
	
	[登録内容]
	メールアドレス： %s
	ユーザー名：　%s
	パスワード：　セキュリティ保持のため非公開
	
	※	パスワードを忘れた場合は、以下のURLから再登録をお願いいたします。
	https://www.undotsushin.com/reset_password/
	
	ご不明な点等ございましたら、以下の運動通信カスタマーセンターまでお問い合わせください。
	info@undotsushin.com
	
	※	当社コンテンツをご使用の際は、必ず下記の利用規約をお読みください。
	https://www.undotsushin.com/about/terms/
	
	[ご注意]
	こちらのメールアドレスは送信専用のため、直接返信されても返答できませんので予めご了承ください。",$name,$email,$name);
	$from="noreply@undotsushin.com";
	$reply="info@undotsushin.com";

	return sendmail($to,$subject,preg_replace("/\t/","",$body),$from,$reply);
	
}

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="会員登録が完了しました。";
$y["status"]["message_type"]="success";
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
	$sv[$sn[]="a15"]=md5($email);
	$sv[$sn[]="passwd"]=md5($MAGIC_STRING.$passwd);
	$access_token=$sv["a15"];
}else{
	$ermsg["password"]=$passwdcheck;
}

$name=trim($_POST["name"]);
if(strlen($name)>0){
	$sv[$sn[]="title"]=$name;
}else{
	$ermsg["name"]="名前は必須項目です。";
}

$facebookid=trim($_POST["facebook_id"]);
if(strlen($facebookid)>0){

	$sql=sprintf("select id from repo_n where qid=2 and flag=1 and b1='%s'",$facebookid);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		$ermsg["facebook_id"]="現在ログインいただいているFacebookアカウントはすでに登録されています。";
	}else{
		$sv[$sn[]="b1"]=$facebookid;
		$sv[$sn[]="b2"]=$_POST["facebook_token"];	
	}
}

$twitterid=trim($_POST["twitter_id"]);
if(strlen($twitterid)>0){

	$sql=sprintf("select id from repo_n where qid=2 and flag=1 and b3='%s'",$twitterid);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		$ermsg["twitter_id"]="現在ログインいただいているTwitterアカウントはすでに登録されています。";
	}else{
		$sv[$sn[]="b3"]=$twitterid;
		$sv[$sn[]="b4"]=$_POST["twitter_id"];	
	}
}

if(strlen($_FILES["profile_picture"]["tmp_name"])>0){

	$ext=checkFileType($_FILES["profile_picture"]);
	$filename=sprintf("%s.%s",md5("ut".$email),$ext);
	$SERVERPATH=str_replace(array("/dev/","/stg/"),"/www/",$SERVERPATH);
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
	
	if($_POST["create"]!="false"){
		
		$bio=trim($_POST["bio"]);
		if(strlen($bio)>0){
			$sv[$sn[]="t2"]=$bio;
		}
		if(is_string($_POST["interest"])){
			if(strlen($_POST["interest"])>0){
				$_POST["interest"]=@explode(",",$_POST["interest"]);
			}else{
				$_POST["interest"]=array();
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
			
			$sql=sprintf("select id from repo_n where qid=2 and flag=1 and t1='%s' ",$email);
			$o->query($sql);
			$f=$o->fetch_array();
			$ID=$f["id"];
			
			if(count($interest)>0){
				for($i=0;$i<count($interest);$i++){
					$sl[]=sprintf("insert into u_category(categoryid,userid,flag,regitime) values(%s,%s,1,now());",$interest[$i],$ID);
				}
				$sl=implode("\n",$sl);
				$o->query($sl);
				$e=$o->affected_rows2();
			}else{
				$e=1;
			}
			if($e){
				
				$o->query("commit");
				$e=mailregister($email,$name);
				
				$sql=sprintf("select name from pm_ where id in (%s) and flag=1 order by n",implode(",",$interest));
				$o->query($sql);
				while($f=$o->fetch_array()){
					$interestcategory[]=$f["name"];
				}
				
				$s["id"]=$ID;
				$s["name"]=$name;
				$s["email"]=$email;
				$s["profile_picture"]=strlen($filename)>0?sprintf("%s/prg_img/img/%s",$ImgPath,$filename):"";
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
				$y["status"]["message_type"]="error";
				$y["status"]["developer_message"]="データベースへの接続に失敗しました。";
			}
		}else{
			$o->query("abort");
			$y["status"]["code"]=500;
			$y["status"]["user_message"]="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
			$y["status"]["message_type"]="error";
			$y["status"]["developer_message"]="データベースへの接続に失敗しました。";
		}
	}else{
		$s=(object)array();
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