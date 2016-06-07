
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
<link rel="stylesheet" href="/shared/cms/css/input.css" >
<link rel="stylesheet" href="/shared/cms/css/j.css" >
<script src="/shared/cms/js/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="/shared/cms/js/jquery.cookie.js" type="text/javascript"></script>
<script src="/shared/cms/js/lightbox_cms.js" type="text/javascript"></script>
<script src="/shared/cms/js/swfobject.js" type="text/javascript"></script>
<script src="/shared/cms/js/base.js"></script>
<script src="/shared/cms/ckeditor/ckeditor.js" type="text/javascript"></script>
<script src="/shared/cms/ckeditor/load.js" type="text/javascript"></script>
<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
	
	var s=[1,2,3,4]
	
	alert($.inArray(5,s));
	
});
var dir=1;
var fil=0;
var cid=3;
var rid=2;
var cd="u_member";
var ct="2016/05/23 00:03:50";
</script>
<link rel="stylesheet" href="/shared/cms/css/lightbox.css" type="text/css" media="screen" >
<title>会員-編集｜メディア｜運動通信WEB サイト管理画面</title>
</head>
<body>
<div id="wrapper">
<div class="clearfix headermenu">
<ul class="utilityMenu clearfix">
<li><a href="/editdm/logout/">ログアウト</a></li>
<li><a href="/editdm/log/">操作履歴</a></li>
</ul>
</div>
<form name="f" enctype="multipart/form-data" action="" method="post">
<div id="headerArea">
<div id="expBox" class="br">

<div id="titleBox">

<h1 class="clearfix">
<ul class="pnkz clearfix">
<li class="pl0"><a href="/editdm/">管理メニューTOP</a></li>
<li><a href="/editdm/repo_n/?cid=8&rid=7">ヘッドライン</a></li>
<li><a href="/editdm/repo_n/?cid=1">記事一覧</a></li>
<li><a href="/editdm/comment/">コメント一覧</a></li>
<li><a href="/editdm/pm_/?cid=20">カテゴリー一覧</a></li>
<li><a href="/editdm/repo_s/?rid=2">会員一覧</a></li>
<!--
<li class="pickup"><a href="/editdm/pickup/">ピックアップ</a></li>
<li><a href="/editdm/repo_n/?cid=24">ホーム動画</a></li>
<li><a href="/editdm/repo_n/?cid=6">ライター設定</a></li>
<li><a href="/editdm/repo_s/?rid=2">LOCATION/CATEGORY設定</a></li>
--></ul>
</h1>
</div><!-- End titleBox -->
</div><!-- End expBox -->
</div><!-- End headerArea -->
<div id="topicPath">
<ul>
<li class="root"><a href="/editdm/">メインメニュー</a></li><li><a href="/editdm/repo_s/?rid=2">会員</a></li><li><a href="/editdm/repo_n/?cid=3&rid=2">メディア</a></li><li class="def2">会員：<span>編集</span>-確認-終了</li>
</ul>
</div><!-- End topicPath -->
<div id="loadingDiv"><p class="swtxt">画像をリサイズしています.....</p></div>

<div id="mainArea">
<div id="pageDescription" class="clearfix">

							
		<p>メディアの会員 [ 朝日新聞社 ] を編集します。</p>
		<p>編集する項目を入力して「編集した内容を確認する」ボタンを押してください。</p>
		
				
			
	
</div><!-- End pageDescription -->
<table border="0" cellspacing="0" cellpadding="0" summary="会員編集項目" class="listTable">
<tbody>
<tr>
<th colspan="2" class="inputHeader" scope="row">会員設定</th>
</tr>

<tr class="title"><td class="inputTitle">ユーザ名</td><td class="inputFields"><div class="clearfix  fl langs"><input type="text" style="width:350px;" name="p_title" value="朝日新聞社" class="in q0"></div></td></tr><tr class="t1"><td rowspan="2" class="inputTitle">メールアドレス</td><td class="inputFields"><div class="clearfix  fl langs"><input type="text" style="width:525px;" name="p_t1" value="info@asahi.com" class="in q0"></div></td></tr><tr><td class="inputCap">メールアドレスはアカウント名として使用されます。</td></tr>
	
		<tr>
		<td rowspan="2" class="inputTitle">パスワード</td>
		<td class="inputFields"><input type="password" name="p_passwd" value="" size="20" class="in" ></td>
		</tr>
		<tr>
		<td class="inputCap">※パスワードは暗号化されており表示されませんので、再設定する際のみ入力してください。</td>
		</tr>

		
<tr class="a15"><td class="inputTitle">トークン</td><td class="inputFields"><div class="clearfix  fl langs"><input type="text" style="width:350px;" name="p_a15" value="c22410b28fc475b6198100015e756c65" class="in q0"></div></td></tr><tr><td rowspan="2" class="inputTitle">プロフィール画像</td><td class="inputFields"><table class="copyright"><tr><td class="cell1"><input name="img1" type="file" size="40" class="ins files" ><input type="hidden" name="oimg1" value=""></td></tr></table></td></tr><tr><td class="inputCap"> サイズ：[ 2Mbyte ]以下、種類：[ JPG | PNG | GIF | SWF ]のファイルをアップロードすることができます。<br >横：[ 728px ] x 縦：[ 任意 ]以上のファイルは自動でリサイズされますが、編集することができます。</td></tr><tr class="t2"><td class="inputTitle">肩書</td><td class="inputFields"><div class="clearfix  fl langs"><input type="text" style="width:525px;" name="p_t2" value="" class="in q0"></div></td></tr>
	
		<tr class="t20">
		<td class="inputTitle">カテゴリー</td>
		<td class="inputFields"><table border="0" cellpadding="0" cellspacing="5">
