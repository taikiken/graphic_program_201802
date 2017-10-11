<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

/*

チェックツール
http://validator.engine.smartnews.be/url
https://sportsbull.jp/feed/big6.xml

*/

function modbody($s){
	$s=preg_replace('#<div.*?>#mis','',$s);
	$s=preg_replace('#</div>#mis','',$s);
	$s=preg_replace("#\n#","",$s);
	
	preg_match_all('#(<img src="/prg_img/img/img([0-9]+).([a-zA-Z]+)">)(<span>([^>]+)</span>)#msi',$s,$m);
	for($i=0;$i<count($m[0]);$i++){
		$s=str_replace($m[0][$i],sprintf("<figure>%s<figurecaption>%s</figurecaption></figure>",str_replace("/prg_img/","https://img.sportsbull.jp/",$m[1][$i]),$m[5][$i]),$s);
	}
	
	preg_match_all('#(<img src="/prg_img/img/img([0-9]+).([a-zA-Z]+)">)#msi',$s,$m);
	for($i=0;$i<count($m[0]);$i++){
		$s=str_replace($m[0][$i],sprintf("<figure>%s</figure>",str_replace("/prg_img/","https://img.sportsbull.jp/",$m[1][$i])),$s);
	}
	
	return $s;
}

function maketag($s){
	$a=array();
	for($i=0;$i<count($s);$i++){
		if(strlen($s[$i])>0)$a[]=$s[$i];
	}
	return implode(",",$a);
}

$container=sprintf("<?xml version=\"1.0\" encoding=\"utf-8\"?>
<rss version=\"2.0\" xmlns:content=\"http://purl.org/rss/1.0/modules/content/\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:media=\"http://search.yahoo.com/mrss/\" xmlns:snf=\"http://www.smartnews.be/snf\">
<channel>
<title>BIG6.TV on SPORTS BULL</title>
<link>https://sportsbull.jp/category/big6tv/</link>
<description>無料ライブ配信サービス「BIG6.TV」東京六大学野球 春季・秋季リーグ戦全試合を無料でインターネット配信。5月27、28日早慶戦。</description>
<ttl>15</ttl>
<snf:logo><url>https://sportsbull.jp/_/big6tv/SmartNews/logo_700_100.png</url></snf:logo>
<language>ja</language>
<copyright></copyright>
<pubDate>%s</pubDate>
%s
</channel>
</rss>",date(DATE_RFC2822,strtotime(date("Y-m-d H:i:s"))),"%s");

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
flag=1 and m1=151 and swf is null and m_time > now()-interval '2 week' order by u_time desc
";

//指定されたメディアのみ除外する
//and d2!=42


$o->query($sql);
while($f=$o->fetch_array()){

	$item[]=sprintf('<item>
		<title>%s</title>
		<link>https://sportsbull.jp/p/%s/</link>
		<guid>https://sportsbull.jp/p/%s/</guid>
		<content:encoded><![CDATA[
			%s
		]]></content:encoded>
		<category>%s</category>
		<media:thumbnail url="%s" />
		<media:status>%s</media:status>
		<dc:creator>%s</dc:creator>
		<dc:language>ja</dc:language>
		<pubDate>%s</pubDate>
		<snf:advertisement>
			<snf:sponsoredLink link="https://sportsbull.jp/category/big6tv/" thumbnail="https://sportsbull.jp/_/big6tv/SmartNews/sn_banner.png" title="5月27日-28日 伝統の慶早戦を無料ライブ配信" advertiser="BIG6.TV on SPORTS BULL" />
		</snf:advertisement>
		<snf:analytics><![CDATA[
			<script>
			(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');
			
			ga(\'create\', \'UA-74679267-1\', \'https://sportsbull.jp\');
			ga(\'require\', \'displayfeatures\');
			ga(\'set\', \'referrer\', \'http://www.smartnews.com/\');
			ga(\'send\', \'pageview\', \'/p/%s/\');
			</script>
		]]></snf:analytics>
	</item>',
	htmlspecialchars($f["title"]),
	$f["id"],
	$f["id"],
	modbody($f["body"]),
	maketag(array($f["t10"],$f["t11"],$f["t12"],$f["t13"],$f["t14"],$f["t15"])),
	strlen($f["img1"])?sprintf("%s/raw/%s",$ImgPath,$f["img1"],mod_HTML($f["t1"])):sprintf("https://img.sportsbull.jp/raw/%s",sprintf("0%s.jpg",$f["id"]%7+1)),
	$f["flag"]==1?"active":"deleted",
	$f["media"],
	date(DATE_RFC2822,strtotime($f["m_time"])),
	$f["id"]
	);

}

file_put_contents(sprintf("%s/feed/big6.xml",$SERVERPATH),sprintf($container,implode("\n",$item)));

?>