<?php

include "local.php";
include "public/facebook.php";

$helper = $fb->getRedirectLoginHelper();
try {

  $servername=$_SERVER["SERVER_NAME"];
  if(preg_match("/dev2/",$servername)){
    $host='dev2.sportsbull.jp';

  }elseif(preg_match("/dev/",$servername)){
    $host='dev.sportsbull.jp';

  }elseif(preg_match("/stg/",$servername)){
    $host='stg.sportsbull.jp';

  }else{
    $host='sportsbull.jp';
  }
	$accessToken = $helper->getAccessToken(
    'https://'. $host .'/api/ver1/auth/facebook_callback.php'
  );
	$object = $fb->get('/me?fields=id,name,email,picture.width(9999).height(9999)',$accessToken);
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	echo 'Graph returned an error: ' . $e->getMessage();
	exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
	echo 'Facebook SDK returned an error: ' . $e->getMessage();
	exit;
}

$userinfo=$object->getGraphUser();
foreach($userinfo["picture"] as $k=>$v){
	if($k=="url")$picture=$v;
}

$y=array(
	"service"=>"facebook",
	"token"=>$accessToken->getValue(),
	"id"=>$userinfo["id"],
	"name"=>$userinfo["name"],
	"screen_name"=>$userinfo["name"],
	"email"=>$userinfo["email"],
	"bio"=>$userinfo["description"],
	"profile_picture"=>$picture
);


$_SESSION['fb_access_token'] = (string) $accessToken;

$o=new db;
$o->connect();

$sql=sprintf("select a15 from u_member where b1='%s' and flag=1",$userinfo["id"]);
$o->query($sql);
$f=$o->fetch_array();

if(preg_match("/signup/",$_SESSION["redirecturl"])){
	if(strlen($f["a15"])>0){
		setcookie("auth_token",$f["a15"],time()+60*60*24*90,"/");
		header("Location:/");
	}else{
		$_SESSION["usersinfo"]=$y;
		header("Location:".$_SESSION["redirecturl"]."?oauth=facebook");
	}
}else{
	$_SESSION["usersinfo"]=$y;
	if(strlen($f["a15"])>0){
		header("Location:".$_SESSION["redirecturl"]."?oauth=facebook");
	}else{
		header("Location:/signup/?oauth=facebook#account");
	}
}

?>