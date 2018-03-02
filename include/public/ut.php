<?php

$H=getallheaders();
$SIZE=200;

//$articlefield="is_bookmark,id,title,body,b1,img1,type,d2,t1,m1,t10,a1,a2,a3,a4,a5,a6,t11,t12,t13,t14,video,youtube,facebook,m_time,videocaption,d3,category,slug,category2,slug2,userid,url,typeid,name,profile,icon";
$articlefield="*";

$articletable="
(select
	%s
	id,
	title,
	(select body from repo_body where pid=repo_n.id limit 1 offset 0) as body,
	(select video from u_view where pageid=repo_n.id limit 1 offset 0) as videoflag,
	t16 as b1,
	img1,
	imgflag,
	(select name from repo where id=d1) as type,
	d2,
	d3,
	t1,
	m1,
	m2,
	t10,t11,t12,t13,t14,t15,
	a1,a2,a3,a4,a5,a6,
	streampack,
	swf as video,
	youtube,
	facebook,
	brightcove,
	m_time,
	t8 as videocaption,
	t9
from repo_n where flag=1%s) as t1

left join (select
	id as userid,
	t1 as url,
	cid as typeid,
	title as name,
	img1 as icon
from u_media) as t2 on t1.d2=t2.userid

left join (select
	id as categoryid,
	name as category,
	title as categorylabel,
	name_e as slug,
	no_image as no_image
from u_categories where flag=1) as t3 on t1.m1=t3.categoryid

left join (select
	id as categoryid2,
	name as category2,
	title as categorylabel2,
	name_e as slug2
from u_categories where flag=1) as t4 on t1.m2=t4.categoryid2

left join (select
	pageid,
	region,
	pref
from u_area) as t5 on t1.id=t5.pageid";

$articleWithDirectLinktable="
(select
	%s
	id,
	title,
	(select body from repo_body where pid=repo_n.id limit 1 offset 0) as body,
	(select video from u_view where pageid=repo_n.id limit 1 offset 0) as videoflag,
	t16 as b1,
	img1,
	imgflag,
	(select name from repo where id=d1) as type,
	d2,
	d3,
	t1,
	m1,
	m2,
	t10,t11,t12,t13,t14,t15,
	a1,a2,a3,a4,a5,a6,
	streampack,
	swf as video,
	youtube,
	facebook,
	brightcove,
	m_time,
	t8 as videocaption,
	t9,
	flag,
	direct_link_url
from repo_n where (flag=1 or flag=3)%s) as t1

left join (select
	id as userid,
	t1 as url,
	cid as typeid,
	title as name,
	img1 as icon
from u_media) as t2 on t1.d2=t2.userid

left join (select
	id as categoryid,
	name as category,
	title as categorylabel,
	name_e as slug,
	no_image as no_image
from u_categories where flag=1) as t3 on t1.m1=t3.categoryid

left join (select
	id as categoryid2,
	name as category2,
	title as categorylabel2,
	name_e as slug2
from u_categories where flag=1) as t4 on t1.m2=t4.categoryid2

left join (select
	pageid,
	region,
	pref
from u_area) as t5 on t1.id=t5.pageid";

$articletable2="
(select
	%s
	id,
	title,
	(select body from repo_body where pid=repo_n.id limit 1 offset 0) as body,
	(select video from u_view where pageid=repo_n.id limit 1 offset 0) as videoflag,
	t16 as b1,
	img1,
	imgflag,
	(select name from repo where id=d1) as type,
	d2,
	d3,
	t1,
	m1,
	m2,
	t10,t11,t12,t13,t14,t15,
	a1,a2,a3,a4,a5,a6,
	streampack,
	swf as video,
	youtube,
	facebook,
	brightcove,
	m_time,
	t8 as videocaption,
	t9
from repo_n where flag=1%s%s%s) as t1

left join (select
	id as userid,
	t1 as url,
	cid as typeid,
	title as name,
	img1 as icon
from u_media) as t2 on t1.d2=t2.userid

left join (select
	id as categoryid,
	name as category,
	title as categorylabel,
	name_e as slug,
	no_image as no_image
from u_categories where flag=1) as t3 on t1.m1=t3.categoryid

left join (select
	id as categoryid2,
	name as category2,
	title as categorylabel2,
	name_e as slug2
from u_categories where flag=1) as t4 on t1.m2=t4.categoryid2

left join (select
	pageid,
	region,
	pref
from u_area) as t5 on t1.id=t5.pageid";

$articletable3="
(select
	%s
	id,
	title,
	(select body from repo_body where pid=repo_n.id limit 1 offset 0) as body,
	(select video from u_view where pageid=repo_n.id limit 1 offset 0) as videoflag,
	t16 as b1,
	img1,
	imgflag,
	(select name from repo where id=d1) as type,
	d2,
	d3,
	t1,
	m1,
	m2,
	t10,t11,t12,t13,t14,t15,
	a1,a2,a3,a4,a5,a6,
	streampack,
	swf as video,
	youtube,
	facebook,
	brightcove,
	m_time,
	t8 as videocaption,
	t9
from repo_n where flag=1 and id in(%s)%s%s) as t1

left join (select
	id as userid,
	t1 as url,
	cid as typeid,
	title as name,
	img1 as icon
from u_media) as t2 on t1.d2=t2.userid

left join (select
	id as categoryid,
	name as category,
	title as categorylabel,
	name_e as slug,
	no_image as no_image
from u_categories where flag=1) as t3 on t1.m1=t3.categoryid

left join (select
	id as categoryid2,
	name as category2,
	title as categorylabel2,
	name_e as slug2
from u_categories where flag=1) as t4 on t1.m2=t4.categoryid2

left join (select
	pageid,
	region,
	pref
from u_area) as t5 on t1.id=t5.pageid";

$articletable2c="(select id,d2 from repo_n where cid=1 and flag=1%s%s%s) as t1,(select id as userid from u_media where flag=1) as t2 where t1.d2=t2.userid";

