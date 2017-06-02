<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=28;
$rssfile="ut_rss_all.xml";
$rssfile="https://www.legendsstadium.com/rss/ut/";

$o=new db;
$o->connect();

function mod_bodyhtml($s,$brightcove){
	
	global $domain,$ImgPath;
	
	$s=str_replace("〜","～",$s);
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
	
	$s=sprintf('<div class="cms_widget ratio16_9"><div class="ratio16_9-inner">%s</div></div>%s',str_replace('width="300" height="150"','width="728" height="410"',$brightcove),$s);
	$s=pg_escape_string($s);
	return $s;
}

$xml=get_contents($rssfile);
$xml=str_replace("ut:related","relatedLink",$xml);
$xml=str_replace("link ","li ",$xml);
$xml=str_replace("\x08","",$xml);

$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

if($data["channel"]["item"]["guid"]){
	$entry=$data["channel"]["item"];
	unset($data);
	$data["channel"]["item"][]=$entry;
}

for($i=0;$i<count($data["channel"]["item"]);$i++){
	
	unset($s);
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	$s["t7"]=$data["channel"]["item"][$i]["guid"];	
	$active[]=$s["t7"];
	
	$body=is_string($data["channel"]["item"][$i]["description"])?html_entity_decode($data["channel"]["item"][$i]["description"]):"";
		
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

	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t7='%s'",$MEDIAID,$data["channel"]["item"][$i]["guid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	unset($sqla);
		
	if(strlen($f["id"])>0){
		if($data["channel"]["item"][$i]["status"]=="1"){
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
				$s["bodyflag"]=170;
				$s["imgflag"]=168;
				//$s["videoflag"]=172;
				unset($s["m1"]);
				splittime($s["m_time"],$s["a_time"]);
				$modbody=mod_bodyhtml($body,$data["channel"]["item"][$i]["movie"]);
				$sqla[]=makesql($s,$f["id"]);
				$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$modbody,$f["id"]);
				$sqla[]=sprintf("update repo_e set title='%s' where nid=%s and n=1;",$modbody,$f["id"]);
				$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=114;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["bodyflag"]=170;
			$s["imgflag"]=168;
			//$s["videoflag"]=172;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			
			if(strlen($s["t30"])>0){
				$oimg=outimg($s["t30"]);
				if(strlen($oimg)>0)$s["img1"]=$oimg;
			}
			
			$modbody=mod_bodyhtml($body,$data["channel"]["item"][$i]["movie"]);
			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
			$sqla[]=sprintf("insert into repo_e(nid,types,title,n,flag,m_time,u_time) values(currval('repo_n_id_seq'),5,'%s',1,1,now(),now());",$modbody);
			$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"]);
			
		}
	}

	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}

}

?>