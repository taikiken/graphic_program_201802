<?php

/* 10分おきに集計 */

include $INCLUDEPATH."local.php";
	
$o=new db;
$o->connect();

$sql="select id from u_categories";
$o->query($sql);
while($f=$o->fetch_array())$p[]=$f;
	
for($i=0;$i<count($p);$i++){
	
	$sql=sprintf("select count(id) as n from repo_n where cid=1 and flag=1 and (m1=%s or m2=%s)",$p[$i]["id"],$p[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$num=$f["n"];
	
	$sql=sprintf("select m1,id from repo_n where (m1=%s or m2=%s) and flag=1 order by m_time desc limit 1 offset 0",$p[$i]["id"],$p[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$id=$f["id"];
	
	$s[]=sprintf("update u_latestpost set pageid=%s,num=%s where m1=%s;",strlen($id)>0?$id:0,strlen($num)>0?$num:0,$p[$i]["id"]);
}

$sql="select count(id) as n from repo_n where cid=1 and flag=1 and m1!=130";
$o->query($sql);
$f=$o->fetch_array();
$num=$f["n"];

$sql="select m1,id from repo_n where cid=1 and flag=1 order by m_time desc limit 1 offset 0";
$o->query($sql);
$f=$o->fetch_array();
$id=$f["id"];

$s[]=sprintf("update u_latestpost set pageid=%s,num=%s where m1=0;",$id,$num);
$s[]="update repo_n set m1=136 where  keyword like '%高校野球%' or keyword like '%地区大会%'";

$s=implode("\n",$s);
$o->query($s);

?>