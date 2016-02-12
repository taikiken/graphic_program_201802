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

<script src="/shared/js/jquery.js" type="text/javascript"></script>
<script src="/shared/js/lightbox_cms.js" type="text/javascript"></script>
<script src="/shared/js/swfobject.js" type="text/javascript"></script>
<script src="/shared/cms/js/base.js"></script>
<link rel="stylesheet" href="/shared/css/common/lightbox.css" type="text/css" media="screen" >
<title>アーティスト-編集｜アーティスト｜カロンズネットWEB サイト管理画面</title>
</head>
<body>
<div id="wrapper">
<form name="f" enctype="multipart/form-data" action="" method="post">
<div id="headerArea">
<div id="globalMenu">
<ul class="utilityMenu">
<li><a href="/editdm/log/"><img src="/shared/cms/img/top_b_log.gif" alt="操作履歴" width="47" height="11" ></a></li>
<!--<li><a href="/editdm/help/"><img src="/shared/cms/img/top_b_help.gif" alt="ヘルプ" width="38" height="10" ></a></li>-->
<li><a href="/editdm/logout/"><img src="/shared/cms/img/top_b_logout.gif" alt="ログアウト" width="56" height="10" ></a></li>
</ul>
<ul>
<li><a href="/editdm/"><img src="/shared/cms/img/top_b_mainmenu.gif" alt="メインメニュー" width="77" height="9" ></a></li>
	<li><a href="/editdm/repo_s/?rid=2"><img src="/shared/cms/img/top_b_this.gif" alt="このディレクトリのトップへ" ></a></li>
</ul>
</div><!-- End globalMenu -->
<div id="expBox" class="br">
<div id="helpImg"><img src="/shared/cms/img/top_helpimg.gif" alt="ヘルプ" width="700" height="35" border="0" usemap="#Mp" ></div>
<map name="Mp" id="Mp">
<area shape="rect" coords="0,0,118,35" href="#" alt="ブラウザでプレビュー" onmouseover="dpHELP(1)" onmouseout="dpHELP(0)" >
<area shape="rect" coords="118,0,234,35" href="#" alt="Pdfをプレビュー" onmouseover="dpHELP(2)" onmouseout="dpHELP(0)" >
<area shape="rect" coords="234,0,351,35" href="#" alt="Pingを飛ばす" onmouseover="dpHELP(3)" onmouseout="dpHELP(0)" >
<area shape="rect" coords="351,0,467,35" href="#" alt="RSSをプレビュー" onmouseover="dpHELP(4)" onmouseout="dpHELP(0)" >
<area shape="rect" coords="467,0,584,35" href="#" alt="CSVをダウンロード" onmouseover="dpHELP(5)" onmouseout="dpHELP(0)" >
<area shape="rect" coords="584,0,700,35" href="#" alt="HTMLソースを表示" onmouseover="dpHELP(6)" onmouseout="dpHELP(0)" >
</map>
<div id="helpExp">
<p><img src="/shared/cms/img/cmd_up.gif" alt="一つ上へ" width="13" height="13" >は並び順を一つ上に、<img src="/shared/cms/img/cmd_down.gif" alt="一つ下へ" width="13" height="13" >は一つ下に入れ替えます。<img src="/shared/cms/img/cmd_active.gif" alt="表示" width="13" height="13" >は表示に、<img src="/shared/cms/img/cmd_disactive.gif" alt="非表示" width="13" height="13" >は非表示に設定されていることを表し、それぞれクリックで切り替えます。</p>
<p><img src="/shared/cms/img/cmd_newicon.gif" alt="新規エントリ" width="13" height="11" >はアクティブになっているカテゴリに新規エントリをします。</p>
</div><!-- End helpExp -->
<div id="titleBox">
<div id="topicPath">
<ul>
<li class="root"><a href="/editdm/">メインメニュー</a></li><li><a href="/editdm/repo_s/?rid=2">アーティスト</a></li></ul>
</div><!-- End topicPath -->
<h1>
<ul>
<li>アーティスト管理</li>
<li class="def2"><span>編集</span>-確認-終了</li>
</ul>
</h1>
</div><!-- End titleBox -->
</div><!-- End expBox -->
<div><img src="/shared/cms/img/top_footerimg.gif" width="951" height="3" alt="#" ></div>
</div><!-- End headerArea -->
<div id="mainArea">
<div><img src="/shared/cms/img/main_headerimg.gif" width="951" height="2" ></div>

