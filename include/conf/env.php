<?php

if(getenv("REMOTE_ADDR")!="127.0.0.1"){
	
	$filename=$_SERVER['SCRIPT_FILENAME'].$_SERVER['REQUEST_URI'];
	
	if(preg_match("/editdm|write|batch|password/",$filename)){
		$DBHOST="undo-prod.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
	}else{
		$DBHOST="undo-prod-replica-c1.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
	}
	
	if(preg_match("/dev2/",$_SERVER["SERVER_NAME"])){
	
		$SERVERPATH="/var/www/undotsushin.com/dev/public";
		$USERS="/var/www/undotsushin.com/dev/public/users";
		
		$domain="http://dev2.undotsushin.com";
		$ImgPath="http://52.68.177.134";
		$UserImgPath="http://dev2.undotsushin.com";
		
	}elseif(preg_match("/dev/",$_SERVER["SERVER_NAME"])){
	
		$SERVERPATH="/var/www/undotsushin.com/dev/public";
		$USERS="/var/www/undotsushin.com/dev/public/users";

		$domain="http://dev.undotsushin.com";
		$ImgPath="https://www.undotsushin.com";
		$UserImgPath="http://dev.undotsushin.com";

	}elseif(preg_match("/stg/",$_SERVER["SERVER_NAME"])){
	
		$SERVERPATH="/var/www/undotsushin.com/stg/public";
		$USERS="/var/www/undotsushin.com/stg/public/users";

		$domain="https://www.undotsushin.com";
		$ImgPath="https://www.undotsushin.com";
		$UserImgPath="http://stg.undotsushin.com";
		
	}else{
	
		$SERVERPATH="/var/www/undotsushin.com/www/public";
		$USERS="/var/www/undotsushin.com/www/public/users";

		$domain="https://www.undotsushin.com";
		$ImgPath="https://www.undotsushin.com";
		$UserImgPath=$ImgPath;
	}
	
	$LOGTXT="/var/www/data/log/ut_log.txt";
	$LOGIN="/var/www/data/log/ut_login.txt";
	$ACLOGTXT="/var/www/data/log/ut_article_access.txt";
	$IMGP="/var/www/data/img/";

}else{
	
	$DBNAME="ut";
	$DBHOST="localhost";
	
	$SERVERPATH="d:/apache/htdocs/tmp/ut";
	$USERS="d:/apache/htdocs/tmp/ut/users";
	$IMGP="d:/apache/htdocs/tmp/ut/prg_img/tmp/";
	$LOGTXT="d:/log/ut/log.txt";
	$ACLOGTXT="d:/log/ut/ut_article_access.txt";

	$domain="https://www.undotsushin.com";
	$ImgPath="https://www.undotsushin.com";
	$UserImgPath=$ImgPath;
	$LOGIN="/var/www/data/log/ut_login.txt";
}


?>