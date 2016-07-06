<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

$uid=auth();
$id=bind($_REQUEST["id"]);
$f=set_article($id,$uid);

if($y["status"]["code"]===200){

	//媒体バナー - 後で消す
	if($f["userid"]==7||$f["userid"]==12){
		
		$sql=sprintf("select * from u_banner where cid=%s",$f["userid"]);
		$o->query($sql);
		$b=$o->fetch_array();
				
		if(strlen($b["pcimg"])>0||strlen($b["spimg"])>0){
			$banner["pc"]["text"]=$b["alt"];
			$banner["pc"]["image"]=strlen($b["pcimg"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$b["pcimg"]):"";
			$banner["pc"]["link"]=checkstr($b["pclink"]);
			$banner["sp"]["text"]=$b["alt"];
			$banner["sp"]["image"]=strlen($b["spimg"])>0?sprintf("%s/prg_img/img/%s",$ImgPath,$b["spimg"]):"";
			$banner["sp"]["link"]=checkstr($b["splink"]);
		}
	}else{
	  $banner["pc"]["text"]="";
	  $banner["pc"]["image"]="";
	  $banner["pc"]["link"]="";
	  $banner["sp"]["text"]="";
	  $banner["sp"]["image"]="";
	  $banner["sp"]["link"]="";	
	}

	$ad=get_advertise($f["m1"],$f["userid"],$f["id"]);
	$s=set_articleinfo($f,1);
	
	//ランキングは外部処理にしたい
	wlog($ACLOGTXT,array(strlen($f["m1"])>0?$f["m1"]:0,strlen($f["m2"])>0?$f["m2"]:0,$id,$s["media_type"]=="image"?0:1,date("Y-m-d H:i:s",strtotime($f["m_time"])),date("Y-m-d H:i:s")));

	$s["keywords"]=array();
	for($i=10;$i<=14;$i++)if(strlen($f["t".$i])>0)$s["keywords"][]=$f["t".$i];
	
	/*
	$sql=sprintf("select * from %s",sprintf($articletable,set_isbookmark($uid),sprintf(" and m1=%s order by m_time desc limit 4 offset 0",$f["m1"])));
	$o->query($sql);
	while($f=$o->fetch_array()){
		$s["related_articles"][]=set_articleinfo($f,1);
	}
	*/
	
	$ad_put=set_advertise($ad,"detail");
	$s=$s+$ad_put;
	unset($s["vast"]);
	unset($s["ad_urlpc"]);
	unset($s["ad_urlsp"]);

	
	$relatedposts=unserialize(file_get_contents(sprintf("%s/api/ver1/static/%s.dat",$SERVERPATH,$f["m1"])));
	$s["related_articles"]=!$relatedposts?array():$relatedposts;




 	// #860 - ダミー
 	if ( $s['categories'][0]['slug'] == 'crazy' ) :
 		
 		// とりあえずheadlineの内容返す
 		$sql=sprintf("select rt1.title as modtitle,rt2.%s from (select d2,title,n as sort from u_headline where cid=8 and flag=1) as rt1,(select %s from %s) as rt2 where rt1.d2=rt2.id order by sort limit %s offset %s",str_replace(",",",rt2.",$articlefield),$articlefield,sprintf($articletable,set_isbookmark($uid),""),5,0);
 		$o->query($sql);
 		while($f=$o->fetch_array()){
 			$s["recommend_articles"][]=set_articleinfo($f,1);
 		}
 
 	else :
 		
 		// crazy以外は空配列
 		$s["recommend_articles"] = array();
 
 	endif;
 
 


}else{
	$s=(object)$s;
}

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>