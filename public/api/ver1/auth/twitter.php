<?php

include "public/twitter.php";
require_once 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
$url = $connection->url('oauth/authenticate', array('oauth_token' => $request_token['oauth_token']));

$ref=$_SERVER['HTTP_REFERER'];
if(preg_match("/signup/",$ref)){
	$_SESSION["redirecturl"]="/signup/";
}elseif(preg_match("/login/",$ref)){
	$_SESSION["redirecturl"]="/login/";
}
header( 'location: '. $url );

?>