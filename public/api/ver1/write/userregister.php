<?php

include "local.php";
include "tool.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$ermsg=array();

$email=trim($_POST["email"]);
$emailcheck=check_email($email);
if($emailcheck==""){
	$sv[$sn[]="t1"]=$ui["email"]=$email;
}else{
	$ermsg["email"]=$emailcheck;
}

$passwd=trim($_POST["password"]);
$passwdcheck=check_passwd($passwd);
if($passwdcheck==""){
	$sv[$sn[]="a15"]=md5($email);
	$ui["token"]=$sv["a15"];
	$sv[$sn[]="passwd"]=md5($MAGIC_STRING.$passwd);
}else{
	$ermsg["password"]=$passwdcheck;
}

$name=trim($_POST["name"]);
if(strlen($name)>0){
	$sv[$sn[]="title"]=$ui["name"]=$name;
}else{
	$ermsg["name"]="名前は必須項目です。";
}

if(strlen($_POST["facebook_id"])>0){
	$facebookid=trim($_POST["facebook_id"]);
	$facebooktoken=$_POST["facebook_token"];
}elseif($_SESSION["usersinfo"]["service"]=="facebook"){
	$facebookid=trim($_SESSION["usersinfo"]["id"]);
	$facebooktoken=trim($_SESSION["usersinfo"]["token"]);
}else{
	$facebookid="";
}
if(strlen($facebookid)>0){
	$sql=sprintf("select id from u_member where qid=2 and flag=1 and b1='%s'",$facebookid);
	$o->query($sql);
	$f=$o->fetch_array();
	if(strlen($f["id"])>0){
		$ermsg["facebook_id"]="現在ログインいただいているFacebookアカウントはすでに登録されています。";
	}else{
		$sv[$sn[]="b1"]=$facebookid;
		$sv[$sn[]="b2"]=$facebooktoken;
	}
}
if(strlen($_POST["twitter_id"])>0){
	$twitterid=trim($_POST["twitter_id"]);
	$twittertoken=$_POST["twitter_token"];
}elseif($_SESSION["usersinfo"]["service"]=="twitter"){
	$twitterid=trim($_SESSION["usersinfo"]["id"]);
	$twittertoken=trim($_SESSION["usersinfo"]["token"]);
}else{
	$twitterid="";
}
if(strlen($twitterid)>0){
	$sql=sprintf("select id from u_member where qid=2 and flag=1 and b3='%s'",$twitterid);
	$o->query($sql);
	$f=$o->fetch_array();
	if(strlen($f["id"])>0){
		$ermsg["twitter_id"]="現在ログインいただいているTwitterアカウントはすでに登録されています。";
	}else{
		$sv[$sn[]="b3"]=$twitterid;
		$sv[$sn[]="b4"]=$twittertoken;
	}
}

if($_POST["create"]!="false"){

	$s3i=new S3Module;

	if(strlen($_FILES["profile_picture"]["tmp_name"])>0){

		if(preg_match("/image\/(gif|jpeg|png)/i",$_FILES["profile_picture"]["type"])){

			$ext=checkFileType($_FILES["profile_picture"]);
			$filename=sprintf("%s.%s",md5("ut".$email),$ext);
			if(move_uploaded_file($_FILES["profile_picture"]["tmp_name"],$USERS."/raw/".$filename)){
				//$e=exif_read_data($USERS."/raw/".$filename);
				imgDresize($USERS."/raw/".$filename,$USERS."/img/".$filename,array($SIZE,$SIZE),$ext,"","","","");

				$s3i->upload(sprintf("%s/raw/%s",$USERS,$filename),sprintf("users/raw/%s",$filename));
				$s3i->upload(sprintf("%s/img/%s",$USERS,$filename),sprintf("users/img/%s",$filename));

				$sv[$sn[]="img1"]=$ui["icon"]=$filename;
			}else{
				$ermsg["profile_picture"]="ファイルのアップロードに失敗しました。";
			}
		}else{
			$ermsg["profile_picture"]="使用できる画像はJPG, PNG, GIFファイルのみになります。";
		}

	}else{
		$url=str_replace("https://","http://",$_SESSION["usersinfo"]["profile_picture"]);
		if(strlen($url)>0){
			if(!preg_match("/default_profile_images/",$url)){

				$size=getimagesize($url);
				preg_match("/\.(jpg|jpeg|png|gif)/i",$url,$r);
				$ext=strtolower($r[1]);
				$filename=sprintf("%s.%s",md5("ut".$email),$ext);
				$rawdata=sprintf("%s/raw/%s",$USERS,$filename);
				$data=get_contents($url);
				file_put_contents($rawdata,$data);

				if($size[0]>300){
					imgDresize($rawdata,str_replace("/raw/","/img/",$rawdata),array($SIZE,$SIZE),$ext,"","","","");
				}else{
					copy($rawdata,str_replace("/raw/","/img/",$rawdata));
				}

				$s3i->upload(sprintf("%s/raw/%s",$USERS,$filename),sprintf("users/raw/%s",$filename));
				$s3i->upload(sprintf("%s/img/%s",$USERS,$filename),sprintf("users/img/%s",$filename));

				debug("","",array("url"=>$url,"filename"=>$rawdata));
				$sv[$sn[]="img1"]=$ui["icon"]=$filename;
			}
		}
	}
}

