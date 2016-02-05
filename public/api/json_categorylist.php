<?php


include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth($H["Authorization"]);

$o->query("select id,name,name_e from pm_ where cid=20 and flag=1 order by n");

while($f=$o->fetch_array())$p[]=$f;

for($i=0;$i<count($p);$i++){

	$s[$i]["id"]=(int)$p[$i]["id"];
	$s[$i]["label"]=$p[$i]["name"];
	$s[$i]["slug"]=$p[$i]["name_e"];
	$s[$i]["url"]=sprintf("%s/category/%s/",$domain,$p[$i]["name_e"]);
}

$y=array();

$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";

$y["response"]["count"]=count($s);
$y["response"]["categories"]=$s;


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>