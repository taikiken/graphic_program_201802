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
<link rel="stylesheet" href="/shared/cms/css/pickup.css" >
<?php if($BILLINGUAL==0){ ?>
<link rel="stylesheet" href="/shared/cms/css/j.css" >
<?php } ?>
<script src="/shared/js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="/shared/js/jquery.cookie.js" type="text/javascript"></script>
<script src="/shared/cms/js/lightbox_cms.js" type="text/javascript"></script>
<script src="/shared/cms/js/base.js"></script>
<script src="/shared/cms/ckeditor/ckeditor.js" type="text/javascript"></script>
<script src="/shared/cms/ckeditor/load.js" type="text/javascript"></script>
<script type="text/javascript">
var dir=5;
var fil=5;
var cid=<?=$cid?>;

<?php

$sql=sprintf("select eid from pickup where cid=%s and lang='%s' order by id",$cid,$_COOKIE["lang"]);
$o->query($sql);
while($f=$o->fetch_array()){
	$c[]=$f["eid"];
}

?>

var originalarno=[<?=@implode(",",$c)?>];
var selectedimgno=[<?=@implode(",",$c)?>];
var selectedimgsrc=[];

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

<table border="0" cellspacing="0" cellpadding="0" summary="一覧" class="listTable modform" style="border-top:1px solid #ccc;margin-top:15px;">
<tbody>
<tr>
<th class="t_numbering" scope="col" width="30">番号</th>
<th scope="col" width="150">日時</th>
<th scope="col" width="150">名前</th>
<th scope="col">メールアドレス</th>
<th scope="col" width="120">本文表示</th>
</tr>
<?php

$sql="select id,name0,bodys,email,m_time from form order by id desc";
$o->query($sql);

while($f=$o->fetch_array()){

?>
<tr><td colspan="7" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" ></td></tr>
<tr>
<td class="numbering"><?=mod_HTML($f["id"])?></td>
<td scope="col"><?php preg_match('/([0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})/',$f["m_time"],$m);echo $m[1]; ?></td>
<td scope="col"><?=mod_HTML($f["name0"])?></td>
<td scope="col"><?=mod_HTML($f["email"])?></td>
<td scope="col"><span class="bddisp" id="u<?=$f["id"]?>">本文表示</span></td>
</tr>
<tr class="hidetd" id="s<?=$f["id"]?>"><td colspan="7"><?=mod_HTML($f["bodys"],1)?></td></tr>

<?php } ?>
<tr><td colspan="7" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" ></td></tr>
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