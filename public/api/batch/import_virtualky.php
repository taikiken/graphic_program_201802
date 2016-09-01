<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=26;
$rssfile="http://cms.undotsushin.com/api/uploader/file/asw76rgrr66d.xml";

$o=new db;
$o->connect();

function get_keyword($k){
	preg_match("/^【(.*)】/",$k,$m);
	return $m[1];
}

$xml=file_get_contents($rssfile);

$xml=str_replace("ut:related","relatedLink",$xml);
$xml=str_replace("caption=\"\">"," />",$xml);
$xml=str_replace("<link ","<li ",$xml);

$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

for($i=0;$i<count($data["channel"]["item"]);$i++){
	
	unset($s);
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	$s["t7"]=$data["channel"]["item"][$i]["guid"];
	
	$active[]=$s["t7"];
	
	$body=is_string($data["channel"]["item"][$i]["description"])?$data["channel"]["item"][$i]["description"]:"";
	$modbody=sprintf("<p>%s</p>",str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$body)));
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["lastUpdate"]));
	if($data["channel"]["item"][$i]["enclosure"]){
		$s["t30"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["url"];
		$s["t1"]=$data["channel"]["item"][$i]["enclosure"]["@attributes"]["caption"];
	}
	
	$mword=str_replace("第98回,2016年,全国高校野球選手権大会,本大会","",$data["channel"]["item"][$i]["keyword"]);
	$mword=str_replace("、",",",$mword);
	$mword=explode(",",$mword);
			
	if(preg_match("/ダイジェスト動画/",$s["title"])){
		$rword=array("第98回全国高校野球選手権大会",get_keyword($s["title"]),$mword[0],$mword[1],$mword[count($mword)-2],$mword[count($mword)-1]);
	}else{
		$rword=array("第98回全国高校野球選手権大会",get_keyword($s["title"]));
		for($j=0;$j<count($mword);$j++){
			if($j==4)break;
			if(strlen($mword[$j])>0)$rword[]=$mword[$j];
		}
	}
	$s["keyword"]=$data["channel"]["item"][$i]["keyword"];

	$tag=categorymatching($exword,implode(",",$rword));
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
	  if($s["a_time"]!=$f["a_time"]){
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
		  //$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
	  }
	}else{
		if($data["channel"]["item"][$i]["status"]==1){
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=142;
			$s["m2"]=136;
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
			//$sqla[]=relatedlink($data["channel"]["item"][$i]["relatedLink"]);
			
			if($i==0){
				//カテゴリー最初のインポート
				//$sqla[]="insert into u_latestpost(m1,pageid) select 142,currval('repo_n_id_seq');";
			}	
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