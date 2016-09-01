<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=27;
$rssfile="http://www.gorin.jp/api/rss/undotsushin.xml";

$o=new db;
$o->connect();

function textset($movieflag,$movieurl,$img,$txt,$caption){
	global $ImgPath,$s;
	if($movieflag=="1"&&strlen($img)>0&&strlen($movieurl)>0){
		$e=sprintf("<br><div style=\"position:relative;\"><a href=\"%s\" target=\"_blank\"><img src=\"%s/prg_img/raw/%s\" style=\"width:100%s; height:auto;\"/><i style=\"display:block;position:absolute;top:0; left:0; right:0;bottom:0; z-index:1; width:100%s; height:100%s; background:url(/assets/images/common/thumb-16x9-play.png) center center no-repeat; background-size:cover;\"></i></a></div><div style=\"font-size:12px;padding-top:5px;\"><span>%s</span></div>%s",
		$movieurl,$ImgPath,$img,"%","%","%",$caption,$txt);
		$s["imgflag"]=168;
		$s["title"]="【動画】".$s["title"];
	}else{
		$s["imgflag"]=167;
		$e=$txt;
	}
	return pg_escape_string($e);
}

$sql=sprintf("select id,name,name_e,yobi from u_categories where flag=1 and id not in(%s) order by id desc",implode(",",$excategory));
$o->query($sql);
while($f=$o->fetch_array()){
	$sw=strlen($f["yobi"])>0?@explode(",",$f["yobi"]):array();
	$sw[]=$f["name"];
	$r[]=array($f["id"],$sw);
	$exword[]=$f["name"];
	$exword[]=$f["name_e"];
}

$xml=file_get_contents($rssfile);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);

for($i=0;$i<count($data["channel"]["item"]);$i++){
	
	unset($s);

	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=$data["channel"]["item"][$i]["link"];
	$s["t7"]=$data["channel"]["item"][$i]["guid"];
	
	$body=$data["channel"]["item"][$i]["description"];
	$modbody=str_replace("\'","''",preg_replace("/(\r|\n|\t)/","",$data["channel"]["item"][$i]["description"]));

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

	$sql=sprintf("select * from repo_n where d2=%s and t7='%s';",$MEDIAID,$data["channel"]["item"][$i]["guid"]);
	
	$o->query($sql);
	$f=$o->fetch_array();
	
	unset($sqla);
		
	if(strlen($f["id"])>0){
		if($data["channel"]["item"][$i]["status"]=="1"){
			if($s["a_time"]!=$f["a_time"]){
				if(strlen($s["t30"])>0){
					if(!eximg(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]),$s["t30"])){
						unlink(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]));
						$s["img1"]=outimg($s["t30"]);
					}
				}else{
					unlink(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]));
					$s["img1"]="";
					$s["t1"]="";
				}
				unset($s["m1"]);
				splittime($s["m_time"],$s["a_time"]);
				
				$body=textset($data["channel"]["item"][$i]["movieflag"],$data["channel"]["item"][$i]["movie"],strlen($s["img1"])>0?$s["img1"]:$f["img1"],$modbody,$s["t1"]);
				$sqla[]=makesql($s,$f["id"]);
				
				$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",$body,$f["id"]);
				$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"],$f["id"]);
				
				$sqla[]=sprintf("delete from repo_e where nid=%s;",$f["id"]);
				$sqla[]=sprintf("insert into repo_e(nid,types,title,n,flag,m_time,u_time) values(%s,5,'%s',1,1,now(),now());",$f["id"],$body);
				
			}
			
		}elseif($data["channel"]["item"][$i]["status"]==0){
			$sqla[]=sprintf("update repo_n set flag=0 where id=%s;",$f["id"]);
		}
	}else{
		if($data["channel"]["item"][$i]["status"]==1){
			
			$s["d1"]=3;
			$s["d2"]=$MEDIAID;
			$s["m1"]=141;
			$s["m2"]=category_mapping($r,array($keyword,$s["title"],$s["t1"]));
			$s["bodyflag"]=170;
			
			$s["flag"]=1;
			$s["cid"]=1;
			$s["n"]="(select max(n)+1 from repo_n where cid=1)";
			if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
			splittime($s["m_time"],$s["a_time"]);
			
			$body=textset($data["channel"]["item"][$i]["movieflag"],$data["channel"]["item"][$i]["movie"],$s["img1"],$modbody,$s["t1"]);
			$sqla[]=makesql($s,0);
			
			//var_dump(array($s,$body));
			$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",$body);
			$sqla[]=sprintf("insert into repo_e(nid,types,title,n,flag,m_time,u_time) values(currval('repo_n_id_seq'),5,'%s',1,1,now(),now());",$body);
			$sqla[]=relatedlink2($data["channel"]["item"][$i]["relatedLink"]);
			
			//var_dump($sqla);
			
		}
	}

	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}

}

?>