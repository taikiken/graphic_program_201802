<?php

$SITE="ut";
$KEYWORD="ut";
$DESCRIPTION="ut";
$DOMAIN="ut";
$LOCALDIRECTORY="ut";

$MAILFROM="psychsa@gmail.com";
$MAILTO="psychsa@gmail.com";

$DB="postgre";
$DBNAME="ut0";
$DBUSR="ut";
$DBPWD="ut";
$DBPORT=5432;

include $INCLUDEPATH."conf/env.php";

// 関連リンクを許可する媒体
/*

	1:朝日
	2:日刊 
	3:FINEPLAY
	4:Facebook navi
	5:SPOZIUM

*/
$RELATEDLINK_ALLOWED=array(3);


$ADPATH="/editdm/";
$TAGON=1;
$DEBUGMODE=1;

$BILLINGUAL=0;
$MULTILANG=0;
$LANG=array("en","kr","sc","tc","ta");
$LANGv=array("英語","韓国語","中文簡体字","中文繁体字","タイ語");
$LANGx=array("en"=>"en","kr"=>"ko","sc"=>"zh-CN","tc"=>"zh-TW","ta"=>"th");

$SORC=0;

$PAGEOFFSET=30;
$MAXFILESIZE=2;

$F_PATH="http://".$DOMAIN.$ADPATH."index.php";
$FSPATH =$SERVERPATH."/prg_img/";
$RAWDATA=$SERVERPATH.$ADPATH."rawdata/";

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