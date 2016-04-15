<?php

$H=getallheaders();
$SIZE=200;

$articlefield="is_bookmark,id,title,body,b1,img1,type,d2,t1,m1,t10,t11,t12,t13,t14,video,youtube,facebook,m_time,videocaption,category,slug,category2,slug2,userid,typeid,name,profile,icon";
$articletable="
(select 
	%s
	id,
	title,
	(select body from repo_body where pid=repo_n.id) as body,
	t16 as b1,
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
	t8 as videocaption,
	(select name from pm_ where id=m1) as category,
	(select name_e from pm_ where id=m1) as slug,
	(case when m2 is not null then (select name from pm_ where id=m2) else null end)  as category2,
	(case when m2 is not null then (select name_e from pm_ where id=m2) else null end) as slug2
from repo_n where cid=1 and flag=1%s) as t1,
(select 
	id as userid,
	cid as typeid,
	title as name,
	t2 as profile,
	img1 as icon 
from u_member where cid!=6 and flag=1) as t2 
where t1.d2=t2.userid";

$articletable2="
(select 
	%s
	id,
	title,
	(select body from repo_body where pid=repo_n.id) as body,
	t16 as b1,
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
	t8 as videocaption,
	(select name from pm_ where id=m1) as category,
	(case when m2 is not null then (select name from pm_ where id=m2) else null end)  as category2
	from repo_n where cid=1 and flag=1%s%s%s) as t1,
(select 
	id as userid,
	cid as typeid,
	title as name,
	t2 as profile,
	img1 as icon 
from u_member where  cid!=6 and flag=1) as t2 
where t1.d2=t2.userid";

$commentfield="isreaction,id,comment,userid,pageid,regitime,slug,good,bad,reply,typeid,type,name,profile,icon";
$commenttable="
(select 
	%s
	id,
	comment,
	userid,
	pageid,
	regitime,
	(select name_e from pm_ where id=(select m1 from repo_n where id=u_comment.pageid)) as slug,
	(select count(reaction) from u_reaction where commentid=u_comment.id and reaction=1 and flag=1) as good,
	(select count(reaction) from u_reaction where commentid=u_comment.id and reaction=2 and flag=1) as bad,
	(select n from (select commentid,count(commentid) as n from u_comment where commentid!=0 and flag=1 group by commentid) as t where t.commentid=u_comment.id) as reply
from 
u_comment where %s) as t1,
(select 
	id as uid,
	cid as typeid,
	(select name from repo where id=cid) as type,
	title as name,
	t2 as profile,
	img1 as icon 
from u_member where flag=1%s) as t2";


function set_orderby($s=0){
	return $s==0?" order by m_time desc,id":sprintf(" order by %s.m_time desc,%s.id");
}

function set_isbookmark($uid){
	
	if(strlen($uid)>0){
		$r=sprintf("(select count(pageid) as n from u_bookmark where pageid=repo_n.id and userid=%s and flag=1) as is_bookmark,",$uid);
	}else{
		$r="0 as is_bookmark,";
	}
	return $r;
}
function set_isreaction($uid){

	if(strlen($uid)>0){
		$r=sprintf("(select reaction from u_reaction where commentid=u_comment.id and userid=%s and flag=1) as isreaction,",$uid);
	}else{
		$r="0 as isreaction,";
	}
	return $r;
}

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

