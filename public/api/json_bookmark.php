<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();

$pageid=$_REQUEST["article_id"];
$ermsg="";

if($_SERVER["REQUEST_METHOD"]=="PUT"){
	if(strlen($pageid)>0){
		if(strlen($uid)>0){
			$sql=sprintf("select id,flag from u_bookmark where pageid=%s and userid=%s",$pageid,$uid);
			$o->query($sql);
			$f=$o->fetch_array();
			unset($sql);
			
			if($f["flag"]==0||strlen($f["id"])==0){
				
				if(strlen($f["id"])==0){
					$sql[]=sprintf("insert into u_bookmark(pageid,userid,flag,regitime) values(%s,%s,1,now());",$pageid,$uid);
					$sql[]=sprintf("insert into u_activity(userid,reuserid,pageid,activity,activityid,notice,flag,regitime) select %s,(select d2 from repo_n where id=%s),%s,4,(select id from u_bookmark where pageid=%s and userid=%s order by regitime desc limit 1 offset 0),1,1,now() ;",$uid,$pageid,$pageid,$pageid,$uid);
				}else{
					$sql[]=sprintf("update u_bookmark set flag=1,regitime=now() where id=%s;",$f["id"]);
					$sql[]=sprintf("update u_activity set flag=1,regitime=now() where activity=4 and activityid=%s;",$f["id"]);
				}
				
				$o->query(implode("\n",$sql));
				$e=$o->affected_rows2();
				
				if($e){
					$code=200;
				}else{
					$code=500;
					$ermsg="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
				}
			}else{
				$code=409;
				$ermsg="指定されたページはすでにブックマークがされています。";
			}		
		}else{
			$code=401;
			$ermsg="ユーザIDが指定されておりません。";
		}
	}else{
		$code=400;
		$ermsg="ページIDが指定されておりません。";
	}
}else{
	if(strlen($pageid)>0){
		if(strlen($uid)>0){
			$sql=sprintf("select id from u_bookmark where pageid=%s and userid=%s and flag=1",$pageid,$uid);
			$o->query($sql);
			$f=$o->fetch_array();
			if(strlen($f["id"])>0){
				$sql=sprintf("update u_bookmark set flag=0,regitime=now() where id=%s;",$f["id"]);
				$sql.=sprintf("update u_activity set flag=0,regitime=now() where activity=4 and activityid=%s;",$f["id"]);
				$o->query($sql);
				$e=$o->affected_rows2();
				if(!$e){
					$code=500;
					$ermsg="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
				}else{
					$code=200;
				}
			}else{
				$code=409;
				$ermsg="指定されたページはブックマークがされておりません。";
			}		
		}else{
			$code=401;
			$ermsg="ユーザIDが指定されておりません。";
		}
	}else{
		$code=400;
		$ermsg="ページIDが指定されておりません。";
	}
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