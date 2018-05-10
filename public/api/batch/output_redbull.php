<?php

include $INCLUDEPATH."local.php";

$project=$_GET["project"];

if(!$bucket){
	$bucket=sprintf("%s/api/ver1/static/redbull/%s",$SERVERPATH,$project);
	$url=sprintf("http://utinput/api/%s%s.dat",$project,$_GET["env"]);
}else{
	$client = new Aws\S3\S3Client([
		'region' => 'ap-northeast-1',
		'version' => 'latest',
	]);
	$client->registerStreamWrapper();
	$bucket=sprintf("s3://%s/static/redbull/%s",$bucket,$project);
	$url=sprintf("http://input.sportsbull.jp/api/%s%s.dat",$project,$_GET["env"]);
}

function put_json($file,$data){
	$data=json_encode($data,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
	file_put_contents($file,$data);
}

$d=get_contents($url);
$d=unserialize($d);

$y["response"]["lastupdate"]=$d["lastupdate"];
$y["response"]["live"]["isPlaying"]=$d["isPlaying"]==="0"?false:true;
$y["response"]["live"]["interval"]=(int)mb_convert_kana($d["interval"],"a");

$y["response"]["live"]["video"]["id"]=$d["video-id"];

$y["response"]["live"]["alt"]["large"]=$d["alt-large"];
$y["response"]["live"]["alt"]["medium"]=$d["alt-medium"];

$y["response"]["live"]["error"]["large"]=$d["error-large"];
$y["response"]["live"]["error"]["medium"]=$d["error-medium"];

put_json(sprintf("%slive.json",$bucket),$y);

?>