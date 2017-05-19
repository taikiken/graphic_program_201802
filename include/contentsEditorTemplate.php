<?php
	
if($_GET["cid"]==1){

	$contentsEditorTypes[0]="テキスト";
	$contentsEditorTypes[1]="見出し";
	$contentsEditorTypes[2]="画像";
	$contentsEditorTypes[3]="動画(Youtube)";
	$contentsEditorTypes[4]="表";
	$contentsEditorTypes[5]="ウィジェット系";
	//$contentsEditorTypes[6]="バ―チャル高校野球動画";
	
	$contentsEditorPatterns[0][]=array("textarea","本文","title","20",82,"",$MULTILANG);
	
	$contentsEditorPatterns[1][]=array("menu","22","rb",3,"","","","","","","","media");
	$contentsEditorPatterns[1][]=array("textarea","見出し","title","2","","",$MULTILANG);

	$contentsEditorPatterns[2][]=array("img","画像","media","728--0-0-0-2");
	$contentsEditorPatterns[2][]=array("textarea","画像キャプション","title","2","","",$MULTILANG);
	$contentsEditorPatterns[2][]=array("textfield","リンク","link","75","","",$MULTILANG);

	$contentsEditorPatterns[3][]=array("textfield","YOUTUBE","media","40","","YouTubeのURL（https://www.youtube.com/watch?v=xxxxxxxxxx）か、URL中のv=以下の識別子をペーストしてください。",0);
	$contentsEditorPatterns[3][]=array("textarea","動画キャプション","title","2","","",$MULTILANG);
	
	$contentsEditorPatterns[4][]=array("textfield","表タイトル","media","70","","",$MULTILANG);
	$contentsEditorPatterns[4][]=array("inputmenu","表データ","title","2","","",$MULTILANG);

	$contentsEditorPatterns[5][]=array("textarea","script, iframe等","title","20",81,"",$MULTILANG);
	
	//$contentsEditorPatterns[6][]=array("textfield","Brightcove RefID","media","40","","",0);
}

?>