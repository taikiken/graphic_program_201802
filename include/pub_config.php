<?php

$EDITOR_IMG    = $RT."/prg_img/editor/";
$IMG           = $RT."/prg_img/img/";
$TIMG[0]       = $RT."/prg_img/thumbnail/";
$TIMG[1]       = $RT."/prg_img/thumbnail_/";
$PDF           = $RT."/prg_img/pdf/";
$SHARED["js"]  = $RT."/shared/js/";
$SHARED["css"] = $RT."/shared/css/";
$SHARED["img"] = $RT."/shared/img/";

$_META="<meta name=\"keywords\" content=\"%s\">
<meta name=\"description\" content=\"%s\">
<meta name=\"copyright\" content=\"(c) %s\">
<meta http-equiv=\"Content-Style-Type\" content=\"text/css\">
<meta http-equiv=\"Content-Script-Type\" content=\"text/javascript\">
<link rel=\"Home\" href=\"/\">
";

$_META=sprintf($_META,$M_KEYWORD,$M_DESCRIPTION,$SITE_);

$o=new db;
$o->connect();

?>