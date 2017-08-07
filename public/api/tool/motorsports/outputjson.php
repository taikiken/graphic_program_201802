<?php

include $INCLUDEPATH."local.php";

if(!$bucket){
	$bucket=sprintf("%s/api/ver1/static/motorsports",$SERVERPATH);
}else{
	$client = new Aws\S3\S3Client([
		'region' => 'ap-northeast-1',
		'version' => 'latest',
	]);
	$client->registerStreamWrapper();
	$bucket=sprintf("s3://%s/static/motorsports",$bucket);
}

function put_json($file,$data){
	$data=json_encode($data,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
	file_put_contents($file,$data);
}

$file=$_GET["file"];
if(strlen($file)==0)$file="sgt";
$tmp[]=$l;

$data=get_contents(sprintf("http://input.sportsbull.jp/msuploader/file/%s.csv",$file));
$data=mb_convert_encoding($data,"UTF-8","SJIS");
$data=preg_replace("/\r\n|\r|\n/","\n",$data);

$tmpfile="data.csv";
file_put_contents($tmpfile,$data);

$n=-1;
$titleflag=0;
$result=0;
$data=array();
$y=array();
$sddata=array();
	
$fp=fopen($tmpfile,"r");
while($l=fgetcsv($fp,10240)){
	
	if(preg_match("/^#/",$l[0])){
		
		$n++;
		$data[$n]["header"]=str_replace("#","",$l[0]);
		$titleflag=1;
		
		if(preg_match("/日程・結果/",$l[0]))$result=1;
		
	}elseif($titleflag==1){
		
		if(strlen($l[3])==0)unset($l[3]);
		if(strlen($l[4])==0)unset($l[4]);
		if(strlen($l[5])==0)unset($l[5]);
		$datacount=count($l);
		$data[$n]["datatitle"][]=$l;
		$titleflag=0;
		$data[$n]["data"]=array();
		
	}else{
		
		if(strlen($l[0])>0)$v0=$l[0];
		if(strlen($l[1])>0)$v1=$l[1];
		
		for($j=5;$j>=$datacount;$j--){
			unset($l[$j]);
		}
		
		if(strlen($l[2])>0){
			if(strlen($l[0])==0)$l[0]=$v0;
			if(strlen($l[1])==0)$l[1]=$v1;
		}else{
			continue;
		}
		$data[$n]["data"][]=$l;
	}
}

if($file=="wrc"){
	
	$tmpdata=$data[0]["data"];
	$y["result"]["competition"]=$tmpdata[0][0];
	$y["result"]["post"]=array();
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			$y["result"]["post"][$j]["no"]=(int)$tmpdata[$j][1];
			$y["result"]["post"][$j]["driver"]=$tmpdata[$j][2];
		}
	}
	
	$tmpdata=$data[1]["data"];
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			$y["ranking"]["driver"][$j]["no"]=(int)$tmpdata[$j][0];
			$y["ranking"]["driver"][$j]["driver"]=$tmpdata[$j][1];
			$y["ranking"]["driver"][$j]["team"]=$tmpdata[$j][2];
			$y["ranking"]["driver"][$j]["point"]=$tmpdata[$j][3];
		}
	}
	
	$tmpdata=$data[2]["data"];
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			$y["ranking"]["team"][$j]["no"]=(int)$tmpdata[$j][0];
			$y["ranking"]["team"][$j]["team"]=$tmpdata[$j][1];
			$y["ranking"]["team"][$j]["point"]=$tmpdata[$j][2];
		}
	}
	
	$tmpdata=$data[3]["data"];
	for($j=0;$j<count($tmpdata);$j++){
		$sddata[$tmpdata[$j][0].$tmpdata[$j][1]][]=$tmpdata[$j];
	}
	$n=0;
	foreach($sddata as $k=>$v){
		$y["schedule"][$n]["competition"]=str_replace($v[0][1],"",$v[0][0]);
		$y["schedule"][$n]["date"]=$v[0][1];
		for($j=0;$j<count($v);$j++){
			$y["schedule"][$n]["result"][$j]["no"]=(int)$v[$j][2];
			$y["schedule"][$n]["result"][$j]["driver"]=strlen($v[$j][3])>0?$v[$j][3]:"";
		}
		$n++;
	}

}elseif($file=="sgt"){
	
	$tmpdata=$data[0]["data"];
	$y["result"]["competition"]=$tmpdata[0][0];
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			$y["result"]["now"][$j]["event"]=$tmpdata[$j][1];
			$y["result"]["now"][$j]["date"]=$tmpdata[$j][2];
			$y["result"]["now"][$j]["jtime"]=$tmpdata[$j][3];
			$y["result"]["now"][$j]["winner"]=$tmpdata[$j][4];
		}
	}
	
	$tmpdata=$data[1]["data"];
	$y["result"]["post"]=array();
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			if(preg_match("/^GT(3|5)00/",$tmpdata[$j][0],$match)){
				$n=0;
				$type=$match[0]!="GT500"?"":"_gt300";
				$tmpdata[$j][0]=preg_replace("/^GT(3|5)00 /","",$tmpdata[$j][0]);
			}
			$y["result"]["post".$type][$n]["no"]=(int)$tmpdata[$j][0];
			$y["result"]["post".$type][$n]["driver"]=$tmpdata[$j][1];
			$y["result"]["post".$type][$n]["team"]=$tmpdata[$j][2];
			$n++;
		}
	}
	
	$tmpdata=$data[2]["data"];
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			if(preg_match("/^GT(3|5)00/",$tmpdata[$j][0],$match)){
				$n=0;
				$type=$match[0]!="GT500"?"":"_gt300";
				$tmpdata[$j][0]=preg_replace("/^GT(3|5)00 /","",$tmpdata[$j][0]);
			}
			$y["ranking"]["driver".$type][$n]["no"]=(int)$tmpdata[$j][0];
			$y["ranking"]["driver".$type][$n]["driver"]=$tmpdata[$j][1];
			$y["ranking"]["driver".$type][$n]["team"]=$tmpdata[$j][2];
			$y["ranking"]["driver".$type][$n]["point"]=$tmpdata[$j][3];
			$n++;
		}
	}
	
	$tmpdata=$data[3]["data"];
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			if(preg_match("/^GT(3|5)00/",$tmpdata[$j][0],$match)){
				$n=0;
				$type=$match[0]!="GT500"?"":"_gt300";
				$tmpdata[$j][0]=preg_replace("/^GT(3|5)00 /","",$tmpdata[$j][0]);
			}
			$y["ranking"]["team".$type][$n]["no"]=(int)$tmpdata[$j][0];
			$y["ranking"]["team".$type][$n]["team"]=$tmpdata[$j][1];
			$y["ranking"]["team".$type][$n]["point"]=$tmpdata[$j][2];
			$n++;
		}
	}
	
	$tmpdata=$data[4]["data"];
	for($j=0;$j<count($tmpdata);$j++){
		$sddata[$tmpdata[$j][0].$tmpdata[$j][1]][]=$tmpdata[$j];
	}
	$n=0;
	foreach($sddata as $k=>$v){
		$y["schedule"][$n]["competition"]=str_replace($v[0][1],"",$v[0][0]);
		$y["schedule"][$n]["date"]=$v[0][1];
		for($j=0;$j<count($v);$j++){
			$y["schedule"][$n]["result"][$j]["event"]=$v[$j][2];
			$y["schedule"][$n]["result"][$j]["date"]=$v[$j][3];
			$y["schedule"][$n]["result"][$j]["jtime"]=strlen($v[$j][4])>0?$v[$j][4]:"";
			$y["schedule"][$n]["result"][$j]["winner"]=strlen($v[$j][5])>0?$v[$j][5]:"";
		}
		$n++;
	}

}else{

	$tmpdata=$data[0]["data"];
	$y["result"]["competition"]=$tmpdata[0][0];
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			$y["result"]["now"][$j]["event"]=$tmpdata[$j][1];
			$y["result"]["now"][$j]["date"]=$tmpdata[$j][2];
			$y["result"]["now"][$j]["jtime"]=$tmpdata[$j][3];
			$y["result"]["now"][$j]["winner"]=$tmpdata[$j][4];
		}
	}
	
	$tmpdata=$data[1]["data"];
	$y["result"]["post"]=array();
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			$y["result"]["post"][$j]["no"]=(int)$tmpdata[$j][0];
			$y["result"]["post"][$j]["driver"]=$tmpdata[$j][1];
			$y["result"]["post"][$j]["team"]=$tmpdata[$j][2];
		}
	}
	
	$tmpdata=$data[2]["data"];
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			$y["ranking"]["driver"][$j]["no"]=(int)$tmpdata[$j][0];
			$y["ranking"]["driver"][$j]["driver"]=$tmpdata[$j][1];
			$y["ranking"]["driver"][$j]["team"]=$tmpdata[$j][2];
			$y["ranking"]["driver"][$j]["point"]=$tmpdata[$j][3];
		}
	}
	
	$tmpdata=$data[3]["data"];
	for($j=0;$j<count($tmpdata);$j++){
		if(strlen($tmpdata[$j][1])>0){
			$y["ranking"]["team"][$j]["no"]=(int)$tmpdata[$j][0];
			$y["ranking"]["team"][$j]["team"]=$tmpdata[$j][1];
			$y["ranking"]["team"][$j]["point"]=$tmpdata[$j][2];
		}
	}
	
	$tmpdata=$data[4]["data"];
	for($j=0;$j<count($tmpdata);$j++){
		$sddata[$tmpdata[$j][0].$tmpdata[$j][1]][]=$tmpdata[$j];
	}
	$n=0;
	foreach($sddata as $k=>$v){
		$y["schedule"][$n]["competition"]=str_replace($v[0][1],"",$v[0][0]);
		$y["schedule"][$n]["date"]=$v[0][1];
		for($j=0;$j<count($v);$j++){
			$y["schedule"][$n]["result"][$j]["event"]=$v[$j][2];
			$y["schedule"][$n]["result"][$j]["date"]=$v[$j][3];
			$y["schedule"][$n]["result"][$j]["jtime"]=strlen($v[$j][4])>0?$v[$j][4]:"";
			$y["schedule"][$n]["result"][$j]["winner"]=strlen($v[$j][5])>0?$v[$j][5]:"";
		}
		$n++;
	}
}

$e["response"]=$y;
put_json(sprintf("%s/%s.json",$bucket,$file),$e);

?>