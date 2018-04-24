<?php
if($q->get_dir()!==0){
$a[]=array("parent","63","rb",6,"","","","","","","","parent_id");
}
$a[] = array("textfield", "名称", "name", "120");
$a[] = array("textfield", "リンク", "link", "120");
$a[] = array("textfield", "アイコン(PC)", "icon", "120");
$a[] = array("textfield", "アイコン(SP)", "icon_sp", "120");
$a[] = array("textfield", "アイコン(iOS)", "icon_ios", "120");
$a[] = array("textfield", "アイコン(Android)", "icon_android", "120");

include $INCLUDEPATH . "print_write.php";
include $INCLUDEPATH."_newfield3.php";
include $INCLUDEPATH."_pageaddition.php";

?>