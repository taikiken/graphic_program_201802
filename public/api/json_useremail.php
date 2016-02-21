<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$y=array();

$y["status"]["code"]=400;
$y["status"]["user_message"]="入力内容が間違っています。";
$y["status"]["developer_message"]="リクエストデータに不正値がある";

$ermsg["errors"]=array();
	
$email=trim($_POST["email"]);
$emailcheck=check_email($email);
if($emailcheck==""){
	
	$sql=sprintf("select id from repo_n where t1='%s' and flag=1",$email);
	$o->query($sql);
	$f=$o->fetch_array();
	$ID=$f["id"];
	
	if(strlen($ID)>0){
		
		$ermsg["errors"]["email"]=sprintf("%sはすでに登録されています。",$email);
	
	}else{

		$y["status"]["code"]=200;
		$y["status"]["user_message"]="";
		$y["status"]["developer_message"]="";

	}
	
}else{

	$ermsg["errors"]["email"]=$emailcheck;

}

$y["response"]=(object)$ermsg;

if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>