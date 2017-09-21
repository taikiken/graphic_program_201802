<?php

include "local.php";
include "../inc.php";

$csv =sprintf("%s/csv/schedule.csv",$bucket);
$data=get_contents($csv);
$data=mb_convert_encoding($data,"UTF-8","SJIS");
$data=preg_replace("/\r\n|\r|\n/","\n",$data);
$tmpfile=sprintf("%s/tmp/schedule.csv",$bucket);
file_put_contents($tmpfile,$data);

$fp=fopen($tmpfile,"r");
while($l=fgetcsv($fp,1024)){
	if(!preg_match("/^#/",$l[0])){
		$jsonfile1=sprintf("%s/%s.json",$ka_path,$l[5]);
		$data1=get_contents($jsonfile1);
		if(!preg_match("/Not Found/",$data1)){
			$data1=json_decode($data1,true);
			if($l[7]==""){
				$l[7]=$data1["response"]["team"][0]["score"]["total"];
				$l[9]=$data1["response"]["team"][1]["score"]["total"];
			}
		}
		$cdata[]=sprintf('"%s"',implode('","',$l));
	}
}

$cdata=implode("\r\n",$cdata);
$cdata=mb_convert_encoding($cdata,"SJIS","UTF-8");
file_put_contents($csv,$cdata);

?>