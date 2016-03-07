<?php

$SITE="ut";
$KEYWORD="ut";
$DESCRIPTION="ut";
$DOMAIN="ut";
$LOCALDIRECTORY="ut";
//$SERVERPATH="/home/orc-web/www/new-htdocs";
$SERVERPATH="d:/apache/htdocs/tmp/ut";
$MAILFROM="psychsa@gmail.com";
$MAILTO="psychsa@gmail.com";
$DB="postgre";
$DBNAME="ut";
$DBUSR="ut";
$DBPWD="ut";
$DBHOST="localhost";
$DBPORT=5432;
$ALTDEFAULT="#";
$ADPATH="/editdm/";
$TAGON=1;
$DEBUGMODE=1;

if(getenv("REMOTE_ADDR")!="127.0.0.1"){
	$SQLLOGFILE="/var/www/html/api/sql.txt";
}else{
	$SQLLOGFILE="d:/log/sql.txt";
}

$domain="https://www.undotsushin.com";
$ImgPath="https://www.undotsushin.com";


$BILLINGUAL=0;
$MULTILANG=0;
$LANG=array("en","kr","sc","tc","ta");
$LANGv=array("英語","韓国語","中文簡体字","中文繁体字","タイ語");
$LANGx=array("en"=>"en","kr"=>"ko","sc"=>"zh-CN","tc"=>"zh-TW","ta"=>"th");

$SORC=0;

$PAGEOFFSET=30;
$MAXFILESIZE=2;
$EDITCONFIGURATION_h1img=402;
$EDITCONFIGURATION_alimg=402;
$EDITCONFIGURATION_lrimg=200;
$RSSCATEGORIESN=5;
$RSSALLCATEGORYPAGESN=15;
$RSSUPDATEPERIODE="daily";
$RSSUPDATEFREQUENCY=1;
$RSSUPDATEBASE="2000-01-01T12:00+00:00";

	$F_PATH="http://".$DOMAIN.$ADPATH."index.php";
	$FSPATH =$SERVERPATH."/prg_img/";
	$CSSFILE0=$SERVERPATH."/shared/css/cms/base.css";
	$CSSFILE1=$SERVERPATH."/shared/form/css/base.css";
	$RAWDATA=$SERVERPATH.$ADPATH."rawdata/";
	$HOLIDAYTEXT=$SERVERPATH."/shared/ext/holiday.txt";
	$STEPTEXT=$SERVERPATH."/shared/ext/step.txt";
	$SEMINARTEXT=$SERVERPATH."/shared/ext/seminar.txt";
	$FONT=$SERVERPATH."/shared/font/Osaka.ttc";
	$THUMIMG[]=$SERVERPATH."/shared/img/largeicon.png";
	$THUMIMG[]=$SERVERPATH."/shared/img/copy.png";
	$GMAPKEY="ABQIAAAAmYwTVu3J8P9-IwksQRDlUxTdyzTV3KXNoD94PXkDLDaTdf8PthQiNoWuBx6rndI_YYFD_-xscjU4-g";

	
$SITE_URL="http://".$DOMAIN;
$MAGIC_STRING="'L'essentiel est invisible pour les yeux.'";

$TMPPATH="../../../prg_img/tmp/";
$RAWIMG="../../../prg_img/raw/";
$IMG[]="../../../prg_img/img/";
$IMG[]="../../../prg_img/thumbnail1/";
$IMG[]="../../../prg_img/thumbnail2/";
$IMG[]="../../../prg_img/thumbnail3/";
$IMG[]="../../../prg_img/thumbnail4/";
$IMG[]="../../../prg_img/thumbnail5/";
$PDF="../../../prg_img/pdf/";

@mb_language("japanese");
@mb_internal_encoding("UTF-8");
@mb_http_output("UTF-8");
setlocale(LC_ALL,'ja_JP.UTF-8');

include $INCLUDEPATH."conf/configExtend.php";

?>