<?php

$y=array();
$y["status"]["code"]=200;
$y["status"]["message_type"]="success";
$y["status"]["user_message"]="";
$y["status"]["developer_message"]="";
$s=array();

//リアクション系

function set_reaction($type,$commentid,$uid,$method){
	
	global $o;
	
	check_user($uid);
	check_commentid($commentid);
	
	switch($type){
		case "like": $settype=1;
		break;
		case "bad": $settype=2;
		break;
		defaulf: $settype=0;
	}
	if($settype===0){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"like,badが選択されておりません。",
			"developer_message"=>"reaction値に不正値がある。"
		);
		set_status($status);
		return;
	}
	
	if($method=="PUT"){
		
		$sql=sprintf("select id,reaction,flag from u_reaction where commentid=%s and userid=%s",$commentid,$uid);
		$o->query($sql);
		$f=$o->fetch_array();
		
		if((int)$f["flag"]===1&&(int)$f["reaction"]===$settype){
			$status=array(
				"code"=>403,
				"message_type"=>"error",
				"user_message"=>sprintf("すでに%sされております。",$type),
				"developer_message"=>"reaction値に不正値がある。"
			);
			set_status($status);
			return;
		}
		
	}else{

		$sql=sprintf("select id,reaction from u_reaction where commentid=%s and userid=%s and reaction=%s and flag=1",$commentid,$uid,$settype);
		$o->query($sql);
		$f=$o->fetch_array();
		
		if(strlen($f["id"])==0){
			$status=array(
				"code"=>403,
				"message_type"=>"error",
				"user_message"=>sprintf("%sされておりません。",$type),
				"developer_message"=>"reaction値に不正値がある。"
			);
			set_status($status);
			return;
		}
	}
	return $f;
}

function set_commentpost($pageid,$uid,$commentid,$comment){
	
	global $o;
	
	check_pageid($pageid);
	check_user($uid);
	
	if(strlen($comment)==0){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"コメントが入力されておりません。",
			"developer_message"=>"ユーザIDに不正値がある。"
		);
		set_status($status);
		return;
	}
	
	$sql=sprintf("select id from u_comment where pageid=%s and commentid=%s and userid=%s and comment='%s' and flag=1;",$pageid,$commentid,$uid,$comment);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
		$status=array(
			"code"=>409,
			"message_type"=>"error",
			"user_message"=>"同じコメントが投稿されております。",
			"developer_message"=>"ユーザIDに不正値がある。"
		);
		set_status($status);
		return;
	}
	
}

function set_commentdelete($pageid,$uid,$commentid,$replyid){

	global $o;
	
	$pageid=bind($pageid);
	$commentid=bind($commentid);
	$replyid=bind($replyid);
	$targetcommentid=$commentid;

	check_pageid($pageid);
	check_user($uid);
	check_commentid($commentid);
	if(strlen($replyid)>0){
		check_commentid($replyid);
		$targetcommentid=$replyid;
	}
	
	$sql=sprintf("select id,flag from u_comment where id=%s and userid=%s and flag=1;",$targetcommentid,$uid);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])==0){
		$status=array(
			"code"=>404,
			"message_type"=>"error",
			"user_message"=>"指定されたコメントは存在しません。",
			"developer_message"=>"ユーザIDに不正値がある。"
		);
		set_status($status);
		return;
	}
	
	return $f["id"];
}

