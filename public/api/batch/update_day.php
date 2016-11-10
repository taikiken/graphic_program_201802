<?php

include $INCLUDEPATH."local.php";
	
$o=new db;
$o->connect();

$sql[]="delete from u_reminder where regitime<now()-interval '1 day';";
$sql[]="update repo_n set flag=0,u_time=now() where d2=1 and m_time<now()-interval '1 year';";
$sql[]="update repo_n set flag=0,u_time=now() where d2=2 and m_time<now()-interval '40 day';";

$sql=implode("\n",$sql);
$o->query($sql);

$yesterday=strtotime('-3 day');
$imgpath=sprintf("%s/prg_img",$SERVERPATH);
$dir=array("raw","img","thumbnail1","thumbnail2");
for($i=0;$i<count($dir);$i++){
	$targetdir=sprintf("%s/%s",$imgpath,$dir[$i]);
	$path=dir($targetdir);
	while($fl=$path->read()){
		if($fl!="."&&$fl!=".."){
			$eimgpath=sprintf("%s/%s",$targetdir,$fl);
			if($yesterday>filemtime($eimgpath)){
				unlink($eimgpath);
			}
		}
	}
}
$targetdir=sprintf("%s/tmp",$imgpath);
$path=dir($targetdir);
while($fl=$path->read()){
	if($fl!="."&&$fl!=".."){
		$eimgpath=sprintf("%s/%s",$targetdir,$fl);
		unlink($eimgpath);
	}
}

?>