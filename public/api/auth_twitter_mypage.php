<?php

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
	"profile_picture"=>$userinfo->profile_image_url
);

$_SESSION["usersinfo"]=$y;

header("Location:auth.php");

?>