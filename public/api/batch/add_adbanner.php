<?php

include $INCLUDEPATH."local.php";

$dir="../ver1/static/ad/";
$path=dir($dir);
while($fl=$path->read()){
	if($fl!="."&&$fl!=".."){
		$file=$dir.$fl;
		$d=unserialize(get_contents($file));
		if(strlen($d["sp_bannerimg"])>0){
			$y=preg_match("/([0-9]+)-([0-9]+)\.dat/",$fl,$id);
			$e[]=array($d["sp_bannerimg"],$d["sp_bannerlink"],sprintf("http://cms.sportsbull.jp/editdm/ad/edit/?nid=%s&cid=%s",$id[2],$id[1]));
		}
		
	}
}

var_dump($e);


?>