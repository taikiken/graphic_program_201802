<?php

if($_GET["cid"]==1||$_GET["cid"]==5){

	$contentsEditorTypes[0]="テキストブロック";
	$contentsEditorTypes[1]="画像＋テキストブロック";
	$contentsEditorTypes[2]="画像x1ブロック";
	$contentsEditorTypes[3]="画像x2ブロック";
	$contentsEditorTypes[4]="画像x3ブロック";
	$contentsEditorTypes[5]="動画＋テキストブロック";
	$contentsEditorTypes[6]="地図＋テキストブロック";
	
	$contentsEditorPatterns[0][]=array("textarea","見出し","title","4","","",$MULTILANG);
	$contentsEditorPatterns[0][]=array("textarea","本文","body","20",82,"",$MULTILANG);

	$contentsEditorPatterns[1][]=array("textarea","見出し","title","4","","",$MULTILANG);
	$contentsEditorPatterns[1][]=array("textarea","本文","body","20",82,"",$MULTILANG);
	$contentsEditorPatterns[1][]=array("img","画像","img1","1100--0-0-0-2","660--0-0-0-2");
	$contentsEditorPatterns[1][]=array("textfield","画像サイズ","n1","10","W: , px<span class=\"chbtn rollover\">サイズ変更</span>","../../../shared/cms/js/imgsizeresize.php",0,"660\n490\n320");
	$contentsEditorPatterns[1][]=array("position","画像の位置",1);
	$contentsEditorPatterns[1][]=array("textarea","画像タイトル","img1title","2","","",$MULTILANG);
	$contentsEditorPatterns[1][]=array("textarea","画像キャプション","img1txt","7",82,"",$MULTILANG);

	$contentsEditorPatterns[2][]=array("img","画像","img1","1100--0-0-0-2","1000--0-0-0-1");
	$contentsEditorPatterns[2][]=array("textarea","画像タイトル","img1title","2","","",$MULTILANG);
	$contentsEditorPatterns[2][]=array("textarea","画像キャプション","img1txt","7",82,"",$MULTILANG);	

	$contentsEditorPatterns[3][]=array("img","画像（左）","img1","1100--0-0-0-2","640-430-0-0-0-0");
	$contentsEditorPatterns[3][]=array("textarea","画像（左）タイトル","img1title","2","","",$MULTILANG);
	$contentsEditorPatterns[3][]=array("textarea","画像（左）キャプション","img1txt","7",82,"",$MULTILANG);	
	$contentsEditorPatterns[3][]=array("img","画像（右）","img2","1100--0-0-0-2","640-430-0-0-0-0");
	$contentsEditorPatterns[3][]=array("textarea","画像（右）タイトル","img2title","2","","",$MULTILANG);
	$contentsEditorPatterns[3][]=array("textarea","画像（右）キャプション","img2txt","7",82,"",$MULTILANG);	

	$contentsEditorPatterns[4][]=array("img","画像（左）","img1","1100--0-0-0-2","640-430-0-0-0-0");
	$contentsEditorPatterns[4][]=array("textarea","画像（左）タイトル","img1title","2","","",$MULTILANG);
	$contentsEditorPatterns[4][]=array("textarea","画像（左）キャプション","img1txt","7",82,"",$MULTILANG);	
	$contentsEditorPatterns[4][]=array("img","画像（中）","img2","1100--0-0-0-2","640-430-0-0-0-0");
	$contentsEditorPatterns[4][]=array("textarea","画像（中）タイトル","img2title","2","","",$MULTILANG);
	$contentsEditorPatterns[4][]=array("textarea","画像（中）キャプション","img2txt","7",82,"",$MULTILANG);	
	$contentsEditorPatterns[4][]=array("img","画像（右）","img3","1100--0-0-0-2","640-430-0-0-0-0");
	$contentsEditorPatterns[4][]=array("textarea","画像（右）タイトル","img3title","2","","",$MULTILANG);
	$contentsEditorPatterns[4][]=array("textarea","画像（右）キャプション","img3txt","7",82,"",$MULTILANG);	

	$contentsEditorPatterns[5][]=array("textarea","見出し","title","4","","",$MULTILANG);
	$contentsEditorPatterns[5][]=array("textarea","本文","body","20",82,"",$MULTILANG);
	$contentsEditorPatterns[5][]=array("textfield","YOUTUBE ID","youtube","40","","YouTubeのURL（https://www.youtube.com/watch?v=xxxxxxxxxx）か、URL中のv=以下の識別子をペーストしてください。",0);
	$contentsEditorPatterns[5][]=array("position","動画の位置",1);
	$contentsEditorPatterns[5][]=array("textfield","動画サイズ","n1","10","W: , px<span class=\"chbtn rollover\">サイズ変更</span>","",0,"660\n490\n320");
	
	$contentsEditorPatterns[6][]=array("textarea","見出し","title","4","","",$MULTILANG);
	$contentsEditorPatterns[6][]=array("textarea","本文","body","20",82,"",$MULTILANG);
	$contentsEditorPatterns[6][]=array("textfield","MAP","fn0,fn1","20,20","LONGITUDE ,　LATITUDE ,","",0);
	$contentsEditorPatterns[6][]=array("position","MAPの位置",1);
	$contentsEditorPatterns[6][]=array("textfield","MAPサイズ","n1,n2","10,10","W: , &nbsp;px　H: , px<span class=\"chbtn rollover\">サイズ変更</span>","",0,"660\n490\n320","442\n328\n215");

}elseif($_GET["cid"]==25){

	$contentsEditorTypes[0]="タイトル画像ブロック";
	$contentsEditorTypes[1]="画像＋テキストブロック";
	$contentsEditorTypes[2]="動画＋テキストブロック";
	$contentsEditorTypes[3]="事例ブロック";
	
	$contentsEditorPatterns[0][]=array("textfield","見出し","title","70","","",0);
	$contentsEditorPatterns[0][]=array("img","画像","img1","998-40-0-0-0-2");

	$contentsEditorPatterns[1][]=array("textarea","本文","body","20",82,"",0);
	$contentsEditorPatterns[1][]=array("img","画像","img1","230-270-0-0-0-2");
	
	$contentsEditorPatterns[2][]=array("textarea","本文","body","20",82,"",0);
	$contentsEditorPatterns[2][]=array("textfield","YOUTUBE ID","youtube","40","","YouTubeのURL（https://www.youtube.com/watch?v=xxxxxxxxxx）か、URL中のv=以下の識別子をペーストしてください。",0);
	$contentsEditorPatterns[2][]=array("textfield","動画サイズ","n1","10","W: , px<span class=\"chbtn rollover\">サイズ変更</span>","",0,"560");

	$contentsEditorPatterns[3][]=array("textarea","見出し","title","4","","",0);
	$contentsEditorPatterns[3][]=array("textarea","本文","body","20",82,"",0);
	$contentsEditorPatterns[3][]=array("img","画像","img1","470--0-0-0-2");
	$contentsEditorPatterns[3][]=array("textfield","クライアント","img1txt","60","","",0);
	$contentsEditorPatterns[3][]=array("textfield","主要メディア","img2txt","60","","",0);
}
?>