if(count($ermsg)>0){

	set_status(array("code"=>400,"message_type"=>"error","user_message"=>"入力内容が間違っています。","developer_message"=>"リクエストデータに不正値がある"));
	while(list($k,$v)=each($ermsg))$s["errors"][][$k]=$v;

}else{

	if($_POST["create"]!="false"){

		$bio=trim($_POST["bio"]);
		if(strlen($bio)>0){
			$sv[$sn[]="t2"]=$ui["profile"]=$bio;
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
			$v=preg_replace("/(\r\n|\r)/","\n",$v);
			$v=bind($v);
			$sv[$k]=sprintf("'%s'",$v);
		}

		$sv[$sn[]="m_time"]="now()";
		$sv[$sn[]="u_time"]="now()";
		$sv[$sn[]="flag"]="1";
		$sv[$sn[]="qid"]="2";
		$sv[$sn[]="cid"]="6";
		$sv[$sn[]="n"]="(select max(n)+1 from u_member where cid=6 and qid=2)";

		$o->query("begin");
		$sql=sprintf("insert into u_member(%s) values(%s);",implode(",",$sn),implode(",",$sv));
		$o->query($sql);

		$e=$o->affected_rows2();

		if($e){

			$sql=sprintf("select id from u_member where qid=2 and flag=1 and t1='%s'",$email);
			$o->query($sql);
			$f=$o->fetch_array();
			$ID=$ui["userid"]=$f["id"];

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

				//
				// REFERERから会員登録の経路判別
				//
				switch (true) {
					case false !== strpos($_SERVER['HTTP_REFERER'], 'signup-wow'):
						// signup-wow経路の登録 11 〜 13
						$e = mailregister_wow($email,$name);
						if(isset($_SESSION['auth_type']) && $_SESSION['auth_type'] == 'twitter')
							$kind = 12;
						elseif (isset($_SESSION['auth_type']) && $_SESSION['auth_type'] == 'facebook')
							$kind = 13;
						else
							$kind = 11;

						break;
					default:
						// 通常の会員登録 1 〜 3
						$e=mailregister($email,$name);
						if(isset($_SESSION['auth_type']) && $_SESSION['auth_type'] == 'twitter')
							$kind = 2;
						elseif (isset($_SESSION['auth_type']) && $_SESSION['auth_type'] == 'facebook')
							$kind = 3;
						else
							$kind = 1;
						break;
				}

				// signup log 登録
				$regist_log_query = sprintf("insert into u_member_signup(userid,kind,created_at) values(%s,%s,now());",$ID, $kind);
				$o->query($regist_log_query);
				$o->query("commit");

        if($e){
					set_status(array("user_message"=>"会員情報を登録しました。"));
				}else{
					set_status(array("user_message"=>"会員登録は完了しましたがメールが送信できませんでした。メールアドレスをご確認ください。"));
				}

				$sql=sprintf("select name from u_categories where id in (%s) and flag=1 order by n",implode(",",$interest));
				$o->query($sql);
				while($f=$o->fetch_array()){
					$interestcategory[]=$f["name"];
				}

				$ui["typeid"]=6;
				$ui["type"]="一般ユーザ";
				$ui["interest"]["category"]=$interestcategory;
				$s=set_userinfo($ui,1);

			}else{
				$o->query("abort");
				set_servererror();
			}
		}else{
			$o->query("abort");
			set_servererror();
		}
	}else{
		$s=(object)$s;
	}
}


$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>