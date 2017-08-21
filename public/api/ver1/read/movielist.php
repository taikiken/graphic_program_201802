<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$offset=strlen($_REQUEST["offset"])>0?$_REQUEST["offset"]:0;
$length=strlen($_REQUEST["length"])>0?$_REQUEST["length"]:5;
$category=$_REQUEST["category"];

function check_moviecategory($category){
	
	$categories=array("station");
	
	if(!$category){
		$status=array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"カテゴリーが指定されておりません。"
		);
	}elseif(!in_array($category,$categories)){
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
	
	if($category=="station"){
		$nsql="select count(*) as n from repo_n where d2=51 and flag=1 and t10='ブルステオフショットムービー'";
		$o->query($nsql);
		$f=$o->fetch_array();
		$count=$f["n"];
		
		$sql=sprintf("select id,img1,title from repo_n where d2=51 and flag=1 and t10='ブルステオフショットムービー' order by m_time desc limit %s offset %s",$length,$offset);
		$o->query($sql);
		while($f=$o->fetch_array()){
			$s[]=array(
				"title"=>$f["title"],
				"img"=>sprintf("%s/thumbnail1/%s",$ImgPath,$f["img1"]),
				"url"=>sprintf("%s/p/%s/",$domain,$f["id"])
			);
		}
	}
	
	$y["response"]["count"]=(int)$count;
	$y["response"]["articles"]=$s;
}else{
	$y["response"]["count"]=0;
	$y["response"]["articles"]=array();	
}

print_json($y,$_SERVER['HTTP_REFERER']);

?>