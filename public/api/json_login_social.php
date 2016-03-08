<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$id=trim($_POST["id"]);
$token=trim($_POST["token"]);
$service=trim($_POST["service"]);

/*
a1: Facebook ID
a2: Facebook Token
a3: Twitter ID
a4: Twitter Token
*/

$field="";
if($service=="facebook"){
	$field=1;
}elseif($service=="twitter"){
	$field=3;
}

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="ログインしました。";
$y["status"]["message_type"]="success";
$y["status"]["developer_message"]="";
$ermsg="";

if(strlen($field)>0&&strlen($id)>0&&strlen($token)>0){
	
	$sql=sprintf("select id,cid,t20,(select name from repo where id=cid) as label,title,t1,t2,img1,a15,a2,a4 from repo_n where a%s='%s' and flag=1 order by id desc limit 1 offset 0",$field,$id);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		
		if($token!=$f["a".($field+1)]){
			$sql=sprintf("update repo_n set a%s='%s' where id=%s",($field+1),$token,$f["id"]);
			$o->query($sql);
		}
		
		if(strlen($f["t20"])>0){
			$sql=sprintf("select t2.* from (select categoryid from u_category where userid=%s and flag=1) as t1,(select id,name,n from pm_ where cid=20 and flag=1) as t2 where t1.categoryid=t2.id order by n",$f["id"]);
			$o->query($sql);
			while($e=$o->fetch_array()){
				$interestcategory[]=$e["name"];
			}
		}else{
			$interestcategory=array();
		}
		
		$s["id"]=$f["id"];
		$s["name"]=$f["title"];
		$s["email"]=$f["t1"];
		$s["profile_picture"]=sprintf("%s/prg_img/img/%s",$ImgPath,$f["img1"]);
		$s["bio"]=$f["t2"];
		$s["url"]=sprintf("%s/mypage/",$domain);
		$s["type"]["id"]=$f["cid"];
		$s["type"]["label"]=$f["label"];
		$s["interest"]["category"]=$interestcategory;
		$s["access_token"]=$f["a15"];
		$s["session_token"]="";
		
	}else{
		$ermsg="ユーザが存在しません。";
	}
				
}else{
	$ermsg="ユーザ情報の取得に失敗しました。";
}

if($ermsg==""){
	$y["status"]["code"]=200;
	$y["response"]=$s;
}else{
	$y["status"]["code"]=404;
	$y["status"]["message_type"]="error";
	$y["status"]["user_message"]=$ermsg;
}

if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>