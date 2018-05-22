<?php

$SITE="ut";
$KEYWORD="ut";
$DESCRIPTION="ut";
$DOMAIN="ut";
$LOCALDIRECTORY="ut";

$MAILFROM="psychsa@gmail.com";
$MAILTO="psychsa@gmail.com";

$DB="postgre";
$DBUSR="ut";
$DBPWD="ut";
$DBPORT=5432;

include $INCLUDEPATH."conf/env.php";
$file=sprintf("%s/api/ver1/static/cms.dat",$SERVERPATH);
$s=unserialize(file_get_contents($file));

$CONTENTSTYPE_ALLOWED=$s[0];
$RELATEDLINK_ALLOWED=$s[1];
$SUMMARY_ALLOWED=$s[2];
$ORIGINALURL_ALLOWED=$s[3];
$MOVIE_ALLOWED=$s[4];
$YOUTUBE_ALLOWED=$s[5];
$FACEBOOK_ALLOWED=$s[6];
$MCAPTION_ALLOWED=$s[7];
$CONTENTS_ALLOWED=$s[8];
$EXBRIGHTCOVE_ALLOWED=$s[9];
$STREAMPACK_ALLOWED=$s[10];
unset($s);

//ウィジェット系ビデオかどうか判定
$VIDEOTAG[]="eplayer.js";
$VIDEOTAG[]="brightcove";
$VIDEOTAG[]="thumb-16x9-play";

$file=sprintf("%s/api/ver1/static/media.dat",$SERVERPATH);
$mediaoption=unserialize(file_get_contents($file));

$ADPATH="/editdm/";
$CMSJS="ut";
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

// bull's pick のファイル名
$PICKS_FILENAME = 'xml/picks.xml';
$ARCHIVE_PICKS = 'xml/archives/{date}picks.xml';
$TMP_PICKS = '/tmp/picks.xml';
$GET_PICKS_API = '/api/editdm/bulls-picks';
$GET_TMP_PICKS_API = '/api/editdm/bulls-picks/tmp';
$POST_TMP_PICKS_API = '/api/editdm/bulls-picks/tmp/update';
$ARCHIVE_PICKS_TO_PRODUCTION_API = '/api/editdm/bulls-picks/2prd';

$AU_PICKS_FILENAME = 'xml/au/picks.xml';
$AU_ARCHIVE_PICKS = 'xml/au/archives/{date}picks.xml';
$TMP_AU_PICKS = '/tmp/au_picks.xml';
$GET_AU_PICKS_API = '/api/editdm/bulls-picks/au';
$GET_AU_TMP_PICKS_API = '/api/editdm/bulls-picks/au/tmp';
$POST_AU_TMP_PICKS_API = '/api/editdm/bulls-picks/au/tmp/update';
$AU_ARCHIVE_PICKS_TO_PRODUCTION_API = '/api/editdm/bulls-picks/au/2prd';

// tour_of_json のファイル名
$TOJ_FILENAME = 'static/toj/live.json';
$TMP_TOJ = '/tmp/toj_live.json';
$GET_TOJ_API = '/api/editdm/tour-of-japan';
$GET_TMP_TOJ_API = '/api/editdm/tour-of-japan/tmp';
$POST_TMP_TOJ_API = '/api/editdm/tour-of-japan/tmp/update';

// big6live json のファイル名
$BIG6_FILENAME = 'static/big6/2018s/live.json';
$TMP_BIG6 = '/tmp/big6_live.json';
$GET_BIG6_API = '/api/editdm/big6-live';
$GET_TMP_BIG6_API = '/api/editdm/big6-live/tmp';
$POST_TMP_BIG6_API = '/api/editdm/big6-live/tmp/update';


//六大学のシーズンを記載
$BIG6TV_SEASON = '2018s';

?>