<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql=sprintf("update repo_n set m1 = 113 where m1 = 136");
$o->query($sql);

$e=$o->affected_rows2();

echo $e;

?>