<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

data_conf();

$sql=sprintf("select pref,shiku,banchi from zip where z3='%s' and z4='%s'",$sv["p_zip0"],$sv["p_zip1"]);
$o->query($sql);

$f=$o->fetch_array();

if(strlen($f["pref"])>0){
	echo sprintf("pref:\"%s\",shiku:\"%s\",banchi:\"%s\",err:0",$f["pref"],$f["shiku"],($f["banchi"]!="以下に掲載がない場合")?$f["banchi"]:"");
}else{

	$sql=sprintf("select pref,shiku,banchi from zip where z3='%s' and z4='0000'",$sv["p_zip0"]);
	$o->query($sql);
	
	$f=$o->fetch_array();
	if(strlen($f["pref"])>0){
		echo sprintf("pref:\"%s\",shiku:\"%s\",banchi:\"%s\",err:0",$f["pref"],$f["shiku"],($f["banchi"]!="以下に掲載がない場合")?$f["banchi"]:"");
	}else{
		echo "err:\"指定された郵便番号に該当する住所はございません。入力された値をお確かめください。\"";
	}
}

?>