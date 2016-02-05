<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth($H["Authorization"]);
$commentid=$_REQUEST["comment_id"];
$type=$_REQUEST["reaction"]=="good"?1:2;
$ermsg="";

if($_SERVER["REQUEST_METHOD"]=="PUT"){
	if(strlen($commentid)>0){
		if(strlen($uid)>0){
			
			$sql=sprintf("select id,reaction,flag from u_reaction where commentid=%s and userid=%s",$commentid,$uid);
			$o->query($sql);
			$f=$o->fetch_array();
			$status=$f;
			
			if($status["flag"]==0||$status["reaction"]!=$type||strlen($status["reaction"])==0){
				
				if(strlen($status["reaction"])==0){
					$sql =sprintf("insert into u_reaction(commentid,userid,reaction,flag,regitime) values(%s,%s,%s,1,now())",$commentid,$uid,$type);
					$sql2=sprintf("insert into u_activity(userid,reuserid,pageid,activity,activityid,notice,flag,regitime) select %s,(select userid from u_comment where id=%s),(select pageid from u_comment where id=%s),%s,(select id from u_reaction where userid=%s and commentid=%s order by regitime desc limit 1 offset 0),1,1,now() ;",$uid,$commentid,$commentid,($type+1),$uid,$commentid);
				}else{
					$sql =sprintf("update u_reaction set reaction=%s,flag=1,regitime=now() where id=%s;",$type,$f["id"]);
					$sql2=sprintf("update u_activity set flag=1,regitime=now(),activity=%s where activity in (2,3) and activityid=%s;",($type+1),$f["id"]);
				}
				
				$o->query("begin");
				$o->query($sql);
				$e=$o->affected_rows2();
	
				if($e){
					
					$o->query($sql2);
					$e=$o->affected_rows2();
					
					if($e){
						
						$o->query("commit");
						
						$sql=sprintf("select count(*) as n from u_reaction where commentid=%s and reaction=%s and flag=1",$commentid,$type);
						$o->query($sql);
						$f=$o->fetch_array();
						
						$num=$f["n"];
						
					}else{
						$o->query("abort");
						$ermsg="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
					}
				}else{
					$o->query("abort");
					$ermsg="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
				}
			}else{
				$ermsg=sprintf("すでに%sされております。",$type==1?"good":"bad");
			}
			
		}else{
			$ermsg="ユーザIDが指定されておりません。";
		}
	}else{
		$ermsg="コメントIDが指定されておりません。";
	}
}else{
	if(strlen($commentid)>0){
		if(strlen($uid)>0){
			
			$sql=sprintf("select id,reaction from u_reaction where commentid=%s and userid=%s and flag=1",$commentid,$uid);
			$o->query($sql);
			$f=$o->fetch_array();
			
			if(strlen($f["reaction"])>0){
				
				$sql=sprintf("update u_reaction set flag=0 where id=%s;",$f["id"]);
				$sql.=sprintf("update u_activity set flag=0,regitime=now() where activity=%s and activityid=%s;",($f["reaction"]+1),$f["id"]);
				$o->query($sql);
				$e=$o->affected_rows2();
	
				if($e){
					
					$sql=sprintf("select count(*) as n from u_reaction where commentid=%s and reaction=%s and flag=1",$commentid,$type);
					$o->query($sql);
					$f=$o->fetch_array();
					
					$num=$f["n"];
					
				}else{
					$ermsg="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
				}
			}else{
				$ermsg=sprintf("%sされておりません。",$type==1?"good":"bad");
			}
			
		}else{
			$ermsg="ユーザIDが指定されておりません。";
		}
	}else{
		$ermsg="コメントIDが指定されておりません。";
	}
}

$y["status"]["code"]=strlen($ermsg)>0?500:200;
$y["status"]["user_message"]=$ermsg;
$y["status"]["developer_message"]="";
$y["response"]=(int)$num;


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>