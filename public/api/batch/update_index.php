<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

function stripmeta($s){
	$w=array(
		"\r","\n","\t"
/*
		"、",","," ","　","＝","…","！","。","／","…","～","|",":",";","(",")","（","）","【","】","＞","＜","「","」","『","』","[","]","〈","〉","“","”","《","》","^",

		"▼","▼","△","▽","◆","◇","■","□","●","○","★","☆"
*/
	);
	$s=strip_tags($s);
	$s=str_replace($w,"",$s);
	$s=mb_convert_kana($s,"KVa");
	$s=strtolower($s);
	return $s;
}

function searchtxt($title,$category,$category2,$body,$keyword,$t1,$media){
	
	$title=stripmeta($title);
	$category=strtolower($category);
	$category2=strtolower($category2);
	$body=stripmeta($body);
	$keyword=stripmeta($keyword);
	$t1=stripmeta($t1);
	$media=strtolower($media);
	
	$txt=$title.$body.$category.$category2.$keyword.$t1.$media;
	$txt=pg_escape_string($txt);
	
	return $txt;
}

$sql="select (case when (select id from u_index where id=repo_n.id) is null then 1 else 0 end) as flag,(select uptime from u_index where id=repo_n.id) as uptime,id,title,(select body from repo_body where pid=repo_n.id) as body,(select name from u_categories where id=m1) as category,(select name from u_categories where id=m2) as category2,(select title from u_media where id=repo_n.d2) as media,keyword,t1,u_time from repo_n where cid=1 and flag=1";
$o->query($sql);
while($f=$o->fetch_array()){
	if($f["flag"]==1){
		$u[]=sprintf("insert into u_index(id,txt,uptime) values(%s,'%s','%s');",$f["id"],searchtxt($f["title"],$f["category"],$f["category2"],$f["body"],$f["keyword"],$f["t1"],$f["media"]),$f["u_time"]);
	}else{
		if($f["uptime"]!=$f["u_time"])$u[]=sprintf("update u_index set txt='%s',uptime='%s' where id=%s;",searchtxt($f["title"],$f["category"],$f["category2"],$f["body"],$f["keyword"],$f["t1"],$f["media"]),$f["u_time"],$f["id"]);
	}
}

for($i=0;$i<count($u);$i++){
	$o->query($u[$i]);
}


?>