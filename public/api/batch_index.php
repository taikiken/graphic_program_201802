<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

function stripmeta($s){
	$s=strip_tags($s);
	$s=preg_replace("/(\r|\n|\t|、| |　|(|)|（|）|◆|＝|,|…|【|】|▼|△|＞|＜|「|」|『|』|！|“|”|◇|■|●|[|]|〈|〉|。)/","",$s);
	$s=mb_convert_kana($s,"KVa");
	$s=strtolower($s);
	return $s;
}

function searchtxt($title,$category,$body,$keyword,$t1){
	
	$title=strtolower($title);
	$category=strtolower($category);
	$body=stripmeta($body);
	$keyword=stripmeta($keyword);
	$t1=stripmeta($t1);
	
	$txt=$title.$body.$category.$keyword.$t1;
	$txt=addslashes($txt);
	$txt=str_replace("\'","''",$txt);
	
	return $txt;
}

$sql="select id,title,(select name from pm_ where id=m1) as category,body,keyword,(case when t1 is not null then t1 else '' end) as t1,u_time from repo_n where cid=1 and flag=1 and id not in(select id from u_index)";
$o->query($sql);
while($f=$o->fetch_array()){
	$u[]=sprintf("insert into u_index(id,txt,uptime) values(%s,'%s',%s);",$f["id"],searchtxt($f["title"],$f["category"],$f["body"],$f["keyword"],$f["t1"]),strlen($f["u_time"])>0?sprintf("'%s'",$f["u_time"]):"NULL");
}

$sql="select t1.* from (select id,uptime from u_index) as t2,(select id,title,(select name from pm_ where id=m1) as category,body,keyword,(case when t1 is not null then t1 else '' end) as t1,u_time from repo_n where cid=1 and flag=1) as t1 where t2.id=t1.id and t2.uptime!=t1.u_time";
$o->query($sql);
while($f=$o->fetch_array()){
	$u[]=sprintf("update u_index set txt='%s',uptime=%s where id=%s;",searchtxt($f["title"],$f["category"],$f["body"],$f["keyword"],$f["t1"]),strlen($f["u_time"])>0?sprintf("'%s'",$f["u_time"]):"NULL",$f["id"]);
}

$u=implode("\n",$u);
$o->query($u);

echo $u;

?>