<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$uid=auth();
$pageid=$_REQUEST["article_id"];
$commentid=strlen($_REQUEST["comment_id"])>0?$_REQUEST["comment_id"]:0;
$comment=$_REQUEST["body"];

if(strlen($pageid)>0){
	if(strlen($uid)>0){
		if(strlen($comment)>0){
			
			$sql=sprintf("select id from u_comment where pageid=%s and commentid=%s and userid=%s and comment='%s'",$pageid,$commentid,$uid,esc($comment));
			$o->query($sql);
			$f=$o->fetch_array();
			
			if(strlen($f["id"])==0){
			
				$sql =sprintf("insert into u_comment(pageid,commentid,userid,comment,flag,regitime) values(%s,%s,%s,'%s',1,now());",$pageid,$commentid,$uid,esc($comment));
				$sql2=sprintf("insert into u_activity(userid,reuserid,pageid,activity,activityid,notice,flag,regitime) select %s,%s,%s,1,(select id from u_comment where userid=%s and pageid=%s and commentid=%s order by regitime desc limit 1 offset 0),1,1,now() ;",
				$uid,$commentid==0?sprintf("(select d2 from repo_n where id=%s)",$pageid):sprintf("(select userid from u_comment where id=%s)",$commentid),$pageid,$uid,$pageid,$commentid);
				
				$o->query("begin");
				$o->query($sql);
				$e=$o->affected_rows2();
				
				if($e){
					
					$o->query($sql2);
					$e=$o->affected_rows2();
					
					if($e){
					
						$o->query("commit");
						
						$code=200;
						$ermsg="";
					
						$sql=sprintf("select* from (select id,comment,userid,(select name_e from pm_ where id=(select m1 from repo_n where id=u_comment.pageid)) as slug,to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,extract(epoch from (now()-regitime))/60 as relativetime,to_char(regitime,'MM月DD日 HH24時MI分') as date,extract(dow from regitime) as weekday from u_comment where pageid=%s and userid=%s and commentid=%s order by relativetime limit 1 offset 0) as t1,(select id as userid,cid as typeid,(select name from repo where id=cid) as type,title as name,t2 as profile,img1 as icon from repo_n where qid=2) as t2 where t1.userid=t2.userid",
						$pageid,$uid,$commentid);
						$o->query($sql);
						$f=$o->fetch_array();
						
						$s["id"]=(int)$f["id"];
						$s["date"]=str_replace(" ","T",$f["isotime"]);
						$s["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
						$s["body"]=mod_HTML($f["comment"],2);
						$s["body_escape"]=mod_HTML($f["comment"]);
						
						$s["is_like"]=false;
						$s["is_bad"]=false;
						$s["like"]=0;
						$s["bad"]=0;
						
						$s["url"]=sprintf("%s/%s/%s/comment/%s",$domain,"p",$pageid,$f["id"]);
						$s["user"]["id"]=(int)$f["userid"];
						$s["user"]["name"]=mod_HTML($f["name"]);
						$s["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$domain,$f["icon"]):"";
						$s["user"]["bio"]==checkstr($f["profile"]);
						$s["user"]["url"]=sprintf("%s/mypage/",$domain);
						$s["user"]["type"]["id"]=(int)$f["typeid"];
						$s["user"]["type"]["label"]=$f["type"];
					
					}else{
						$o->query("abort");
						$code=500;
						$ermsg="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
					}
				}else{
					$o->query("abort");
					$code=500;
					$ermsg="データベースへの接続に失敗しました。時間をおいてもう一度お試しください。";
				}
			}else{
				$code=409;
				$ermsg="同じコメントが投稿されております。";
			}
		}else{
			$code=400;
			$ermsg="コメントが入力されておりません。";
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
$y["response"]=$s;


if(preg_match("/debugger\.php/",$_SERVER['HTTP_REFERER'])){
	print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
}else{
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($y);
}

?>