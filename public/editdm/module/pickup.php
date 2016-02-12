<?php

header("Content-Type:text/html; charset=UTF-8");

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$sql="select max(id) as id from pickup";
$o->query($sql);
$f=$o->fetch_array();

$mid=$f["id"];
$lang=$_POST["lang"];
$cid=$_POST["cid"];

if(strlen($_POST["eid"])>0){
	$eid=explode(",",$_POST["eid"]);
	for($i=0;$i<count($eid);$i++){
		$s[]=sprintf("insert into pickup(lang,cid,eid) values('%s',%s,%s);",$lang,$cid,$eid[$i]);
	}
	$o->query(implode("\n",$s));
	
	$e=$o->affected_rows2();
	if($e){
		$sql=sprintf("delete from pickup where cid=%s and lang='%s' and id<=%s",$cid,$lang,$mid);
		$o->query($sql);
		$e=$o->affected_rows2();
	}
}else{
	$sql=sprintf("delete from pickup where cid=%s and lang='%s' and id<=%s",$cid,$lang,$mid);
	$o->query($sql);
	$e=$o->affected_rows2();
}



header("Content-Type:text/html;charset=utf-8");
echo $e;

?>