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

$y["lastupdate"]=$d["lastupdate"];
$y["live"]["isPlaying"]=$d["isPlaying"]==="0"?false:true;
$y["live"]["interval"]=(int)mb_convert_kana($d["interval"],"a");

$y["live"]["video"]["id"]=$d["video-id"];

$y["live"]["alt"]["large"]=$d["alt-large"];
$y["live"]["alt"]["medium"]=$d["alt-medium"];

$y["live"]["error"]["large"]=$d["error-large"];
$y["live"]["error"]["medium"]=$d["error-medium"];

put_json(sprintf("%slive.json",$bucket),$y);

?>