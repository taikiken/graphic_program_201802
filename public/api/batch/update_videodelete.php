<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql=sprintf("update repo_n set flag=0,swf='' where swf='%s' and d2=%s;",pg_escape_string(trim($_GET["file"])),pg_escape_string(trim($_GET["mediaid"])));
$o->query($sql);

$e=$o->affected_rows2();

echo $e;

?>