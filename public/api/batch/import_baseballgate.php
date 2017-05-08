<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=30;
$MEDIANAME="ベースボールゲート";
$rssfile="https://baseballgate.jp/feeds/sportsbull/";

$o=new db;
$o->connect();

$xml=get_contents($rssfile);
$xml=str_replace(":logo","",$xml);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

function modifytag($s){
	
	global $ImgPath;
	
	if(count($s)==0)return "";
	
	$s=preg_replace('#<div.*?>#mis','<div>',$s);
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

if($data["channel"]["item"]["guid"]){
	$entry=$data["channel"]["item"];
	unset($data);
	$data["channel"]["item"][]=$entry;
}

for($i=0;$i<count($data["channel"]["item"]);$i++){

	unset($s);
	unset($vs);
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	$s["t7"]=$data["channel"]["item"][$i]["guid"];
	
	$body=$data["channel"]["item"][$i]["description"];
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"];
	}

	$keyword=key_merge($data["channel"]["item"][$i]["category"]);
	$s["keyword"]=$keyword;

	$bbm=baseball_mapping(array($data["channel"]["item"][$i]["title"]));
	$tags=categorymatching($exword,$keyword);
	$tag=array_merge($tags,$bbm);

	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			if($cnt==6)break;
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
	
	$s["imgflag"]=preg_match("#<img#",$body)?168:167;
	if($data["channel"]["item"][$i]["isReadmore"]==1)$s["imgflag"]=167;
	$s["videoflag"]=$data["channel"]["item"][$i]["isVideo"]==1?173:172;

	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t7='%s'",$MEDIAID,$data["channel"]["item"][$i]["guid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	unset($sqla);

	if(strlen($f["id"])>0){
		if($data["channel"]["item"][$i]["status"]=="1"){
			if(strtotime($s["a_time"])>strtotime($f["a_time"])){
	
				$modbody=modifytag(str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$data["channel"]["item"][$i]["description"])));
				
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
				$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){
						
			$modbody=modifytag(str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$data["channel"]["item"][$i]["description"])));
			$TITLE[]=pg_escape_string($s["title"]);
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=!preg_match("/高校野球/")?113:136;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
			//$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"]);
		}
	}

	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
		if(!isset($f["id"])){
			$sql="select currval('repo_n_id_seq') as id";
			$o->query($sql);
			$f=$o->fetch_array();
			$id=$f["id"];
		}else{
			$id=$f["id"];
		}
		$file=sprintf("%s/api/ver1/static/ad/1-%s.dat",$SERVERPATH,$id);
		if($vs=get_contents($file)){
			$vs=unserialize($vs);
		}
		$vs["readmore"]=$data["channel"]["item"][$i]["isReadmore"];
		file_put_contents($file,serialize($vs));
	}

}

include $INCLUDEPATH."public/display.php";

?>