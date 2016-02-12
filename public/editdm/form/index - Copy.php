<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

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
<script src="/shared/js/jquery-1.11.0.min.js" type="text/javascript"></script>
<title>セミナー申し込み一覧｜gp-assetWEB サイト管理画面</title>
</head>
<body>
<div id="wrapper">

<div id="mainArea">
<div><img src="/shared/cms/img/main_headerimg.gif" width="951" height="2" ></div>

<table border="0" cellspacing="0" cellpadding="0" summary="一覧" class="listTable modform">
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
