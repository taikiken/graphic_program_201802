<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$email=trim($_POST["email"]);
$passwd=trim($_POST["password"]);

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";
$ermsg="";

if(strlen($email)>0&&strlen($passwd)>0){
	
	$sql=sprintf("select id,cid,t20,(select name from repo where id=cid) as label,title,t1,t2,img1,a15 from repo_n where t1='%s' and passwd='%s'",$email,md5($MAGIC_STRING.$passwd));
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		
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
		$s["profile_picture"]=sprintf("%s/prg_img/img/%s",$domain,$f["img1"]);
		$s["bio"]=$f["t2"];
		$s["url"]=sprintf("%s/mypage/",$domain);
		$s["type"]["id"]=$f["cid"];
		$s["type"]["label"]=$f["label"];
		$s["interest"]["category"]=$interestcategory;
		$s["access_token"]=$f["a15"];
		$s["session_token"]="";
		
	}else{
		$ermsg="メールアドレスかパスワードが間違っております。";
	}
				
}else{
	$ermsg="メールアドレスかパスワードが入力されておりません。";
}

if($ermsg==""){
	$y["status"]["code"]=200;
	$y["response"]=$s;
}else{
	$y["status"]["code"]=500;
	$y["status"]["user_message"]=$ermsg;
}

if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>