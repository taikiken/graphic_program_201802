<?php

include $INCLUDEPATH."local.php";
	
$o=new db;
$o->connect();

for($i=0;$i<count($VIDEOTAG);$i++){
	$query[]=sprintf("title like '%s%s%s'","%",$VIDEOTAG[$i],"%");
}

$sql[]="delete from u_reminder where regitime<now()-interval '1 day';";
$sql[]="update repo_n set flag=0 where (d2=1 or d2=2) and m_time<now()-interval '1 year';";
$sql[]=sprintf("update u_view set video=1 where pageid in (select max(nid) as id from repo_e where (types=5 or types=3) and (%s) group by nid);",implode(" or ",$query));

$sql=implode("\n",$sql);
$o->query($sql);

?>