<?php

include $INCLUDEPATH."local.php";
	
$o=new db;
$o->connect();

//リマインダの時間切れハッシュを削除する
$sql[]="delete from u_reminder where regitime<now()-interval '1 day';";
//朝日新聞の期限切れ記事を非公開に変更する
$sql[]="update repo_n set flag=0,u_time=now() where d2=1 and m_time<now()-interval '1 year';";
//日刊スポーツの期限切れ記事を非公開に変更する
$sql[]="update repo_n set flag=0,u_time=now() where d2=2 and m_time<now()-interval '40 day';";
//nordot,47newsの期限切れ記事を非公開に変更する
$sql[]="update repo_n set flag=0,u_time=now() where d2=61 and  flag=1 and  m_time < current_date - interval '30 day';";
//非公開になった記事のブックマークを削除する
$sql[]="update u_bookmark set flag=0 where flag=1 and (select flag from repo_n where id=pageid)=0;";

$sql=implode("\n",$sql);
$o->query($sql);

$yesterday=strtotime('-1 day');
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