function set_bookmark($pageid,$uid,$method){

	global $o;

	check_pageid($pageid);
	check_user($uid);

	if($method==="PUT"){
		$sql=sprintf("select id,flag from u_bookmark where pageid=%s and userid=%s",$pageid,$uid);
		$o->query($sql);
		$f=$o->fetch_array();
		
		if($f["flag"]==1){
			$status=array(
				"code"=>409,
				"message_type"=>"error",
				"user_message"=>"指定されたページはすでにブックマークがされています。",
				"developer_message"=>"ユーザIDに不正値がある。"
			);
			set_status($status);
			return;
		}
	}else{
		$sql=sprintf("select id from u_bookmark where pageid=%s and userid=%s and flag=1",$pageid,$uid);
		$o->query($sql);
		$f=$o->fetch_array();
		
		if(strlen($f["id"])==0){
			$status=array(
				"code"=>409,
				"message_type"=>"error",
				"user_message"=>"指定されたページはブックマークがされておりません。",
				"developer_message"=>"ユーザIDに不正値がある。"
			);
			set_status($status);
			return;
		}
	}
	return $f["id"];
}

function set_comment($type,$pageid,$commentid){

	check_pageid($pageid);
	if(strlen($commentid)>0)check_commentid($commentid);
	
	$types=array("","normal","official","self");
	if(!in_array($type,$types)){

		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"該当しないコメントタイプのリクエスト。"
		);
		set_status($status);
		return;		
	}
}


//記事一覧

/* APIチェック */
function set_articleapi($api){
	
	$apis=array("category","search","home","self","bookmark","next","static","area");
	if(!in_array($api,$apis)){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"該当しないタイプのリクエスト。"
		);
		set_status($status);
		return;
	}
	return $api;
}

/* 記事詳細 */
function set_article($pageid,$uid){
	
	global $o,$articletable,$bookmarkfield,$RELATEDLINK_ALLOWED;
	check_pageid($pageid);

	$sql=sprintf("select * from %s",sprintf($articletable,set_isbookmark($uid),sprintf(" and id=%s",$pageid)));
	$o->query($sql);
	$f=$o->fetch_array();

	$l="";
	if(in_array($f["d2"],$RELATEDLINK_ALLOWED)){
		$sql=sprintf("select title,link from u_link where pid=%s order by n",$f["id"]);
		$o->query($sql);
		while($ee=$o->fetch_array())$p[]=$ee;
		if(count($p)>0){
			$l="<p>関連リンク<br>";
			for($i=0;$i<count($p);$i++){
				if(strlen($p[$i]["title"])>0)$l.=sprintf("<a href=\"%s\" target=\"_blank\">%s</a><br>",$p[$i]["title"],$p[$i]["link"]);
			}
			$l.="</p>";
		}
		$f["relatedpost"]=$l;
	}
	
	check_pageid($f["id"]);
	
	return $f;
}

/* 記事検索 */
function set_condition($q){
	
	if(strlen($q)==0){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"検索語が入力されておりません。",
			"developer_message"=>"検索語が入力されていない。"
		);
		set_status($status);
		return;
	}
	
	$exclusiveword=array("\r","\n","\t");
	$splitword=array(" ","　","|","、");
	
	$q=urldecode($q);
	$q=trim($q);
	$q=strip_tags($q);
	$q=str_replace($exclusiveword,"",$q);
	$q=str_replace($splitword,",",$q);
	$q=explode(",",$q);
	
	for($i=0;$i<count($q);$i++){
		$e=$q[$i];
		$e=mb_convert_kana($q[$i],"KVa");
		$e=strtolower($e);
		$e=bind($e);
		$e=str_replace(array("%","\\","$"),array("\%","\\\\","\$"),$e);
		$q[$i]=sprintf("txt like '%s%s%s'","%",$e,"%");
	}

	return implode(" and ",$q);
}

/* 記事ホーム */
function set_home($type){
	
	$type=strlen($type)>0?$type:"home";
	$types=array("home","headline","pickup","personalized");
	if(!in_array($type,$types)){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"該当しないタイプのリクエスト。"
		);
		set_status($status);
		return;
	}
	return $type;
}

