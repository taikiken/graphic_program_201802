<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

$sql="select id,m_time,(m_time + interval '9 hour') as timestamp from repo_n where id>=12434 and d2=4 order by id;";
$o->query($sql);

while($w=$o->fetch_array()){
	
	$s=array();
	$s[]=sprintf("m_time='%s'",bind($w["timestamp"]));
	$s[]=sprintf("a_time='%s'",bind($w["timestamp"]));

	$x=explode(" ",str_replace(array(" ","-",":")," ",$w["timestamp"]));
	for($j=1;$j<=6;$j++){
		$s[]=sprintf("%s='%s'",("a".$j),$x[($j-1)]);
		$s[]=sprintf("%s='%s'",("a".(6+$j)),$x[($j-1)]);
	}
	
	$qs[]=sprintf("update repo_n set %s where id=%s;",implode(",",$s),$w["id"]);
}

$qs=implode("\n",$qs);
$o->query($qs);

?>