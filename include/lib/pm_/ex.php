<?php

if($q->get_dir()!=5){
	$a[]=array("textfield","項目","name","40","","",$BILLINGUAL);
	$a[]=array("textfield","slug","name_e","40","","",$BILLINGUAL);
	if($_GET["cid"]==20){
		$a[]=array("textfield","関連語句","yobi","100","","",$BILLINGUAL);
		//$a[]=array("textfield","表示フラグ","p1","2","","",$BILLINGUAL);
		$a[]=array("img","画像","img","640-640-0-0-0-0","","",$BILLINGUAL,"","","","","");
	}
}else{
	$a[]=array("textarea","項目","text","15");
}

include $INCLUDEPATH."print_write.php";

?>