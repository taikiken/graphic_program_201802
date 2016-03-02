<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql="delete from u_view where regitime < now() - interval '3 day';\n";
$sql.="delete from u_reminder where regitime < now() - interval '1 day';";
$o->query($sql);

?>