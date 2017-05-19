<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();
$uid=auth();

$s=array();

if(!preg_match("/^[0-9]+$/",$uid)){
	$sql="select id,name,name_e,img from u_categories where flag=1 order by n";
}else{
	//$sql=sprintf("select t1.*,(case when t2.c=1 then 1 else 0 end) as interest from (select id,name,name_e,img,n from u_categories where flag=1) as t1 left join (select 1 as c,categoryid from u_category where userid=%s and flag=1) as t2 on t1.id=t2.categoryid order by c,n",$uid);
	// WBCを一面の右に固定
	$sql=sprintf("select id,name,name_e,img,n,2 as interest from u_categories where flag=1 and id in(151) union all (select t1.*,(case when t2.c=1 then 1 else 0 end) as interest from (select id,name,name_e,img,n from u_categories where flag=1 and id not in(150,151)) as t1 left join (select 1 as c,categoryid from u_category where userid=%s and flag=1) as t2 on t1.id=t2.categoryid) order by interest desc,n;",$uid);
}

$o->query($sql);
while($f=$o->fetch_array()){
	$s[]=set_categoryinfo($f,"",0);
}

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]["count"]=count($s);
$y["response"]["categories"]=$s;

print_json($y,$_SERVER['HTTP_REFERER']);

?>