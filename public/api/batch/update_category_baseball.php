<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql=sprintf("update repo_n set m1 = 113 where m1 = 136");
$o->query($sql);

$e=$o->affected_rows2();

echo "m1:".$e."/";

$sql=sprintf("update repo_n set m2 = 113 where m2 = 136");
$o->query($sql);

$e=$o->affected_rows2();

echo "m2:".$e."/";

$sql=sprintf("update repo_n set m2 = null where m1 = 113 and m2 = 113");
$o->query($sql);

$e=$o->affected_rows2();

echo "重複削除:".$e."/";

?>