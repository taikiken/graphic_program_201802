<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

$sql="select id,t30,d2 from repo_n where img1 is null and t30 is not null and d2!=4 order by d2,id;";
$o->query($sql);
while($f=$o->fetch_array()){
	$s[]=sprintf("%s\t%s\t%s",$f["id"],$f["t30"],$f["d2"]);
}

for($i=0;$i<count($s);$i++){
	
	$s[$i]=trim($s[$i]);
	$s[$i]=explode("\t",$s[$i]);
	$sv=outimg($s[$i][1]);
	if(strlen($sv)>0){
		$sql=sprintf("update repo_n set img1='%s' where id=%s;",$sv,$s[$i][0]);
		echo sprintf("<a href='https://dev.sportsbull.jp/p/%s/'>%s</a><br>",$s[$i][0],$sv);
		$o->query($sql);
	}
}

?>