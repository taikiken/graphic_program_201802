<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();
$pageid=$_REQUEST["pageid"];
$commentid=$_REQUEST["commentid"];
$replyid=$_REQUEST["replyid"];

if(strlen($pageid)>0){
	if(strlen($uid)>0){
		if(strlen($commentid)>0){			
			
			$sql=sprintf("select id,flag from u_comment where id=%s and userid=%s;",strlen($replyid)>0?$replyid:$commentid,$uid);
			
			$o->query($sql);
			$f=$o->fetch_array();
			
			if($f["flag"]==1){
				$sql =sprintf("update u_comment set flag=0,regitime=now() where id=%s;",$f["id"]);
				$sql.=sprintf("update u_activity set flag=0,regitime=now() where activity=1 and activityid=%s;",$f["id"]);
				$o->query($sql);
				$e=$o->affected_rows2();
				if(!$e){
					$code=500;
					$ermsg="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
				}else{
					$ermsg="";
					$code=200;
				}
			}else{
				$code=409;
				$ermsg="指定されたコメントIDは存在しません。";
			}
		}else{
			$code=409;
			$ermsg="コメントIDが指定されておりません。";
		}
	}else{
		$code=401;
		$ermsg="ユーザIDが指定されておりません。";
	}
}else{
	$code=400;
	$ermsg="ページIDが指定されておりません。";
}


$y["status"]["code"]=$code;
$y["status"]["user_message"]=$ermsg;
$y["status"]["developer_message"]="";
$y["response"]=(object)array();


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>