/* 記事カテゴリー */
function set_category($category,$type){

	global $o;
	$requestcategory=trim($category);
	
	if(strlen($requestcategory)==0){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"リクエスト値が空。"
		);
		set_status($status);
		return;
	}

	$categorys[]="all";
	$sql="select id,name,name_e from u_categories where flag=1 order by n";
	$o->query($sql);
	while($f=$o->fetch_array()){
		$caa[$f["name_e"]]=$f["id"];
		$categorys[]=$f["name_e"];
	}
	if(!in_array($requestcategory,$categorys)){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"該当しないカテゴリーのリクエスト。"
		);
		set_status($status);
		return;		
	}
	
	$types=array("","ranking","video");
	if(!in_array($type,$types)){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"該当しないタイプのリクエスト。"
		);
		set_status($status);
		return;		
	}
	
	return $category=="all"?" and m1!=152":sprintf(" and (m1=%s or m2=%s)",$caa[$category],$caa[$category]);

}
function set_category2($category,$type){

	global $o;
	$requestcategory=trim($category);
	
	if(strlen($requestcategory)==0){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"リクエスト値が空。"
		);
		set_status($status);
		return;
	}

	if($category!="all"){
		$sql=sprintf("select id,name,name_e from u_categories where name_e='%s'",$category);
		$o->query($sql);
		$f=$o->fetch_array();
	
		if(strlen($f["id"])==0){
			$status=array(
				"code"=>400,
				"message_type"=>"error",
				"user_message"=>"リクエストに誤りがあります。",
				"developer_message"=>"該当しないカテゴリーのリクエスト。"
			);
			set_status($status);
			return;		
		}
	}else{
		$f["id"]=0;
	}
	
	//$types=array("","ranking","video");
	$types=array("","ranking","video","recommend");
	if(!in_array($type,$types)){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"該当しないタイプのリクエスト。"
		);
		set_status($status);
		return;		
	}
	
	return array($f["id"],$category=="all"?" and m1!=152":sprintf(" and (m1=%s or m2=%s)",$f["id"],$f["id"]));
}


/* ログイン */

function set_login($email,$passwd){

	global $o,$MAGIC_STRING;
	
	$email=bind($email);
	$passwd=bind($passwd);
	
	if(strlen($email)===0||strlen($passwd)===0){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"メールアドレス、パスワードが入力されておりません。",
			"developer_message"=>"ページIDに不正値がある。"
		);
		set_status($status);
		return;
	}
		
	$sql=sprintf("select id as userid,cid as typeid,t20,(select name from repo where id=cid) as type,title as name,t1,t2 as profile,img1 as icon,a15 as token,passwd from u_member where flag=1 and t1='%s';",$email);
	$o->query($sql);
	$f=$o->fetch_array();
	
	check_user($f["userid"]);
	if($f["passwd"]!=md5($MAGIC_STRING.$passwd)){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"メールアドレス、パスワードが間違っております。",
			"developer_message"=>"ページIDに不正値がある。"
		);
		set_status($status);
		return;
	}
	$status=array(
		"code"=>200,
		"message_type"=>"success",
		"user_message"=>"ログインしました",
		"developer_message"=>""
	);
	set_status($status);
	return $f;
}

function set_user($uid,$userid){
	
	global $o;
	$userid=bind($userid);

	if(strlen($uid)==0&&strlen($userid)==0){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"ユーザが指定されておりません。",
			"developer_message"=>"ユーザIDが取得できない。",
		);
		set_status($status);
		return;
	}

	if(strlen($userid)>0)$uid=$userid;
	check_user($uid);

	$sql=sprintf("select id as userid,t1 as email,cid as typeid,(select name from repo where id=u_member.cid) as type,title as name,t2 as profile,img1 as icon from u_member where id=%s",$uid);
	$o->query($sql);
	$f=$o->fetch_array();
	check_user($f["userid"]);
	
	return $f;
}

function set_useraccount($uid){
	check_user($uid);	
}

