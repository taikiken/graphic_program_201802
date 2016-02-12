<?php

if($q->get_dir()!=5){
	$a[]=array("textfield","項目","name","40","","",$BILLINGUAL);
	$a[]=array("textfield","補足","name_e","40","","",$BILLINGUAL);
	$a[]=array("textfield","補足","yobi","40","","",$BILLINGUAL);
}else{
	$a[]=array("textarea","項目","text","15");
}

include $INCLUDEPATH."print_write.php";

?>