<div id="pageDescription">

							
		<p>アーティストのアーティスト [ 奈良美智 ] を編集します。</p>
		<p>編集する項目を入力して「編集した内容を確認する」ボタンを押してください。</p>
		
				
			
	
</div><!-- End pageDescription -->
<div id="loadingDiv"><div class="img"><img src="/shared/img/lightbox/loading.gif" width="32" height="32" ></div></div>
<table border="0" cellspacing="0" cellpadding="0" summary="アーティスト編集項目" class="listTable">
<tbody>
<tr>
<th colspan="2" class="inputHeader" scope="row">アーティスト設定</th>
</tr>


			
		<tr>
		<td rowspan="2" class="inputTitle">アーティスト名</td>
		<td class="inputFields">
		        <table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
        <tr>
        <th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
        <th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
        </tr>
        <tr>
        <td class="japanese"><input type="text" size="56" name="p_name" value="奈良美智" class="in" ></td>
        <td class="english"><input type="text" size="56" name="p_name_e" value="TOSHITOMO NARA" class="in" ></td>
        </tr>
        </table>
        		</td>
		</tr>
		<tr>
		<td class="inputCap">アーティスト名を入力してください。</td>
		</tr>

				
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<tr><td rowspan="2" class="inputTitle">所属ギャラリー</td><td class="inputFields"><label for="n1" class="pulldownmenulabel"><select name="p_n1" size="3"><option value="">---選択しない---</option><option value="1" selected>ミズマアートギャラリー</option><option value="2">小山登美夫ギャラリー</option></select></label></td></tr><tr><td class="inputCap">所属ギャラリーを選択してください。</td></tr><tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
	
				<tr>
		<td class="inputTitle">元画像</td>
		<td class="inputFields">
		<ul class="imglist"><li><a href="/prg_img/img/img2008090700121211309100.jpg?m=0.969847" class="lightbox" rel="lightbox[img]"><img src="../../../prg_img/thumbnail1/img2008090700121211309100.jpg?m=0345370.970146" width="320" height="320" border="0" alt="" name="img11" ></a><br ><a href="javascript:editImages('img2008090700121211309100.jpg',1,320,320,'KOYAMATOMIO5',1,1,4,'img11','../../../prg_img/thumbnail1/',0)"><img src="/shared/cms/img/btn_thumnail.png" alt="サムネイル画像を編集する" width="90" height="25" ></a></li><li><a href="/prg_img/img/img2008090700121211309100.jpg?m=0.969847" class="lightbox" rel="lightbox[img]"><img src="../../../prg_img/thumbnail2/img2008090700121211309100.jpg?m=0345370.970322" width="120" height="120" border="0" alt="" name="img12" ></a><br ><a href="javascript:editImages('img2008090700121211309100.jpg',2,120,120,'KOYAMATOMIO5',0,0,0,'img12','../../../prg_img/thumbnail2/',0)"><img src="/shared/cms/img/btn_thumnail.png" alt="サムネイル画像を編集する" width="90" height="25" ></a></li></ul><script type="text/javascript">ImgData[0]=['img2008090700121211309100.jpg',0,640,480,'KOYAMATOMIO5',1,,,'0','../../../prg_img/img/',2];</script>        <div class="imgDelete"><input name="d_img1" type="checkbox" id="d_img1" value="1" ><label for="d_img1">削除する場合はチェックしてください</label></div>
        </td>
		</tr>
				<tr>
		<td rowspan="2" class="inputTitle">画像</td>
		<td class="inputFields">
		        <table border="0" cellpadding="0" cellspacing="0" class="copyright">
        <tr>
        <td class="cell1"><input name="img1" type="file" size="40" class="ins" ><input type="hidden" name="oimg1" value="img2008090700121211309100.jpg" ></td>
        <td class="cell2">コピーライト：</td>
        <td class="cell3"><input type="text" name="p_img1copy" value="KOYAMATOMIO5" size="42" class="in" ></td>
        </tr>
        </table>
        </td>
		</tr>
		<tr>
		<td class="inputCap"> サイズ：[ 2Mbyte ]以下、種類：[ JPG | PNG | GIF | SWF ]のファイルをアップロードすることができます。<br >横：[ 640px ] x 縦：[ 任意 ]以上のファイルは自動でリサイズされますが、編集することができます。</td>
		</tr>

	
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>

	
		<tr>
		<td rowspan="2" class="inputTitle">プロフィール</td>
		<td class="inputFields">

