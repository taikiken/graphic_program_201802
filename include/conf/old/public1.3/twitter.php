<?php

if(preg_match("/dev2/",$_SERVER["SERVER_NAME"])){
	$key='OpnFRtZeWBOHVLZYdorD1MxgE';
	$secret='dJvQVmiN3bd2J4Jt6Y6qejUhilmd95F4qBoNv2ShVRoXHpukh5';
	$rurl='http://dev2.undotsushin.com/api/ver1/auth/twitter_callback.php';
	
}elseif(preg_match("/dev/",$_SERVER["SERVER_NAME"])){
	$key='Ryj1Z07sRmpL7wgPyIOgxSr8w';
	$secret='PoKPmjloblgMH5tlMFucQUmIuShHuuKUen7jJ14VNIP6ZcF6U3';
	$rurl='http://dev.undotsushin.com/api/ver1/auth/twitter_callback.php';
	
}elseif(preg_match("/stg/",$_SERVER["SERVER_NAME"])){
	$key='HAk5ImdqB0aFSolaE30Kvfz5T';
	$secret='okG8zVfqQ2m4CZ2nZ0LipoiHKsp0SSIitUlzu9o1mieScXKHiw';
	$rurl='http://stg.undotsushin.com/api/ver1/auth/twitter_callback.php';
	
}else{
	$key='6pZoN3NLkEoNae8VDP0j7MHCK';
	$secret='PiKgV2QDIY3TnfwSXnVaFP3bqWGHnSWT9qSsN5mJtDR6ZHEMLG';
	$rurl='https://www.undotsushin.com/api/ver1/auth/twitter_callback.php';
}

$loginurl="auth.php";
define('CONSUMER_KEY',$key);
define('CONSUMER_SECRET',$secret);
define('OAUTH_CALLBACK',$rurl);

?>