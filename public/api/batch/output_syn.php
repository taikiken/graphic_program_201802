<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$container=sprintf("<?xml version=\"1.0\" encoding=\"utf-8\"?>
<rss version=\"2.0\">
<channel>
<title>運動通信</title>
<link>https://www.undotsushin.com/</link>
<description>話題のスポーツコンテンツが満載！ 国内外のスポーツに特化したニュースや動画をお届けします。</description>
<ttl>15</ttl>
<language>ja</language>
<copyright>Copyright &amp;copy; UNDO TSUSHIN inc. All rights reserved.</copyright>
<lastBuildDate>%s</lastBuildDate>
%s
</channel>
</rss>",date(DATE_RFC822,strtotime(date("Y-m-d H:i:s"))),"%s");

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
	where
d2=1 and (m1=141 or m1=136 or m2=141 or m2=136) and u_time > now() - interval '1 day' order by u_time desc
";
$o->query($sql);

while($f=$o->fetch_array()){

$item[]=sprintf('<item>
<title>%s</title>
<link>https://www.undotsushin.com/p/%s/</link>
<guid>%s</guid>
%s
<media id="%s" title="%s" />
<description><![CDATA[ %s ]]></description>
<keyword>%s</keyword>%s
<status>%s</status>
<pubDate>%s</pubDate>
<lastUpdate>%s</lastUpdate>
</item>',
mod_HTML($f["title"]),
$f["id"],
$f["id"],
$f["m1"]!=141?sprintf("<category id=\"%s\" title=\"%s\" />",$f["m1"],$f["category1"]):sprintf("<category id=\"%s\" title=\"%s\" />\n<category id=\"141\" title=\"リオ五輪\" />",$f["m1"],$f["category1"]),
$f["d2"],$f["media"],
preg_replace("(\r|\n)","",$f["body"]),
maketag(array($f["t10"],$f["t11"],$f["t12"],$f["t13"],$f["t14"],$f["t15"])),
strlen($f["img1"])?sprintf("\n<enclosure url=\"https://www.undotsushin.com/prg_img/raw/%s\" type=\"image/jpeg\" caption=\"%s\" />",$f["img1"],mod_HTML($f["t1"])):sprintf("\n<enclosure url=\"https://www.undotsushin.com/prg_img/raw/%s\" type=\"image/jpeg\" caption=\"運動通信\" />",sprintf("0%s.jpg",$f["id"]%7+1)),
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

header('Content-Type: application/xml');
echo sprintf($container,implode("\n",$item));

/*

$u="";
$u.="<url>\n"; 
$u.=sprintf("<loc>%s/</loc>\n",$domain);
$u.=sprintf("<lastmod>%s</lastmod>\n",date("Y-m-d"));
$u.="<changefreq>always</changefreq>\n";
$u.="<priority>1</priority>\n";
$u.="</url>\n";

$sql="select m1,u_time,name_e from (select id,name_e from u_categories where flag=1) as t1,(select m1,max(u_time) as u_time from repo_n where flag=1 group by m1) as t2 where t1.id=t2.m1";
$o->query($sql);
while($f=$o->fetch_array()){
	$p[]=$f;
}

for($i=0;$i<count($p);$i++){
	
	$u1="";
	$u1.="<url>\n"; 
	$u1.=sprintf("<loc>%s/%s/</loc>\n",$domain,$p[$i]["name_e"]);
	$u1.=sprintf("<lastmod>%s</lastmod>\n",date("Y-m-d",strtotime($p[$i]["u_time"])));
	$u1.="<changefreq>hourly</changefreq>\n";
	$u1.="<priority>0.7</priority>\n";
	$u1.="</url>\n";
	
	$sql=sprintf("select id,u_time,img1,t1 from repo_n where flag=1 and m1=%s order by u_time desc",$p[$i]["m1"]);
	$o->query($sql);
	while($f=$o->fetch_array()){
		$u1.="<url>\n"; 
		$u1.=sprintf("<loc>%s/p/%s/</loc>\n",$domain,$f["id"]);
		$u1.=sprintf("<lastmod>%s</lastmod>\n",date("Y-m-d",strtotime($f["u_time"])));
		if(!preg_match("/^http/",$f["img1"])&&strlen($f["img1"])>0)$u1.=sprintf("<image:image><image:loc>%s/prg_img/raw/%s</image:loc><image:caption>%s</image:caption></image:image>",$domain,$f["img1"],htmlspecialchars($f["t1"]));
		$u1.="</url>\n";
	}
	
	file_put_contents(sprintf("%s/api/ver1/static/sitemap/%s.xml",$SERVERPATH,$p[$i]["name_e"]),sprintf($container,$u1));
	
	$u.="<url>\n"; 
	$u.=sprintf("<loc>%s/api/ver1/static/sitemap/%s.xml</loc>\n",$domain,$p[$i]["name_e"]);
	$u.=sprintf("<lastmod>%s</lastmod>\n",date("Y-m-d",strtotime($p[$i]["u_time"])));
	$u.="</url>\n";
}

file_put_contents(sprintf("%s/sitemap.xml",$SERVERPATH),sprintf($container,$u));

*/

?>