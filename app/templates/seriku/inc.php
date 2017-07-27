<?php

$db=new db;
$db->connect();

function get_entries($tagid,$num,$db){
	
	$li="";
	$subdomain=preg_match("/dev/",$_SERVER["SERVER_NAME"])?"dev-img":"img";
	$tag=$tagid=="record"?"世界陸上で生まれた世界記録":"北京大会ハイライト";
	
	$sql=sprintf("select id,img1,title,a2,a3 from repo_n where d2=50 and flag=1 and t10='%s' order by (a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':'||a6)::timestamp desc%s",$tag,$num!==0?sprintf(" limit %s offset 0",$num):"");
	$db->query($sql);
	
	while($f=$db->fetch_array()){
		$v=array(
			"title"=>htmlspecialchars($f["title"]),
			"date"=>sprintf("%s/%s",(int)$f["a2"],(int)$f["a3"]),
			"img"=>sprintf("https://%s.sportsbull.jp/thumbnail1/%s",$subdomain,$f["img1"]),
			"url"=>sprintf("/p/%s/",$f["id"])
		);
		$li.=sprintf('<li><a href="%s"><div class="img"><img src="%s" alt="%s"></div><div class="txt_area"><p>%s %s</p></div></a></li>',$v["url"],$v["img"],$v["title"],$v["date"],$v["title"]);
	}
	
	return $li;
}

?>