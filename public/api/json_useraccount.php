<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."tool.php";

$o=new db;
$o->connect();

$uid=auth($H["Authorization"]);

$y=array();
$y["status"]["code"]=200;
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";


$sql=sprintf("select id as uid,t1,passwd,a15,cid as typeid,(select name from repo where id=repo_n.cid) as type,title,t2,img1 from repo_n where id=%s",$uid);
$o->query($sql);
$f=$o->fetch_array();

$s["id"]=(int)$f["uid"];
$s["name"]=mod_HTML($f["title"]);
$s["profile_picture"]=strlen($f["img1"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["img1"]):"";
$s["bio"]=checkstr($f["t2"]);
$s["url"]=sprintf("%s/mypage/",$domain,$f["uid"]);

$ex=array(
	"email"=>"t1",
	"name"=>"title",
	"bio"=>"t2",
	"profile_picture"=>"img1",
	"password"=>"passwd"
);
while(list($k,$v)=each($ex))$r[$k]=$f[$v];

if($_SERVER["REQUEST_METHOD"]=="POST"){
		
	while(list($k,$v)=each($_POST)){
		if(strlen($v)>0&&$r[$k]!=$v){
			$v=trim($v);
			$sv[$sn[]=$k]=$v;
			if($k!="password")$s[$k]=$v;
		}
	}
	if(strlen($sv["password"])>0){
		$sv[$sn[]="a15"]=md5($sv["email"].$sv["password"]);
		$sv["password"]=md5($MAGIC_STRING.$sv["password"]);
		if($sv["password"]==$r["password"]){
			unset($sv["a15"]);unset($sv["password"]);
		}
	}
	if($_FILES){
		$ext=checkFileType($_FILES["profile_picture"]);
		$filename=sprintf("%s.%s",md5("ut".$uid),$ext);
		if(move_uploaded_file($_FILES["profile_picture"]["tmp_name"],$SERVERPATH."/prg_img/raw/".$filename)){
			imgDresize($SERVERPATH."/prg_img/raw/".$filename,$SERVERPATH."/prg_img/img/".$filename,array($SIZE,$SIZE),$ext,"","","","");
			$sv["profile_picture"]=$filename;
			$s["profile_picture"]=sprintf("%s/prg_img/img/%s",$domain,$filename);
		}
	}
	$q=array();	
	while(list($k,$v)=each($sv)){
		$v=stripslashes($v);
		$v=str_replace("―","-",$v);
		$v=addslashes($v);
		$v=str_replace("\'","''",$v);
		$v=str_replace(array("\r\n","\r"),"\n",$v);
		$q[]=sprintf("%s='%s'",$ex[$k],$v);
	}
	if(count($q)>0){
		$sql=sprintf("update repo_n set %s where id=%s",implode(",",$q),$uid);
		echo $sql;
		$o->query($sql);
		$e=$o->affected_rows2();
		if(!$e){
			$y["status"]["code"]=500;
			$ermsg="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
		}
	}else{
		$y["status"]["code"]=500;
		$y["status"]["user_message"]="変更箇所はありませんでした。";
	}

}

$s["type"]["id"]=(int)$f["typeid"];
$s["type"]["label"]=$f["type"];

$y["response"]=$s;


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>