<?php

session_start();

define('CONSUMER_KEY','00gnA3emAHJfARBvUf2DIFFXe');
define('CONSUMER_SECRET','q9X3PYPcCPDYC5rOAfGuBrFtFiZXPwlYcvQ43If2EC2iUebEHd');
define('OAUTH_CALLBACK','http://dev.undotsushin.com/api/auth_twitter_callback.php');

require_once 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

//セッションに入れておいたさっきの配列
$access_token = $_SESSION['access_token'];

//OAuthトークンとシークレットも使って TwitterOAuth をインスタンス化
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

//ユーザー情報をGET
$userinfo = $connection->get("account/verify_credentials");
//(ここらへんは、Twitter の API ドキュメントをうまく使ってください)

//GETしたユーザー情報をvar_dump
var_dump(array(
	"token"=>$access_token["oauth_token"],
	"id"=>$userinfo->id,
	"name"=>$userinfo->name,
	"email"=>"",
	"profile"=>$userinfo->description,
	"icon"=>$userinfo->profile_image_url
));

?>