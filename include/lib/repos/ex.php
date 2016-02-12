<?php

if($_GET["id"]!=0){
	$a[]=array("textfield","カテゴリ名","name","45","","","","");
	//$a[]=array("head","検索設定");
	//$a[]=array("menu","8","rb",2);
	//$a[]=array("menu","9","rb",2);
	//$a[]=array("checkbox","検索対象フィールド","searchtarget","3",sprintf("select d_name,id,f_name from editor where cid=%s and flag=1 and directory='nid' order by n",$g->f("id")));
	//$a[]=array("textfield","検索結果表示対象フィールド","searchfield","70","","検索結果に表示するフィールドをダブルクォーテーションで囲んでカンマ区切りで入力してください。\nなおコンテンツブロックによって作成されたコンテンツを対象にする場合、\"fulltext\"をその中に含めてレイアウトにも同じように\"fulltext\"を指定してください。");
	//$a[]=array("textarea","検索結果・RSS表示レイアウト","searchlayout","3","","検索結果およびRSSの表示レイアウトを[ \$フィールド名 ]の書式で設定してください。\n一行目はタイトル、二行目以下はコンテンツになりますが、コンテンツにサブタイトルがある場合は、二行目にサブタイトル、三行目にコンテンツにしてください。\nコンテンツブロックにより作成されたコンテンツを表示するには\"\$fulltext\"と指定してください。");
	$a[]=array("head","コンテンツメタ情報設定");
}else{
	
	$a[]=array("textfield","キャッチコピー","t1","55","","",$BILLINGUAL);
	$a[]=array("textarea","ボディーコピー","b1","5","","",$BILLINGUAL);
	
	
	
}
$a[]=array("head","コンテンツメタ情報設定");
$a[]=array("textfield","キーワード","keyword","55","","HTMLのメタタグ keyword を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。",$BILLINGUAL);
$a[]=array("textarea","ディスクリプション","description","5","","HTMLのメタタグ description を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。",$BILLINGUAL);


include $INCLUDEPATH."print_write.php";

?>