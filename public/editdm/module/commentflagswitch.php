<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql=sprintf("update u_comment set flag=%s where id=%s;",$_POST["flag"],$_POST["id"]);
$sql.=sprintf("update u_ranking set flag=%s where commentid=%s where exists (select * from u_ranking where commentid=%s);",$_POST["flag"],$_POST["id"],$_POST["id"]);

$o->query($sql);

echo $o->affected_rows2();

?>