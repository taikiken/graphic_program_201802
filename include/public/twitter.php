<?php

if(preg_match("/dev/",$_SERVER["DOCUMENT_ROOT"])){
	$key='Ryj1Z07sRmpL7wgPyIOgxSr8w';
	$secret='PoKPmjloblgMH5tlMFucQUmIuShHuuKUen7jJ14VNIP6ZcF6U3';
	$rurl='http://dev.undotsushin.com/api/ver1/auth/twitter_callback.php';
	$loginurl="/signup/?oauth=twitter";
	//$loginurl="auth.php";
}else{
	$key='6pZoN3NLkEoNae8VDP0j7MHCK';
	$secret='PiKgV2QDIY3TnfwSXnVaFP3bqWGHnSWT9qSsN5mJtDR6ZHEMLG';
	$rurl='https://www.undotsushin.com/api/ver1/auth/twitter_callback.php';
	$loginurl="auth.php";
}

define('CONSUMER_KEY',$key);
define('CONSUMER_SECRET',$secret);
define('OAUTH_CALLBACK',$rurl);

?>