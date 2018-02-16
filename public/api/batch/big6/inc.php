<?php

$target="2018s";
preg_match("/([0-9]{4})([a-z]{1})/",$target,$match);
$year=$match[1];
$season=$match[2]=="a"?"autumn":"spring";

if(!$bucket){
	$bucket=sprintf("%s/api/ver1/static/big6/%s/%s",$SERVERPATH,$year,$season);
}else{
	$client = new Aws\S3\S3Client([
		'region' => 'ap-northeast-1',
		'version' => 'latest',
	]);
	$client->registerStreamWrapper();
	$bucket=sprintf("s3://%s/static/big6/%s/%s",$bucket,$year,$season);
}

$o=new db;
$o->connect();

?>