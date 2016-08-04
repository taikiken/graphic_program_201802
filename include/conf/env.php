<?php

$servername=$_SERVER["SERVER_NAME"];

if(preg_match("/undotsushin.com/",$servername)){

	$staticfileimport=0;
	$filename=$_SERVER['SCRIPT_FILENAME'].$_SERVER['REQUEST_URI'];

	if(preg_match("/editdm|write|batch|password/",$filename)){
		$DBHOST="undo-prod.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
	}else{
		$DBHOST="undo-prod-replica-c1.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
	}

	if(preg_match("/dev2/",$servername)){

		$DBNAME="ut_dev2new";
		$SERVERPATH="/var/www/undotsushin.com/dev/public";
		$USERS="/var/www/undotsushin.com/dev/public/users";

		$domain="http://dev2.undotsushin.com";
		$ImgPath="http://dev2.undotsushin.com";
		$UserImgPath="http://dev2.undotsushin.com";

	}elseif(preg_match("/dev/",$servername)){

		$DBNAME="ut_devnew";
		$DBHOST="undo-dev.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";

		$SERVERPATH="/var/www/undotsushin.com/dev/public";
		$USERS="/var/www/undotsushin.com/dev/public/users";

		$domain="http://dev.undotsushin.com";
		$ImgPath="http://dev.undotsushin.com";
		$UserImgPath="http://dev.undotsushin.com";

	}elseif(preg_match("/stg/",$servername)){

		$DBNAME="ut0";
		$SERVERPATH="/var/www/undotsushin.com/stg/public";
		$USERS="/var/www/undotsushin.com/stg/public/users";

		$domain="http://stg.undotsushin.com";
		$ImgPath="https://www.undotsushin.com";
		$UserImgPath="https://www.undotsushin.com";

	}else{

		$staticfileimport=1;

		$DBNAME="ut0";
		$SERVERPATH="/var/www/undotsushin.com/www/public";
		$USERS="/var/www/undotsushin.com/www/public/users";

		$domain="https://www.undotsushin.com";
		$ImgPath="https://www.undotsushin.com";
		$UserImgPath="https://www.undotsushin.com";
	}

	$SQLLOG="/var/www/data/log/ut_sqllog.txt";
	$CMSLOG="/var/www/data/log/ut_cmslog.txt";
	$LOGTXT="/var/www/data/log/ut_log.txt";
	$LOGIN="/var/www/data/log/ut_login.txt";
	$ACLOGTXT="/var/www/data/log/ut_article_access.txt";
	$IMGP="/var/www/data/img/";
	$RSS="/var/www/data/rss/";
	
	$MEDIADATA="http://input.undotsushin.com/api";
	$videopath="https://video.undotsushin.com";

}elseif(preg_match("/sportsbull.jp/",$servername)){

	$staticfileimport=0;
	$filename=$_SERVER['SCRIPT_FILENAME'].$_SERVER['REQUEST_URI'];

	if(preg_match("/editdm|write|batch|password/",$filename)){
		$DBHOST="undo-prod.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
	}else{
		$DBHOST="undo-prod-replica-c1.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
	}

	if(preg_match("/dev/",$servername)){

		$DBNAME="ut_devnew";
		$DBHOST="undo-dev.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";

		$SERVERPATH="/var/www/sportsbull.jp/dev/public";
		$USERS="/var/www/sportsbull.jp/dev/public/users";

		$domain="https://dev.sportsbull.jp";
		$ImgPath="https://dev.sportsbull.jp";
		$UserImgPath="https://dev.sportsbull.jp";

	}elseif(preg_match("/stg/",$servername)){

		$DBNAME="ut0";
		$SERVERPATH="/var/www/sportsbull.jp/stg/public";
		$USERS="/var/www/sportsbull.jp/stg/public/users";

		$domain="https://sportsbull.jp";
		$ImgPath="https://sportsbull.jp";
		$UserImgPath="https://sportsbull.jp";

	}else{

		$staticfileimport=1;

		$DBNAME="ut0";
		$SERVERPATH="/var/www/sportsbull.jp/www/public";
		$USERS="/var/www/sportsbull.jp/www/public/users";

		$domain="https://sportsbull.jp";
		$ImgPath="https://sportsbull.jp";
		$UserImgPath="https://sportsbull.jp";
	}

	$SQLLOG="/var/www/data/log/ut_sqllog.txt";
	$CMSLOG="/var/www/data/log/ut_cmslog.txt";
	$LOGTXT="/var/www/data/log/ut_log.txt";
	$LOGIN="/var/www/data/log/ut_login.txt";
	$ACLOGTXT="/var/www/data/log/ut_article_access.txt";
	$IMGP="/var/www/data/img/";
	$RSS="/var/www/data/rss/";
	
	$MEDIADATA="http://input.undotsushin.com/api";
	$videopath="https://video.sportsbull.jp";
	
}else{

	$staticfileimport=1;

	$DBNAME="ut11";
	$DBUSR="ut";
	$DBPWD="ut";
	$DBHOST="localhost";
	$DBPORT=5432;

	$SERVERPATH="d:/apache/htdocs/tmp/ut";
	$USERS="d:/apache/htdocs/tmp/ut/users";
	$IMGP="d:/apache/htdocs/tmp/ut/prg_img/tmp/";
	$LOGTXT="d:/log/ut/log.txt";
	$ACLOGTXT="d:/log/ut/ut_article_access.txt";
	$SQLLOG="d:/log/ut/ut_sqllog.txt";
	$CMSLOG="d:/log/ut/ut_cmslog.txt";

	$domain="http://ut";
	$ImgPath="http://ut";
	$UserImgPath=$ImgPath;
	$LOGIN="d:/log/ut/ut_login.txt";
	$RSS="d:/log/ut/rss/";
	
	$MEDIADATA="http://utinput/api";
}


// setting for Vagrant
// ==============================
// - 192.168.33.50 - vagrant local ip
// - undotsushin.local - vagrant local host
// - :8888 - vagrant local network port
if ( $_SERVER['SERVER_NAME'] == '192.168.33.50' || $_SERVER['SERVER_NAME'] == 'undotsushin.local' || $_SERVER['SERVER_PORT'] == '8080' || $_SERVER['SERVER_PORT'] == '8888' ) :
  $staticfileimport=0;
  $DBNAME="ut";
  $DBUSR="ut";
  $DBPWD="ut";
  $DBHOST="localhost";
  $DBPORT=5432;
  $SERVERPATH="/vagrant/public";
  $USERS="/vagrant/public/users";
  if ( $_SERVER['SERVER_PORT'] !== '80' ) :
    $domain="http://".$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'];
  else :
    $domain="http://".$_SERVER['SERVER_NAME'];
  endif;
  $ImgPath="https://dev.sportsbull.jp";
  $UserImgPath="https://sportsbull.jp";
  $SQLLOG="/vagrant/.tmp/log/ut_sqllog.txt";
  $CMSLOG="/vagrant/.tmp/log/ut_cmslog.txt";
  $LOGTXT="/vagrant/.tmp/log/ut_log.txt";
  $LOGIN="/vagrant/.tmp/log/ut_login.txt";
  $ACLOGTXT="/vagrant/.tmp/log/ut_article_access.txt";
  $IMGP="/vagrant/.tmp/img/";
  $RSS="/vagrant/.tmp/rss/";
endif;


?>