<?php

include $INCLUDEPATH."local.php";

$url=sprintf("http://input.sportsbull.jp/api/big6live%s.dat",preg_match("/dev/",$servername)?"_dev":"");
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

file_put_contents(sprintf("%s/ver1/static/big6live.json",".."),json_encode($y));

?>