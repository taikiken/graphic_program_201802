<?php


include $INCLUDEPATH."local.php";
include $INCLUDEPATH."login.php";

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" >
<meta name="robots" content="noindex,nofollow" >
<meta name="robots" content="noarchive" >
<link rel="stylesheet" href="/shared/cms/css/base.css" >
<link rel="stylesheet" href="/shared/cms/css/input.css" >
<script src="/shared/cms/js/base.js"></script>
<script src="/shared/cms/login.js"></script>
<title><?php printf("%s WEB サイト管理画面",$SITE); ?></title>
</head>
<body>
<div id="wrapper">
<form name="form" method="post" action="index.php" onSubmit="return chkform()">
<div id="headerArea">
<div id="expBox" class="br">
<div id="titleBox">
<h1 class="clearfix">
<ul class="pnkz">
<!--
<li><?=$ROOT?></li>
-->
<li><?=$SITE?>Webサイト管理画面</li>
<li class="def2"><span>ログイン</span></li>
</ul>
</h1>

</div><!-- End titleBox -->
</div><!-- End expBox -->
</div><!-- End headerArea -->

<div id="mainArea">
<div id="pageDescription">
<p><?php if($err==1){ ?>アカウントID、パスワードが一致しません。 お手数ですが、よくお確かめのうえもう一度入力してください。<?php }else{ ?>コンテンツ管理を行うにはログインが必要です。アカウントIDとパスワードを入力してください。 <?php } ?></p>
</div><!-- End pageDescription -->
<table border="0" cellspacing="0" cellpadding="0" summary="一覧" class="listTable">
<tbody>
<tr>
<th colspan="2" class="inputHeader" scope="row">ログイン情報</th>
</tr>
<tr>
<td rowspan="2" class="inputTitle" scope="col">アカウントID</td>
<td class="inputFields"><input name="p_usr" type="text" class="in" id="p_usr" size="40" value="<?=htmlspecialchars($sv["p_usr"])?>" ></td>
</tr>
<tr>
<td class="inputCap">アカウントIDを入力してください。</td>
</tr>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<tr>
<td rowspan="2" class="inputTitle" scope="col">パスワード</td>
<td class="inputFields"><input name="p_pwd" type="password" class="in" id="p_pwd" size="38" value="<?=htmlspecialchars($sv["p_pwd"])?>" ></td>
</tr>
<tr>
<td class="inputCap">パスワードを入力してください。</td>
</tr>
</tbody>
</table>
<div id="pageCommand">
<table width="939" border="0" cellpadding="0" cellspacing="0">
<tr>
<td width="629" align="left"><img src="/shared/cms/img/spacer.gif" alt="#" width="379" height="1" ></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_login.gif" alt="ログインする" width="150" height="25" border="0" onmouseover="btn_rollover(this)" onmouseout="btn_rollout(this)" ></td>
</tr>
</table>
</div>
</div>
</form>
</div>
</body>
</html>
