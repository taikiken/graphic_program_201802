<?php

include "local.php";
include "public/check.php";

$o = new db;
$o->connect();

$offset = strlen($_REQUEST["offset"]) > 0 ? $_REQUEST["offset"] : 0;
$length = strlen($_REQUEST["length"]) > 0 ? $_REQUEST["length"] : 5;
$t10 = $_REQUEST["t10"];
$mediaId = empty($_REQUEST["d2"]) === false ? $_REQUEST["d2"] : null;
$date = empty($_REQUEST["date"]) === false ? $_REQUEST["date"] : null;

function get_status($t10, $date) {
	if(!$t10){
		return array(
			"code"=>400,
			"message_type"=>"error",
			"user_message"=>"リクエストに誤りがあります。",
			"developer_message"=>"タグが指定されておりません。",
		);
	}
	if($date!==null){
		$dateLength = 8;
		if(!preg_match('/^[0-9]{'.$dateLength.'}$/', $date)){
			return array(
				"code"=>400,
				"message_type"=>"error",
				"user_message"=>"リクエストに誤りがあります。",
				"developer_message"=>"日付は'YYYYMMDD'形式で指定してください。",
			);
		}
		$tmp=[];
		for($i=0; $i<$dateLength; $i++){
			$tmp[floor($i/2)] .= $date[$i];
		}
		if(!checkdate($tmp[2], $tmp[3], $tmp[0].$tmp[1])){
			return array(
				"code"=>400,
				"message_type"=>"error",
				"user_message"=>"リクエストに誤りがあります。",
				"developer_message"=>"不正な日付が指定されています。",
			);
		}
	}

	return array(
		"code"=>200,
		"message_type"=>"success",
		"user_message"=>"",
		"developer_message"=>""
	);
}

$y["status"] = get_status($t10, $date);
if(strlen($_REQUEST["length"])>0){
	$y["request"]["length"]=(int)$_REQUEST["length"];
}
if(strlen($_REQUEST["offset"])>0){
	$y["request"]["offset"]=(int)$_REQUEST["offset"];
}
$y["response"]["count"] = 0;
$y["response"]["articles"] = array();

if ($y["status"]["code"] === 200) {

	//where句を組み立てる
	$arrayWheres = [
		"flag=1",
	];
	if($mediaId !== null){
		$arrayWheres[] = "d2=".pg_escape_literal($mediaId);
	}
	if($t10){
		$arrayWheres[] = 't10='.pg_escape_literal($t10);
	}
	if($date !== null){
		$arrayWheres[] = "to_char(m_time, 'YYYYMMDD') = ".pg_escape_literal((string)$date);
	}
	$where = implode(' and ', $arrayWheres);

	$nsql = "select count(*) as n from repo_n where {$where}";
	$o->query($nsql);
	$f = $o->fetch_array();
	$count = $f["n"];

	$sql = sprintf("select id,img1,title from repo_n where {$where} order by m_time desc limit %s offset %s",
			$length, $offset);
	$o->query($sql);

	while ($f = $o->fetch_array()) {
		$s[] = [
			"title" => $f["title"],
			"img" => sprintf("%s/thumbnail1/%s", $ImgPath, $f["img1"]),
			"url" => sprintf("%s/p/%s/", $domain, $f["id"])
		];
	}
	$y["response"]["count"] = (int) $count;
	$y["response"]["articles"] = $s;
}

print_json($y, $_SERVER['HTTP_REFERER']);
?>