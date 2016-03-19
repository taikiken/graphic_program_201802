<?php

$H=getallheaders();
$SIZE=200;

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
	m_time,
	t6 as videocaption,
	(select name from pm_ where id=m1) as category,
	(select name_e from pm_ where id=m1) as slug,
	(case when m2 is not null then (select name from pm_ where id=m2) else null end)  as category2,
	(case when m2 is not null then (select name_e from pm_ where id=m2) else null end) as slug2,
	extract(epoch from (now()-to_timestamp(a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':00', 'YYYY-MM-DD HH24:MI:SS')))/60 as relativetime,
	a2||'月'||a3||'日 '||a4||'時'||a5||'分' as date,a1||'-'||a2||'-'||a3||'T'||a4||':'||a5||':'||a6||'+09:00' as isotime,
	extract(dow from date(a1||'-'||a2||'-'||a3)) as weekday 
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
	pageid,
	regitime,
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
from repo_n where qid=2 and flag=1%s) as t2";

$noticetable="select t1.id from (select id,userid,(select flag from repo_n where id=userid) as userflag,activityid from u_activity where activity=1 and reuserid=%s and flag=1) as t1,(select id from u_comment where flag=1) as t2 where t1.activityid=t2.id and userflag=1 union select t1.id from (select id,userid,activityid,(select flag from repo_n where id=userid) as userflag from u_activity where activity in(2,3) and reuserid=%s and flag=1) as t1,(select id from u_reaction where flag=1) as t2 where t1.activityid=t2.id and userflag=1";

$bookmarkfield="(select max(id) as id from u_bookmark where pageid=repo_n.id and userid=%s) as is_bookmark,";

