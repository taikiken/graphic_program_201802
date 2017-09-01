<?php

$dir="americanfootball/2017/autumn";
$path=preg_match("/cms/",$servername)?"img":"dev-img";

if(!$bucket){
	$bucket=sprintf("%s/api/ver1/static/%s",$SERVERPATH,$dir);
}else{
	$client = new Aws\S3\S3Client([
		'region' => 'ap-northeast-1',
		'version' => 'latest',
	]);
	$client->registerStreamWrapper();
	$bucket=sprintf("s3://%s/static/%s",$bucket,$dir);
}

$univ["関学大"]=array("id"=>1,"name"=>"関西学院大学");
$univ["立命館"]=array("id"=>2,"name"=>"立命館大学");
$univ["関西大"]=array("id"=>3,"name"=>"関西大学");
$univ["龍谷大"]=array("id"=>4,"name"=>"龍谷大学");
$univ["甲南大"]=array("id"=>5,"name"=>"甲南大学");
$univ["京都大"]=array("id"=>6,"name"=>"京都大学");
$univ["桃山大"]=array("id"=>7,"name"=>"桃山学院大学");
$univ["同志社"]=array("id"=>8,"name"=>"同志社学");

function put_json($file,$data){
	$data=json_encode($data,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
	file_put_contents($file,$data);
}

function check_result($score){
	if(!preg_match("/[0-9]+-[0-9]+/",$score))return $score;
	$r=explode("-",$score);
	if($r[0]>$r[1])$f="win";
	elseif($r[0]<$r[1])$f="lose";
	else $f="draw";
	return $f;
}

function get_lastmod($file){
	$c=get_headers($file);
	for($i=0;$i<count($c);$i++){
		if(preg_match("/Last-Modified: /",$c[$i])){
			return strtotime(str_replace("Last-Modified: ","",$c[$i]));
		}
	}	
}

function setarray($key,$val,$n){
	global $y,$univ,$pord;
	$key=explode(".",$key);
	if(count($key)==1){
		$y["response"]["team"][$n][$key[0]]=$val;
		if($key[0]=="name"){
			$pord[$val]=$n;
			$y["response"]["team"][$n]["name"]=$univ[$val]["name"];
			$y["response"]["team"][$n]["id"]=$univ[$val]["id"];
		}
	}elseif(count($key)==2){
		$y["response"]["team"][$n][$key[0]][$key[1]]=$val;
	}elseif(count($key)==3){
		$y["response"]["team"][$n][$key[0]][$key[1]][$key[2]]=$val;
	}
}


$map["#リーグ"]="league";
$map["#日付け"]="date";
$map["#曜日"]="weekday";
$map["#試合ID"]="gameid";
$map["#開始時間"]="kickoff";
$map["#スタジアム"]="stadium";
$map["#天候"]="weather";
$map["#観衆"]="spectators";
$map["#試合状態"]="status";
$map["#チーム名"]="name";
$map["#チームID"]="id";
$map["#得点1Q"]="score.1q";
$map["#得点2Q"]="score.2q";
$map["#得点3Q"]="score.3q";
$map["#得点4Q"]="score.4q";
$map["#得点合計"]="score.total";
$map["#タッチダウン"]="stats.touchdown";
$map["#PAT(1点)回数-成功"]="stats.pat.1point";
$map["#PAT(2点)回数-成功"]="stats.pat.2point";
$map["#フィールドゴール"]="stats.fieldgoal";
$map["#セイフティ"]="stats.safety";
$map["#1stダウン(ラン-パス-反則)"]="stats.1stdown";
$map["#パス 試投-成功-被Intercept"]="stats.pass.throw";
$map["#獲得ヤード"]="stats.pass.yard";
$map["#ラン(回数-獲得ヤード)"]="stats.run";
$map["#攻撃(回数-獲得ヤード)"]="stats.attack";
$map["#反則(回数-喪失ヤード)"]="stats.penalty";
$map["#ファンブル(回数-喪失回数)"]="stats.fumble";
$map["#ボール所有時間"]="stats.possession";
$map["#3rd Down Conversions"]="stats.3rdDownConversions";
$map["#4th Down Conversions"]="stats.4thDownConversions";

?>