<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=35;
$MEDIANAME="Number Web全文";
$rssfile="http://number.bunshun.jp/list/feed/rss4sportsbull1";

$o=new db;
$o->connect();


$sql="select id,name from u_categories";
$o->query($sql);
while($f=$o->fetch_array()){
	$categorylist[$f["name"]]=$f["id"];
}

$xml=get_contents($rssfile);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

if($data["channel"]["item"]["guid"]){
	$entry=$data["channel"]["item"];
	unset($data);
	$data["channel"]["item"][]=$entry;
}

function imgoutput($s){
	
	global $domain,$ImgPath;
	
	preg_match_all("#<img[^>]+>#",$s,$u);
	for($i=0;$i<count($u[0]);$i++){
		preg_match('#src="([^"]+)"#',$u[0][$i],$r);
		if(preg_match("#://#",$r[1])){
			$img=outimg($r[1],0);
			$s=str_replace($u[0][$i],sprintf("<img src=\"%s/raw/%s\">",$ImgPath,$img),$s);
		}else{
			$s=str_replace($u[0][$i],"",$s);
		}
	}
	return $s;	
}

for($i=0;$i<count($data["channel"]["item"]);$i++){
	
	unset($s);
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	$s["t7"]=$data["channel"]["item"][$i]["guid"];
	
	$body=$data["channel"]["item"][$i]["description"];
	$modbody=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$data["channel"]["item"][$i]["description"]));
	$modbody=str_replace(array("<!--","-->"),array("<!-- "," -->"),$modbody);
	$modbody=imgoutput($modbody);
	
	//var_dump($modbody);
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"];
	}

	$keyword=key_merge($data["channel"]["item"][$i]["keyword"]);
	$s["keyword"]=$keyword;

	$tag=categorymatching($exword,$keyword);
	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			if($cnt==6)break;
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
	
	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t7 like '%s%s%s'",$MEDIAID,"%",$data["channel"]["item"][$i]["guid"],"%");
	$o->query($sql);
	$f=$o->fetch_array();
	
	unset($sqla);
	
	if(strlen($f["id"])>0){
		if($data["channel"]["item"][$i]["status"]=="1"){
			if(strtotime($s["a_time"])>strtotime($f["a_time"])){
				if(strlen($s["t30"])>0){
					if(!eximg(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]),$s["t30"]))$s["img1"]=outimg($s["t30"]);
				}else{
					$s["img1"]="";
					$s["t1"]="";
				}
				unset($s["m1"]);
				splittime($s["m_time"],$s["a_time"]);
				$sqla[]=makesql($s,$f["id"]);
				$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$modbody,$f["id"]);
				$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){

			$category=$data["channel"]["item"][$i]["category"];
			$category=explode(",",$category);
			
			if(!empty($category[0]))$s["m1"]=$categorylist[trim($category[0])]?$categorylist[trim($category[0])]:129;
			if(!empty($category[1]))$s["m2"]=$categorylist[trim($category[1])]?$categorylist[trim($category[1])]:129;

			$TITLE[]=pg_escape_string($s["title"]);
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
			$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"]);
		}
	}

	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}

}

include $INCLUDEPATH."public/display.php";

?>