<div class="TagsOn"><label for="b1tag"><input type="checkbox" class="box" name="p_b1tag" id="b1tag" value="2" onclick="i(this.checked,'htmlb1tag',1)" >HTMLタグを有効にする</label></div>
<div class="japTitle b_label"><img src="/shared/cms/img/jp.png" width="16" height="11" ><span>日本語</span></div>
<textarea name="p_b1" rows="10">出生後青森県立弘前高等学校卒業まで弘前市で育つ。武蔵野美術大学を1年で中退して、1985年愛知県立芸術大学美術学部卒、1987年同大大学院修了。美術系予備校教員を経て渡独、1988年ドイツ国立デュッセルドルフ芸術アカデミー（Kunstakademie Dsseldorf）に入学、A.R.ペンク（A. R. Penck）に師事し1993年マイスターシュウラー取得。その後ケルン近郊のアトリエを拠点に作品を制作、欧米を中心に国際的に注目される。1995年名古屋市芸術奨励賞受賞。1998年カリフォルニア大学ロサンゼルス校客員教授を村上隆と3か月間務める。2000年8月ドイツから帰国、東京に居住。2005年より栃木県在住。2006年度武蔵野美術大学客員教授。</textarea>
<div id="htmlb1tag">
<ul><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" ></a></li><!--
--></ul>
</div>
<div class="engTitle b_label"><img src="/shared/cms/img/us.png" width="16" height="11" ><span>英語</span></div>
<textarea name="p_b1_e" rows="10"></textarea>
<div id="htmlb1tag_e">
<ul><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" ></a></li><!--
--><li><a href="#b1tag" onclick="return formatStr(document.f.p_b1_e,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" ></a></li><!--
--></ul>
</div>

		</td>
		</tr>
		<tr>
		<td class="inputCap">プロフィールを入力してください。</td>
		</tr>

		

<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>

	
		<tr>
		<td rowspan="2" class="inputTitle">バイオグラフィー</td>
		<td class="inputFields">