$commentfield="isreaction,id,comment,userid,pageid,regitime,slug,good,bad,reply,typeid,type,name,profile,icon";
$commenttable="
(select
	%s
	id,
	comment,
	userid,
	pageid,
	regitime,
	(select name_e from u_categories where id=(select m1 from repo_n where id=u_comment.pageid)) as slug,
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

function switch_category_title($label,$title){
	return strlen($title)>0?$title:$label;
}

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
	$subject="【SPORTS BULL】会員登録完了のお知らせ";
	$body=sprintf("%s様

	この度は、SPORTS BULL sportsbull.jp にご登録いただき、誠にありがとうございます。

	会員登録が完了しましたのでお知らせいたします。
	下記登録内容をご確認の上、大切に保管ください。

	[登録内容]
	メールアドレス： %s
	ユーザー名：　%s
	パスワード：　セキュリティ保持のため非公開

	※	パスワードを忘れた場合は、以下のURLから再登録をお願いいたします。
	https://sportsbull.jp/reset_password/

	ご不明な点等ございましたら、以下の運動通信カスタマーセンターまでお問い合わせください。
	info@sportsbull.jp

	※	当社コンテンツをご使用の際は、必ず下記の利用規約をお読みください。
	https://sportsbull.jp/about/terms/

	[ご注意]
	こちらのメールアドレスは送信専用のため、直接返信されても返答できませんので予めご了承ください。",$name,$email,$name);
	$from="noreply@sportsbull.jp";
	$reply="info@sportsbull.jp";
	$bcc="account@sportsbull.jp";

	return sendmail($to,$subject,preg_replace("/\t/","",$body),$from,$reply,$bcc);
}

function mailregister_wow($email,$name){

	$to=$email;
	$subject="【SPORTS BULL】会員登録完了のお知らせ";
	$body=sprintf("%s様

	この度は、SPORTS BULL sportsbull.jp にご登録いただき、誠にありがとうございます。

	会員登録が完了しましたのでお知らせいたします。
	下記登録内容をご確認の上、大切に保管ください。

	[登録内容]
	メールアドレス： %s
	ユーザー名：　%s
	パスワード：　セキュリティ保持のため非公開

	また、Wowma!クーポンプレゼントキャンペーンの条件を達成されましたので、クーポンを下記のURLからお受け取りください。
	https://wowma.jp/bep/m/coup02?tf=couponInfo02&coupon_keys=ds_17_11_sbull_03_p6d&aff_id=aot0006

	※	パスワードを忘れた場合は、以下のURLから再登録をお願いいたします。
	https://sportsbull.jp/reset_password/

	ご不明な点等ございましたら、以下の運動通信カスタマーセンターまでお問い合わせください。
	info@sportsbull.jp

	※	当社コンテンツをご使用の際は、必ず下記の利用規約をお読みください。
	https://sportsbull.jp/about/terms/

	[ご注意]
	こちらのメールアドレスは送信専用のため、直接返信されても返答できませんので予めご了承ください。",$name,$email,$name);
	$from="noreply@sportsbull.jp";
	$reply="info@sportsbull.jp";
	$bcc="account@sportsbull.jp";

	return sendmail($to,$subject,preg_replace("/\t/","",$body),$from,$reply,$bcc);
}

function set_advertise($ad,$type){

	global $ImgPath;

	$s["vast"]=$ad["vast"];
	$s["theme"]["base"]=strlen($ad["base"])>0?$ad["base"]:"normal";
	$s["theme"]["background_color"]=strlen($ad["bgcolor"])>0?$ad["bgcolor"]:"";
	$s["is_show_filter"]=!$ad["sp_showfilter"]?true:false;

	$listordetail=$type=="detail"?"abody":"";
	$bannertype=array("pc","sp","ios","android");

	for($i=0;$i<count($bannertype);$i++){
		if($i<=1){
			$s["theme"]["images"][$bannertype[$i]]=strlen($ad[$bannertype[$i]."_headerimg".$type])>0?sprintf("%s/img/%s",$ImgPath,$ad[$bannertype[$i]."_headerimg".$type]):"";
		}
		$s["ad_url".$bannertype[$i]]=$ad["ad_url".$bannertype[$i]];
		$s["banner"][$bannertype[$i]]["text"]=strlen($ad[$bannertype[$i].sprintf("_%sbannerimg",$listordetail)])>0?checkstr($ad[sprintf("%sbannertext",$listordetail)]):"";
		$s["banner"][$bannertype[$i]]["image"]=strlen($ad[$bannertype[$i].sprintf("_%sbannerimg",$listordetail)])>0?sprintf("%s/img/%s",$ImgPath,$ad[$bannertype[$i].sprintf("_%sbannerimg",$listordetail)]):"";
		$s["banner"][$bannertype[$i]]["link"]=checkstr($ad[$bannertype[$i].sprintf("_%sbannerlink",$listordetail)]);
		if($i==0){
			$s["ad"][$bannertype[$i]]["sidebar_top"]=$ad["sidebar_top"];
			$s["ad"][$bannertype[$i]]["sidebar_bottom"]=$ad["sidebar_bottom"];
			if($type=="detail"){
				$s["ad"][$bannertype[$i]]["single_top"]=$ad["single_top"];
				$s["ad"][$bannertype[$i]]["single_bottom_left"]=$ad["single_bottom_left"];
				$s["ad"][$bannertype[$i]]["single_bottom_right"]=$ad["single_bottom_right"];
			}
		}else{
			$s["ad"][$bannertype[$i]]=$ad[sprintf("%s_%s",$bannertype[$i],$type)];
			$s["ad"]["mobile"][$bannertype[$i]]["article_list"]=$ad[$bannertype[$i]."_list"];
			$s["ad"]["mobile"][$bannertype[$i]]["popular_list"]=$ad[$bannertype[$i]."_popular"];
			$s["ad"]["mobile"][$bannertype[$i]]["reccomend_list"]=$ad[$bannertype[$i]."_recommend"];
			$s["ad"]["mobile"][$bannertype[$i]]["headline_list"]=$ad[$bannertype[$i]."_headline"];
			$s["ad"]["mobile"][$bannertype[$i]]["article_detail"]=$ad[$bannertype[$i]."_detail"];
		}
	}

	return $s;
}

function get_advertise($categoryid="",$userid="",$pageid="",$playerid="", $isgetpickupplayerbanner=false){

	global $staticfilepath;

  $file = sprintf("%s/static/ad/0-0.dat",$staticfilepath);
  $v=get_contents($file);
  $dat_array=unserialize($v);
  // デフォルト、カテゴリのときだけキーが違う
  $banner_info = [];
  if ($playerid != "")
  {
    $banner_info["bannerflag"] = $dat_array["player_bannerflag"];
    $banner_info["bannertext"] = $dat_array["player_bannertext"];
    $banner_info["pc_bannerimg"] = $dat_array["player_pc_bannerimg"];
    $banner_info["sp_bannerimg"] = $dat_array["player_sp_bannerimg"];
    $banner_info["ios_bannerimg"] = $dat_array["player_ios_bannerimg"];
    $banner_info["android_bannerimg"] = $dat_array["player_android_bannerimg"];
    $banner_info["pc_bannerlink"] = $dat_array["player_pc_bannerlink"];
    $banner_info["sp_bannerlink"] = $dat_array["player_sp_bannerlink"];
    $banner_info["ios_bannerlink"] = $dat_array["player_ios_bannerlink"];
    $banner_info["android_bannerlink"] = $dat_array["player_android_bannerlink"];
    $ad[]= $banner_info;
  }
	elseif ($isgetpickupplayerbanner)
  {
    $banner_info["bannerflag"] = 1;
    $banner_info["bannertext"] = $dat_array["pickupplayer_bannertext"];
    $banner_info["pc_bannerimg"] = $dat_array["pickupplayer_pc_bannerimg"];
    $banner_info["sp_bannerimg"] = $dat_array["pickupplayer_sp_bannerimg"];
    $banner_info["ios_bannerimg"] = $dat_array["pickupplayer_ios_bannerimg"];
    $banner_info["android_bannerimg"] = $dat_array["pickupplayer_android_bannerimg"];
    $banner_info["pc_bannerlink"] = $dat_array["pickupplayer_pc_bannerlink"];
    $banner_info["sp_bannerlink"] = $dat_array["pickupplayer_sp_bannerlink"];
    $banner_info["ios_bannerlink"] = $dat_array["pickupplayer_ios_bannerlink"];
    $banner_info["android_bannerlink"] = $dat_array["pickupplayer_android_bannerlink"];
    $ad[]= $banner_info;
  }
  else
	{
		$ad[]=$dat_array;
	}
  if ($categoryid != "") {
		unset($v);
		$file=sprintf("%s/static/ad/10-%s.dat",$staticfilepath,$categoryid);
		if(file_exists($file)){
      $v = get_contents($file);
      $dat_array=unserialize($v);

      // 各カテゴリtop画面用
      if ($playerid != "")
			{
        // デフォルト、カテゴリのときだけキーが違う
        $banner_info = [];

        $banner_info["bannerflag"] = $dat_array["player_bannerflag"];
        $banner_info["bannertext"] = $dat_array["player_bannertext"];
        $banner_info["pc_bannerimg"] = $dat_array["player_pc_bannerimg"];
        $banner_info["sp_bannerimg"] = $dat_array["player_sp_bannerimg"];
        $banner_info["ios_bannerimg"] = $dat_array["player_ios_bannerimg"];
        $banner_info["android_bannerimg"] = $dat_array["player_android_bannerimg"];
        $banner_info["pc_bannerlink"] = $dat_array["player_pc_bannerlink"];
        $banner_info["sp_bannerlink"] = $dat_array["player_sp_bannerlink"];
        $banner_info["ios_bannerlink"] = $dat_array["player_ios_bannerlink"];
        $banner_info["android_bannerlink"] = $dat_array["player_android_bannerlink"];

        $ad[]= $banner_info;
			}
			// 注目の選手画面用
			elseif ($isgetpickupplayerbanner)
			{
        $banner_info = [];

        $banner_info["bannerflag"] = $dat_array["pickupplayer_bannerflag"];
        $banner_info["bannertext"] = $dat_array["pickupplayer_bannertext"];
        $banner_info["pc_bannerimg"] = $dat_array["pickupplayer_pc_bannerimg"];
        $banner_info["sp_bannerimg"] = $dat_array["pickupplayer_sp_bannerimg"];
        $banner_info["ios_bannerimg"] = $dat_array["pickupplayer_ios_bannerimg"];
        $banner_info["android_bannerimg"] = $dat_array["pickupplayer_android_bannerimg"];
        $banner_info["pc_bannerlink"] = $dat_array["pickupplayer_pc_bannerlink"];
        $banner_info["sp_bannerlink"] = $dat_array["pickupplayer_sp_bannerlink"];
        $banner_info["ios_bannerlink"] = $dat_array["pickupplayer_ios_bannerlink"];
        $banner_info["android_bannerlink"] = $dat_array["pickupplayer_android_bannerlink"];

        $ad[]= $banner_info;
			}
			else
			{
        $ad[] = $dat_array;
			}

    }
	}
  if ($isgetpickupplayerbanner && $categoryid != "") {
    unset($v);
    $repoid = get_repoid_by_categoryid($categoryid);
    $file = sprintf("%s/static/ad/95-%s.dat", $staticfilepath, $repoid);
    if (file_exists($file)) {
      $v = get_contents($file);
      $ad[] = unserialize($v);
    }
  }
  if ($playerid != "") {
    unset($v);
    $file=sprintf("%s/static/ad/94-%s.dat",$staticfilepath,$playerid);
    if(file_exists($file)){
      $v=get_contents($file);
      $ad[]=unserialize($v);

    }
	}
  if ($pageid != "") {
		unset($v);
		$file=sprintf("%s/static/ad/2-%s.dat",$staticfilepath,$userid);
		if(file_exists($file)){
			$v=get_contents($file);
			$ad[]=unserialize($v);
		}
		unset($v);
		$file=sprintf("%s/static/ad/1-%s.dat",$staticfilepath,$pageid);
		if(file_exists($file)){
			$v=get_contents($file);
			$ad[]=unserialize($v);
		}
	}
	$_adpc=array("sidebar_top","sidebar_bottom","single_top","single_bottom_left","single_bottom_right");
	$_adsp=array("sp_list","sp_detail","sp_headline","sp_popular","sp_recommend","ios_list","ios_detail","ios_headline","ios_popular","ios_recommend","android_list","android_detail","android_headline","android_popular","android_recommend");
	$_banner=array("bannertext","pc_bannerimg","pc_bannerlink","sp_bannerimg","sp_bannerlink","ios_bannerimg","ios_bannerlink","android_bannerimg","android_bannerlink");
	$_abodybanner=array("abodybannertext","pc_abodybannerimg","pc_abodybannerlink","sp_abodybannerimg","sp_abodybannerlink","ios_abodybannerimg","ios_abodybannerlink","android_abodybannerimg","android_abodybannerlink");
	$_theme=array("base","bgcolor","pc_headerimglist","sp_headerimglist","pc_headerimgdetail","sp_headerimgdetail","sp_showfilter");
	$s=array();

	for($i=0;$i<count($ad);$i++){

		if($i==0){
			$s["vast"]=$ad[$i]["ad_videoid"];
			$s["ad_urlpc"]=$ad[$i]["ad_pc_videotag"];
			$s["ad_urlsp"]=$ad[$i]["ad_sp_videotag"];
			$s["ad_urlios"]=$ad[$i]["ad_ios_videotag"];
			$s["ad_urlandroid"]=$ad[$i]["ad_android_videotag"];
		}else{
			if($ad[$i]["ad_videoflag"]==1&&strlen($ad[$i]["ad_videoid"])>0)$s["vast"]=$ad[$i]["ad_videoid"];
			elseif($ad[$i]["ad_videoflag"]==2)$s["vast"]="";

			if($ad[$i]["ad_videoflag"]==1&&strlen($ad[$i]["ad_pc_videotag"])>0)$s["ad_urlpc"]=$ad[$i]["ad_pc_videotag"];
			elseif($ad[$i]["ad_videoflag"]==2)$s["ad_urlpc"]="";

			if($ad[$i]["ad_videoflag"]==1&&strlen($ad[$i]["ad_sp_videotag"])>0)$s["ad_urlsp"]=$ad[$i]["ad_sp_videotag"];
			elseif($ad[$i]["ad_videoflag"]==2)$s["ad_urlsp"]="";

			if($ad[$i]["ad_videoflag"]==1&&strlen($ad[$i]["ad_ios_videotag"])>0)$s["ad_urlios"]=$ad[$i]["ad_ios_videotag"];
			elseif($ad[$i]["ad_videoflag"]==2)$s["ad_urlios"]="";

			if($ad[$i]["ad_videoflag"]==1&&strlen($ad[$i]["ad_android_videotag"])>0)$s["ad_urlandroid"]=$ad[$i]["ad_android_videotag"];
			elseif($ad[$i]["ad_videoflag"]==2)$s["ad_urlandroid"]="";
		}

		if($i==1){
			for($j=0;$j<count($_theme);$j++){
				$s[$_theme[$j]]=$ad[$i][$_theme[$j]];
			}
		}

		for($j=0;$j<count($_adpc);$j++){
			$id=$_adpc[$j];
			$flag=sprintf("%sflag",$_adpc[$j]);
			if($i==0){
				$s[$_adpc[$j]]=$ad[$i][$id];
			}else{
				if($ad[$i][$flag]==1&&strlen($ad[$i][$id])>0)$s[$_adpc[$j]]=$ad[$i][$id];
				elseif($ad[$i][$flag]==2)$s[$_adpc[$j]]="";
			}
		}
		for($j=0;$j<count($_adsp);$j++){
			$id=sprintf("ad_%sid",$_adsp[$j]);
			$flag=sprintf("ad_%sflag",$_adsp[$j]);
			if($i==0){
				$s[$_adsp[$j]]=$ad[$i][$id];
			}else{
				if($ad[$i][$flag]==1&&strlen($ad[$i][$id])>0)$s[$_adsp[$j]]=$ad[$i][$id];
				elseif($ad[$i][$flag]==2)$s[$_adsp[$j]]="";
			}
		}
		for($j=0;$j<count($_banner);$j++){
			if (isset($playerid) || isset($categoryid))
			{
        if($ad[$i]["bannerflag"]==1&&strlen($ad[$i][$_banner[$j]])>0)$s[$_banner[$j]]=$ad[$i][$_banner[$j]];
				elseif($ad[$i]["bannerflag"]==2)$s[$_banner[$j]]="";
			}
			elseif($i!=0)
			{
				if($ad[$i]["bannerflag"]==1&&strlen($ad[$i][$_banner[$j]])>0)$s[$_banner[$j]]=$ad[$i][$_banner[$j]];
				elseif($ad[$i]["bannerflag"]==2)$s[$_banner[$j]]="";
			}
		}
		for($j=0;$j<count($_abodybanner);$j++){
			if($i!=0){
				if($ad[$i]["abodybannerflag"]==1&&strlen($ad[$i][$_abodybanner[$j]])>0)$s[$_abodybanner[$j]]=$ad[$i][$_abodybanner[$j]];
				elseif($ad[$i]["abodybannerflag"]==2)$s[$_abodybanner[$j]]="";
			}
		}
	}
	return $s;
}

function set_categoriesinfo($f, $playerid=null, $isgetpickupplayerbanner=false){

	global $ImgPath,$domain;

	$s["id"]=$f["id"];
	$s["label"]=switch_category_title($f["name"],$f["title"]);
	$s["slug"]=mod_HTML($f["name_e"]);
	$s["url"]=sprintf("%s/%s/",$domain,$f["name_e"]);

	//OG/No画像追加
	$s["og_image"] = strlen($f["og_image"])>0?sprintf("%s/img/%s",$ImgPath,$f["og_image"]):"";
	$s["no_image"] = strlen($f["no_image"])>0?sprintf("%s/img/%s",$ImgPath,$f["no_image"]):"";

	//ディスクリプションとキーワード設定
	$s["seo_desc"]=$f["seo_desc"];
	$s["seo_key"]=$f["seo_key"];

	//https://github.com/undotsushin/undotsushin/issues/970#issue-168779151
	//タイトル画像のリンク追加
	$s["title_img_link"]=strlen($f["url"])>0?$f["url"]:"";

	$s["title_img"]=strlen($f["img"])>0?sprintf("%s/img/%s",$ImgPath,$f["img"]):"";
	$s["title"]=mod_HTML($f["title"]);
	$s["description"]=mod_HTML($f["description"]);

	$s["title_banner"]["pc"]["image"]=strlen($f["img"])>0?sprintf("%s/img/%s",$ImgPath,$f["img"]):"";
	$s["title_banner"]["pc"]["text"]=strlen($f["alt"])>0?$f["alt"]:"";
	$s["title_banner"]["pc"]["link"]=strlen($f["url"])>0?$f["url"]:"";
	$s["title_banner"]["sp"]["image"]=strlen($f["img1"])>0?sprintf("%s/img/%s",$ImgPath,$f["img1"]):"";
	$s["title_banner"]["sp"]["text"]=strlen($f["alt"])>0?$f["alt"]:"";
	$s["title_banner"]["sp"]["link"]=strlen($f["url1"])>0?$f["url1"]:"";

  $s["pc_header"]=strlen($f["pc_header"])>0?sprintf("%s/img/%s",$ImgPath,$f["pc_header"]):"";
  $s["sp_header"]=strlen($f["sp_header"])>0?sprintf("%s/img/%s",$ImgPath,$f["sp_header"]):"";


  $ad=get_advertise($s["id"], "", "", $playerid, $isgetpickupplayerbanner);
	$ad_put=set_advertise($ad,"list");

	$s=$s+$ad_put;
	foreach($s as $k=>$v){
		if(preg_match("/^(ad_url|vast)/",$k))unset($s[$k]);
	}

	return $s;
}

function set_categoryinfo($f,$personalized="",$longtitle=1){

	global $ImgPath,$domain;

	$s["id"]=(int)$f["id"];
	$s["label"]=$longtitle==1?switch_category_title($f["name"],$f["title"]):$f["name"];
	$s["slug"]=$f["name_e"];
	$s["url"]=sprintf("%s/category/%s/",$domain,$f["name_e"]);
	if($personalized!=="")$s["is_interest"]=$personalized;
	$s["title_img"]=strlen($f["img"])>0?sprintf("%s/img/%s",$ImgPath,$f["img"]):"";

	return $s;
}

function urlmodify($body){

	global $ImgPath;

	/*
	すでに登録されている記事の画像パスを運動通信からSPORTS BULLに変換
	*/

	$body=str_replace("https://www.undotsushin.com/prg_img/","https://img.sportsbull.jp/",$body);
	$body=str_replace("/prg_img",$ImgPath,$body);
	return $body;
}

function set_articleinfo($f,$type=0,$canonical=0,$readmore=0){

	/*
		$type:0 記事一覧　$type:1 記事詳細
	*/

	global $ImgPath,$domain,$ad,$mediaoption,$videopath,$apidetails,$staticfilepath;

	$video=get_videotype($f["video"],$f["youtube"],$f["facebook"],$f["streampack"]);
	$datetime=get_date(sprintf("%s-%s-%s %s:%s:%s",$f["a1"],$f["a2"],$f["a3"],$f["a4"],$f["a5"],$f["a6"]));

	$body=$f["body"];

	$s["id"]=(int)$f["id"];
	$s["date"]=$datetime["isotime"];
	$s["display_date"]=get_relativetime($datetime["relativetime"],$datetime["date"],$datetime["weekday"]);
	if($f["m1"]==152&&preg_match("/前/",$s["display_date"]))$s["display_date"]=sprintf("%s%s",$datetime["date"],sprintf("(%s)",get_weekday($datetime["weekday"])));

	$s["title"]=str_replace("&#039;","'",strlen($f["modtitle"])>0?$f["modtitle"]:$f["title"]);

	$s["description"]=get_summary($f["b1"],$f["body"]);

	//if(strlen($f["relatedpost"])>0)$body.=$f["relatedpost"];
	if($type==1){

		$s["body"]=urlmodify($body);
		$s["body_escape"]=stripbr($f["body"]);
		if($apidetails!=1)$s["media_vk_refid"]=strlen($f["brightcove"])>0?$f["brightcove"]:"";

		#1013 続きを読む
		$file=sprintf("%s/static/ad/2-%s.dat",$staticfilepath,$f["userid"]);
		if(file_exists($file)){
			$v=unserialize(get_contents($file));
			$readmoreflag=$v["readmore"];
			$canonicalflag=$v["canonical"];
		}
		$file=sprintf("%s/static/ad/1-%s.dat",$staticfilepath,$f["id"]);
		if(file_exists($file)){
		   $v=get_contents($file);
		   $v=unserialize($v);
		   $readmoreflag=$v["readmore"];
		}
		if($readmoreflag){
			$s["readmore"]["is_readmore"]=true;
			$s["readmore"]["url"]=$f["t9"];
		}else{
			$s["readmore"]["is_readmore"]=false;
			$s["readmore"]["url"]="";
		}

		if($canonicalflag){
			$s["canonical"]["is_canonical"]=true;
			$s["canonical"]["url"]=$f["t9"];
		}else{
			$s["canonical"]["is_canonical"]=false;
			$s["canonical"]["url"]="";
		}
		#1013 続きを読む ここまで
	}

	$s["url"]=sprintf("%s/%s/%s/",$domain,"p",$f["id"]);

	//カテゴリー期を見て配列のみに変更する
	$cat1=switch_category_title($f["category"],$f["categorylabel"]);
	$cat2=switch_category_title($f["category2"],$f["categorylabel2"]);
	$s["category"]["label"]=$cat1;
	$s["category"]["slug"]=$f["slug"];
	$s["category2"]["label"]=$cat2;
	$s["category2"]["slug"]=$f["slug2"];
	$s["categories"][0]["label"]=$cat1;
	$s["categories"][0]["slug"]=$f["slug"];
	if(strlen($f["category2"])>0){
		$s["categories"][1]["label"]=$cat2;
		$s["categories"][1]["slug"]=$f["slug2"];
	}

	$s["is_bookmarked"]=$f["is_bookmark"]==0?false:true;
	if($type==0)$s["is_recommend"]=$f["recommend"]==1?true:false;
	$s["is_new"]=$datetime["relativetime"]<(60*24*30)?true:false;
	if($type==1)$s["is_show_image"]=$f["imgflag"]==168?false:true;

	$s["media_type"]=strlen($video)>0?"video":"image";
	//if($f["videoflag"])$s["media_type"]="video";

	#996 動画記事の判定ロジックを変更する
	if($type==0){
		if($s["media_type"]=="image"&&$f["videoflag"]==1){
			$s["media_type"]="video";
		}
	}
	#996 ここまで

	$s["media"]["images"]=get_img($f["img1"],$f["id"]);
	$s["media"]["images"]["caption"]=checkstr($f["t1"],1);

	$s["media"]["video"]["player"]=$video;

	//$s["media"]["video"]["url"]="";
	$s["media"]["video"]["url"]["sd"]=strlen($f["video"])>0?sprintf("%s/%s/%s/sd/%s.m3u8",str_replace("video",$mediaoption[$f["d2"]]["geoblock"]==0?"video":"video-jp",$videopath),$mediaoption[$f["d2"]]["bucket"],$f["video"],$f["video"]):"";
	$s["media"]["video"]["url"]["hd"]=strlen($f["video"])>0?sprintf("%s/%s/%s/hd/%s.m3u8",str_replace("video",$mediaoption[$f["d2"]]["geoblock"]==0?"video":"video-jp",$videopath),$mediaoption[$f["d2"]]["bucket"],$f["video"],$f["video"]):"";

	//streampackのURLが指定されていればS3のHLSのURLを上書きする
	if(strlen($f["streampack"])>0){
		$s["media"]["video"]["url"]["sd"]=$f["streampack"];
		$s["media"]["video"]["url"]["hd"]=$f["streampack"];
	}

	$s["media"]["video"]["youtube"]=checkstr($f["youtube"],1);

	$s["media"]["video"]["facebook"]=checkstr($f["facebook"],1);
	$s["media"]["video"]["caption"]=checkstr($f["videocaption"],1);
	//$s["media"]["video"]["time"]=s2h($f["d3"]);
	if($type==1){
		$s["media"]["video"]["vast"]=$ad["vast"];
		$s["media"]["video"]["ad_url"]["pc"]=str_replace('[referrer_url]', $s["url"], $ad["ad_urlpc"]);
		$s["media"]["video"]["ad_url"]["sp"]=str_replace('[referrer_url]', $s["url"], $ad["ad_urlsp"]);
		$s["media"]["video"]["ad_url"]["ios"]=str_replace('[referrer_url]', $s["url"], $ad["ad_urlios"]);
		$s["media"]["video"]["ad_url"]["android"]=str_replace('[referrer_url]', $s["url"], $ad["ad_urlandroid"]);
	}

	$s["user"]=set_userinfo($f,0);

	//地域タブ
	//地域タブのラベル置き換えのためにAPIに地域情報を追加
	$s["another_categories"]["area"]=array();

if ($s["categories"][0]["slug"] != 'dance') // hotfix ダンスのみ地域非表示対応
{
  if (strlen($f["region"]) > 0) {
    $s["another_categories"]["area"][0]["region"] = $f["region"];
    if (strlen($f["pref"]) > 0) {
      $s["another_categories"]["area"][0]["pref"][] = $f["pref"];
    } else {
      $s["another_categories"]["area"][0]["pref"] = array();
    }
  }
}
	if($s["user"]["id"]==61){
		//ノアドットの記事の場合は媒体名に変更
		//IDはノアドットをそのまま継承
		//$s["user"]["id"]="";
		$s["user"]["name"]=$f["t10"];
		$s["user"]["bio"]="";
		$s["user"]["profile_picture"]="";
		$s["user"]["logo"]["img"]="";
		$s["user"]["logo"]["link"]="";
	}

	if (strlen($f["img1"]) === 0 && strlen($f["no_image"]) > 0)
	{
		//記事画像が存在しておらずカテゴリ用NoImageが設定されて入ればAPIの値を上書き
		$s["media"]["images"]["thumbnail"] = sprintf("%s/img/%s",$ImgPath,$f["no_image"]);
		$s["media"]["images"]["medium"] = sprintf("%s/img/%s",$ImgPath,$f["no_image"]);
		$s["media"]["images"]["large"] = sprintf("%s/img/%s",$ImgPath,$f["no_image"]);
		$s["media"]["images"]["original"] = sprintf("%s/img/%s",$ImgPath,$f["no_image"]);
	}

	return $s;
}

/*
function get_pickup($cid){

	global $o,$articletable;

	$sql=sprintf("select rt1.title as modtitle,rt2.* from (select d2,title,n as sort from u_headline where cid=%s and flag=1) as rt1,(select * from %s) as rt2 where rt1.d2=rt2.id order by sort",$cid,sprintf($articletable,set_isbookmark(""),""));
	$nsql=sprintf("select count(id) as n from u_headline where cid=%s and flag=1",$cid);

	$o->query($nsql);
	$f=$o->fetch_array();
	$count=$f["n"];

	if($count>0){
		$o->query($sql);
		while($f=$o->fetch_array())$p[]=$f;
		for($i=0;$i<count($p);$i++){
			$s[$i]=set_articleinfo($p[$i],2);
			$sql=sprintf("select count(*) as n from u_ranking where pageid=%s and flag=1 and userflag=1",$p[$i]["id"]);
			$o->query($sql);
			$f=$o->fetch_array();
			$s[$i]["comments_count"]=(int)$f["n"];
		}
	}

	return $s;
}
*/

function s2h($seconds){

	if(strlen($seconds)==0)return "";

	$hours=floor($seconds/3600);
	$minutes=floor(($seconds/60)%60);
	$seconds=$seconds%60;

	if($hours>0){
		$hms=sprintf("%02d:%02d:%02d",$hours,$minutes,$seconds);
	}else{
		$hms=sprintf("%02d:%02d",$minutes,$seconds);
	}
	return $hms;
}

function mod_replyfield($f,$data){
	for($i=0;$i<count($f);$i++){
		$d[$f[$i]]=$data[$f[$i]."_"];
	}
	$d["pageid"]=$data["pageid"];
	return $d;
}

function set_commentinfo($f,$type,$reply=0){

	global $ImgPath,$domain;
	$datetime=get_date($f["regitime"]);

	$s["id"]=(int)$f["id"];
	$body=mb_strlen($f["comment"])<52?$f["comment"]:sprintf("%s…",mb_substr($f["comment"],0,52));

	if($type===0){
		$s["body"]=mod_HTML($body,2);
		$s["body_escape"]=mod_HTML($type===1?$body:$f["comment"]);
	}else{
		$s["date"]=$datetime["isotime"];
		$s["display_date"]=get_relativetime($datetime["relativetime"],$datetime["date"],$datetime["weekday"]);
		$s["body"]=mod_HTML($type===1?$body:$f["comment"],2);
		$s["body_escape"]=mod_HTML($type===1?$body:$f["comment"]);
		$s["is_like"]=$f["isreaction"]!=1?false:true;
		$s["is_bad"]=$f["isreaction"]!=2?false:true;
		$s["like"]=(int)$f["good"];
		$s["bad"]=(int)$f["bad"];
		}
	if($reply===0){
		$s["url"]=sprintf("%s/%s/%s/comment/%s/",$domain,"p",$f["pageid"],$f["id"]);
	}else{
		$s["url"]=sprintf("%s/%s/%s/comment/%s/%s/",$domain,"p",$f["pageid"],$reply,$f["id"]);
	}
	//$s["url"]=sprintf("%s/%s/%s/comment/%s%s",$domain,"p",$f["pageid"],$reply==""?"":sprintf("/%s",$reply),$f["id"]);
	$s["user"]=set_userinfo($f,0);

	return $s;
}

function set_userinfo($f,$interestset){

	global $UserImgPath,$domain,$banner,$articledetails;

	/* String型 */
	$s["id"]=$f["userid"];
	$s["name"]=!preg_match("/^スポーツブル編集部/",$f["name"])?mod_HTML($f["name"]):"スポーツブル編集部";

	if(strlen($f["email"])>0){
		$s["email"]=strlen($f["email"])>0?mod_HTML($f["email"]):"";
	}

	if(!preg_match("/http/",$f["icon"])){
		$s["profile_picture"]=strlen($f["icon"])>0?sprintf("%s/users/img/%s",$UserImgPath,$f["icon"]):"";
	}elseif(strlen($f["icon"])>0){
		$s["profile_picture"]=$f["icon"];
	}else{
		$s["profile_picture"]="";
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
	}else{
		$s["logo"]["img"]=strlen($f["icon"])>0?sprintf("%s/img/%s",$UserImgPath,$f["icon"]):"";
		$s["logo"]["link"]=strlen($f["icon"])>0&&strlen($f["url"])>0?$f["url"]:"";
	}

	// 後で消す
	if($banner){
		$s["banner"]=$banner;
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

	$s["user"]=set_userinfo($f,0);

	$s["article"]["id"]=$f["pageid"];
	$s["article"]["title"]=$f["title"];
	$s["article"]["url"]=sprintf("%s/%s/%s/",$domain,"p",$f["pageid"]);

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

	global $o,$H;
	$token=check_token($H);

	if(strlen($token["oautn_token"])>0){
		$sql=sprintf("select id from u_member where flag=1 and a15='%s'",trim($token["oautn_token"]));
		$o->query($sql);
		$f=$o->fetch_array();
	}
	//debug($token["oautn_token"],$f["id"]);
	return isset($f["id"])?$f["id"]:"";
}

function wlog($file,$data){
	$fp=fopen($file,"a");
	fputs($fp,sprintf("%s\n",implode("\t",$data)));
	fclose($fp);
}

function debug($token,$id,$txt=array()){

	global $H,$LOGTXT;

	if(count($txt)==0){
		$log=$H;
		$log["REQUEST_URI"]=$_SERVER['REQUEST_URI'];
		$log["HTTP_REFERER"]=$_SERVER['HTTP_REFERER'];
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

function get_img($img,$id){

	global $ImgPath;

	$s=array();
  $type=array("thumbnail","medium","large","original","carousel");
	$path=array("thumbnail2","thumbnail1","img","raw","thumbnail5");
	if(strlen($img)==0)$defimg=sprintf("0%s.jpg",($id%7+1));

	for($i=0;$i<count($path);$i++){
		if(strlen($img)==0){
				$s[$type[$i]]=sprintf("%s/%s/%s",$ImgPath,$path[$i],$defimg);
		}else{
			if(!preg_match("/http/",$img)){
				$s[$type[$i]]=sprintf("%s/%s/%s",$ImgPath,$path[$i],$img);
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
	$one_yr_b4=strtotime(date("Y-m-d H:i:s",strtotime("-1 year")));

  if ($str < $one_yr_b4) {
  	$date = date("Y年m月d日 H時i分",$str);
	} else {
    $date = date("m月d日 H時i分",$str);
  }

	$t["relativetime"]=($now-$str)/60;
	$t["date"]=$date;
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
	if($a>0&&$a<60){
		$rt=sprintf("%s分前",floor($a));
	}elseif($a>0&&$a<60*24){
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
	$s=strlen($s)>0?$s:"";
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

	$description=preg_replace("#<script.*?</script>#ims","",$description);
	$body=preg_replace("#<script.*?</script>#ims","",$body);

	$description=strip_tags($description);
	$body=strip_tags($body);

	$description=preg_replace('/\s+/',' ',$description);
	$body=preg_replace('/\s+/',' ',$body);

	if(strlen($description)>0){
		$s=$description;
	}else{
		$s=strip_tags($body);
		$s=preg_replace("/(\n|\r)/","",$s);
		$s=preg_replace("/(^　)/","",$s);
	}

	//gorin.jp 強引に動画扱いにしたことで一覧に画像キャプションが出てしまうので削除
	$s=str_replace("写真提供：Getty Images","",$s);

	$s=html_entity_decode($s);
	if(mb_strlen($s)>90){
		$s=sprintf("%s…",mb_substr($s,0,90));
	}
	return $s;
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

		$sql=sprintf("select id from u_member where flag=1 and t1='%s'",$email);
		if($conf!=0)$sql.=sprintf(" and id!=%s",$conf);

		$o->query($sql);
		$f=$o->fetch_array();
		if(strlen($f["id"])>0){
			$err=sprintf("入力いただいたメールアドレス%sはすでに登録されております。",$email);
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

function get_videotype($v1,$v2,$v3,$v4){
	if(strlen($v4)>0)$s="brightcove";
	elseif(strlen($v1)>0)$s="brightcove";
	elseif(strlen($v2)>0)$s="youtube";
	elseif(strlen($v3)>0)$s="facebook";
	else $s="";
	return $s;
}

function sendmail($to,$subject,$body,$from,$reply,$bcc=null){

	$sbj="=?iso-2022-jp?B?".base64_encode(mb_convert_encoding($subject,"JIS","UTF-8"))."?=";
	$msg=stripslashes($body);
	$msg=addslashes($msg);
	$msg=mb_convert_encoding($msg,"JIS","UTF-8");
	$header="From:=?iso-2022-jp?B?".base64_encode(mb_convert_encoding("SPORTS BULL","JIS","UTF-8"))."?=<".$from.">\n";
    if(!empty($bcc)){
        $header.="Bcc: ".$bcc."\n";
	} else {
        $header.="Bcc: info@undotsushin.com\n";
	}
	$header.="Reply-To:".$reply."\n";
	$header.="Return-Path:".$from."\n";
	$header.="Content-Type:text/plain;charset=\"ISO-2022-JP\"";

	return mail($to,$sbj,$msg,$header,sprintf("-f%s",$from));
}

function print_json($y,$r){
	if(preg_match("/debugger\.php/",$r)){
		if($sqldebug)echo $sqldebug;
		print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	}else{
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($y,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
	}
}

function get_contents($url){

	if(preg_match("/http/",$url)){
		$ch=curl_init();
		curl_setopt($ch,CURLOPT_URL,$url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		if(preg_match("/https/",$url)){
			curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
			curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);
		}
		$output=curl_exec($ch);
	}else{
		$output=file_get_contents($url);
	}

	if(curl_errno($ch))return "";
	else return $output;
}


function split_utime($a){
	global $sv,$sn;
	$ss=explode(",",str_replace(array(" ","-",":","."),",",$a));
	for($i=7;$i<=12;$i++){
		$sv[$sn[]="a".$i]=$ss[$i-7];
	}
}

/**
 * @param $article_id
 * @param bool $reload
 * @return mixed
 * 未ログイン時の記事詳細情報をS3のjsonから取得、存在しない場合は新たに作成する
 */
function create_article_json($article_id, $reload = false)
{
    global $articletable, $o, $ImgPath;
    $object_key = 'json/articles/' . $article_id . '.json';
    $url = join('/', [$ImgPath, $object_key]);

    $json = @file_get_contents($url);
    if(empty($json) || $reload)
    {
        $json = [];
        $sql = sprintf("select * from %s",sprintf($articletable,set_isbookmark(),sprintf(" and id=%s",$article_id)));
        $o->query($sql);
        while($f = $o->fetch_array())
        {
            $json[] = $f;
        }
        $json = json_encode($json);

        $s3 = new S3Module;
        $s3->createObject($json, $object_key, 'application/json');
    }
    return json_decode($json, true);
}

/**
 * @param bool $reload
 * @return mixed
 * 未ログイン時のinitialize用json
 */
function create_initialize_json($reload = false)
{
    global $articletable, $o, $ImgPath;
    $object_key = 'json/initialize.json';
    $url = join('/', [$ImgPath, $object_key]);

    $json = @file_get_contents($url);
    if(empty($json) || $reload)
    {
        $json = [];
        $sql = sprintf("select 2 as h,* from %s order by m_time desc,id limit %s offset %s",sprintf($articletable,set_isbookmark("")," and m_time > now() - interval '10 day'"),100,0);
        $o->query($sql);
        while($f = $o->fetch_array())
        {
            $json[] = $f;
        }
        $json = json_encode($json);

        $s3 = new S3Module;
        $s3->createObject($json, $object_key, 'application/json');
    }
    return json_decode($json, true);
}

function set_company_news_items($f){

    $s["date"]=date("Y年m月d日",strtotime($f["published_at"]));
    $s["title"]=$f["title"];
    $s["url"]=$f["url"];

    return $s;
}

function set_partners_info($f){

	global $ImgPath;

	$s["partner_name"]=$f["title"];
	$s["site_url"]=$f["t1"];
	$s["img_url"] = strlen($f["img1"])>0?sprintf("%s/img/%s",$ImgPath,$f["img1"]):"";
	$s["company_img_url"] = strlen($f["company_img1"])>0?sprintf("%s/img/%s",$ImgPath,$f["company_img1"]):"";
	$s["sort_no"] = $f["n"];
	$s["ng_flag"] = $f["ng_flag"];

	return $s;
}

function get_repoid_by_categoryid($categoryid) {
  global $o;
  $sql = "SELECT id FROM repo r WHERE rid = 95 AND flag = 1 AND category = {$categoryid} LIMIT 1";
  $o->query($sql);
  $res = $o->fetch_array();
  if($res === false){
    return null;
  }
  return $res['id'];
}

function get_categoryid_by_playerid($playerid) {
  global $o;
  $sql = "SELECT category FROM tbl_player WHERE id = {$playerid}";
  $o->query($sql);
  $res = $o->fetch_array();
  if($res === false){
    return null;
  }
  return $res['category'];
}

function get_category_slug_by_playerid($playerid) {
  global $o;
  $sql = <<<SQL
SELECT 
  uc.name_e 
FROM 
  tbl_player
INNER JOIN 
  u_categories uc 
ON 
  to_number(tbl_player.category,'999') = uc.id
WHERE 
  tbl_player.id = {$playerid}
SQL;

  $o->query($sql);
  $res = $o->fetch_object();
  if($res === false){
    return null;
  }
  return $res->name_e;
}

function get_pickup_players($category_id = null, $player_id = null, $limit = null) {
  global $o;

  $sql = <<<SQL
SELECT
  p.*, MAX(uh.n) AS max_h_n 
FROM
    repo
    INNER JOIN u_categories uc ON repo.category = uc.id
    INNER JOIN u_headline uh ON uh.cid = repo.id
    INNER JOIN tbl_player p ON uh.d2 = p.id
WHERE
    rid = 95
    AND repo.flag = 1
    AND uc.flag = 1
    AND uh.flag = 1
    AND p.flag = 1
SQL;


  if ($player_id !== null) {
    $sql .= " AND p.id = {$player_id}";
  }
  if ($category_id !== null) {
    $sql .= " AND uc.id = '{$category_id}'";
  }
  $sql .= ' GROUP BY p.id, p.name, p.name_kana, p.competition, p.description, p.n, p.flag, p.img1, p.link_word, p.category,
  p.og_img, p.seo_description, p.seo_keyword, p.m_time, p.u_time, p.category_sub';
  $sql .= " ORDER BY max_h_n";

  if ($limit !== null) {
    $sql .= " LIMIT {$limit}";
  }

  $o->query($sql);

  return $o->fetch_all();
}

  /**
   * /category/crazy/ で表示する4件固定対応
   * @return array
   */
  function get_pickup_players_ca_top() {
    global $o;

    $sql = <<<EOF
SELECT p.*
FROM u_headline uh
  INNER JOIN tbl_player p ON uh.d2 = p.id
WHERE d2 IN (21, 2, 16, 20)
GROUP BY p.id, p.name, p.name_kana, p.competition, p.description, p.n, p.flag, p.img1, p.link_word, p.category,
  p.og_img, p.seo_description, p.seo_keyword, p.m_time, p.u_time, uh.d2, p.category_sub
ORDER BY CASE WHEN d2 = 21
  THEN 1
         ELSE d2 END
EOF;

    $o->query($sql);
    return $o->fetch_all();
  }
?>
