<?php

include "local.php";
include "public/import.php";

$o=new db;
$o->connect();

$bucketName="wowow";
$mediaid=11;
$imgpath="https://video.sportsbull.jp";

$sql="select t1.id,t1.filename,t2.id as uid,t2.img1 from (select id,filename from u_encoded where bucket='wowow'    and flag=1) as t1 left join (select id,swf,img1 from repo_n where d2=11 and flag!=1) as t2 on t1.filename=t2.swf";
$o->query($sql);
while($f=$o->fetch_array()){
	
	$img=strlen($f["img1"])==0?sprintf(",img1='%s'",outimg(sprintf("%s/%s/%s/%s.jpg",$imgpath,$bucketName,$f["filename"],$f["filename"]))):"";	
	$s[]=sprintf("update repo_n set flag=1,u_time=now()%s where id=%s;",$img,$f["uid"]);
	$s[]=sprintf("update u_encoded set flag=0,u_time=now() where id=%s;",$f["id"]);
}

$s=implode("\n",$s);
$o->query($s);

?>