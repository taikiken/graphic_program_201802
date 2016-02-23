<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

$sql="select id,name,name_e,yobi from pm_ where cid=20 and flag=1 and id<130 order by id desc";
$o->query($sql);
while($f=$o->fetch_array()){
	$sw=strlen($f["yobi"])>0?@explode(",",$f["yobi"]):array();
	$sw[]=$f["name"];
	$r[]=array($f["id"],$sw,$f["name"]);
	$R[]=$f["name"];
	$R[]=$f["name_e"];
}

function categorymatching($r,$k){
	
	$exword=$r;
	$exword[]="スポーツ";
	$exword[]="sports";
	$exword[]="battle";
	$exword[]="バトル";
	$exword[]="一般スポーツ";
	$exword[]="その他";
	$exword[]="ニュース";
	$exword[]="国内・海外・その他";
	$exword[]="格闘技";
	$exword[]="陸上";
	$exword[]="ウインタースポーツ";
	
	$k=explode(",",$k);
	$w=array();
	
	for($i=0;$i<count($k);$i++){
		$d=trim($k[$i]);
		if(strlen($d)>0){
			$w[]=$d;
			for($j=0;$j<count($exword);$j++){
				if($d==$exword[$j]){
					array_pop($w);
					break;
				}
			}
		}
	}
	
	return $w;
	
}

function get_index(){
	
	$xml="http://delivery.nikkansports.com/xml/flash/baseball/bb.rdf
	http://delivery.nikkansports.com/xml/flash/soccer/sc.rdf
	http://delivery.nikkansports.com/xml/flash/sports/sp.rdf
	http://delivery.nikkansports.com/xml/flash/battle/bt.rdf
	http://delivery.nikkansports.com/xml/paper/baseball/bb.rdf
	http://delivery.nikkansports.com/xml/paper/soccer/sc.rdf
	http://delivery.nikkansports.com/xml/paper/sports/sp.rdf
	http://delivery.nikkansports.com/xml/paper/battle/bt.rdf";
	$xml=explode("\n",$xml);


	for($i=0;$i<count($xml);$i++){
		
		$x=simplexml_load_file(trim($xml[$i]));
		$nameSpaces=$x->getNamespaces(true);
		$item=$x->channel->items;
		$gNode=$item->children($nameSpaces['rdf'])->Seq->li;
		
		foreach($gNode as $t){
			$u[]=(string)$t["resource"];
		}
	}
	return $u;
}

function get_data($xml){
	
	for($i=0;$i<count($xml);$i++){
		$p=simplexml_load_file($xml[$i]);
		$p=json_decode(json_encode($p),TRUE);
		$data[]=$p;
	}
	return $data;
}

$xml=get_index();
$data=get_data($xml);

for($i=0;$i<count($data);$i++){
	
	unset($s);
	unset($k);
	
	$s["title"]=$data[$i]["headline"];
	$s["t9"]=$data[$i]["url"];
	$s["t7"]=$data[$i]["id"];
	
	if(strlen($data[$i]["genre"])>0)$k[]=$data[$i]["genre"];
	if(strlen($data[$i]["theme"])>0)$k[]=$data[$i]["theme"];
	if(strlen($data[$i]["topic"])>0)$k[]=$data[$i]["topic"];
	$k=implode(",",$k);
	
	$s["keyword"]=$k;
	$s["m1"]=categorysearch($r,$k);
	$s["body"]=sprintf("<p>%s</p>",implode("</p><p>",$data[$i]["content"]["p"]));
	
	$s["m_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["date"]));
	if(strlen($data[$i]["update"])>0)$s["u_time"]=date("Y-m-d H:i:s",strtotime($data[$i]["update"]));
	
	if($data[$i]["photo"]!="none"){
		$s["t30"]=str_replace(sprintf("%s.xml",$data[$i]["id"]),"",$xml[$i]).$data[$i]["photo"];
		$s["t1"]=$data[$i]["caption"];
	}
	
	$tag=categorymatching($R,$k);
	if(count($tag)>0){
		for($cnt=0;$cnt<count($tag);$cnt++){
			$s["t1".$cnt]=esc($tag[$cnt]);
		}
	}

	$sql=sprintf("select * from repo_n where t7='%s'",$data[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	if(strlen($f["id"])>0){

		if($s["u_time"]!=$f["u_time"]){
			if(strlen($s["t30"])>0){
				$s["img1"]=outimg($s["t30"]);
			}else{
				$s["img1"]="";
				$s["t1"]="";
			}
			splittime($s["m_time"],$s["u_time"]);
			$sqla[]=makesql($s,$f["id"]);
		}

	}else{
			
		$s["d1"]=3;
		$s["d2"]=2; /* 日刊スポーツ */
		$s["m4"]=$data[$i]["media"]=="flash"?131:132; /* 速報 */
		$s["flag"]=1;
		$s["cid"]=1;
		$s["n"]="(select max(n)+1 from repo_n where cid=1)";
		//$s["id"]="(select max(id)+1 from repo_n)";
		if(strlen($s["t30"])>0)$s["img1"]=outimg($s["t30"]);
		splittime($s["m_time"],$s["u_time"]);
		$sqla[]=makesql($s,0);
		
	}

		
}

$sqla=implode("\n",$sqla);
$o->query($sqla);

?>