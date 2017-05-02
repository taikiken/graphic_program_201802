<?php

$a[]=array("textfield","カテゴリ名","name","45","","");
$a[]=array("textfield","プレビューURL","directory4","30","","",$BILLINGUAL);
$a[]=array("head","階層設定");
$a[]=array("textfield","第一サブカテゴリ名","t2","30","","");
$a[]=array("textfield","プレビューURL","directory1","30","","",$BILLINGUAL);
$a[]=array("textfield","第二サブカテゴリ名","t3","30","","");
$a[]=array("textfield","プレビューURL","directory2","30","","",$BILLINGUAL);
$a[]=array("textfield","詳細ページページタイトル","t1","30","","");
$a[]=array("textfield","プレビューURL","directory","30","","",$BILLINGUAL);
$a[]=array("head","検索設定");
//$a[]=array("menu","8","rb",2,"","","","","","","","rss");
$a[]=array("menu","9","rb",2,"","","","","","","","search");
$a[]=array("checkbox","検索対象フィールド","searchtarget","4",sprintf("select d_name,id,f_name from editor where cid=%s and flag=1 and directory='nid' order by n",$g->f("id")));
$a[]=array("textfield","検索結果表示対象フィールド","searchfield","70","","検索結果に表示するフィールドをダブルクォーテーションで囲んでカンマ区切りで入力してください。\nなおコンテンツブロックによって作成されたコンテンツを対象にする場合、\"fulltext\"をその中に含めてレイアウトにも同じように\"fulltext\"を指定してください。");
$a[]=array("textarea","検索結果・RSS表示レイアウト","searchlayout","3","","検索結果およびRSSの表示レイアウトを[ \$フィールド名 ]の書式で設定してください。\n一行目はタイトル、二行目以下はコンテンツになりますが、コンテンツにサブタイトルがある場合は、二行目にサブタイトル、三行目にコンテンツにしてください。\nコンテンツブロックにより作成されたコンテンツを表示するには\"\$fulltext\"と指定してください。");
$a[]=array("head","ページ設定");
$a[]=array("menu","19","rb",2,"","","","","","","","meta");
//$a[]=array("menu","18","cb",3,"","","","","","","","index");
//$a[]=array("checkbox","オプション表示","pageoption","3","select _key,_value from tool where cid=8 order by id");

$a[]=array("head","操作説明設定");
$a[]=array("textarea","第1-リスト","list0","5","83");
$a[]=array("textarea","第1-ページ","page0","5","83");
$a[]=array("textarea","第2-リスト","list1","5","83");
$a[]=array("textarea","第2-ページ","page1","5","83");
$a[]=array("textarea","詳細-リスト","list2","5","83");
$a[]=array("textarea","詳細-ページ","page2","5","83");
$a[]=array("textarea","ブロック-リスト","list3","5","83");
$a[]=array("textarea","ブロック-ページ","page3","5","83");

//$a[]=array("head","ページスタイル設定");
//$a[]=array("textarea","スタイル","css","20");
//$a[]=array("head","コンテンツメタ情報設定");
//$a[]=array("textfield","キーワード","keyword","55","","HTMLのメタタグ keyword を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。",$BILLINGUAL);
//$a[]=array("textarea","ディスクリプション","description","5","","HTMLのメタタグ description を設定することができます。入力がない場合はシステム環境設定で入力されたデフォルト値が使用されます。",$BILLINGUAL);

include $INCLUDEPATH."print_write.php";

?>