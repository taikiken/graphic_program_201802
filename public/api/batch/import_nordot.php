<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$MEDIAID=61;
$MEDIANAME="nordot";
$bullid="262792796378236410";
$ID=isset($_GET["id"])?$_GET["id"]:3;

$area=array("北海道","東北","関東","北陸・甲信越","東海","関西","中国","四国","九州・沖縄");

function get_pref($media){
	$pref=array("北海道"=>"北海道","青森"=>"青森","岩手"=>"岩手","宮城"=>"宮城","秋田"=>"秋田","山形"=>"山形","福島"=>"福島","茨城"=>"茨城","栃木"=>"栃木","群馬"=>"群馬","埼玉"=>"埼玉","千葉"=>"千葉","東京"=>"東京","神奈川"=>"神奈川",
	"新潟"=>"新潟","富山"=>"富山","石川"=>"石川","福井"=>"福井","山梨"=>"山梨","長野"=>"長野","岐阜"=>"岐阜","静岡"=>"静岡","愛知"=>"愛知","三重"=>"三重","滋賀"=>"滋賀","京都"=>"京都","大阪"=>"大阪","兵庫"=>"兵庫","奈良"=>"奈良",
	"和歌山"=>"和歌山","鳥取"=>"鳥取","島根"=>"島根","岡山"=>"岡山","広島"=>"広島","山口"=>"山口","徳島"=>"徳島","香川"=>"香川","愛媛"=>"愛媛","高知"=>"高知","福岡"=>"福岡","佐賀"=>"佐賀","長崎"=>"長崎","熊本"=>"熊本","大分"=>"大分",
	"宮崎"=>"宮崎","鹿児島"=>"鹿児島","沖縄"=>"沖縄","とく島"=>"徳島","室蘭"=>"北海道","上毛"=>"群馬","琉球"=>"沖縄");
	foreach($pref as $k=>$v){
		if(preg_match("/".$k."/",$media)){
			return $v;
		}
	}
	return "";
}

$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264590665548414985
https://this.kiji.is/-/feed/posts/rss?source_id=264590406780076039
https://this.kiji.is/-/feed/posts/rss?source_id=265733930566303751
https://this.kiji.is/-/feed/posts/rss?source_id=265734344125171191
https://this.kiji.is/-/feed/posts/rss?source_id=267120765466509315";
$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264590909493379081
https://this.kiji.is/-/feed/posts/rss?source_id=264590798897954825
https://this.kiji.is/-/feed/posts/rss?source_id=265735739548616189
https://this.kiji.is/-/feed/posts/rss?source_id=265736511090869757
https://this.kiji.is/-/feed/posts/rss?source_id=265736680507621385";
$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264592086758342657
https://this.kiji.is/-/feed/posts/rss?source_id=264591966256709641
https://this.kiji.is/-/feed/posts/rss?source_id=265738197742272519
https://this.kiji.is/-/feed/posts/rss?source_id=265738490421084166
https://this.kiji.is/-/feed/posts/rss?source_id=265738806772073977";
$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264592342393733123
https://this.kiji.is/-/feed/posts/rss?source_id=264592201804644361
https://this.kiji.is/-/feed/posts/rss?source_id=265740118838935561
https://this.kiji.is/-/feed/posts/rss?source_id=267111635081789442
https://this.kiji.is/-/feed/posts/rss?source_id=267111855105476093";
$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264593507474112517
https://this.kiji.is/-/feed/posts/rss?source_id=264593392814407685
https://this.kiji.is/-/feed/posts/rss?source_id=267112302407239165
https://this.kiji.is/-/feed/posts/rss?source_id=267112446021518842
https://this.kiji.is/-/feed/posts/rss?source_id=267112640438222849";
$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264593744808689665
https://this.kiji.is/-/feed/posts/rss?source_id=264593631864455169
https://this.kiji.is/-/feed/posts/rss?source_id=267113134910490105
https://this.kiji.is/-/feed/posts/rss?source_id=267113294661682679
https://this.kiji.is/-/feed/posts/rss?source_id=267113415841285626";
$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264593906326667266
https://this.kiji.is/-/feed/posts/rss?source_id=264593829000970241
https://this.kiji.is/-/feed/posts/rss?source_id=267114778360725511
https://this.kiji.is/-/feed/posts/rss?source_id=267114905506891257
https://this.kiji.is/-/feed/posts/rss?source_id=267115034695254020";
$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=264594094978433031
https://this.kiji.is/-/feed/posts/rss?source_id=264593990162432002
https://this.kiji.is/-/feed/posts/rss?source_id=267116145230005753
https://this.kiji.is/-/feed/posts/rss?source_id=267116259583526393
https://this.kiji.is/-/feed/posts/rss?source_id=267116364816319989";
$rssfile[]="https://this.kiji.is/-/feed/posts/rss?source_id=267118626873902588
https://this.kiji.is/-/feed/posts/rss?source_id=267117732245880836
https://this.kiji.is/-/feed/posts/rss?source_id=267117874869339642
https://this.kiji.is/-/feed/posts/rss?source_id=267118011091977722
https://this.kiji.is/-/feed/posts/rss?source_id=267118156846777847";

