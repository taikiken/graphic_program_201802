<?php

include $INCLUDEPATH."local.php";

if(!$bucket){
	$bucket=sprintf("%s/api/ver1/static/vk/2017/summer",$SERVERPATH);
}else{
	$client = new Aws\S3\S3Client([
		'region' => 'ap-northeast-1',
		'version' => 'latest',
	]);
	$client->registerStreamWrapper();
	$bucket=sprintf("s3://%s/static/vk/2017/summer",$bucket);
}

function put_json($file,$data){
	$data=json_encode($data,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
	file_put_contents($file,$data);
}

$mvtype=array("highlight","digest","slowmotion","herointerview");

$json="https://dev.widget.sportsbull.jp/json/v1/2017/hsb/summer/seasonschedule.json";
$schedule=json_decode(get_contents($json),TRUE);

foreach($schedule as $k=>$v){
	preg_match("/([0-9]{4})([0-9]{2})([0-9]{2})/",$k,$date);
	for($i=1;$i<=count($v);$i++){
		$gameid[$v[$i]]=array("date"=>sprintf("%s-%s-%s",$date[1],$date[2],$date[3]),"sequence"=>(string)$i);
	}
}

$o=new db;
$o->connect();

$sql="select id,title,img1,t7,t11,u_time from repo_n where d2=26 and flag=1 and t11!='感動甲子園' order by m_time desc";
$o->query($sql);
while($f=$o->fetch_array()){
	$gid=explode("_",$f["t7"]);
	$games[$gid[0]][]=array(
		"type"=>$mvtype[($gid[1]-1)],
		"title"=>$f["title"],
		"img"=>sprintf("%s/raw/%s",$ImgPath,$f["img1"]),
		"movie"=>sprintf("%s/p/%s/",$domain,$f["id"]),
		"u_time"=>date("Y-m-d H:i:s",strtotime($f["u_time"]))
	);
}

foreach($games as $k=>$v){
	$y["request"]["gameid"]=$k;
	for($i=0;$i<count($v);$i++){
		if($i==0){
			
			$update=strtotime($v[0]["u_time"]);
			$json=sprintf("%s/%s.json",$bucket,$k);
			if(file_exists($json)&&filemtime($json)>$update)continue;
			
			$y["response"]["lastupdate"]=$v[0]["u_time"];
			$y["response"]["schedule"]["date"]=$gameid[$k]["date"];
			$y["response"]["schedule"]["sequence"]=$gameid[$k]["sequence"];
			for($j=0;$j<count($mvtype);$j++){
				$y["response"]["media"][$mvtype[$j]]=array("title"=>"","img"=>"","movie"=>"");
			}
		}
		$y["response"]["media"][$v[$i]["type"]]=array("title"=>$v[$i]["title"],"img"=>$v[$i]["img"],"movie"=>$v[$i]["movie"]);
	}
	put_json($json,$y);
}

unset($y);

$sql="select id,title,img1,t7,t11,u_time from repo_n where d2=26 and flag=1 and t11='感動甲子園' order by m_time desc";
$o->query($sql);
while($f=$o->fetch_array()){
	$excite[]=array(
		"date"=>$f["t7"],
		"title"=>$f["title"],
		"img"=>sprintf("%s/raw/%s",$ImgPath,$f["img1"]),
		"movie"=>sprintf("%s/p/%s/",$domain,$f["id"]),
		"u_time"=>date("Y-m-d H:i:s",strtotime($f["u_time"]))
	);
}
if(count($excite)>0){
	$update=strtotime($excite[0]["u_time"]);
	$json=sprintf("%s/excite.json",$bucket);
	if(!file_exists($json)||filemtime($json)<$update){
		$y["response"]["lastupdate"]=$excite[0]["u_time"];
		for($i=0;$i<count($excite);$i++){
			$y["response"]["media"][$i]["date"]=$excite[$i]["date"];
			$y["response"]["media"][$i]["title"]=$excite[$i]["title"];
			$y["response"]["media"][$i]["img"]=$excite[$i]["img"];
			$y["response"]["media"][$i]["movie"]=$excite[$i]["movie"];
		}
		
		put_json($json,$y);
	}
}

?>