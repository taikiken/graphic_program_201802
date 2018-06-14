<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$container=sprintf("<?xml version=\"1.0\" encoding=\"utf-8\"?>
<rss version=\"2.0\">
<channel>
<title>SPORTS BULL</title>
<link>https://sportsbull.jp/</link>
<description>話題のスポーツコンテンツが満載！ 国内外のスポーツに特化したニュースや動画をお届けします。</description>
<ttl>15</ttl>
<language>ja</language>
<copyright>Copyright &amp;copy; UNDO TSUSHIN inc. All rights reserved.</copyright>
<lastBuildDate>%s</lastBuildDate>
%s
</channel>
</rss>",date(DATE_RFC822,strtotime(date("Y-m-d H:i:s"))),"%s");

//サニタイズとデフォライズ
$offset = (int)$_GET["offset"];

$sql="
select
	id,
	title,
	(select body from repo_body where pid=repo_n.id) as body,
	m1,
	(select name from u_categories where id=repo_n.m1) as category1,
	m2,
	(select name from u_categories where id=repo_n.m2) as category2,
	d2,
	(select title from u_media where id=repo_n.d2) as media,
	t10,
	t11,
	t12,
	t13,
	t14,
	t15,
	img1,
	t1,
	m_time,
	u_time,
	flag
from repo_n
	where flag=1 order by u_time desc limit 100 offset {$offset}
";
//最初は全件出力後で1日に変更 and u_time > now() - interval '1 day'

$o->query($sql);

while($f=$o->fetch_array()){

	$item[]=sprintf('<item>
<title>%s</title>
<link>https://sportsbull.jp/p/%s/</link>
<guid>%s</guid>
%s
<media id="%s" title="%s" />
<description><![CDATA[ %s ]]></description>
<keyword>%s</keyword>%s
<status>%s</status>
<pubDate>%s</pubDate>
<lastUpdate>%s</lastUpdate>
</item>',
		htmlspecialchars($f["title"]),
		$f["id"],
		$f["id"],
		"<category id=\"{$f["m1"]}\" title=\"{$f["category1"]}\" />",
		$f["d2"],$f["media"],
		preg_replace("(\r|\n)","",$f["body"]),
		maketag(array($f["t10"],$f["t11"],$f["t12"],$f["t13"],$f["t14"],$f["t15"])),
		strlen($f["img1"])?sprintf("\n<enclosure url=\"%s/raw/%s\" type=\"image/jpeg\" caption=\"%s\" />",$ImgPath,$f["img1"],mod_HTML($f["t1"])):sprintf("\n<enclosure url=\"https://img.sportsbull.jp/raw/%s\" type=\"image/jpeg\" caption=\"SPORTS BULL\" />",sprintf("0%s.jpg",$f["id"]%7+1)),
		$f["flag"],
		date(DATE_RFC822,strtotime($f["m_time"])),
		date(DATE_RFC822,strtotime($f["u_time"]))
	);

}

function maketag($s){
	$a=array();
	for($i=0;$i<count($s);$i++){
		if(strlen($s[$i])>0)$a[]=$s[$i];
	}
	return implode(",",$a);
}

header("Content-Type:text/xml;");

echo sprintf($container,implode("\n",$item));
exit;


?>