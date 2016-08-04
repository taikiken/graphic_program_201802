<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=16;

function modhtmltag($s){
	$s=str_replace("\n","<br>",$s);
	$s=strip_tags($s,"<br>");
	$s=sprintf("<p>%s</p>",str_replace(array("<br><br><br>","<br><br>"),"</p><p>",$s));
	return $s;
}
function modRelatedLink($links){
	$link=array();
	for($i=0;$i<count($links);$i++){
		$link["li"][$i]["@attributes"]["url"]=$links[$i]["@attributes"]["url"];
		$link["li"][$i]["@attributes"]["title"]=$links[$i]["@attributes"]["title"];
	}
	return $link;
}
function modKeyword($keywords){
	$keyword=array();
	for($i=0;$i<count($keywords);$i++){
		$k=$keywords[$i]["@attributes"]["name"];
		if(preg_match("/(注目の記事|★明日のイベント予定)/",$k))continue;
		$keyword[]=$k;
	}
	return $keyword;
}

$rssfile="http://response.jp/feed/article/index.xml";

$o=new db;
$o->connect();

$xml=file_get_contents($rssfile);
$xml=str_replace("iid:", "", $xml);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

for($i=0;$i<count($data["entry"]);$i++){
	
	if(!preg_match("/モータースポーツ/",$data["entry"][$i]["category"]["@attributes"]["label"]))continue;
	
	$s["title"]=$data["entry"][$i]["title"];
	$s["t9"]=$data["entry"][$i]["link"]["@attributes"]["href"];
	$s["t7"]=$data["entry"][$i]["id"];
	$s["t16"]=$data["entry"][$i]["summary"];
	
	$body=modhtmltag($data["entry"][$i]["content"]);
	$modbody=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$body));
	$bodyimg="";
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["entry"][$i]["published"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["entry"][$i]["updated"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["entry"][$i]["updated"]));
	
	$s["t30"]=$data["entry"][$i]["img"][0]["@attributes"]["url"];
	$s["t1"]=$data["entry"][$i]["img"][0]["@attributes"]["alt"].$data["entry"][$i]["img"][0]["@attributes"]["copyright"];
	
	$keyword=modKeyword($data["entry"][$i]["gigaindex"]);
	$s["keyword"]=implode(",",$keyword);

	if(count($keyword)>0){
		for($cnt=0;$cnt<count($keyword);$cnt++){
			if($cnt==6)break;
			$s["t1".$cnt]=esc($keyword[$cnt]);
		}
	}

	$sql=sprintf("select * from repo_n where cid=1 and d2=%s and t7='%s'",$MEDIAID,$s["t7"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){
	  if($s["a_time"]!=$f["a_time"]){
		  if($s["t30"]!="NULL"){
			  $s["img1"]=outimg($s["t30"]);
			  for($jj=1;$jj<count($data["entry"][$i]["img"]);$jj++){
				  $oimg=$data["entry"][$i]["img"][$jj]["@attributes"]["url"];
				  $bodyimg.=sprintf("<p><img src=\"%s/prg_img/raw/%s\" alt=\"%s%s\"></p><p>%s%s</span></p>",$ImgPath,outimg($oimg,0),$data["entry"][$i]["img"][$jj]["@attributes"]["alt"],$data["entry"][$i]["img"][$jj]["@attributes"]["copyright"],$data["entry"][$i]["img"][$jj]["@attributes"]["alt"],$data["entry"][$i]["img"][$jj]["@attributes"]["copyright"]);
			  }
			  $modbody.=$bodyimg;
		  }else{
			  $s["img1"]="";
			  $s["t1"]="";
		  }
		  splittime($s["m_time"],$s["a_time"]);
		  $sqla[]=makesql($s,$f["id"]);
		  $sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$modbody,$f["id"]);
		  $sqla[]=relatedlink(modRelatedLink($data["entry"][$i]["relatedarticle"]),$f["id"]);
	  }
	}else{

	  $s["d1"]=3;
	  $s["d2"]=$MEDIAID;
	  $s["m1"]=125; // モータースポーツ
	  $s["flag"]=1;
	  $s["cid"]=1;
	  $s["n"]="(select max(n)+1 from repo_n where cid=1)";
	  
	  if(strlen($s["t30"])>0){
		  if(!eximg(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]),$s["t30"])){
			  $s["img1"]=outimg($s["t30"]);
			  for($jj=1;$jj<count($data["entry"][$i]["img"]);$jj++){
				  $oimg=$data["entry"][$i]["img"][$jj]["@attributes"]["url"];
				  $bodyimg.=sprintf("<p><img src=\"%s/prg_img/raw/%s\" alt=\"%s%s\"></p><p>%s%s</span></p>",$ImgPath,outimg($oimg,0),$data["entry"][$i]["img"][$jj]["@attributes"]["alt"],$data["entry"][$i]["img"][$jj]["@attributes"]["copyright"],$data["entry"][$i]["img"][$jj]["@attributes"]["alt"],$data["entry"][$i]["img"][$jj]["@attributes"]["copyright"]);
			  }
			  $modbody.=$bodyimg;
		  }
	  }
	  splittime($s["m_time"],$s["a_time"]);
	  $sqla[]=makesql($s,0);
	  $sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$modbody);
	  $sqla[]=relatedlink(modRelatedLink($data["entry"][$i]["relatedarticle"]));
	}
	if(count($sqla)>0){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}
	unset($s,$sqla);
}

?>