function set_socialupdate($uid,$type,$field){
	
	global $o;
	
	check_user($uid);
	
	$types=array("update","delete");
	if(!in_array($type,$types)){
		$status=array(
			"code"=>400,
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"該当しないタイプのリクエスト。"
		);
		set_status($status);
		return;		
	}
		
	$sql=sprintf("select id,b1,b2,b3,b4 from u_member where id=%s;",$uid);
	$o->query($sql);
	$f=$o->fetch_array();
	
	check_user($id);

	$sql=sprintf("select id,t1,a%s from u_member where b%s='%s'",$field,$field,$f["b".$field]);
	$o->query();
	$f=$o->fetch_array();
	
	if($type=="update"){
		if(strlen($f["id"])>0){
			$status=array(
				"code"=>403,
				"message_type"=>"error",
				"user_message"=>sprintf("%sは%sですでに登録されております。解除してから連携してください。",$f["t1"],$f["a".$field]),
				"developer_message"=>"ページIDに不正値がある。"
			);
			set_status($status);
			return;	
		}
	}else{
		if(strlen($f["id"])==0){
			$status=array(
				"code"=>404,
				"message_type"=>"error",
				"user_message"=>sprintf("%sと連携していません。",$field==1?"Facebook":"Twitter"),
				"developer_message"=>"ページIDに不正値がある。"
			);
			set_status($status);
			return;	
		}
	}
	return $f;
}

function set_email($email){

	$emailcheck=check_email($email);	
	if(strlen($emailcheck)>0){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>$emailcheck,
			"developer_message"=>$emailcheck
		);
		set_status($status);
		return;
	}
}

function set_social($field,$id,$token){
	if(strlen($field)==0||strlen($id)==0||strlen($token)==0){
		$status=array(
			"code"=>401,
			"message_type"=>"error",
			"user_message"=>sprintf("%sのユーザ情報の取得に失敗しました。",ucfirst($service)),
			"developer_message"=>sprintf("%sユーザIDが不正値。",ucfirst($service))
		);
		set_status($status);
		return;
	}
}




/* チェック系 */

function set_servererror(){
  $status=array(
	  "code"=>500,
	  "message_type"=>"error",
	  "user_message"=>"データベースへの接続に失敗しました。時間をおいてもう一度お試しください。",
	  "developer_message"=>"DBエラー。"
  );
  set_status($status);
  return;
}

function set_userid($userid){
	if(strlen($userid)==0){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"ユーザが指定されておりません",
			"developer_message"=>"ユーザが指定されていないリクエスト。"
		);
		set_status($status);
		return;	
	}
	return $userid;
}

function check_user($uid){
	if(!preg_match('/^[0-9]+$/',$uid)){
		$status=array(
			"code"=>401,
			"message_type"=>"error",
			"user_message"=>"指定されたユーザは存在しません。",
			"developer_message"=>"ユーザIDが不正値。"
		);
		set_status($status);
		return;
	}
}
function check_pageid($pageid){
	if(strlen($pageid)==0){
		$status=array(
			"code"=>401,
			"message_type"=>"error",
			"user_message"=>"ページIDが指定されておりません。",
			"developer_message"=>"ページIDが空。"
		);
		set_status($status);
		return;
	}
	if(!preg_match('/^[0-9]+$/',$pageid)){
		$status=array(
			"code"=>401,
			"message_type"=>"error",
			"user_message"=>"指定されたページは存在しません。",
			"developer_message"=>"ユーザIDが不正値。"
		);
		set_status($status);
		return;
	}
}
function check_commentid($commentid){
	if(strlen($commentid)==0){
		$status=array(
			"code"=>401,
			"message_type"=>"error",
			"user_message"=>"コメントIDが指定されておりません。",
			"developer_message"=>"コメントIDが空。"
		);
		set_status($status);
		return;
	}
	if(!preg_match('/^[0-9]+$/',$commentid)){
		$status=array(
			"code"=>401,
			"message_type"=>"error",
			"user_message"=>"指定されたコメントは存在しません。",
			"developer_message"=>"コメントIDが不正値。"
		);
		set_status($status);
		return;
	}
}


?>