<div class="TagsOn"><label for="b2tag"><input type="checkbox" class="box" name="p_b2tag" id="b2tag" value="2" checked="checked" onclick="i(this.checked,'htmlb2tag',1)" >HTMLタグを有効にする</label></div>
<div class="japTitle b_label"><img src="/shared/cms/img/jp.png" width="16" height="11" ><span>日本語</span></div>
<textarea name="p_b2" rows="10">&lt;dl&gt;
&lt;dt&gt;2003年9月12日～2004年1月4日 &lt;/dt&gt;
&lt;dd&gt;個展「Nothing Ever Happens」 クリーブランド現代美術館（以後、ペンシルバニア大学現代美術館、サンノゼ美術館、セントルイス現代美術館、ホノルル現代美術館を巡回）&lt;/dd&gt;
&lt;dt&gt;2004年8月11日～10月11日 &lt;/dt&gt;
&lt;dd&gt;個展「From the Depth of My Drawer」 原美術館（以後、金津創作の森（福井県）、米子市美術館、吉井酒造煉瓦倉庫（下記）、ロダンギャラリー（ソウル）を巡回）&lt;/dd&gt;
&lt;dt&gt;2005年4月16日～5月22日 &lt;/dt&gt;
&lt;dd&gt;個展「From the Depth of My Drawer」 吉井酒造煉瓦倉庫&lt;/dd&gt;
&lt;dt&gt;2005年9月28日～12月18日 &lt;/dt&gt;
&lt;dd&gt;グループ展 奈良美智＋graf「A to Z」 横浜トリエンナーレ&lt;/dd&gt;
&lt;dt&gt;2006年7月29日～10月22日 &lt;/dt&gt;
&lt;dd&gt;個展 奈良美智＋graf「A to Z」 吉井酒造煉瓦倉庫&lt;/dd&gt;
&lt;dt&gt;2006年9月30日～2007年3月21日 &lt;/dt&gt;
&lt;dd&gt;個展「Moonlight Serenade -月夜曲」 金沢21世紀美術館&lt;/dd&gt;
&lt;dt&gt;2006年11月3日～2007年1月14日 &lt;/dt&gt;
&lt;dd&gt;グループ展「広島市現代美術館コレクションによる『この20年の、20のアート』」 札幌芸術の森美術館&lt;/dd&gt;
&lt;dt&gt;2007年6月2日～2007年10月7日 &lt;/dt&gt;
&lt;dd&gt;個展 奈良美智＋graf「Yoshitomo Nara 奈良美智＋graf展」 ハーグ現代美術館&lt;/dd&gt;
&lt;dt&gt;2007年9月21日～2008年1月6日 &lt;/dt&gt;
&lt;dd&gt;個展 奈良美智＋graf「Torre de Malaga (Tower of Malaga)」 マラガ現代美術館&lt;/dd&gt;
&lt;/dl&gt;</textarea>
<div id="htmlb2tag"style="display:block;">
<ul><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" ></a></li><!--
--></ul>
</div>
<div class="engTitle b_label"><img src="/shared/cms/img/us.png" width="16" height="11" ><span>英語</span></div>
<textarea name="p_b2_e" rows="10"></textarea>
<div id="htmlb2tag_e"style="display:block;">
<ul><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'strong')"><img src="/shared/cms/img/html_bold.gif" width="31" height="17" alt="太字にする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'i')"><img src="/shared/cms/img/html_italic.gif" width="31" height="17" alt="斜体にする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'u')"><img src="/shared/cms/img/html_underline.gif" width="31" height="17" alt="下線を引く" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'strike')"><img src="/shared/cms/img/html_strike.gif" width="31" height="17" alt="打ち消し線を引く" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'sup')"><img src="/shared/cms/img/html_sup.gif" width="31" height="17" alt="上付き文字にする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'sub')"><img src="/shared/cms/img/html_sub.gif" width="31" height="17" alt="下付き文字にする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'br')"><img src="/shared/cms/img/html_br.gif" width="31" height="17" alt="改行をはさむ" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'h4')"><img src="/shared/cms/img/html_h4.gif" width="31" height="17" alt="見出しにする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'blockquote')"><img src="/shared/cms/img/html_blockquote.gif" width="31" height="17" alt="引用で囲む" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'p')"><img src="/shared/cms/img/html_p.gif" width="31" height="17" alt="段落に変更する" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'table')"><img src="/shared/cms/img/html_table.gif" width="31" height="17" alt="表組みにする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'list')"><img src="/shared/cms/img/html_ul.gif" width="31" height="17" alt="リストにする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'dl')"><img src="/shared/cms/img/html_dl.gif" width="31" height="17" alt="定義リストにする" ></a></li><!--
--><li><a href="#b2tag" onclick="return formatStr(document.f.p_b2_e,'note')"><img src="/shared/cms/img/html_note.gif" width="31" height="17" alt="注記リストにする" ></a></li><!--
--></ul>
</div>

		</td>
		</tr>
		<tr>
		<td class="inputCap">バイオグラフィーを入力してください。</td>
		</tr>

		

<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<tr>
<th colspan="2" class="inputHeader" scope="row">アーティストコンテンツメタ情報設定</th>
</tr>


			
		<tr>
		<td rowspan="2" class="inputTitle">キーワード</td>
		<td class="inputFields">
		        <table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
        <tr>
        <th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
        <th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
        </tr>
        <tr>
        <td class="japanese"><input type="text" size="45" name="p_keyword" value="" class="in" ></td>
        <td class="english"><input type="text" size="45" name="p_keyword_e" value="" class="in" ></td>
        </tr>
        </table>
        		</td>
		</tr>
		<tr>
		<td class="inputCap">HTMLのメタタグ keyword を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。</td>
		</tr>

				
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>

	
		<tr>
		<td rowspan="2" class="inputTitle">ディスクリプション</td>
		<td class="inputFields">

<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese"><textarea name="p_description" rows="5" class="bltext"></textarea></td>
<td class="english"><textarea name="p_description_e" rows="5" class="bltext"></textarea></td>
</tr>
</table>

		</td>
		</tr>
		<tr>
		<td class="inputCap">HTMLのメタタグ description を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。</td>
		</tr>

		

<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<tr>
<th colspan="2" class="inputHeader" scope="row">アーティスト公開設定</th>
</tr>

	
		<tr>
		<td rowspan="2" class="inputTitle">公開設定</td>
		<td class="inputFields"><table border="0" cellpadding="0" cellspacing="5">
<tr>
<td><input type="radio" class="box" name="p_oc" value="54" id="oc0" onclick="chgExpire(this.value)" checked><label for="oc0">設定しない</label></td>
<td><input type="radio" class="box" name="p_oc" value="55" id="oc1" onclick="chgExpire(this.value)"><label for="oc1">設定する</label></td>
</tr>
</table>
</td>
		</tr>
		<tr>
		<td class="inputCap">公開設定を選択してください。</td>
		</tr>

		
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>

