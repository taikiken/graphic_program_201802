<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql="select name,name_e from pm_ where cid=1";
$o->query($sql);
while($f=$o->fetch_array()){
	$area[preg_replace("/(県|府|都)$/","",$f["name"])]=$f["name_e"];
}

$sql="select id,title from repo_n where d2=1 and t10 like '地域面（地域ニュース）' and flag=1";
$o->query($sql);
while($f=$o->fetch_array()){
	$m=explode("）",$f["title"]);
	if(count($m)==2){
		$s[]=sprintf("insert into u_area select nextval('u_area_id_seq'),%s,'%s','%s' where not exists(select * from u_area where pageid=%s);",$f["id"],$m[0],$area[$m[0]],$f["id"]);
		$s[]=sprintf("update u_area set pref='%s',region='%s' where id=%s;",$m[0],$area[$m[0]],$f["id"]);
	}
}

$s=implode("\n",$s);
$o->query($s);

?>