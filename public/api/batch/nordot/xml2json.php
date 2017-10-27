<?php

include "local.php";
include "inc.php";

$ID=isset($_GET["id"])?$_GET["id"]:0;
$urls=explode("\n",$rssfile[$ID]);

for($j=0;$j<count($urls);$j++){
	
	$urls[$j]=trim($urls[$j]);
	$xml=get_contents($urls[$j]);
	$xml=str_replace(array("dc:","media:content"),array("","img"),$xml);	
	$d=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
	$d=json_decode(json_encode($d),TRUE);
	
	if(count($d["channel"]["item"])==0)continue;
	if($d["channel"]["item"]["guid"]){
		$entry=$d["channel"]["item"];
		unset($d);
		$d["channel"]["item"][]=$entry;
	}
	
	for($i=0;$i<count($d["channel"]["item"]);$i++){
		if(strtotime($d["channel"]["item"][$i]["pubDate"])<strtotime("-1 day",time()))continue;
		if($d["channel"]["item"][$i]["description"]==NULL||is_array($d["channel"]["item"][$i]["description"]))continue;
		$data[]=$d["channel"]["item"][$i];
	}	
}

file_put_contents(sprintf("%s/%s.json",$bucket2,$ID),json_encode($data,JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT));

?>