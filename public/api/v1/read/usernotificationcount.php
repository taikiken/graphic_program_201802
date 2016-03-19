<?php

include $INCLUDEPATH."local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=set_userid(auth());
if(strlen($uid)>0){

	$sql=sprintf("select count(id) as n from u_activity where id in (%s) and reuserid=%s and notice=1",sprintf($noticetable,$uid,$uid),$uid);
	$o->query($sql);
	$f=$o->fetch_array();
	$count=(int)$f["n"];
	
}else{
	$count=0;	
}

$y["response"]["count"]=$count;
print_json($y,$_SERVER['HTTP_REFERER']);

?>