function set_categoryinfo($f,$personalized=""){
	
	global $ImgPath,$domain;
	
	$s["id"]=(int)$f["id"];
	$s["label"]=$f["name"];
	$s["slug"]=$f["name_e"];
	$s["url"]=sprintf("%s/category/%s/",$domain,$f["name_e"]);
	if($personalized!=="")$s["is_interest"]=$personalized;
	$s["title_img"]=strlen($f["img"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["img"]):"";
	
	return $s;
}

function set_articleinfo($f,$type=0){
	
	global $ImgPath,$domain;
	
	$video=get_videotype($f["video"],$f["youtube"],$f["facebook"]);
	$datetime=get_date($f["m_time"]);
	
	$body=preg_replace("/\n/","",$f["body"]);
	
	$s["id"]=(int)$f["id"];
	$s["date"]=$datetime["isotime"];
	$s["display_date"]=get_relativetime($datetime["relativetime"],$datetime["date"],$datetime["weekday"]);
	$s["title"]=mod_HTML(strlen($f["modtitle"])>0?$f["modtitle"]:$f["title"]);
	$s["description"]=get_summary($f["b1"],$f["body"]);
	
	if($type==1){
		if(strlen($f["t2"])>0){
			$l="<p>関連リンク<br>";
			for($i=2;$i<=6;$i++){
				if(strlen($f["t".$i])>0)$l.=sprintf("<a href=\"%s\" target=\"_blank\">%s</a><br>",$f["t".$i],$f["b".$i]);
			}
			$l.="</p>";
		}
		$body.=$l;	
		$s["body"]=$body;
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
	$s["is_bookmarked"]=$f["is_bookmark"]==0?false:true;
	if($type==0){
		$s["is_recommend"]=$f["recommend"]==1?true:false;
	}
	
	$s["media_type"]=strlen($video)>0?"video":"image";
	$s["media"]["images"]=get_img($f["img1"],$f["id"]);
	$s["media"]["images"]["caption"]=checkstr($f["t1"],1);
	
	$s["media"]["video"]["player"]=$video;
	$s["media"]["video"]["url"]=strlen($f["video"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$f["video"]):"";
	$s["media"]["video"]["youtube"]=checkstr($f["youtube"],1);
	$s["media"]["video"]["facebook"]=checkstr($f["facebook"],1);
	$s["media"]["video"]["caption"]=checkstr($f["videocaption"],1);

	$s["user"]=set_userinfo($f);
	
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
	$datetime=get_date($f["regitime"]);
	
	$s["id"]=(int)$f["id"];
	if($type===0){
		$s["date"]=$datetime["isotime"];
		$s["display_date"]=get_relativetime($datetime["relativetime"],$datetime["date"],$datetime["weekday"]);
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
	$s["user"]=set_userinfo($f);
	
	return $s;
}

function set_userinfo($f,$interestset=0,$appexp=0){
	
	global $UserImgPath,$domain;
	
	/* String型 */
	$s["id"]=$f["userid"];
	$s["name"]=mod_HTML($f["name"]);
	if(strlen($f["email"])>0){
		$s["email"]=strlen($f["email"])>0?mod_HTML($f["email"]):"";
	}
	if(!preg_match("/http/",$f["icon"])){
		$s["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/users/img/%s",$UserImgPath,$f["icon"]):"";
	}else{
		$s["profile_picture"]=$f["icon"];
	}
	$s["bio"]=checkstr($f["profile"]);
	$s["url"]=sprintf("%s/mypage/",$domain);
	$s["type"]["id"]=(int)$f["typeid"];
	$s["type"]["label"]=$f["type"];
	
	if($interestset===1){
		$s["interest"]=$f["interest"];
	}
	if(strlen($f["token"])>0){
		$s["access_token"]=$f["token"];
		$s["session_token"]="";
	}
	
	return $s;
}

function set_activity($f){
	
	global $ImgPath,$domain;
	$datetime=get_date($f["regitime"]);
	
	$s["id"]=(int)$f["id"];
	$s["date"]=$datetime["isotime"];
	$s["display_date"]=get_relativetime($datetime["relativetime"],$datetime["date"],$datetime["weekday"]);
	$s["action"]=get_action($f["activity"],$f["activityid"]);

	$s["user"]=set_userinfo($f);

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

function wlog($file,$data){
	$fp=fopen($file,"a");
	fputs($fp,sprintf("%s\n",implode("\t",$data)));
	fclose($fp);
}
function debug($token,$id,$txt=array()){
	
	global $H,$_SERVER,$_GET,$_POST,$_FILES,$_COOKIE,$LOGTXT;
	
	if(count($txt)==0){
		$log=$H;
		$log["REQUEST_URI"]=$_SERVER['REQUEST_URI'];
		$log["ACCESS_TOKEN"]=$token;
		$log["USERID"]=$id;
		$log["IP"]=$_SERVER['REMOTE_ADDR'];
		$log["UA"]=$_SERVER['HTTP_USER_AGENT'];
		$log["TIMESTAMP"]=date("Y-m-d H:i:s");
		$log["REQUEST"]["GET"]=$_GET;
		$log["REQUEST"]["POST"]=$_POST;
		$log["REQUEST"]["FILES"]=$_FILES;
		$log["REQUEST"]["COOKIE"]=$_COOKIE;
	}else{
		$log=$txt;
	}
	$out=print_r($log,true);
	$fp=fopen($LOGTXT,"a");
	fputs($fp,$out);
	fclose($fp);
	
}

function auth(){
	
	global $o,$H;
	$token=check_token($H);

	if(strlen($token["oautn_token"])>0){
		$sql=sprintf("select id from u_member where flag=1 and a15='%s'",trim($token["oautn_token"]));
		$o->query($sql);
		$f=$o->fetch_array();
	}
	debug($token["oautn_token"],$f["id"]);
	return isset($f["id"])?$f["id"]:"";
}

function get_img($img,$id){
	
	global $ImgPath;
	
	$s=array();
	$type=array("thumbnail","medium","large","original");
	$path=array("thumbnail2","thumbnail1","img","raw");
	if(strlen($img)==0)$defimg=sprintf("0%s.jpg",($id%7+1));
	
	for($i=0;$i<count($path);$i++){
		if(strlen($img)==0){
			if($i!=3){
				$s[$type[$i]]=sprintf("%s/prg_img/%s/%s",$ImgPath,$path[$i],$defimg);
			}else{
				$s[$type[$i]]="";
			}
		}else{
			if(!preg_match("/http/",$img)){
				$s[$type[$i]]=sprintf("%s/prg_img/%s/%s",$ImgPath,$path[$i],$img);
			}else{
				$s[$type[$i]]=$img;
			}
		}
	}
	return $s;
}

function get_date($m){

	$str=strtotime($m);
	$now=strtotime(date("Y-m-d H:i:s"));

	$t["relativetime"]=($now-$str)/60;
	$t["date"]=date("m月d日 H時i分",$str);
	$t["isotime"]=str_replace(" ","T",date("Y-m-d H:i:s+0900",$str));
	$t["weekday"]=date("w",$str);
	
	return $t;
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
		$s=preg_replace("/(\n|\r)/","",$s);
		$s=preg_replace("/(^　)/","",$s);
	}
	if(mb_strlen($s)>90){
		$s=sprintf("%s…",mb_substr($s,0,90));
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
			$sql=sprintf("select id from u_member where flag=1 and t1='%s'",$email);
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