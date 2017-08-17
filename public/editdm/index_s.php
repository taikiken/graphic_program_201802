<?php

include $INCLUDEPATH."local.php";

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
<meta name="robots" content="noindex,nofollow" >
<meta name="robots" content="noarchive" >
<link rel="stylesheet" href="/shared/cms/css/base.css" >
<?php if($BILLINGUAL==0){ ?>
<link rel="stylesheet" href="/shared/cms/css/j.css" >
<?php } ?>
<script src="/shared/js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="/shared/js/jquery.cookie.js" type="text/javascript"></script>
<script src="/shared/cms/js/lightbox_cms.js" type="text/javascript"></script>
<script src="/shared/cms/js/swfobject.js" type="text/javascript"></script>
<script src="/shared/cms/js/base.js"></script>
<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
<script type="text/javascript">
var dir=5;
var fil=5;
var cid=5;
var rid=5;
</script>
<title><?php printf("%s WEB サイト管理画面",$SITE); ?></title>
</head>
<body>
<div id="wrapper">
<div class="clearfix headermenu">
<?php include "langswitch.php" ?>
<ul class="utilityMenu clearfix">
<li><a href="<?=$ADPATH?>logout/">ログアウト</a></li>
<!--<li><a href="<?=$ADPATH?>log/">操作履歴</a></li>-->
</ul>
</div><form name="f">
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
<div id="mainArea">
<div id="pageDescription">
<p>下のメニュから管理する項目を選択してください。</p>
</div><!-- End pageDescription -->
<div id="pageController">
<ul class="controllMenu">
<!--<li class="ds"><a href="/rss/" target="_blank">登録されている全セクションのRSSをプレビュー</a></li>-->
</ul>
</div>
<table border="0" cellspacing="0" cellpadding="0" summary="一覧" class="listTable">
<tbody>
<?php if(getSorC("alv")=="51"){ ?>
<tr>
<th class="menuTitle" scope="col">総合管理ツール</th>
</tr>
<?php if(getSorC("suadmin")=="1"){ ?>
<tr>
<td class="menuChild"><a href="./authentic/" class="folder">投稿者管理</a></td>
</tr>
<?php } ?>
<?php if(getSorC("categoryadmin")=="1"){ ?>
<tr>
<td class="menuChild"><a href="./toolhead/" class="folder">管理パーツ</a></td>
</tr>
<tr>
<td class="menuChild"><a href="./repo/" class="folder">セクション管理</a></td>
</tr>
<?php } ?>
<?php if(getSorC("master")=="1"){ ?>
<tr>
<td class="menuChild"><a href="./pm/" class="folder">マスタ管理</a></td>
</tr>
<?php } ?>
<?php if(getSorC("environment")=="1"){ ?>
<tr>
<td class="menuChild"><a href="./confs/edit/" class="folder">システム環境設定</a></td>
</tr>
<?php } ?>
<?php if(getSorC("formtemplate")=="1"){ ?>
<tr>
<td class="menuChild"><a href="./mailtemplate/" class="folder">フォームテンプレート</a></td>
</tr>
<?php } ?>
<?php }elseif(getSorC("usr")=="ut"){ ?>
<tr>
    <th class="menuTitle" scope="col">総合管理ツール</th>
</tr>
<tr>
    <td class="menuChild"><a href="./authentic/" class="folder">投稿者管理</a></td>
</tr>
<?php } ?>
<?php if(strlen(getSorC("repo"))>0){ ?>
<tr>
<th class="menuTitle" scope="col">コンテンツセクション</th>
</tr>
<!--
<tr>
<td class="menuChild"><a href="/tests" target="_blank"><img src="/shared/cms/img/icon_browser.gif" alt="インデックスページをブラウザでプレビューする" width="16" height="16" ></a><a href="/rss/" target="_blank"><img src="/shared/editor/rss.gif" alt="Web サイト全体のの RSS をプレビュー" width="16" height="16" border="0"></a><a href="#" onclick="logswitcher(0,0)"><img src="/shared/cms/img/icon_log.gif" alt="<?=str_replace($a[$i],'',$f["name"])?>アクセス状況を見る" width="16" height="16" ></a><a>トップページ情報管理</a></td>
<td class="" scope="col" width="40"><a<?php if(getSorC("edit")==1){ ?> href="./edit/?<?=$EDITDELETEINITIAL?>id=<?=$p[$i]["id"]?>&<?=$g->g_url()?><?php if($CURRENTDIRECTORY=="repo_e"){ ?>&types=<?=$p[$i]["types"]?><?php } ?>"<?php } ?> class="edit<?php if(getSorC("edit")!=1){ ?>_disabled<?php } ?>">編集</a></td>
</tr>
-->
<?php

$III=0;

$sql=sprintf("select id,pid,c_flag,rid,name,rss,index,directory4 from repo where flag=1 and rid=0 and id in (%s) order by n",getSorC("repo"));
$o->query($sql);

while($f=$o->fetch_array($III)){
	$p[]=$f;
}

for($i=0;$i<count($p);$i++){

?>
<tr>
<td class="menuChild">
<?php if(strlen($p[$i]["directory4"])>0){ ?><a href="<?=rewrite($p[$i]["directory4"],$p[$i])?>" target="_blank"><img src="/shared/cms/img/icon_browser.gif" alt="<?=str_replace($a[$i],'',$p[$i]["name"])?>インデックスページをブラウザでプレビューする" width="16" height="16" ></a><?php } ?><a href="repo_<?=(!$p[$i]["c_flag"])?"n":"s"?>/?<?=(!$p[$i]["c_flag"])?"c":"r"?>id=<?=$p[$i]["id"]?>" class="folder"><?=str_replace($a[$i],'',$p[$i]["name"])?>情報管理</a>
</td>
</tr>
<?php } ?>
<?php } ?>


<!--
<tr>
<td class="menuChild">
<span class="j2"><a href="/j/" target="_blank"><img src="/shared/cms/img/icon_browser.gif" alt="インデックスページをブラウザでプレビューする" width="16" height="16" ></a>トップページ情報管理</span>
<?php if($BILLINGUAL){ ?><span class="e2"><a href="/e/" target="_blank"><img src="/shared/cms/img/icon_browser.gif" alt="インデックスページをブラウザでプレビューする" width="16" height="16" ></a>トップページ情報管理</span><?php } ?>
</td>
<td class="" scope="col" width="40"><a href="./top/edit/" class="menu"><span class="edit">編集</span></a></td>
</tr>


-->
<!--
<tr>
<th class="menuTitle" scope="col">コンテンツオプション管理</th>
</tr>

<tr>
<td class="menuChild"><a href="./mail/" class="folder">フォーム管理</a></td>
</tr>

<tr>
<td class="menuChild"><a href="./trackback/">トラックバック管理</a></td>
</tr>
<tr>
<td class="menuChild"><a href="./clickenquete/">クリックアンケート管理</a></td>
</tr>
-->

<?php if(getSorC("usr")==="inhigh"){ ?>
<tr>
<td class="menuChild">
<a href="./photo/" class="folder">フォトアルバム管理</a>
</td>
</tr>
<?php } ?>
</tbody>
</table>
<div id="pageCommand"></div>
</div>
</form>
</div>
<div id="container" onclick="wrapperback()"></div>
<div id="flash"></div>
</body>
</html>