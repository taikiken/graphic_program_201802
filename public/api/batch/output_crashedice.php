<?php

include $INCLUDEPATH."local.php";

$project="crashedice";

if(!$bucket){
	$bucket=sprintf("%s/api/ver1/static/%s",$SERVERPATH,$project);
	$url=sprintf("http://utinput/api/%s.dat",$project);
}else{
	$client = new Aws\S3\S3Client([
		'region' => 'ap-northeast-1',
		'version' => 'latest',
	]);
	$client->registerStreamWrapper();
	$bucket=sprintf("s3://%s/static/%s",$bucket,$project);
	$url=sprintf("http://input.sportsbull.jp/api/%s%s.dat",$project,preg_match("/dev/",$servername)?"_dev":"");
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

for($i=0;$i<=5;$i++){
	if(strlen($d["pchls".$i])>0){
		if($d["pcdefault".$i]==="0")$source=$d["pchls".$i];
		$y["response"]["live"]["video"]["sources"][]=array(
			"default"=>$d["pcdefault".$i]==="0"?true:false,
			"label"=>$d["pclabel".$i],
			"url"=>$d["pchls".$i],
			"res"=>(int)$d["pcres".$i]
		);
	}
	if(strlen($d["sphls".$i])>0){
		$y["response"]["live"]["video"]["sources_sp"][]=array(
			"default"=>$d["spdefault".$i]==="0"?true:false,
			"label"=>$d["splabel".$i],
			"url"=>$d["sphls".$i],
			"res"=>(int)$d["spres".$i]
		);
	}
}
$y["response"]["live"]["video"]["source"]=$source;

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