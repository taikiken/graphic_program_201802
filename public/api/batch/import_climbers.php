<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=58;
$MEDIANAME="クライマーズ";
$rssfile="https://climbers-web.jp/feed-sportsbull/";
//$rssfile="http://climbers:climing@climbers.warpjapan.com/feed-sportsbull/";

function modifyhtml($s){
	
	global $domain,$ImgPath;
	
	$credit="";
	$s=strip_tags($s,"<h2><h3><h4><br><p><div><a><table><caption><tbody><tr><td><strong><img><iframe><script><blockquote>");
	
	$s=preg_replace("/^.*<a .*$/um","",$s);
	$s=preg_replace("/(\r\n|\r|\n)/","",$s);
	$s=str_replace("<br />","<br>",$s);
	$s=str_replace("<p></p>","",$s);
	$s=str_replace("<p><br></p>","",$s);
	$s=str_replace("<br><br><br>","<br><br>",$s);
	$s=str_replace("</p><br>","</p>",$s);
	$s=str_replace("</p><br>","</p>",$s);
	$s=str_replace("<br>&nbsp;<br>","",$s);
	$s=str_replace("</h2><br>","</h2>",$s);
	$s=str_replace("</h2><br>","</h2>",$s);
	$s=str_replace("<br><h2>","<h2>",$s);
	$s=str_replace("<br><h2>","<h2>",$s);
	
	$s=str_replace("<br><br><div><br><br>","<div>",$s);
	$s=str_replace("<p><br>","<p>",$s);
	$s=str_replace("<p><br>","<p>",$s);
	$s=str_replace("<br></p>","</p>",$s);
	$s=str_replace("<br></p>","</p>",$s);
	$s=str_replace("<br><br><div>","<div>",$s);
	
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

	preg_match_all("/<iframe .*?<\/iframe>/smu",$s,$u);
	for($i=0;$i<count($u[0]);$i++){
		preg_match('/src="([^"]+)"/',$u[0][$i],$r);
		$r[1]=preg_replace("(http(s):)","",$r[1]);
		if(preg_match("/youtube/",$r[1])){
			$s=str_replace($u[0][$i],sprintf('<div class="cms_widget ratio16_9"><div class="ratio16_9-inner"><iframe width="728" height="410" src="%s" frameborder="0" allowfullscreen></iframe></div></div>',$r[1]),$s);
		}else{
			$s=str_replace($u[0][$i],"",$s);
		}
	}
	
	if(!preg_match("/^</",$s))$s=sprintf("<br>%s",$s);
	
	return array($s,$credit);
}

$o=new db;
$o->connect();

$xml=get_contents($rssfile);
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
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=trim($data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"]);
		$s["t1"]=$body[1];
	}

	$keyword=key_merge(trim($data["channel"]["item"][$i]["keyword"]));
	$s["keyword"]=$keyword;
	
	$tag=categorymatching($exword,$keyword);
	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			if($cnt==6)break;
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}
    
    $https_delet= '%'.substr($data["channel"]["item"][$i]["guid"],5);
	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t7 like '%s'",$MEDIAID,$https_delet);
	$o->query($sql);
	$f=$o->fetch_array();
	
	unset($sqla);
		
	if(strlen($f["id"])>0){
		if($data["channel"]["item"][$i]["status"]=="1"){
			if(strtotime($s["a_time"])>strtotime($f["a_time"])){

				$body=modifyhtml($data["channel"]["item"][$i]["description"]);
				$modbody=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$body[0]));

				if(strlen($s["t30"])>0){
					if(!eximg(sprintf("%s/raw/%s",$ImgPath,$f["img1"]),$s["t30"]))$s["img1"]=outimg($s["t30"]);
				}else{
					$s["img1"]="";
					$s["t1"]="";
				}
				unset($s["m1"]);
				splittime($s["m_time"],$s["a_time"]);
				$sqla[]=makesql($s,$f["id"]);
				$sqla[]=sprintf("update repo_body set body='<p>%s</p>' where pid=%s;",$modbody,$f["id"]);
				$sqla[]=sprintf("update repo_e set title='<p>%s</p>' where nid=%s and n=1;",$modbody,$f["id"]);
				$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
			}
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){

			$body=modifyhtml($data["channel"]["item"][$i]["description"]);
			$modbody=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$body[0]));
			$TITLE[]=pg_escape_string($s["title"]);
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=153;
			$s["bodyflag"]=170;
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);
			
			$sqla[]=makesql($s,0);
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
			$sqla[]=sprintf("insert into repo_e(nid,types,title,n,flag,m_time,u_time) values(currval('repo_n_id_seq'),5,'%s',1,1,now(),now());",$modbody);
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