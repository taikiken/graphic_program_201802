<?php

//#2820 Crazy for Racing動画記事API作成
//slug=>tag で指定
//UNDO_SPBL-565 サッカー日本代表用のタグ追加
$categories=array(
	"station"=>"ブルステオフショットムービー",
	"cfr_interview"=>"CFRインタビュー",
	"cfr_report"=>"CFR体験レポート",
	"samurai_blue"=>"サッカー日本代表ハイライト",
	"futsal_women"=>"サッカー女子フットサル代表ハイライト",
	"soccer_under"=>"サッカーアンダーハイライト",
	"soccer_movie"=>"サッカー動画"
);

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$offset=strlen($_REQUEST["offset"])>0?$_REQUEST["offset"]:0;
$length=strlen($_REQUEST["length"])>0?$_REQUEST["length"]:5;
$category=$_REQUEST["category"];

function check_moviecategory($category){
	
	global $categories;
	foreach($categories as $k=>$v){
		$keys[]=$k;
	}
	
	if(!$category){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"カテゴリーが指定されておりません。"
		);
	}elseif(!in_array($category,$keys)){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"該当しないタイプのリクエスト。"
		);
	}else{
		$status=array(
			"code"=>200,
			"message_type"=>"success",
			"user_message"=>"",
			"developer_message"=>""
		);
	}
	return $status;
}

$y["status"]=check_moviecategory($category);
if(strlen($_REQUEST["length"])>0)$y["request"]["length"]=(int)$_REQUEST["length"];
if(strlen($_REQUEST["offset"])>0)$y["request"]["offset"]=(int)$_REQUEST["offset"];

if($y["status"]["code"]===200){
	
	$tag=$categories[$category];
	
	$nsql=sprintf("select count(*) as n from repo_n where flag=1 and (t10='%s' or t11='%s' or t12='%s' or t13='%s' or t14='%s' or t15='%s')",$tag,$tag,$tag,$tag,$tag,$tag);
	$o->query($nsql);
	$f=$o->fetch_array();
	$count=$f["n"];
	
	$sql=sprintf("select id,img1,title from repo_n where flag=1 and (t10='%s' or t11='%s' or t12='%s' or t13='%s' or t14='%s' or t15='%s') order by m_time desc limit %s offset %s",$tag,$tag,$tag,$tag,$tag,$tag,$length,$offset);
	$o->query($sql);
	while($f=$o->fetch_array()){
		$s[]=array(
			"title"=>$f["title"],
			"img"=>sprintf("%s/thumbnail1/%s",$ImgPath,$f["img1"]),
			"url"=>sprintf("%s/p/%s/",$domain,$f["id"]),
			"is_movie"=>true
		);
	}
	
	$y["response"]["count"]=(int)$count;
	$y["response"]["articles"]=$s;
}else{
	$y["response"]["count"]=0;
	$y["response"]["articles"]=array();	
}

print_json($y,$_SERVER['HTTP_REFERER']);

?>