<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=36;
$MEDIANAME="J：COMサッカー特集";
$CATEGORYID=114;
$rssfile="http://soccer.myjcom.jp/column/sportsbull.xml";

$o=new db;
$o->connect();

$xml=get_contents($rssfile);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

if(!$data)exit;

if($data["channel"]["item"]["guid"]){
	$entry=$data["channel"]["item"];
	unset($data);
	$data["channel"]["item"][]=$entry;
}

function modifytag($s){
	
	global $ImgPath;
	
	if(count($s)==0)return "";
	
	$s=preg_replace('# alt=""#','',$s);
	preg_match_all("#<img[^>]+>#",$s,$u);
	for($i=0;$i<count($u[0]);$i++){
		preg_match('#src="([^"]+)"#',$u[0][$i],$r);
		if(preg_match("#://#",$r[1])){
			$img=outimg($r[1],0);
			if(strlen($img)>0){
				$s=str_replace($u[0][$i],sprintf("<img src=\"%s/raw/%s\"><br>",$ImgPath,$img),$s);
			}else{
				$s=str_replace($u[0][$i],"",$s);
			}
		}else{
			$s=str_replace($u[0][$i],"",$s);
		}
	}

	$s=str_replace(array("<p></p>","<p>&nbsp;</p>"),"",$s);
	$s=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$s));
	
	return $s;
}

for($i=0;$i<count($data["channel"]["item"]);$i++){
	
	unset($s);
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	$s["t7"]=$data["channel"]["item"][$i]["guid"];
	
	$body=$data["channel"]["item"][$i]["description"];
	$modbody=modifytag($body);
	
	if(!preg_match("/^<br>/",$body)){
		$excap=explode("</p>",$body);
	}else{
		$excap=explode("<p>",$body);
	}

	$caption=preg_match("/写真/",$excap[0])?strip_tags($excap[0]):"";
	
	if($caption!="")$modbody=str_replace($caption,"",$modbody);
	$modbody=str_replace("<p></p>","",$modbody);
	$modbody=str_replace("<p><br></p>","",$modbody);
	$modbody=preg_replace("/^(<br>)/","",$modbody);
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$caption;
	}

	$keyword=key_merge($data["channel"]["item"][$i]["keyword"]);
	$s["keyword"]=$keyword;

/*
	$tag=categorymatching($exword,$keyword);
	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			if($cnt==6)break;
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
*/
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
				if($data["channel"]["item"][$i]["relatedLink"])$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"]["link"],$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){

			$TITLE[]=pg_escape_string($s["title"]);
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=$CATEGORYID;
			$s["imgflag"]=168;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
			if($data["channel"]["item"][$i]["relatedLink"])$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"]["link"]);
		}
	}
	
	if($sqla){	
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}
}

include $INCLUDEPATH."public/display.php";

?>