<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$f=set_login($_REQUEST["email"],$_REQUEST["password"]);

if($y["status"]["code"]===200){
	
	$category=array();
	if(strlen($f["t20"])>0){
		$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,n from pm_ where cid=20 and flag=1) as t2 where t1.categoryid=t2.id order by n;",$f["userid"]);
		$o->query($sql);
		while($e=$o->fetch_array()){
			$category[]=$e["name"];
		}
	}
	$f["interest"]["category"]=$category;	
	$s=set_userinfo($f,1);
	
}else{
	$s=(object)$s;
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>