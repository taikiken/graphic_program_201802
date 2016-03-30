<?php

require_once 'facebook-php-sdk-v5/autoload.php';

use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\FacebookRedirectLoginHelper;

if(preg_match("/dev2/",$_SERVER["SERVER_NAME"])){
	$appid='544781712371174';
	$appsc='3b7170e2204b5897d08ac656d9edf6d5';
	$rurl='http://dev2.undotsushin.com/api/ver1/auth/facebook_callback.php';
	
}elseif(preg_match("/dev/",$_SERVER["SERVER_NAME"])){
	$appid='181476675566915';
	$appsc='4440f20c11cc8c3a4a32bc2148d81478';
	$rurl='http://dev.undotsushin.com/api/ver1/auth/facebook_callback.php';
	
}elseif(preg_match("/stg/",$_SERVER["SERVER_NAME"])){
	$appid='1641475006116166';
	$appsc='c19a2eaed991b197d3bc5c175f5b9f48';
	$rurl='http://stg.undotsushin.com/api/ver1/auth/facebook_callback.php';	
	
}else{
	$appid='842032129256034';
	$appsc='ab26d22cfed9a6304607398556ae7e30';
	$rurl='https://www.undotsushin.com/api/ver1/auth/facebook_callback.php';
}

$loginurl="/signup/?oauth=facebook";
$fb = new Facebook\Facebook([
	'app_id' => $appid,
	'app_secret' => $appsc,
	'default_graph_version' => 'v2.5',
]);

?>