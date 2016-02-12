<?php

$CURRENTDIRECTORY=$q->pdir;
include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/dx.php";
if($q->get_dir()==3){
	$FLAG=1;
	$TABLE=$CURRENTDIRECTORY;
	include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/controller.php";
	include $INCLUDEPATH."lib.php";
}else{
	include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/controller.php";
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
<?php if($q->get_dir()!==3){ ?>
<link rel="stylesheet" href="/shared/cms/css/input.css" >
<?php } ?>
<?php if($BILLINGUAL==0){ ?>
<link rel="stylesheet" href="/shared/cms/css/j.css" >
<?php } ?>
<script src="/shared/cms/js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="/shared/cms/js/jquery.cookie.js" type="text/javascript"></script>
<script src="/shared/cms/js/lightbox_cms.js" type="text/javascript"></script>
<script src="/shared/cms/js/swfobject.js" type="text/javascript"></script>
<script src="/shared/cms/js/base.js"></script>
<script src="/shared/cms/ckeditor/ckeditor.js" type="text/javascript"></script>
<script src="/shared/cms/ckeditor/load.js" type="text/javascript"></script>
<?php if($q->get_file()==0||$q->get_file()==1){ ?>
<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
<?php } ?>
<script type="text/javascript">
var dir=<?=$q->get_dir()?>;
var fil=<?=$q->get_file()?>;
var cd="<?=$CURRENTDIRECTORY?>";
var ct="<?=date("Y/m/d H:i")?>";
</script>
<?php if($q->get_dir()==2){ ?>
<style type="text/css" media="all">
#loadingDiv{
	display:none;
}
#pageDescription,.listTable{
	display:none;
}
.chbtn{
	display:none;
}
</style>
<?php } ?>
<?php if($q->get_file()==1){ ?>
<style type="text/css" media="all">
#loadingDiv{
	display:block;
}
#pageDescription,.listTable{
	display:none;
}
.chbtn{
	display:none;
}
</style>
<?php } ?>
<link rel="stylesheet" href="/shared/cms/css/lightbox.css" type="text/css" media="screen" >
<title><?php printf("%s-%s｜%s｜%sWEB サイト管理画面",$THIS,$q->exe_fl(),$PARENT,$SITE); ?></title>
</head>
<body>
<div id="wrapper">
<div class="clearfix headermenu">
<?php include "langswitch.php" ?>
<ul class="utilityMenu clearfix">
<li><a href="<?=$ADPATH?>logout/">ログアウト</a></li>
<li><a href="<?=$ADPATH?>log/">操作履歴</a></li>
</ul>
</div>
<form name="f" enctype="multipart/form-data" action="" method="post">
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
<?=implode("",$l)?>
<li class="def2"><?=$THIS?>：<?=$q->chk_pos()?></li>
</ul>
</div><!-- End topicPath -->
<?php if($q->get_dir()==3){ ?>
<div id="helpExp">
<p><img src="/shared/cms/img/cmd_up.gif" alt="一つ上へ" width="13" height="13" >は並び順を一つ上に、<img src="/shared/cms/img/cmd_down.gif" alt="一つ下へ" width="13" height="13" >は一つ下に入れ替えます。<img src="/shared/cms/img/cmd_active.gif" alt="表示" width="13" height="13" >は公開に、<img src="/shared/cms/img/cmd_disactive.gif" alt="非表示" width="13" height="13" >は非公開に設定されていることを表し、それぞれクリックで切り替えます。</p>
</div><!-- End helpExp -->
<?php }else{ ?>
<div id="loadingDiv"><p class="swtxt">画像をリサイズしています.....</p></div>
<?php } ?>

<div id="mainArea">
<div id="pageDescription" class="clearfix">
<?php include $INCLUDEPATH."__layout_description.php"; ?>
</div><!-- End pageDescription -->
<?php if($q->get_dir()===3){ ?>
<div id="pageController">
<?php if($CURRENTDIRECTORY!="log"){ ?>
<?php if($CURRENTDIRECTORY=="mail"){ ?>
<div class="newEntry<?php if(getSorC("formedit")!=1){ ?>_disabled<?php } ?>"><a<?php if(getSorC("formedit")==1){ ?> href="./new/?<?=$g->g_url()?>"<?php } ?>><span>新規エントリ</span></a></div>
<?php }elseif($CURRENTDIRECTORY=="trackback"){ ?>
<?php }else{ ?>
<div class="newEntry<?php if(getSorC("new")!=1){ ?>_disabled<?php } ?>"><a<?php if(getSorC("new")==1){ ?> href="./new/?<?=$g->g_url()?><?php if($CURRENTDIRECTORY=="repo_e"){ ?>&types=0<?php } ?><?php if($CURRENTDIRECTORY=="repo_edit"){ ?>&c=textfield<?php } ?>"<?php } ?>><span>新規エントリ</span></a></div>
<?php } ?>
<?php } ?>
<?php include $INCLUDEPATH."__layout_localmenu.php"; ?>
</div><!-- End pageController -->
<?php } ?>
<?php if($CURRENTDIRECTORY=="css_editor"&&$q->get_file()==0){ ?>
<div id="pageController">
<ul class="controllMenu">
<?php include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/local.php"; ?>
</ul>
</div><!-- End pageController -->
<?php }elseif($CURRENTDIRECTORY=="confs"&&$q->get_file()==0){ ?>
<div id="pageController">
<ul class="controllMenu">
<?php include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/local.php"; ?>
</ul>
</div><!-- End pageController -->
<?php } ?>
<table border="0" cellspacing="0" cellpadding="0" summary="<?=$THIS?><?=($q->get_dir()===3)?"一覧":sprintf("%s項目",$q->exe_fl())?>" class="listTable">
<tbody>
<?php if($q->get_file()!=2)include $INCLUDEPATH."__layout_datatable.php"; ?>
</tbody>
</table>
<div class="debug"><?php include $INCLUDEPATH."__debugcode.php"; ?></div>
<div id="pageCommand">
<?php include $INCLUDEPATH."__layout_footer.php"; ?>
</div>
</div>
<?php include $INCLUDEPATH."js.php"; ?>
</form>
<?php if($_POST["search"]==1){ ?>
<form name="ff">
<?php @echo_hidden($SEARCH); ?>
<input type="hidden" name="XXX" value="0" >
</form>
<?php } ?>
</div>
<?php if($q->get_dir()==0||$q->get_dir()==1||$q->get_dir()==3){ ?>
<div id="container" onclick="wrapperback()"></div>
<div id="flash"></div>
<div class="optionsel"><ul></ul></div>
<div id="flashimg"></div><div id="overwrap"></div><div class="lbbg"></div>
<div class="lenz"><img src="/shared/cms/img/large.png" alt="大きいサイズの画像を編集" title="大きいサイズの画像を編集" width="50" height="50" ></div>
<?php } ?>
<div class="optionselbg"></div>

<script type="text/javascript">
var fieldname="<?=$TITLEFIELDNAME?>";
var where="<?=$WHERE?>";
</script>

</body>
</html>
