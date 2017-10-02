<?php

$db=new db;
$db->connect();

$movie=$photo="";
$subdomain=preg_match("/dev/",$_SERVER["SERVER_NAME"])?"dev-img":"img";

$sql="select id,img1,title,a2,a3 from repo_n where d2=57 and flag=1 and swf is not null order by (a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':'||a6)::timestamp desc limit 4 offset 0";
$db->query($sql);
while($f=$db->fetch_array()){
	$v=array(
		"title"=>htmlspecialchars($f["title"]),
		"date"=>sprintf("%s/%s",(int)$f["a2"],(int)$f["a3"]),
		"img"=>sprintf("https://%s.sportsbull.jp/thumbnail1/%s",$subdomain,$f["img1"]),
		"url"=>sprintf("/p/%s/",$f["id"])
	);
	$movie.=sprintf('<li><a href="%s"><div class="img"><img src="%s" alt="%s"></div><div class="txt_area"><p>%s %s</p></div></a></li>',$v["url"],$v["img"],$v["title"],$v["date"],$v["title"]);
}

$sql="select id,img1,title,a1,a2,a3 from repo_n where d2=57 and flag=1 and swf is null order by (a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':'||a6)::timestamp desc limit 4 offset 0";
$db->query($sql);
while($f=$db->fetch_array()){
	$v=array(
		"title"=>htmlspecialchars($f["title"]),
		"date"=>sprintf("%s.%s.%s",$f["a1"],$f["a2"],$f["a3"]),
		"img"=>sprintf("https://%s.sportsbull.jp/img/%s",$subdomain,$f["img1"]),
		"url"=>sprintf("/p/%s/",$f["id"])
	);
	$photo.=sprintf('<li><a href="%s"><div class="img"><img src="%s" alt="%s"></div><p class="txt">%s</p></a></li>',$v["url"],$v["img"],$v["title"],$v["date"]);
}

?>