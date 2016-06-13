<?php

include $INCLUDEPATH."local.php";

$id=$_GET["id"];
$time=$_GET["time"];
$media=$_GET["media"];

file_put_contents(sprintf("%s/api/ver1/static/complete.txt",$SERVERPATH),sprintf("%s\t%s\t%s\t%s\n",date("Y-m-d H:i:s"),$media,$id,$time));

?>