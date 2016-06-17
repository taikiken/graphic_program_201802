<?php

include $INCLUDEPATH."local.php";

$o=new db;
$o->connect();

$container="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\" xmlns:video=\"http://www.google.com/schemas/sitemap-video/1.1\">\n%s</urlset>";

$u="";
$u.="<url>\n"; 
$u.=sprintf("<loc>%s/</loc>\n",$domain);
$u.=sprintf("<lastmod>%s</lastmod>\n",date("r"));
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
	$u1.=sprintf("<lastmod>%s</lastmod>\n",date("r",strtotime($p[$i]["u_time"])));
	$u1.="<changefreq>hiourly</changefreq>\n";
	$u1.="<priority>0.7</priority>\n";
	$u1.="</url>\n";
	
	$sql=sprintf("select id,u_time,img1,t1 from repo_n where flag=1 and m1=%s order by u_time desc",$p[$i]["m1"]);
	$o->query($sql);
	while($f=$o->fetch_array()){
		$u1.="<url>\n"; 
		$u1.=sprintf("<loc>%s/p/%s</loc>\n",$domain,$f["id"]);
		$u1.=sprintf("<lastmod>%s</lastmod>\n",date("r",strtotime($f["u_time"])));
		if(!preg_match("/^http/",$f["img1"])&&strlen($f["img1"])>0)$u1.=sprintf("<image:image><image:loc>%s/prg_img/raw/%s</image:loc><image:caption>%s</image:caption></image:image>",$domain,$f["img1"],htmlspecialchars($f["t1"]));
		$u1.="</url>\n";
	}
	
	file_put_contents(sprintf("%s/api/ver1/static/sitemap/%s.xml",$SERVERPATH,$p[$i]["name_e"]),sprintf($container,$u1));
	
	$u.="<url>\n"; 
	$u.=sprintf("<loc>%s/api/ver1/static/sitemap/%s.xml</loc>\n",$domain,$p[$i]["name_e"]);
	$u.=sprintf("<lastmod>%s</lastmod>\n",date("r",strtotime($p[$i]["u_time"])));
	$u.="</url>\n";
}

file_put_contents(sprintf("%s/sitemap.xml",$SERVERPATH),sprintf($container,$u));

?>