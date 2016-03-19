<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$id=bind($_REQUEST["id"]);

$f=set_article($id,$uid);

if(strlen($f["id"])>0){
		
	//ランキング
	$o->query(sprintf("insert into u_view(pageid,regitime) values(%s,now());",$id));
	
	$s=set_articleinfo($f,1);	
	$s["keywords"]=array();
	for($i=10;$i<=14;$i++)if(strlen($f["t".$i])>0)$s["keywords"][]=$f["t".$i];
	
	$sql=sprintf("select * from %s order by relativetime limit 4 offset 0",sprintf($articletable,$uid!=""?sprintf($bookmarkfield,$uid):"",sprintf(" and (m1=%s or m2=%s) and id!=%s",$f["m1"],$f["m1"],$f["id"])));
	$o->query($sql);
	$s["related_articles"]=array();
	$n=0;
	
	while($f=$o->fetch_array()){
		$s["related_articles"][$n]=set_articleinfo($f);
		$n++;
	}
}else{
	$s=(object)$s;
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>