<?php if($q->get_file()!=2){ ?>
	<tr>
	<td class="confTitle" scope="col">ライブラリ名</td>
	<td class="confFields">
	<?php if(($q->get_file()==0&&$q->get_dir()==0)||($q->get_file()==0&&$q->get_dir()==1)){ ?>
	
	<script language="javascript">
	function chg_form(c){
		if(c!="")document.location.href=".?<?=$g->g_url("c")?>&c="+c;
	}
	</script>
	
	<select name="p_f_type" id="p_f_type" onChange="javascript:chg_form(this.value)">
	<option value="">ライブラリ選択</option>
	<?php
	
		$sql="select * from tool where cid=1 order by id";
		$o->query($sql);
		$II=0;
		while($f=$o->fetch_array($II)){
	
	?>
	<option value="<?=$f["_value"]?>"<?php if($C==$f["_value"])echo " selected"; ?>><?=$f["_key"]?></option>
	<?php $II++; ?>
	<?php } ?>
	</select>
<?php

}else{
	
$sql="select _key from tool where _value='".$C."'";
$o->query($sql);
$f=$o->fetch_array();
echo $f["_key"];

}

?>
</td>
</tr>
<?php } ?>



<?php

//項目名
if($C!="menu"){
	$a[]=array("textfield","管理項目ラベル","d_name","60","","管理項目のラベルを入力してください。");
}else{
	$a[]=array("p_menu","マスタ選択","d_name","select id,name from pm");
}
//フィールド名
if($C=="menu"){
	$a[]=array("p_menu","メニュータイプ","f_name","select _value,_key from tool","and cid=3");
	$a[]=array("p_menu","フィールド","f_option6","select _value,_key from tool","and cid=2");
	//$a[]=array("checkbox","フィールドネーム","f_option2","8",sprintf("select _key,_value from tool where cid=%s order by n",($g->f("directory")=="nid")?2:5));
//}elseif($C=="textfield"||$C=="date"||$C=="p_menu"||$C=="startendDate"||$C=="_inputmenu"){
//	$a[]=array("checkbox","フィールドネーム","f_name","10",sprintf("select _key,_value from tool where cid=%s order by n",($g->f("directory")=="nid")?2:5));
}elseif($C=="head"){

}else{
	$a[]=array("checkbox","フィールドネーム","f_name","8",sprintf("select _key,_value from tool where cid=%s order by n",($g->f("directory")=="nid")?2:5));
//	$a[]=array("p_menu","フィールドネーム","f_name","select _value,_key from tool",sprintf("and cid=%s",($g->f("directory")=="nid")?2:5));
}
//サイズ
if($C=="date"){
	$a[]=array("menu","12","rb",2);
}elseif($C=="p_menu"){
	$a[]=array("textfield","SQL文","f_size","60","","WHERE以外のSELECT句（フィールドはID,ラベルのカンマ区切り）を入力してください。\n例）： select id,name from pm");
}elseif($C=="img"||$C=="imgall"){
	$a[]=array("textfield","画像のオプション","f_size","40","","アップロードする画像のオプションを [ 幅(必須)-高(自由)-コピーライト(0:1)-アイコン(0:1)-アイコン位置(1左上:2右上3:左下4:右下) ] ピクセルで入力してください。");
}elseif($C=="menu"){
	$a[]=array("textfield","折り返し","f_size","10","","ラジオボタン・チェックボックスの項目の折り返し数を入力してください。\nプルダウンの場合は1と入力するとマスタの編集メニュが出なくなります。");
}elseif($C=="flv"){
	$a[]=array("textfield","FLVの最大幅","f_size","10","","アップロードするFLVの最大幅をピクセルで入力してください。");
}elseif($C=="textfield"||$C=="passwd"){
	$a[]=array("textfield","フィールドのサイズ","f_size","20","","テキストフィールドのサイズを入力してください。\n複数ある場合はカンマ区切り。");
}elseif($C=="textarea"){
	$a[]=array("textfield","フィールドの高さ","f_size","10","","テキストエリアの高さを入力してください。");
}elseif($C=="head"||$C=="module1"){

}
//オプション
if($C=="img"){
	$a[]=array("textfield","サムネイル画像幅","f_option","30","","自動生成するサムネイル画像の幅をピクセルで入力してください。\nサイズの異なるサムネイル画像を二点まで自動生成します。");
}elseif($C=="textfield"){
	$a[]=array("textfield","接続語","f_option","20","","フィールドが複数ある場合フィールドとフィールドの間に挟むWORDを入力してください。");
}elseif($C=="p_menu"){
	$a[]=array("textfield","WHERE句","f_option","60","","WHERE句を\"[半角スペース] and \"から入力してください。\n例）： \" and cid=6\"");
}elseif($C=="menu"){
	$a[]=array("textfield","onchangeJS","f_option","60","","プルダウンを選んだ場合のみセレクトタグに onchange の javascript を埋め込むことができます。定義はコントローラで制御してください。");

}elseif($C=="textarea"){
	$a[]=array("menu","11","rb",2,"","","","","","","","f_option");
}else{

}

//オプション2
if($C=="p_menu"){
	$a[]=array("textfield","セレクトボックスサイズ","f_option2","8","","リストの表示件数を数値で選択してください。選択無しの場合、一件のみ選択できます。");
}elseif($C=="menu"){
	$a[]=array("textarea","非イベント系JS","f_option2","10","","プルダウンを選んだ場合のみセレクトタグに onchange の javascript を埋め込むことができます。定義はコントローラで制御してください。");
}elseif($C=="textfield"){
	$a[]=array("textarea","自動メニュー化1","f_option2","5","","テキスト入力されたデータをプルダウンメニュー化できます。");
	$a[]=array("textarea","自動メニュー化2","f_option3","5","","テキスト入力されたデータをプルダウンメニュー化できます。");
	$a[]=array("textarea","自動メニュー化3","f_option4","5","","テキスト入力されたデータをプルダウンメニュー化できます。");
	$a[]=array("textarea","自動メニュー化4","f_option5","5","","テキスト入力されたデータをプルダウンメニュー化できます。");
	$a[]=array("textarea","自動メニュー化5","f_option6","5","","テキスト入力されたデータをプルダウンメニュー化できます。");
}

//オプション3
if($C=="p_menu"){
	$a[]=array("textfield","その他の有無","f_option3","2","","その他を表示するときは1を表示しないときは0を入力してください。");
}

//オプション4
if($C=="p_menu"){
	$a[]=array("textarea","非イベント系JS","f_option4","10","","プルダウンを選んだ場合のみセレクトタグに onchange の javascript を埋め込むことができます。定義はコントローラで制御してください。");
}

if($C!="head"&&$C!="module1"){
	$a[]=array("billingual");
	$a[]=array("textarea","入力補助","f_comment","5","","入力補助を入力してください。");
}

include $INCLUDEPATH."print_write.php";

?>