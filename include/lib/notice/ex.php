<?php

$sql="SELECT * FROM notices ORDER BY created_at";
$o->query($sql);

  $a[]=array("textfield","お知らせ内容","body","120");
  $a[]=array("textfield","URL","url","120");
  $a[]=array("textfield","画像パス","image","120");
  $a[]=array("textfield","タイプ","type","120");
  include $INCLUDEPATH."print_write.php";


?>