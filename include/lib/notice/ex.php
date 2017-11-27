<?php
//$sql="SELECT * FROM notices ORDER BY created_at";
//$o->query($sql);

$a[] = array("textfield", "タイプ", "type", "5", "", "0: notice, 1: warning, 2: img");
$a[] = array("textfield", "お知らせ内容", "text", "120");
$a[] = array("textfield", "Link", "link", "120");
$a[] = array("textfield", "画像", "img", "120");
include $INCLUDEPATH . "print_write.php";


?>