<?php

$a[]=array("textfield","ユーザ名","usr","20");
$a[]=array("passwd","パスワード","pwd","15");
$a[]=array("textfield","メールアドレス","email","40");
if($q->get_dir==0){
	$a[]=array("menu","3","rb",2,"chgUserPermission(this.value)","","","","","","","m");
}
$a[]=array("menu","10","cb",5,"","","","","","","","permission");
$a[]=array("menu","13","cb",4,"","","","","","","","systems");
$a[]=array("menu","58","cb",4,"","","","","","","","is_external");
$a[]=array("menu","91","cb",4,"","","","","","","","is_carousel_headline");

include $INCLUDEPATH."print_write.php";
include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/media.php";
include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/auth.php";

?>