<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=56;
$MEDIANAME="Rallys";
$rssfile="https://rallys.online/feed/sportsbull/";

$o=new db;
$o->connect();

$xml=get_contents($rssfile);
$xml=str_replace(":logo","",$xml);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

$sql=sprintf("select id,name,name_e,yobi from u_categories where flag=1 and id not in(%s) order by id desc",implode(",",$excategory));
$o->query($sql);
while($f=$o->fetch_array()){
	$sw=strlen($f["yobi"])>0?@explode(",",$f["yobi"]):array();
	$sw[]=$f["name"];
	$r[]=array($f["id"],$sw);
	$exword[]=$f["name"];
	$exword[]=$f["name_e"];
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
			$s=str_replace($u[0][$i],sprintf("<br><img src=\"%s/raw/%s\"><br>",$ImgPath,$img),$s);
		}else{
			$s=str_replace($u[0][$i],"",$s);
		}
	}
	$s=preg_replace("(\r\n|\r|\n)","",$s);
	$s=str_replace("<br />","<br>",$s);
	$s=preg_replace("/ (style|id|class)=\".*?\"|(style|id|class)='.*?'/i","",$s);
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
	
	preg_match("/, ([0-9]+) ([0-9]+)月 ([0-9]+) ([0-9]+:[0-9]+:[0-9]+) \+0900/",$data["channel"]["item"][$i]["pubDate"],$date);
	$pubdate=sprintf("%s-%s-%s %s",$date[3],$date[2],$date[1],$date[4]);
	preg_match("/, ([0-9]+) ([0-9]+)月 ([0-9]+) ([0-9]+:[0-9]+:[0-9]+) \+0900/",$data["channel"]["item"][$i]["lastUpdate"],$date);
	$lastupdate=sprintf("%s-%s-%s %s",$date[3],$date[2],$date[1],$date[4]);
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($pubdate));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($lastupdate));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($lastupdate));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"];
	}

	$keyword=$data["channel"]["item"][$i]["keyword"];
	$s["keyword"]=$keyword;
	$tag=explode(",",$keyword);
	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			if($cnt==6)break;
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
	
	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t7='%s'",$MEDIAID,$data["channel"]["item"][$i]["guid"]);
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
				$modbody=modifytag($body);
				splittime($s["m_time"],$s["a_time"]);
				$sqla[]=makesql($s,$f["id"]);
				$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$modbody,$f["id"]);
				if($data["channel"]["item"][$i]["relatedLink"])$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){

			$TITLE[]=pg_escape_string($s["title"]);
			
			$modbody=modifytag($body);
			$s["d1"]=3;
			$s["m1"]=124;
			$s["d2"]=$MEDIAID;
			$s["flag"]=1;
			$s["cid"]=1;
			//$s["imgflag"]=168;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);
			
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
			if($data["channel"]["item"][$i]["relatedLink"])$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"]);
		}
	}
	
	if($sqla){				
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}
}

include $INCLUDEPATH."public/display.php";

?>