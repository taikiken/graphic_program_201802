<?php

$domain="http://www.undotsushin.com";
$H=getallheaders();

$SIZE=300;

$articletable="
(select 
	%s
	id,
	title,
	body,
	b1,
	img1,
	(select name from repo where id=d1) as type,
	d2,
	t1,
	m1,
	t10,t11,t12,t13,t14,
	swf as video,
	youtube,
	facebook,
	t6 as videocaption,
	(select name from pm_ where id=m1) as category,
	(select name_e from pm_ where id=m1) as slug,
	(case when m2 is not null then (select name from pm_ where id=m2) else null end)  as category2,
	(case when m2 is not null then (select name_e from pm_ where id=m2) else null end) as slug2,
	extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,
	a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,
	extract(dow from date(a1||'-'||a2||'-'||a3))+1 as weekday 
from repo_n where cid=1 and flag=1%s) as t1,
(select 
	id as uid,
	cid as typeid,
	title as name,
	t2 as profile,
	img1 as icon 
from repo_n where qid=2 and flag=1) as t2 
where t1.d2=t2.uid";

$commenttable="
(select 
	id,
	comment,
	userid,
	(select name_e from pm_ where id=(select m1 from repo_n where id=u_comment.pageid)) as slug,
	to_char(regitime,'YYYY-MM-DD HH24:MI:SS+09:00') as isotime,
	extract(epoch from (now()-regitime))/60 as relativetime,
	to_char(regitime,'MM月DD日 HH24時MI分') as date,
	extract(dow from regitime) as weekday,
	(select count(reaction) from u_reaction where reaction=1 and commentid=u_comment.id and flag=1) as good,
	(select count(reaction) from u_reaction where reaction=2 and commentid=u_comment.id and flag=1) as bad,
	(select n from (select commentid,count(commentid) as n from u_comment where commentid!=0 and flag=1 group by commentid) as t where t.commentid=u_comment.id) as reply
	%s 
from 
u_comment where %s) as t1,
(select 
	id as userid,
	cid as typeid,
	(select name from repo where id=cid) as type,
	title as name,
	t2 as profile,
	img1 as icon 
from repo_n where qid=2%s) as t2";

$bookmarkfield="(select id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,";

function check_token($h){
	
	if(strlen($h["Authorization"])>0)$f=$h["Authorization"];
	else if(strlen($h["authorization"])>0)$f=$h["authorization"];
	else $f="";
	
	$s=array();
	
	if(strlen($f)>0){
		$f=str_replace("OAuth ","",$f);
		$f=explode(",",$f);
		for($i=0;$i<count($f);$i++){
			$e=explode("=",$f[$i]);
			$s[trim($e[0])]=trim($e[1]);
		}
	}
	
	return $s;
}
function auth(){
	
	global $o,$H,$_SERVER,$_GET,$_POST,$_FILES;
	$token=check_token($H);

	if(strlen($token["oautn_token"])>0){
		$sql=sprintf("select id from repo_n where a15='%s'",trim($token["oautn_token"]));
		$o->query($sql);
		$f=$o->fetch_array();
	}

	$log=$H;
	$log["REQUEST_URI"]=$_SERVER['REQUEST_URI'];
	$log["ACCESS_TOKEN"]=$token["oautn_token"];
	$log["USERID"]=$f["id"];
	$log["IP"]=$_SERVER['REMOTE_ADDR'];
	$log["UA"]=$_SERVER['HTTP_USER_AGENT'];
	$log["TIMESTAMP"]=date("Y-m-d H:i:s");
	$log["REQUEST"]["GET"]=$_GET;
	$log["REQUEST"]["POST"]=$_POST;
	$log["REQUEST"]["FILES"]=$_FILES;
	
	
	$out=print_r($log,true);
	$fp=fopen("log.txt","a");
	fputs($fp,$out);
	fclose($fp);

	return isset($f["id"])?$f["id"]:"";
}

function get_weekday($a){
	$w=array("日","月","火","水","木","金","土");
	return $w[$a];
}
function get_relativetime($a,$b,$c){
	$rt="";
	if($a<60){
		$rt=sprintf("%s分前",floor($a));
	}elseif($a<60*24){
		$rt=sprintf("%s時間前",floor($a/(60)));
	}else{
		$rt=str_replace(" ",sprintf("(%s) ",get_weekday($c)),$b);
	}
	return $rt;
}

function get_action($a){
	$s=array("comment","good","bad","bookmark");
	return $s[$a-1];
}

function checkstr($s,$f=0){
	$r=strlen($s)>0?$s:"";
	return $f==0?$s:mod_HTML($s);
}

function tmod($s){
	$s=explode("<br />",$s);
	for($i=0;$i<count($s);$i++){
		$s[$i]=sprintf("<p>%s</p>",trim($s[$i]));
	}
	return implode("",$s);
}

function esc($v){
	$v=stripslashes($v);
	$v=str_replace(array("\r\n","\r"),"\n",$v);
	$v=str_replace("―","-",$v);
	$v=str_replace("'","''",$v);
	$v=strip_tags($v);
	return $v;
}

function get_summary($description,$body){
	$s="";
	if(strlen($description)>0){
		$s=$description;
	}else{
		$s=strip_tags($body);
		$s=preg_replace("/\n/","",$s);
		$s=preg_replace("/(^　)/","",$s);
		$s=mb_substr($s,0,100);
	}
	return mod_HTML($s);
}

function stripbr($s){
	$s=str_replace("</p><p>","\n\n",$s);
	$s=strip_tags($s);
	return $s;
}

function check_email($email,$conf=0){
	
	global $o;

	$err="";
	
	if(strlen($email)==0){
		$err="メールアドレスは必須項目です。";
	}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$err="正しいメールアドレスを入力してください。";
	}else{
		if($conf==0){
			$sql=sprintf("select id from repo_n where t1='%s' and flag=1",$email);
			$o->query($sql);
			$f=$o->fetch_array();
			
			if(strlen($f["id"])>0){
				$err=sprintf("入力いただいたメールアドレス%sはすでに登録されております。",$email);
			}
		}
	}
	
	return $err;
}

function check_passwd($passwd){
	
	/* 英数字8桁以上 */
	
	$err="";
	
	if(strlen($passwd)==0){
		$err="パスワードは必須項目です。";
	}elseif(strlen($passwd)<8){
		$err="パスワードは8桁以上の英数字で入力してください。";
	}elseif(!preg_match("/^[0-9a-zA-Z]+$/",$passwd)){
		$err="パスワードは英数字で入力してください。";
	}
	return $err;
}

function get_videotype($v1,$v2,$v3){
	if(strlen($v1)>0)$s="brightcove";
	elseif(strlen($v2)>0)$s="youtube";
	elseif(strlen($v3)>0)$s="facebook";
	else $s="";
	return $s;
}

?>