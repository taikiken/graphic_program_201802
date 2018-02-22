<?php

include $INCLUDEPATH."local.php";

$s="
朝日新聞	 http://cms.sportsbull.jp/api/batch/import_asahi.php
gorin.jp	 http://cms.sportsbull.jp/api/batch/import_gorinjp.php
ゴルフネットワーク	 http://cms.sportsbull.jp/api/batch/import_golfnetwork.php
Cycle Style	 http://cms.sportsbull.jp/api/batch/import_cycle.php
Jコム サッカー特集	 http://cms.sportsbull.jp/api/batch/import_jcom.php
Jスポーツ	 http://cms.sportsbull.jp/api/batch/import_jsports.php
Timely!	 http://cms.sportsbull.jp/api/batch/import_timely.php
Cheer Up!	 http://cms.sportsbull.jp/api/batch/import_cheerup.php
テニスデイリー	 http://cms.sportsbull.jp/api/batch/import_tennisdaily.php
Number Web サマリー	 http://cms.sportsbull.jp/api/batch/import_number_sammary.php
Number Web 全文	 http://cms.sportsbull.jp/api/batch/import_number_full.php
日刊スポーツ：野球	 http://cms.sportsbull.jp/api/batch/import_nikkansports_baseball.php
日刊スポーツ：サッカー	 http://cms.sportsbull.jp/api/batch/import_nikkansports_soccer.php
日刊スポーツ：格闘技	 http://cms.sportsbull.jp/api/batch/import_nikkansports_battle.php
日刊スポーツ：その他	 http://cms.sportsbull.jp/api/batch/import_nikkansports_etc.php
バスケットカウント	 http://cms.sportsbull.jp/api/batch/import_buscketcount.php
ハドルウェブ	 http://cms.sportsbull.jp/api/batch/import_huddleweb.php
ベースボールゲート	 http://cms.sportsbull.jp/api/batch/import_baseballgate.php
フルカウント	 http://cms.sportsbull.jp/api/batch/import_fullcount.php
ラグビー共和国	 http://cms.sportsbull.jp/api/batch/import_rugby.php
RALLYPLUS.NET	 https://cms.sportsbull.jp/api/batch/import_rallyplus.php
レジェンドスタジアム	http://cms.sportsbull.jp/api/batch/import_legendsstadium.php
レスポンス	 http://cms.sportsbull.jp/api/batch/import_response.php
六大学連盟-順位表	http://cms.sportsbull.jp/api/batch/output_big6standing.php
六大学連盟-日程	http://cms.sportsbull.jp/api/batch/output_big6schedule.php
テレビ東京卓球ニュース	https://cms.sportsbull.jp/api/batch/import_tabletennis.php
";

/*
BULL'Sピックアップ番組表	 http://cms.sportsbull.jp/api/batch/output_gguide_daily.php
SPORTIVA	http://cms.sportsbull.jp/api/batch/import_sportiva.php
*/

if(preg_match("/dev/",$_SERVER["SERVER_NAME"]))$s=str_replace("cms","dev",$s);
$s=explode("\n",$s);
for($i=0;$i<count($s);$i++){
	$s[$i]=trim($s[$i]);
	if(strlen($s[$i])>0){
		$s[$i]=explode("\t",trim($s[$i]));
		$media[]=$s[$i];
	}
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
<meta name="robots" content="noindex,nofollow" >
<meta name="robots" content="noarchive" >
<meta http-equiv="Pragma" content="no-cache" >
<meta http-equiv="Cache-Control" content="no-cache" >
<meta http-equiv="Content-Style-Type" content="text/css" >
<meta http-equiv="Content-Script-Type" content="text/javascript" >
<link rel="stylesheet" href="/shared/cms/css/base.css" >
<link rel="stylesheet" href="/shared/cms/css/j.css" >
<script src="/shared/cms/js/jquery-1.11.0.min.js"></script>
<script src="/shared/cms/js/jquery.cookie.js" type="text/javascript"></script>
<script src="/shared/cms/js/lightbox_cms.js" type="text/javascript"></script>
<script src="/shared/cms/js/swfobject.js" type="text/javascript"></script>
<script src="/shared/cms/js/base.js"></script>
<script src="/shared/cms/ckeditor/ckeditor.js" type="text/javascript"></script>
<script src="//maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
<script src="/shared/cms/js/ut.php" type="text/javascript"></script>
<script src="/shared/cms/js/ut.js" type="text/javascript"></script>
<script type="text/javascript">
var dir=3;
var fil=0;
var cid=0;
var rid=2;
var cd="link";
var ct="<?=date("Y-m-d H:i:s")?>";
</script>
<link rel="stylesheet" href="/shared/cms/css/lightbox.css" type="text/css" media="screen" >
<title>連携先RSS手動取り込み｜運動通信WEB サイト管理画面</title>
</head>
<body>
<div id="wrapper">
<div class="clearfix headermenu">
<ul class="utilityMenu clearfix">
<li><a href="/editdm/logout/">ログアウト</a></li>
<li><a href="/editdm/log/">操作履歴</a></li>
</ul>
</div>
<form name="f" enctype="multipart/form-data" action='' method="post">
<div id="headerArea">
<div id="expBox" class="br">

<div id="titleBox">

<h1 class="clearfix">
<ul class="pnkz clearfix">
<?php include "glmenu.php" ?>
</ul>
</h1>
</div><!-- End titleBox -->
</div><!-- End expBox -->
</div><!-- End headerArea -->
<div id="topicPath">
<ul>
<li class="root"><a href="/editdm/">メインメニュー</a></li><li>連携先RSS手動取り込み</li>
</ul>
</div><!-- End topicPath -->
<div id="helpExp">
<p>手動で取り込みしたいメディアのRSSをクリックしてください。</p>
</div><!-- End helpExp -->

<div id="mainArea">
<div id="pageDescription" class="clearfix">
<p><?=count($media)?>件のメディアが連携されております。</p>
</div><!-- End pageDescription -->

<table border="0" cellspacing="0" cellpadding="0" summary="種別一覧" class="listTable">
<tbody>
<tr>
<th width="15%" class="t_title" scope="col" style="border-left:1px solid #ccc;">タイトル</th>
<th width="85%" class="t_title" scope="col">URL</th>
</tr>
<?php for($i=0;$i<count($media);$i++){ ?>
<tr class="blockds" style="border-top:1px dotted #ccc;">
<td class="colname2"><?=$media[$i][0]?></td>
<td style="padding:8px;"><a href="<?=$media[$i][1]?>" target="_blank"><?=$media[$i][1]?></a></td>
</tr>
<?php } ?>
</tbody>
</table>
<div class="debug"></div>
<div id="pageCommand">



<ul class="numTable clearfix">
</ul>

</div>
</div>
</form>
</div>
<div id="container" onclick="wrapperback()"></div>
<div id="flash"></div>
<div class="optionsel"><ul></ul></div>
<div id="flashimg"></div><div id="overwrap"></div><div class="lbbg"></div>
<div class="lenz"><img src="/shared/cms/img/large.png" alt="大きいサイズの画像を編集" title="大きいサイズの画像を編集" width="50" height="50" ></div>
<div class="optionselbg"></div>
<script type="text/javascript">
var fieldname="name";
var where=" where rid=2";
</script>
</body>
</html>
