<?php

include $INCLUDEPATH."local.php";
	
$o=new db;
$o->connect();

$sql[]="delete from u_reminder where regitime<now()-interval '1 day';";
$sql[]="update repo_n set flag=0,u_time=now() where (d2=1 or d2=2) and m_time<now()-interval '1 year';";

$sql=implode("\n",$sql);
$o->query($sql);

?>