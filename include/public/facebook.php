<?php

require_once 'facebook-php-sdk-v5/autoload.php';

use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\FacebookRedirectLoginHelper;

$servername=$_SERVER["SERVER_NAME"];

if(preg_match("/undotsushin/",$servername)){
	if(preg_match("/dev2/",$servername)){
		$appid='544781712371174';
		$appsc='3b7170e2204b5897d08ac656d9edf6d5';
		$rurl='https://dev2.undotsushin.com/api/ver1/auth/facebook_callback.php';
		
	}elseif(preg_match("/dev/",$servername)){
		$appid='181476675566915';
		$appsc='4440f20c11cc8c3a4a32bc2148d81478';
		$rurl='https://dev.undotsushin.com/api/ver1/auth/facebook_callback.php';
		
	}elseif(preg_match("/stg/",$servername)){
		$appid='1641475006116166';
		$appsc='c19a2eaed991b197d3bc5c175f5b9f48';
		$rurl='https://stg.undotsushin.com/api/ver1/auth/facebook_callback.php';	
		
	}else{
		$appid='842032129256034';
		$appsc='ab26d22cfed9a6304607398556ae7e30';
		$rurl='https://www.undotsushin.com/api/ver1/auth/facebook_callback.php';
	}
}else{

	if(preg_match("/dev2/",$servername)){
		$appid='810943972391267';
		$appsc='a64f7dd09c276bd9e4d9539497bf17fc';
		$rurl='https://dev2.sportsbull.jp/api/ver1/auth/facebook_callback.php';

	}elseif(preg_match("/dev/",$servername)){
		$appid='181476675566915';
		$appsc='4440f20c11cc8c3a4a32bc2148d81478';
		$rurl='https://dev.sportsbull.jp/api/ver1/auth/facebook_callback.php';
		
	}elseif(preg_match("/stg/",$servername)){
		$appid='1641475006116166';
		$appsc='c19a2eaed991b197d3bc5c175f5b9f48';
		$rurl='https://stg.sportsbull.jp/api/ver1/auth/facebook_callback.php';	
		
	}else{
		$appid='842032129256034';
		$appsc='ab26d22cfed9a6304607398556ae7e30';
		$rurl='https://sportsbull.jp/api/ver1/auth/facebook_callback.php';
	}
}

$loginurl="/signup/?oauth=facebook";
$fb = new Facebook\Facebook([
	'app_id' => $appid,
	'app_secret' => $appsc,
	'default_graph_version' => 'v2.11',
]);

?>