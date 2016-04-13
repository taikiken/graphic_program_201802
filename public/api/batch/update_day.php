<?php

include $INCLUDEPATH."local.php";
	
$o=new db;
$o->connect();
	
$sql[]="update u_view set flag=0 where regitime < now() - interval '3 day';";
$sql[]="update u_view set flag=0 where regitime < now() - interval '3 day';";


?>