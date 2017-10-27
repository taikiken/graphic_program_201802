<?php

include $INCLUDEPATH."local.php";

$cid=!isset($_GET["i"])?0:$_GET["i"];

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
<script src="/shared/cms/js/base.js"></script>
<?php if($q->get_file()==0||$q->get_file()==1){ ?>
<script src="/shared/cms/js/<?=$CMSJS?>.php" type="text/javascript"></script>
<script src="/shared/cms/js/<?=$CMSJS?>.js" type="text/javascript"></script>
<?php } ?>

<script type="text/javascript">
var dir=5;
var fil=5;
var rid=0;
var cid=<?=$cid?>;
cd="comment";
</script>
<title><?php printf("%s WEB サイト管理画面",$SITE); ?></title>
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
<p>フォームで送信されたお問合せ一覧です。</p>
</div><!-- End pageDescription -->
  <div id="pageController">
    <ul class="controllMenu clearfix">
      <li class="ds"><a href="/editdm/comment/search/">絞り込み検索</a></li>
    </ul></div><!-- End pageController -->
<table border="0" cellspacing="0" cellpadding="0" summary="一覧" class="listTable modform commenttable">
<tbody>
<tr>
<th scope="col">コメント</th>
</tr>
<?php

$sql=sprintf("select id,pageid,(select title from repo_n where id=pageid) as pagetitle,comment,commentid,(select title from u_member where id=userid) as name,(select flag from u_member where id=userid) as userflag,regitime,flag from u_comment where id=%s order by id desc;", $_GET["id"]);
$o->query($sql);

while($f=$o->fetch_array()){

?>
<tr>
<td class="comtd">
<p class="comboprder"><img src="/shared/cms/img/cmd_<?=$f["flag"]==1?"":"dis"?>active.gif" class="combtn" id="c<?=$f["id"]?>" />ページタイトル：<a href="https://www.undotsushin.com/p/<?=$f["pageid"]?>/comment/<?php  echo $f["commentid"]==0?$f["id"]:sprintf("%s/%s",$f["commentid"],$f["id"]); ?>" target="_blank"><?=$f["pagetitle"]?></a>　投稿日時：<?php preg_match('/([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})/',$f["regitime"],$m);echo $m[1]; ?>　投稿者：<b><?=$f["name"]?></b><?php if($f["userflag"]==0)echo " (※退会)" ?></p>
<?=mod_HTML($f["comment"],2)?></td>
</tr>

<?php } ?>
</tbody>
</table>


</div>
</div>

<script>
$(function(){
	
	$(".bddisp").click(function(){
		var s=$(this).attr("id").replace("u","");
		$("#s"+s).toggle();
	});
	
});
</script>

</body>
</html>