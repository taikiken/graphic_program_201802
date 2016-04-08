<?php if($q->get_dir()!=2&&$q->get_file()==0){ ?>
<script type="text/javascript">
function chgField(c){
	if(c!="")document.location.href=".?<?=$g->g_url("c")?>&c="+c;
}
</script>
<?php } ?>

<?php

$a[]=array("menu","6","pd",1," onchange=\"chgField(this.value)\"");
if($c){

	if($c==56){
		$a[]=array("textfield","ラベル","fname","40");
	}elseif($c==57){
		$a[]=array("textfield","ラベル","fname","40");
		$a[]=array("menu","7","rb",2);
		$a[]=array("checkbox","フィールドネーム","fvalue","4","select _key,_value from tool where cid=4 order by id");
		$a[]=array("textfield","フィールドサイズ","fsize","20","","テキストフィールドの表示サイズをカンマ区切りで入力してください。\n例）100,100");
		$a[]=array("textfield","最大入力サイズ","msize","20","","テキストフィールドの最大入力サイズをカンマ区切りで入力してください。\n例）100,100");
		$a[]=array("textfield","フィールド接頭語","pre","50","","フィールドの前に表示させる言葉がある場合、カンマ区切りで入力してください。\n例）氏）,名）");
		$a[]=array("textfield","エラー名","sep","50","","複数テキストフィールドがある場合、それぞれの識別子（例：電話番号【市外局番】）をカンマ区切りで入力してください。\n例）市外局番,市内局番,加入番号");
		$a[]=array("textarea","入力注意書き","cap","3","","未入力の場合（ラベル）を入力してくださいと設定されます。");
	}elseif($c==58){
		$a[]=array("textfield","ラベル","fname","40");
		$a[]=array("menu","7","rb",2);
		$a[]=array("checkbox","フィールドネーム","fvalue","4","select _key,_value from tool where cid=4 order by id");
		$a[]=array("textfield","フィールドサイズ","fsize","20");
		//$a[]=array("textfield","フィールド接頭語","pre","50");
		//$a[]=array("textfield","エラー名","sep","50");
		$a[]=array("textarea","入力注意書き","cap","3");
	}elseif($c==59){
		$a[]=array("textfield","ラベル","fname","40");
		$a[]=array("menu","7","rb",2);
		$a[]=array("checkbox","フィールドネーム","fvalue","4","select _key,_value from tool where cid=4 order by id");
		$a[]=array("textarea","選択肢value","fsize","20","","ラジオボタンの選択肢を1項目ずつ改行して入力してください。「その他」と項目を作ると自動的に内容を入力するテキストフィールドが表示されます。");
		$a[]=array("textfield","折り返し数","pre","5");
		//$a[]=array("textfield","エラー名","sep","50");
		$a[]=array("textarea","入力注意書き","cap","3");
	}elseif($c==60){
		$a[]=array("textfield","ラベル","fname","40");
		$a[]=array("menu","7","rb",2);
		$a[]=array("checkbox","フィールドネーム","fvalue","4","select _key,_value from tool where cid=4 order by id");
		$a[]=array("textarea","選択肢value","fsize","20","","プルダウンメニューの選択肢を1項目ずつ改行して入力してください。");
		//$a[]=array("textfield","折り返し数","pre","5");
		//$a[]=array("textfield","エラー名","sep","50");
		$a[]=array("textarea","入力注意書き","cap","3");
	}elseif($c==61){
		$a[]=array("textfield","ラベル","fname","40");
		$a[]=array("menu","7","rb",2);
		$a[]=array("checkbox","フィールドネーム","fvalue","4","select _key,_value from tool where cid=4 order by id");
		$a[]=array("textarea","選択肢","fsize","20","","チェックボックスの選択肢を1項目ずつ改行して入力してください。");
		$a[]=array("textfield","折り返し数","pre","5");
		//$a[]=array("textfield","エラー名","sep","50");
		$a[]=array("textarea","入力注意書き","cap","3");
	}elseif($c==62){
		$a[]=array("textfield","ラベル","fname","40");
	}elseif($c==63){
		$a[]=array("textfield","ラベル","fname","40");
		$a[]=array("menu","7","rb",2);
		$a[]=array("checkbox","フィールドネーム","fvalue","4","select _key,_value from tool where cid=4 order by id");
		$a[]=array("checkbox","許可するファイル","fsize","5","select _key,_value from tool where cid=7 order by id");
		//$a[]=array("textarea","選択肢","fsize","20","","チェックボックスの選択肢を1項目ずつ改行して入力してください。");
		//$a[]=array("textfield","折り返し数","pre","5");
		//$a[]=array("textfield","エラー名","sep","50");
		$a[]=array("textarea","入力注意書き","cap","3");
	}elseif($c==64){
		$a[]=array("textfield","ラベル","fname","40");
		$a[]=array("menu","7","rb",2);
		$a[]=array("checkbox","フィールドネーム","fvalue","4","select _key,_value from tool where cid=4 order by id");
		$a[]=array("checkbox","許可するファイル","fsize","5","select _key,_value from tool where cid=6 order by id");
		//$a[]=array("textarea","選択肢","fsize","20","","チェックボックスの選択肢を1項目ずつ改行して入力してください。");
		//$a[]=array("textfield","折り返し数","pre","5");
		//$a[]=array("textfield","エラー名","sep","50");
		$a[]=array("textarea","入力注意書き","cap","3");
	}elseif($c==65){
		$a[]=array("textfield","ラベル","fname","40");
		$a[]=array("menu","7","rb",2);
		$a[]=array("checkbox","フィールドネーム","fvalue","4","select _key,_value from tool where cid=4 order by id");
		//$a[]=array("checkbox","許可するファイル","fsize","5","select _key,_value from tool where cid=6 order by id");
		//$a[]=array("textarea","選択肢","fsize","20","","チェックボックスの選択肢を1項目ずつ改行して入力してください。");
		//$a[]=array("textfield","折り返し数","pre","5");
		$a[]=array("textfield","エラー名","sep","50");
		$a[]=array("textarea","入力注意書き","cap","3");
	}

}

include $INCLUDEPATH."print_write.php";

?>