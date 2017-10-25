<?php

$sql="SELECT * FROM company_news ORDER BY publoshed_at";
$o->query($sql);

  $a[]=array("textfield","タイトル","title","50");
  $a[]=array("textfield","URL","url","50");
  $a[]=array("textfield","公開日","published_at","50");
  include $INCLUDEPATH."print_write.php";


?>