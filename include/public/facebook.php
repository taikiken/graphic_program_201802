<?php

require_once 'facebook-php-sdk-v5/autoload.php';

use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\FacebookRedirectLoginHelper;

if(preg_match("/dev/",$_SERVER["DOCUMENT_ROOT"])){
	$appid='181476675566915';
	$appsc='4440f20c11cc8c3a4a32bc2148d81478';
	$rurl='http://dev.undotsushin.com/api/ver1/auth/facebook_callback.php';
	$loginurl="/signup/?oauth=facebook";
}else{
	$appid='842032129256034';
	$appsc='ab26d22cfed9a6304607398556ae7e30';
	$rurl='https://www.undotsushin.com/api/ver1/auth/facebook_callback.php';
	$loginurl="auth.php";
}

$fb = new Facebook\Facebook([
	'app_id' => $appid,
	'app_secret' => $appsc,
	'default_graph_version' => 'v2.5',
]);

?>