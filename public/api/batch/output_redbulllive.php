<?php

include $INCLUDEPATH."local.php";

if(!$bucket){
	$bucket=sprintf("%s/api/ver1/static/redbull",$SERVERPATH);
}else{
	$client = new Aws\S3\S3Client([
		'region' => 'ap-northeast-1',
		'version' => 'latest',
	]);
	$client->registerStreamWrapper();
	$bucket=sprintf("s3://%s/static/redbull",$bucket);
}
function put_json($file,$data){
	$data=json_encode($data,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
	file_put_contents($file,$data);
}

$url=sprintf("http://input.sportsbull.jp/api/redbulllive%s.dat",preg_match("/dev/",$servername)?"_dev":"");
$d=get_contents($url);
$d=unserialize($d);

$y["response"]["lastupdate"]=$d["lastupdate"];
$y["response"]["live"]["isPlaying"]=$d["isPlaying"]==="0"?false:true;

$y["response"]["live"]["video"]["source"]=$d["source"];
$y["response"]["live"]["video"]["ad_url"]["pc"]=$d["pc"];
$y["response"]["live"]["video"]["ad_url"]["sp"]=$d["sp"];
$y["response"]["live"]["video"]["ad_url"]["ios"]=$d["ios"];
$y["response"]["live"]["video"]["ad_url"]["android"]=$d["android"];

$y["response"]["live"]["alt"]["large"]=$d["large"];
$y["response"]["live"]["alt"]["medium"]=$d["medium"];

$y["response"]["live"]["error"]["large"]=$d["elarge"];
$y["response"]["live"]["error"]["medium"]=$d["emedium"];

put_json(sprintf("%s/live.json",$bucket),$y);

?>