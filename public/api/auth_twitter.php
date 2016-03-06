<?php

session_start();

define('CONSUMER_KEY','6pZoN3NLkEoNae8VDP0j7MHCK');
define('CONSUMER_SECRET','PiKgV2QDIY3TnfwSXnVaFP3bqWGHnSWT9qSsN5mJtDR6ZHEMLG');
define('OAUTH_CALLBACK','https://www.undotsushin.com/api/auth_twitter_callback.php');

require_once 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

//TwitterOAuth をインスタンス化
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);

//コールバックURLをここでセット
$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));

//callback.phpで使うのでセッションに入れる
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

//Twitter.com 上の認証画面のURLを取得( この行についてはコメント欄も参照 )
$url = $connection->url('oauth/authenticate', array('oauth_token' => $request_token['oauth_token']));

//Twitter.com の認証画面へリダイレクト
header( 'location: '. $url );

?>