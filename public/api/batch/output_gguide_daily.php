<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$o=new db;
$o->connect();

$sql=sprintf("update repo_n set flag=0 where flag=1 and d2=43 and m_time< '%s 04:00:00'",date("Y-m-d"));
$o->query($sql);

$rssfile="https://dev-img.sportsbull.jp/xml/tv_guide.xml";
$xml=get_contents($rssfile);
$data=simplexml_load_string($xml,'SimpleXMLElement',LIBXML_NOCDATA);
$data=json_decode(json_encode($data),TRUE);
$articles=$data["articles"]["article"];
$banner=$data["banners"]["banner"];
if($banner["img"]){
	$banners[]=$banner;
}

for($i=0;$i<count($articles);$i++){
	
	$sql=sprintf("select id,m_time,t10,img1,title from repo_n where id=%s",$articles[$i]["id"]);
	$o->query($sql);
	$f=$o->fetch_array();

	$p1[]=array(	
		"time"=>date("H:i",strtotime($f["m_time"])),
		"channel"=>$f["t10"],
		"title"=>$f["title"],
		"img"=>$articles[$i]["@attributes"]["ad"]=="true"?sprintf("%s/thumbnail1/0%s.jpg",$ImgPath,$f["id"]%7+1):"",
		"link"=>sprintf("%s/p/%s/",$domain,$f["id"])
	);	
}

for($i=0;$i<count($banners);$i++){
	$p2[]=array(
		"src"=>$banners[$i]["img"],
		"link"=>$banners[$i]["url"]
	);
}

$y=array();
$y["response"]["date"]=$data["articles"]["@attributes"]["date"];
$y["response"]["banner"]=$p2;
$y["response"]["program"]=$p1;
$file="../ver1/static/gguide.json";
file_put_contents($file,json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

/*

$o=new db;
$o->connect();

$sql="update repo_n set flag=0 where flag=1 and d2=43 and m_time::date=current_date-1";
$o->query($sql);

$sql="select id,m_time,t10,img1,title from repo_n where t9 like '%siType=3%' and m_time>='2017-04-15 05:00:00' and m_time<='2017-04-16 04:00:00' order by m_time limit 30 offset 0";
$o->query($sql);
while($f=$o->fetch_array()){
	$p[]=array(	
		"time"=>$data["articles"]["@attributes"]["date"],
		"channel"=>$f["t10"],
		"title"=>$f["title"],
		"img"=>sprintf("%s/thumbnail1/0%s.jpg",$ImgPath,$f["id"]%7+1),
		"link"=>sprintf("%s/p/%s/",$domain,$f["id"])
	);
}

$y=array();
$y["response"]["date"]=date("n/j");
$y["response"]["program"]=$p;
$file="../ver1/static/gguide.json";
file_put_contents($file,json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

*/

?>
<!DOCTYPE html>
<html class="hanasekki-page-Frame" lang="ja">
<head>
  <meta charset="utf-8">
  <title>BULL'Sピックアップ番組表 手動取り込み | SPORTS BULL</title>
  <meta name="viewport" content="width=device-width">
  <meta name="format-detection" content="telephone=no,address=no,email=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="imagetoolbar" content="no">
  <style>
    body {
      margin: 3em 2em;
      font-size: 13px;
    }
    pre {
      margin: 0;
      font-size: 100%;
      line-height: 1.5;
    }
  </style>
</head>
<body>
<pre>
media  : BULL'Sピックアップ番組表 
date   : <?=date("Y-m-d H:i:s")?>

result : <?=$data?"success":"error"?>


---
<?=date("n/j")?>の番組表を出力しました。
---

<a href="javascript:window.close();">閉じる</a>
</pre>
</body>
</html>