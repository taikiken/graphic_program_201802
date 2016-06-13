<?php

$o=new db;
$o->connect();

$gpparam=$_GET["cid"];

if($gpparam==1){

	$sql=sprintf("select repo_n.id,repo_n.cid,repo_n.title,repo_n.body,repo_n.u_time,repo_n.t1,repo_n.t3,repo_n.t12,pm_.name,%s as u_time from repo_n,pm_ where repo_n.m1=pm_.id and repo_n.flag=1 and repo_n.u_time > now() - interval '1 month' order by repo_n.u_time desc %s",dbtm("repo_n.u_time"),dblm(0,15));
	$o->query($sql);

	while($f=$o->fetch_array()){
		$p[]=$f;
	}
	
	$LASTUPDATE=$p[$i]["u_time"];

	for($i=0;$i<count($p);$i++){
		$RSSDATA.="<item>\n";
		$RSSDATA.=sprintf("<title>%s[価格：%s万円-利回り：%s現況：%s所在地：%s]</title>\n",mod_HTML($p[$i]["title"]),number_format($p[$i]["t1"]),mod_HTML($p[$i]["t12"])."%",mod_HTML($p[$i]["name"]),mod_HTML(str_replace(array("\r\n","\n","\r"),"/",$p[$i]["t3"])));
		//$RSSDATA.=sprintf("<title>%s</title>\n",mod_HTML($p[$i]["title"]));	
		$RSSDATA.=sprintf("<link>http://%s/mansion/%s_%s.html</link>\n",$DOMAIN,urlencode($p[$i]["title"]),$p[$i]["id"]);
		$RSSDATA.=sprintf("<guid isPermaLink=\"true\">http://%s/mansion/%s_%s.html</guid>\n",$DOMAIN,urlencode($p[$i]["title"]),$p[$i]["id"]);
		$RSSDATA.=sprintf("<description><![CDATA[\n%s\n]]></description>\n",mod_HTML($p[$i]["body"]));
		$RSSDATA.=sprintf("<pubDate>%s</pubDate>\n",$p[$i]["u_time"]);
		$RSSDATA.="</item>\n";
	}
}


$l="";
$l.="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
$l.="<rss version=\"2.0\" \n";
$l.="  xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n";
$l.="  xmlns:sy=\"http://purl.org/rss/1.0/modules/syndication/\"\n";
$l.="  xmlns:admin=\"http://webns.net/mvcb/\"\n";
$l.="  xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n";
$l.="<channel>\n";
$l.=sprintf("<title>%s</title>\n",$SITE);
$l.=sprintf("<link>http://%s/</link>\n",$DOMAIN);
$l.=sprintf("<description>%s</description>\n",$DESCRIPTION);
$l.="<dc:language>ja</dc:language>\n";
$l.=sprintf("<dc:creator>%s</dc:creator>\n",$DOMAIN);
$l.=sprintf("<dc:date>%s</dc:date>\n",$LASTUPDATE);
$l.="<admin:generatorAgent rdf:resource=\"http://www.nomadstudio.jp/?=ZENv3.0.0\" >\n";
$l.=sprintf("<sy:updatePeriod>%s</sy:updatePeriod>\n",$RSSUPDATEPERIODE);
$l.=sprintf("<sy:updateFrequency>%s</sy:updateFrequency>\n",$RSSUPDATEFREQUENCY);
$l.=sprintf("<sy:updateBase>%s</sy:updateBase>\n",$RSSUPDATEBASE);
$l.=$RSSDATA;
$l.="</channel>\n";
$l.="</rss>";

?>