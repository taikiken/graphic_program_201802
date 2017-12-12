<?php

$servername=$_SERVER["SERVER_NAME"];
$requesturi=$_SERVER['REQUEST_URI'];
$staticfileimport=0;
$filename=$_SERVER['SCRIPT_FILENAME'].$_SERVER['REQUEST_URI'];

//DB設定
include "conf/db_setting.php";

if(preg_match("/undotsushin/",$servername)){

	if(preg_match("/dev/",$servername)){

		$SERVERPATH="/var/www/undotsushin.com/dev/public";
		$USERS="/var/www/undotsushin.com/dev/public/users";

		$domain="http://dev.undotsushin.com";
		$ImgPath="https://dev-img.sportsbull.jp";
		$UserImgPath="https://dev-img.sportsbull.jp";

		$LSCMS="legendsstadium2";

		$bucket="dev-img-sportsbull-jp";

	}elseif(preg_match("/stg/",$servername)){

		$SERVERPATH="/var/www/undotsushin.com/stg/public";
		$USERS="/var/www/undotsushin.com/stg/public/users";

		$domain="http://stg.undotsushin.com";
		$ImgPath="https://www.undotsushin.com";
		$UserImgPath="https://www.undotsushin.com";

		$LSCMS="legendsstadium";

		$bucket="img-sportsbull-jp";

	}else{

		$staticfileimport=1;

		$SERVERPATH="/var/www/undotsushin.com/www/public";
		$USERS="/var/www/undotsushin.com/www/public/users";

		$domain="https://www.undotsushin.com";
		$ImgPath="https://www.undotsushin.com";
		$UserImgPath="https://www.undotsushin.com";

		$bucket="img-sportsbull-jp";
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

}elseif(preg_match("/sportsbull/",$servername)){

	if(preg_match("/dev/",$servername)){

		$SERVERPATH="/var/www/sportsbull.jp/dev/public";
		$USERS="/var/www/sportsbull.jp/dev/public/users";

		$domain="https://dev.sportsbull.jp";
		$ImgPath="https://dev-img.sportsbull.jp";
		$UserImgPath="https://dev-img.sportsbull.jp";

		$LSCMS="legendsstadium2";

    // 大学野球
    if (preg_match("/big6tv/", $requesturi) ||
      preg_match("/ub_kansai/",$requesturi) ||
      preg_match("/ub_kansaibig6/",$requesturi) ||
      preg_match("/ub_tohto/",$requesturi)) {
      $bucket="dev-ublive.sportsbull.jp";
    }elseif (preg_match("/worldsoccer/",$requesturi)) {
			$bucket="dev-stats.sportsbull.jp";
		}else{
      $bucket="dev-img-sportsbull-jp";
    }

	}elseif(preg_match("/stg/",$servername)){

		$SERVERPATH="/var/www/sportsbull.jp/stg/public";
		$USERS="/var/www/sportsbull.jp/stg/public/users";

		$domain="https://stg.sportsbull.jp";
		$ImgPath="https://img.sportsbull.jp";
		$UserImgPath="https://img.sportsbull.jp";

		$LSCMS="legendsstadium";

    // 大学野球
    if (preg_match("/big6tv/", $requesturi) ||
      preg_match("/ub_kansai/",$requesturi) ||
      preg_match("/ub_kansaibig6/",$requesturi) ||
      preg_match("/ub_tohto/",$requesturi)) {
      $bucket="ublive.sportsbull.jp";
    }elseif (preg_match("/worldsoccer/",$requesturi)) {
      $bucket="stats.sportsbull.jp";
    }else{
      $bucket="img-sportsbull-jp";
    }

	}elseif(preg_match("/cms/",$servername)){

		$staticfileimport=1;

		$SERVERPATH="/var/www/sportsbull.jp/www/public";
		$USERS="/var/www/sportsbull.jp/www/public/users";

		$LSCMS="legendsstadium";

		$domain="https://sportsbull.jp";
		$ImgPath="https://img.sportsbull.jp";
		$UserImgPath="https://img.sportsbull.jp";

		$bucket="img-sportsbull-jp";

	}else{

		$staticfileimport=1;

		$DBNAME="ut0";
		$SERVERPATH="/var/www/sportsbull.jp/www/public";
		$USERS="/var/www/sportsbull.jp/www/public/users";

		$domain="https://sportsbull.jp";
		$ImgPath="https://img.sportsbull.jp";
		$UserImgPath="https://img.sportsbull.jp";

    // 大学野球
    if (preg_match("/big6tv/", $requesturi) ||
      preg_match("/ub_kansai/",$requesturi) ||
      preg_match("/ub_kansaibig6/",$requesturi) ||
      preg_match("/ub_tohto/",$requesturi)) {
      $bucket="ublive.sportsbull.jp";
    }elseif (preg_match("/worldsoccer/",$requesturi)) {
      $bucket="stats.sportsbull.jp";
    }else{
      $bucket="img-sportsbull-jp";
    }
	}

	$SQLLOG="/var/www/data/log/ut_sqllog.txt";
	$CMSLOG="/var/www/data/log/ut_cmslog.txt";
	$LOGTXT="/var/www/data/log/ut_log.txt";
	$LOGIN="/var/www/data/log/ut_login.txt";
	$ACLOGTXT="/var/www/data/log/ut_article_access.txt";
	$IMGP="/var/www/data/img/";
	$RSS="/var/www/data/rss/";

	$MEDIADATA="http://input.sportsbull.jp/api";
	$videopath="https://video.sportsbull.jp";

}else{

	$staticfileimport=1;

	$DBNAME="ut0";
	$DBUSR="ut";
	$DBPWD="ut";
	$DBHOST="localhost";
	$DBPORT=5432;

	$SERVERPATH="D:/dropbox/Dropbox/htdocs/ut";
	$USERS="D:/dropbox/Dropbox/htdocs/users";
	$IMGP="D:/dropbox/Dropbox/htdocs/prg_img/tmp/";
	$LOGTXT="d:/log/ut/log.txt";
	$ACLOGTXT="d:/log/ut/ut_article_access.txt";
	$SQLLOG="d:/log/ut/ut_sqllog.txt";
	$CMSLOG="d:/log/ut/ut_cmslog.txt";

	$domain="http://ut";
	$ImgPath="http://ut/prg_img";
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
  $DBNAME="ut_devnew";
  $DBUSR="ut";
  $DBPWD="ut";
  $DBHOST="undo-dev.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
  $DBPORT=5432;
  $SERVERPATH="/vagrant/public";
  $USERS="/vagrant/public/users";
  if ( $_SERVER['SERVER_PORT'] !== '80' ) :
    $domain="http://".$_SERVER['SERVER_NAME'].':'.$_SERVER['SERVER_PORT'];
  else :
    $domain="http://".$_SERVER['SERVER_NAME'];
  endif;
//  $ImgPath="https://dev.sportsbull.jp";
  $ImgPath="https://dev-img.sportsbull.jp";
//  $UserImgPath="https://sportsbull.jp";
  $UserImgPath="https://dev-img.sportsbull.jp";
  $SQLLOG="/vagrant/.tmp/log/ut_sqllog.txt";
  $CMSLOG="/vagrant/.tmp/log/ut_cmslog.txt";
  $LOGTXT="/vagrant/.tmp/log/ut_log.txt";
  $LOGIN="/vagrant/.tmp/log/ut_login.txt";
  $ACLOGTXT="/vagrant/.tmp/log/ut_article_access.txt";
  $IMGP="/vagrant/.tmp/img/";
  $RSS="/vagrant/.tmp/rss/";
  // 大学野球
  if (preg_match("/big6tv/", $requesturi) ||
    preg_match("/ub_kansai/",$requesturi) ||
    preg_match("/ub_kansaibig6/",$requesturi) ||
    preg_match("/ub_tohto/",$requesturi)) {
    $bucket="dev-ublive.sportsbull.jp";
  }elseif (preg_match("/worldsoccer/",$requesturi)) {
		$bucket="dev-stats.sportsbull.jp";
	}
endif;

//$staticfilepath=preg_match("/sportsbull.jp/",$domain)?sprintf("s3://%s",$bucket):sprintf("%s/api/ver1",$SERVERPATH);
$staticfilepath=sprintf("%s/api/ver1",$SERVERPATH);

?>
