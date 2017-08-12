<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=26;
$rssfile="http://input.sportsbull.jp/vkuploader/file/asw76rgrr66d.xml";

$json="https://widget.sportsbull.jp/json/v1/2017/hsb/summer/seasonschedule.json";
$schedule=json_decode(get_contents($json),TRUE);

$o=new db;
$o->connect();

function get_keyword($k){
	preg_match("/^【(.*)】/",$k,$m);
	return $m[1];
}

$xml=get_contents($rssfile);

$xml=str_replace("ut:related","relatedLink",$xml);
$xml=str_replace("caption=\"\">"," />",$xml);
$xml=str_replace("<link ","<li ",$xml);

$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

if($data["channel"]["item"]["guid"]){
	$entry=$data["channel"]["item"];
	unset($data);
	$data["channel"]["item"][]=$entry;
}

for($i=0;$i<count($data["channel"]["item"]);$i++){

	switch($data["channel"]["item"][$i]["movietype"]){
		case "感動甲子園";$movietype=0;break;
		case "ハイライト";$movietype=1;break;
		case "ダイジェスト";$movietype=2;break;
		case "ハイスピード";$movietype=3;break;
		case "インタビュー";$movietype=4;break;
	}
	
	unset($s);
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	
	if($movietype===0){
		$s["t7"]=$data["channel"]["item"][$i]["gamedate"];
	}else{
		$s["t7"]=sprintf("%s_%s",$schedule[str_replace("-","",$data["channel"]["item"][$i]["gamedate"])][$data["channel"]["item"][$i]["gamesequence"]],$movietype);
	}
	
	$active[]=$s["t7"];
	
	$body=is_string($data["channel"]["item"][$i]["description"])?$data["channel"]["item"][$i]["description"]:"";
	$modbody=sprintf("<p>%s</p>",str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$body)));
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"];
	}
	
	$s["keyword"]=str_replace(array("第99回,2017年,全国高校野球選手権大会,本大会","99回,2017年,全国高校野球選手権大会,高校野球"),"",$data["channel"]["item"][$i]["keyword"]);
	
	$tag=categorymatching($exword,sprintf("第99回全国高校野球選手権大会,%s%s",$data["channel"]["item"][$i]["movietype"],!is_array($s["keyword"])?",".$s["keyword"]:""));
	if(count($tag)>0){
		$tag=array_unique($tag);
		$tag=array_values($tag);
		for($cnt=0;$cnt<count($tag);$cnt++){
			if($cnt==6)break;
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
	
	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t7='%s'",$MEDIAID,$s["t7"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	unset($sqla);
	
	if(strlen($f["id"])>0){
	  if(strtotime($s["a_time"])>strtotime($f["a_time"])){
		  if(strlen($s["t30"])>0){
			  if(!eximg(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]),$s["t30"])){
				  $oimg=outimg($s["t30"]);
				  if(strlen($oimg)>0){
					  $s["img1"]=$oimg;
				  }else{
					  $s["img1"]="";
					  $s["t1"]="";							
				  }
			  }
		  }else{
			  $s["img1"]="";
			  $s["t1"]="";
		  }
		  $s["flag"]=1;
		  unset($s["m1"]);
		  splittime($s["m_time"],$s["a_time"]);
		  $sqla[]=makesql($s,$f["id"]);
		  $sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$modbody,$f["id"]);
		  $sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
	  }
	}else{
		
		if($data["channel"]["item"][$i]["status"]==1){
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=136;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["imgflag"]=168;
			$s["brightcove"]=$data["channel"]["item"][$i]["movie"];
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";

			if(strlen($s["t30"])>0){
				$oimg=outimg($s["t30"]);
				if(strlen($oimg)>0)$s["img1"]=$oimg;
			}
			
			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
			$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"]);
			
		}
	}
	
	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}
}

//RSSから削除された記事を非表示に変更
$sql=sprintf("update repo_n set flag=0 where d2=26 and bodyflag is null and t7 not in ('%s');",implode("','",$active));
$o->query($sql);

?>