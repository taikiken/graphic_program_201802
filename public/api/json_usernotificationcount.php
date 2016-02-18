<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();

$sql=sprintf("select count(*) as n from u_activity where reuserid=%s and activity<=2 and notice=1",$uid);
$o->query($sql);
$f=$o->fetch_array();
$count=$f["n"];

$y=array();

$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]["count"]=(int)$count;


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>