<tr>
<td><input type="checkbox" class="box" name="p_t20[]" value="113" id="t200"><label for="t200">野球</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="114" id="t201"><label for="t201">サッカー</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="115" id="t202"><label for="t202">バスケットボール</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="116" id="t203"><label for="t203">ゴルフ</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="117" id="t204"><label for="t204">テニス</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="118" id="t205"><label for="t205">相撲・格闘技</label></td>
</tr>
<tr>
<td><input type="checkbox" class="box" name="p_t20[]" value="119" id="t206"><label for="t206">バレーボール</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="120" id="t207"><label for="t207">ラグビー</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="121" id="t208"><label for="t208">アメフト</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="122" id="t209"><label for="t209">陸上競技</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="123" id="t2010"><label for="t2010">水泳</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="124" id="t2011"><label for="t2011">卓球</label></td>
</tr>
<tr>
<td><input type="checkbox" class="box" name="p_t20[]" value="125" id="t2012"><label for="t2012">モータースポーツ</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="126" id="t2013"><label for="t2013">アクションスポーツ</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="127" id="t2014"><label for="t2014">ウィンタースポーツ</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="128" id="t2015"><label for="t2015">パラスポーツ</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="129" id="t2016"><label for="t2016">その他競技</label></td>
<td><input type="checkbox" class="box" name="p_t20[]" value="133" id="t2017"><label for="t2017">スポーツビジネス</label></td>
</tr>
<tr>
<td><input type="checkbox" class="box" name="p_t20[]" value="130" id="t2018"><label for="t2018">Facebook 話題の投稿</label></td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</table>
</td>
		</tr>
        
		
<tr>
<th colspan="2" class="inputHeader" scope="row">SNS連携</th>
</tr>
<tr class="b1"><td class="inputTitle">Facebook ID</td><td class="inputFields"><div class="clearfix  fl langs"><input type="text" style="width:140px;" name="p_b1" value="" class="in q0"></div></td></tr><tr class="b3"><td class="inputTitle">Twitter ID</td><td class="inputFields"><div class="clearfix  fl langs"><input type="text" style="width:140px;" name="p_b3" value="" class="in q0"></div></td></tr><tr>
<th colspan="2" class="inputHeader" scope="row">バナー</th>
</tr>
<tr class="alt"><td class="inputTitle">バナータイトル</td><td class="inputFields"><div class="clearfix  fl langs"><input type="text" style="width:700px;" name="p_alt" value="" class="in q0"></div></td></tr><tr><td rowspan="2" class="inputTitle">PC用バナー</td><td class="inputFields"><table class="copyright"><tr><td class="cell1"><input name="pcimg" type="file" size="40" class="ins files" ><input type="hidden" name="opcimg" value=""></td></tr></table></td></tr><tr><td class="inputCap"> サイズ：[ 2Mbyte ]以下、種類：[ JPG | PNG | GIF | SWF ]のファイルをアップロードすることができます。<br >横：[ 728px ] x 縦：[ 90px ]以上のファイルは自動でリサイズされますが、編集することができます。</td></tr><tr class="pclink"><td class="inputTitle">PC用URL</td><td class="inputFields"><div class="clearfix  fl langs"><input type="text" style="width:700px;" name="p_pclink" value="" class="in q0"></div></td></tr><tr><td rowspan="2" class="inputTitle">スマホ用バナー</td><td class="inputFields"><table class="copyright"><tr><td class="cell1"><input name="spimg" type="file" size="40" class="ins files" ><input type="hidden" name="ospimg" value=""></td></tr></table></td></tr><tr><td class="inputCap"> サイズ：[ 2Mbyte ]以下、種類：[ JPG | PNG | GIF | SWF ]のファイルをアップロードすることができます。<br >横：[ 640px ] x 縦：[ 200px ]以上のファイルは自動でリサイズされますが、編集することができます。</td></tr><tr class="splink"><td class="inputTitle">スマホ用URL</td><td class="inputFields"><div class="clearfix  fl langs"><input type="text" style="width:700px;" name="p_splink" value="" class="in q0"></div></td></tr><tr>
<th colspan="2" class="inputHeader" scope="row">ステータス設定</th>
</tr>
<tr>
<td class="inputTitle">公開ステータス</td>
<td class="inputFields">
<table border="0" cellpadding="0" cellspacing="5">
<tr>
<td>
<input type="radio" class="box" name="p_flag" value="1" id="flag0" checked /><label for="flag0">公開</label>
<input type="radio" class="box" name="p_flag" value="2" id="flag1" /><label for="flag1">非公開</label>
</td>
</tr>
</table>
</td>
</tr>


</tbody>
</table>
<div class="debug"></div>
<div id="pageCommand">



<table width="100%" class="rollover2" cellpadding="0" cellspacing="0">
<tr>
<td align="left"><img src="/shared/cms/img/spacer.gif" alt="#" height="1" ></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_edit.gif" alt="編集した内容を確認する" width="150" height="25" class="rollover2"></td>
</tr>
</table>

</div>
</div>
<script type="text/javascript">
document.f.action="./conf.php?nid=1&cid=3&rid=2";
</script>
</form>
</div>
<div id="container" onclick="wrapperback()"></div>
<div id="flash"></div>
<div class="optionsel"><ul></ul></div>
<div id="flashimg"></div><div id="overwrap"></div><div class="lbbg"></div>
<div class="lenz"><img src="/shared/cms/img/large.png" alt="大きいサイズの画像を編集" title="大きいサイズの画像を編集" width="50" height="50" ></div>
<div class="optionselbg"></div>

<script type="text/javascript">
var fieldname="title";
var where="";
</script>
</body>
</html>