<tr>
<td rowspan="2" class="inputTitle">公開スケジュール</td>
<td class="inputFields">

		
		<select name="p_sy">
		<option value="" selected></option>
				<option value="2008">2008</option>
				<option value="2009">2009</option>
				<option value="2010">2010</option>
				<option value="2011">2011</option>
				<option value="2012">2012</option>
				<option value="2013">2013</option>
				</select> 年
		<select name="p_sm">
		<option value="" selected></option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
				</select> 月
				<select name="p_sd">
		<option value="" selected></option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
				<option value="13">13</option>
				<option value="14">14</option>
				<option value="15">15</option>
				<option value="16">16</option>
				<option value="17">17</option>
				<option value="18">18</option>
				<option value="19">19</option>
				<option value="20">20</option>
				<option value="21">21</option>
				<option value="22">22</option>
				<option value="23">23</option>
				<option value="24">24</option>
				<option value="25">25</option>
				<option value="26">26</option>
				<option value="27">27</option>
				<option value="28">28</option>
				<option value="29">29</option>
				<option value="30">30</option>
				<option value="31">31</option>
				</select> 日
		
		
～
		
		<select name="p_ey">
		<option value="" selected></option>
				<option value="2008">2008</option>
				<option value="2009">2009</option>
				<option value="2010">2010</option>
				<option value="2011">2011</option>
				<option value="2012">2012</option>
				<option value="2013">2013</option>
				</select> 年
		<select name="p_em">
		<option value="" selected></option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
				</select> 月
				<select name="p_ed">
		<option value="" selected></option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
				<option value="13">13</option>
				<option value="14">14</option>
				<option value="15">15</option>
				<option value="16">16</option>
				<option value="17">17</option>
				<option value="18">18</option>
				<option value="19">19</option>
				<option value="20">20</option>
				<option value="21">21</option>
				<option value="22">22</option>
				<option value="23">23</option>
				<option value="24">24</option>
				<option value="25">25</option>
				<option value="26">26</option>
				<option value="27">27</option>
				<option value="28">28</option>
				<option value="29">29</option>
				<option value="30">30</option>
				<option value="31">31</option>
				</select> 日
		
		
</td>
</tr>
<tr>
<td class="inputCap">公開スケジュールを選択してください。</td>
</tr>


</tbody>
</table>
<div class="debug"></div>
<div id="pageCommand">

<table width="939" border="0" cellpadding="0" cellspacing="0">
<tr>
<td width="629" align="left"><img src="/shared/cms/img/spacer.gif" alt="#" width="629" height="1" ></td>
<td width="160"><img src="/shared/cms/img/spacer.gif" alt="#" width="160" height="1" ></td>
<td width="150" class="bg"><input name="imageField" type="image" src="/shared/cms/img/btn_edit.gif" alt="編集した内容を確認する" width="150" height="25" border="0" onmouseover="btn_rollover(this)" onmouseout="btn_rollout(this)" ></td>
</tr>
</table>
<script type="text/javascript">chgExpire(54)</script>
</div>
</div>
<script type="text/javascript">
document.f.action="./conf.php?id=3&rid=2";
</script>
</form>
</div>
<div id="container" onclick="wrapperback()"><div id="flash"></div></div>
<div id="flashimg"></div>
<div id="overwrap"></div>
<div class="lenz"><img src="/shared/cms/img/large.png" alt="" width="52" height="53" ></div>
<script type="text/javascript">
document.getElementById("loadingDiv").style.display="none";
window.onload=initRollovers;
$(document).ready(function(){
	$(".lightbox").lightbox();
});

$('.lightbox').mouseover(function(){
	if($("#overwrap").css("display")=="none"){
		var t=$(this).offset();
		var w=$(this).width()-5;
		var h=$(this).height();
		q=this;
		//alert([t.top,t.left])
		$("#overwrap").css("left",t.left);
		$("#overwrap").css("top",t.top);
		$("#overwrap").width(w);
		$("#overwrap").height(h);
		$(".lenz").css("left",t.left+(w-52)/2);
		$(".lenz").css("top",t.top+(h-52)/2);
		$(".lenz").show();
		$("#overwrap").show();
	}
});
$('#overwrap').mouseout(function(){
	$("#overwrap").hide();
	$(".lenz").hide();
});
$('#overwrap').click(function(){
	$("#overwrap").hide();
	$(".lenz").hide();
	$(q).click();
});

</script>
</body>
</html>
