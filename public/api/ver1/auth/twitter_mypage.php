<?php

include "local.php";
include "public/twitter.php";
require_once 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

$access_token = $_SESSION['access_token'];
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
$userinfo = $connection->get("account/verify_credentials");

$y=array(
	"service"=>"twitter",
	"token"=>$access_token["oauth_token_secret"],
	"id"=>$userinfo->id,
	"name"=>$userinfo->name,
	"email"=>"",
	"bio"=>$userinfo->description,
	"profile_picture"=>str_replace(array("_normal","http://"),array("","https://"),$userinfo->profile_image_url)
);

$o=new db;
$o->connect();

$sql=sprintf("select a15 from repo_n where b3='%s' and flag=1",$userinfo->id);
$o->query($sql);
$f=$o->fetch_array();

if(preg_match("/signup/",$_SESSION["redirecturl"])){
	if(strlen($f["a15"])>0){
		setcookie("auth_token",$f["a15"],time()+60*60*24*90,"/");
		header("Location:/");
	}else{
		$_SESSION["usersinfo"]=$y;
		header("Location:".$_SESSION["redirecturl"]."?oauth=twitter");	
	}
}else{
	$_SESSION["usersinfo"]=$y;
	if(strlen($f["a15"])>0){
		header("Location:".$_SESSION["redirecturl"]."?oauth=twitter");
	}else{
		header("Location:/signup/?oauth=twitter#account");
	}
}

?>