$rss=explode("\n",$rssfile[$ID]);
$data["channel"]["item"]=array();
for($i=0;$i<count($rss);$i++){
	$xml=get_contents(trim($rss[$i]));
	$xml=str_replace(array("dc:","media:content"),array("","img"),$xml);
	$d=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
	$d=json_decode(json_encode($d),TRUE);
	for($j=0;$j<count($d["channel"]["item"]);$j++){
		$data["channel"]["item"][]=$d["channel"]["item"][$j];
	}
}

$o=new db;
$o->connect();

for($i=0;$i<count($data["channel"]["item"]);$i++){
	
	unset($s);
	
	if(is_array($data["channel"]["item"][$i]["description"]))continue;
	
	$s["title"]=$data["channel"]["item"][$i]["title"];
	$s["t9"]=sprintf("%s?c=%s",$data["channel"]["item"][$i]["link"],$bullid);
	$s["t7"]=$data["channel"]["item"][$i]["guid"];
	
	$modbody=preg_replace("/(\r|\n|\t)/","",$data["channel"]["item"][$i]["description"]);

	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["u_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	$s["a_time"]=date("Y-m-d H:i:s",strtotime($data["channel"]["item"][$i]["pubDate"]));
	
	if($data["channel"]["item"][$i]["img"]){
		$s["t30"]=$data["channel"]["item"][$i]["img"]["@attributes"]["url"];
	}
	$pref=$area[$ID]!="北海道"?get_pref($data["channel"]["item"][$i]["creator"]):"北海道";
	$s["t10"]=$data["channel"]["item"][$i]["creator"];
	$s["t11"]=$area[$ID];
	if($pref!="北海道"&&strlen($pref)>0)$s["t12"]=$pref;
	
	$sql=sprintf("select id,title,(select body from repo_body where pid=repo_n.id) as body from repo_n where cid=1 and d2=%s and t7='%s'",$MEDIAID,$s["t7"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	unset($sqla);
	
	if(strlen($f["id"])>0){
		if(!preg_match(sprintf("#%s#",$data["channel"]["item"][$i]["description"]),$f["body"])||$f["title"]!=$s["title"]){		
			if(strtotime($s["a_time"])>strtotime($f["a_time"])){
				if(!eximg(sprintf("%s/prg_img/raw/%s",$SERVERPATH,$f["img1"]),$s["t30"]))$s["img1"]=outimg($s["t30"]);
			}else{
				$s["img1"]="";
			}
			unset($s["m1"]);
			splittime($s["m_time"],$s["a_time"]);
			$sqla[]=makesql($s,$f["id"]);
			$sqla[]=sprintf("update repo_body set body='%s' where pid=%s;",pg_escape_string($modbody),$f["id"]);
		}
	}else{
		
		$TITLE[]=$s["title"];
		
		$s["d1"]=3;
		$s["d2"]=$MEDIAID;
		$s["m1"]=161;
		$s["flag"]=1;
		$s["cid"]=1;
		$s["n"]="(select max(n)+1 from repo_n where cid=1)";
		
		if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
		splittime($s["m_time"],$s["a_time"]);
		$sqla[]=makesql($s,0);
		$sqla[]=sprintf("insert into repo_body(pid,body) values(currval('repo_n_id_seq'),'%s');",pg_escape_string($modbody));
		$sqla[]=sprintf("insert into u_area(pageid,region,pref) values(currval('repo_n_id_seq'),'%s','%s');",$area[$ID],$pref);	
		
	}
	
	if($sqla){
		$sqla=implode("\n",$sqla);
		$o->query($sqla);
	}
}

include $INCLUDEPATH."public/display.php";

?>