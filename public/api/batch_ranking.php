<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql="delete from u_view where regitime < now() - interval '3 day' ";
$o->query($sql);

?>