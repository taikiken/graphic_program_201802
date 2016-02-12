<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql=sprintf("update post set flag=%s where id=%s",$_POST["flag"],$_POST["id"]);
$o->query($sql);

echo $o->affected_rows2();

?>