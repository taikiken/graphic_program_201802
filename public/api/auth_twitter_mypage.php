<?php

session_start();

define('CONSUMER_KEY','6pZoN3NLkEoNae8VDP0j7MHCK');
define('CONSUMER_SECRET','PiKgV2QDIY3TnfwSXnVaFP3bqWGHnSWT9qSsN5mJtDR6ZHEMLG');
define('OAUTH_CALLBACK','http://www.undotsushin.com/api/auth_twitter_callback.php');

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
$y=array(
	"token"=>$access_token["oauth_token_secret"],
	"id"=>$userinfo->id,
	"name"=>$userinfo->name,
	"email"=>"",
	"profile"=>$userinfo->description,
	"icon"=>$userinfo->profile_image_url
);

?>
<pre><?php print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)); ?></pre>