function mailregister($email,$name){

	$to=$email;
	$subject="【運動通信】会員登録完了のお知らせ";
	$body=sprintf("%s様
	
	この度は、運動通信Crazy for sports www.undotsushin.com にご登録いただき、誠にありがとうございます。
	
	会員登録が完了しましたのでお知らせいたします。
	下記登録内容をご確認の上、大切に保管ください。
	
	[登録内容]
	メールアドレス： %s
	ユーザー名：　%s
	パスワード：　セキュリティ保持のため非公開
	
	※	パスワードを忘れた場合は、以下のURLから再登録をお願いいたします。
	https://www.undotsushin.com/reset_password/
	
	ご不明な点等ございましたら、以下の運動通信カスタマーセンターまでお問い合わせください。
	info@undotsushin.com
	
	※	当社コンテンツをご使用の際は、必ず下記の利用規約をお読みください。
	https://www.undotsushin.com/about/terms/
	
	[ご注意]
	こちらのメールアドレスは送信専用のため、直接返信されても返答できませんので予めご了承ください。",$name,$email,$name);
	$from="noreply@undotsushin.com";
	$reply="info@undotsushin.com";

	return sendmail($to,$subject,preg_replace("/\t/","",$body),$from,$reply);
}

function set_articleinfo($f,$type=0){
	
	global $ImgPath,$domain;
	$video=get_videotype($f["video"],$f["youtube"],$f["facebook"]);
	
	$s["id"]=(int)$f["id"];
	$s["date"]=$f["isotime"];
	$s["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
	$s["title"]=mod_HTML($f["title"]);
	$s["description"]=get_summary($f["b1"],$f["body"]);
	
	if($type==1){
		$s["body"]=preg_replace("/\n/","",$f["body"]);
		$s["body_escape"]=stripbr($f["body"]);
	}
	
	$s["category"]["label"]=$f["category"]; 
	$s["category"]["slug"]=$f["slug"]; 
	$s["category2"]["label"]=$f["category2"]; 
	$s["category2"]["slug"]=$f["slug2"]; 
	$s["categories"][0]["label"]=$f["category"]; 
	$s["categories"][0]["slug"]=$f["slug"];
	if(strlen($f["category2"])>0){
		$s["categories"][1]["label"]=$f["category2"];
		$s["categories"][1]["slug"]=$f["slug2"]; 
	}

	$s["url"]=sprintf("%s/%s/%s",$domain,"p",$f["id"]);
	$s["is_bookmarked"]=strlen($f["is_bookmark"])>0?true:false;
	if($type==0){
		$s["is_recommend"]=$f["recommend"]==1?true:false;
	}
	
	$s["media_type"]=strlen($video)>0?"video":"image";
	$s["media"]["images"]["thumbnail"]=get_img($f["img1"],2,$f["id"]);
	$s["media"]["images"]["medium"]=get_img($f["img1"],1,$f["id"]);
	$s["media"]["images"]["large"]=get_img($f["img1"],0,$f["id"]);
	$s["media"]["images"]["original"]=strlen($f["img1"])>0?sprintf("%s/prg_img/raw/%s",$ImgPath,$f["img1"]):"";
	$s["media"]["images"]["caption"]=checkstr($f["t1"],1);
	
	$s["media"]["video"]["player"]=$video;
	$s["media"]["video"]["url"]=strlen($f["video"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["video"]):"";
	$s["media"]["video"]["youtube"]=checkstr($f["youtube"],1);
	$s["media"]["video"]["facebook"]=checkstr($f["facebook"],1);
	$s["media"]["video"]["caption"]=checkstr($f["videocaption"],1);

	$s["user"]["id"]=(int)$f["uid"];
	$s["user"]["name"]=mod_HTML($f["name"]);
	$s["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
	$s["user"]["bio"]==checkstr($f["profile"]);
	$s["user"]["url"]=sprintf("%s/mypage/",$domain);
	$s["user"]["type"]["id"]=(int)$f["typeid"];
	$s["user"]["type"]["label"]=$f["type"];
	
	return $s;
}

function mod_replyfield($f,$data){
	for($i=0;$i<count($f);$i++){
		$d[$f[$i]]=$data[$f[$i]."_"];
	}
	$d["pageid"]=$data["pageid"];
	return $d;
}

function set_commentinfo($f,$reply=0,$type=0){
	
	global $ImgPath,$domain;
	
	$s["id"]=(int)$f["id"];
	if($type===0){
		$s["date"]=str_replace(" ","T",$f["isotime"]);
		$s["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
	}
	$s["body"]=mod_HTML($f["comment"],2);
	if($type===0){
		$s["body_escape"]=mod_HTML($f["comment"]);
	
		$s["is_like"]=$f["isreaction"]!=1?false:true;
		$s["is_bad"]=$f["isreaction"]!=2?false:true;
		$s["like"]=(int)$f["good"];
		$s["bad"]=(int)$f["bad"];
		
	}
	if($reply===0){
		$s["url"]=sprintf("%s/%s/%s/comment/%s",$domain,"p",$f["pageid"],$f["id"]);
	}else{
		$s["url"]=sprintf("%s/%s/%s/comment/%s/%s",$domain,"p",$f["pageid"],$reply,$f["id"]);
	}
	
	$s["user"]["id"]=(int)$f["userid"];
	$s["user"]["name"]=mod_HTML($f["name"]);
	$s["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
	$s["user"]["bio"]==checkstr($f["profile"]);
	$s["user"]["url"]=sprintf("%s/mypage/",$domain);
	
	$s["user"]["type"]["id"]=(int)$f["typeid"];
	$s["user"]["type"]["label"]=$f["type"];
	
	return $s;
}

function set_activity($f){
	
	global $ImgPath,$domain;
	
	$s["id"]=(int)$f["id"];
	$s["date"]=str_replace(" ","T",$f["isotime"]);
	$s["display_date"]=get_relativetime($f["relativetime"],$f["date"],$f["weekday"]);
	$s["action"]=get_action($f["activity"],$f["activityid"]);

	$s["user"]["id"]=(int)$f["userid"];
	$s["user"]["name"]=mod_HTML($f["name"]);
	$s["user"]["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["icon"]):"";
	$s["user"]["bio"]==checkstr($f["profile"]);
	$s["user"]["url"]=sprintf("%s/mypage/",$domain);
	$s["user"]["type"]["id"]=(int)$f["typeid"];
	$s["user"]["type"]["label"]=$f["type"];

	$s["article"]["id"]=$f["pageid"];
	$s["article"]["title"]=$f["title"];
	$s["article"]["url"]=sprintf("%s/%s/%s",$domain,"p",$f["pageid"]);
	
	return $s;
}

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
		$sql=sprintf("select id from repo_n where qid=2 and flag=1 and a15='%s'",trim($token["oautn_token"]));
		$o->query($sql);
		$f=$o->fetch_array();
	}
/*
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
	$fp=fopen("../../log.txt","a");
	fputs($fp,$out);
	fclose($fp);
*/
	return isset($f["id"])?$f["id"]:"";
}
function get_img($img,$type,$id){
	
	global $ImgPath;
	$path=["%s/prg_img/img/%s","%s/prg_img/thumbnail1/%s","%s/prg_img/thumbnail2/%s"];
	if(strlen($img)>0){
		$r=sprintf($path[$type],$ImgPath,$img);
	}else{
		$r=sprintf($path[$type],$ImgPath,sprintf("0%s.jpg",($id%7+1)));
	}
	return $r;
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

function get_action($a,$b){
	global $o;
	$s=array("comment","good","bad","bookmark");
	$y=$s[$a-1];
	if($a==1){
		$sql=sprintf("select commentid from u_comment where id=%s",$b);
		$o->query($sql);
		$f=$o->fetch_array();
		if($f["commentid"]!=0)$y="reply";
	}
	return $y;
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
	$v=trim($v);
	$v=urldecode($v);
	$v=stripslashes($v);
	$v=str_replace(array("\r\n","\r"),"\n",$v);
	$v=str_replace("―","-",$v);
	$v=strip_tags($v);
	$v=pg_escape_string($v);
	return $v;
}
function bind($v){
	$v=trim($v);
	$v=stripslashes($v);
	$v=strip_tags($v);
	$v=pg_escape_string($v);
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
	$email=bind($email);
	
	if(strlen($email)==0){
		$err="メールアドレスは必須項目です。";
	}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$err="正しいメールアドレスを入力してください。";
	}else{
		if($conf==0){
			$sql=sprintf("select id from repo_n where qid=2 and flag=1 and t1='%s'",$email);
			$o->query($sql);
			$f=$o->fetch_array();
			
			if(strlen($f["id"])>0){
				$err=sprintf("入力いただいたメールアドレス%sはすでに登録されております。",$email);
			}
		}
	}
	
	return $err;
}

function set_status($s){
	global $y;
	if(strlen($s["code"])>0)$y["status"]["code"]=$s["code"];
	if(strlen($s["message_type"])>0)$y["status"]["message_type"]=$s["message_type"];
	if(strlen($s["user_message"])>0)$y["status"]["user_message"]=$s["user_message"];
	if(strlen($s["developer_message"])>0)$y["status"]["developer_message"]=$s["developer_message"];
}

function check_passwd($passwd){
	
	/* 英数字8桁以上 */
	
	$err="";
	$email=trim(htmlspecialchars($passwd));
	
	if(strlen($passwd)==0){
		$err="パスワードは必須項目です。";
	}elseif(strlen($passwd)<8){
		$err="パスワードは8文字以上で入力してください。";
	}elseif(!preg_match("/^[0-9a-zA-Z]+$/",$passwd)){
		$err="パスワードは半角英数字で入力してください。";
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

function sendmail($to,$subject,$body,$from,$reply){

	$sbj="=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($subject,"JIS","UTF-8"))."?=";
	$msg=stripslashes($body);
	$msg=addslashes($msg);
	$msg=mb_convert_encoding($msg,"JIS","UTF-8");
	$header="From:=?iso-2022-jp?B?".base64_encode(mb_convert_encoding("運動通信","JIS","UTF-8"))."?=<".$from.">\n";
	$header.="Bcc: info@undotsushin.com\n";
	$header.="Reply-To:".$reply."\n";
	$header.="Return-Path:".$from."\n";
	$header.="Content-Type:text/plain;charset=\"ISO-2022-JP\"";

	return mail($to,$sbj,$msg,$header,sprintf("-f%s",$from));
}

function print_json($y,$r){
	if(preg_match("/debugger\.php/",$r)){
		print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	}else{
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($y);
	}	
}

?>