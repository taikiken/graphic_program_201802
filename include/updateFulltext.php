<?php

$sql=sprintf("select * from repo_e where nid=%s and flag=1 order by n",$g->f("nid"));
$o->query($sql);

while($f=$o->fetch_array()){

	if(strlen($f["title"])>0)$NTEXTJ[]=$f["title"];
	if(strlen($f["title_e"])>0)$NTEXTE[]=$f["title_e"];
	
	if(strlen($f["body"])>0)$NTEXTJ[]=$f["body"];
	if(strlen($f["body_e"])>0)$NTEXTE[]=$f["body_e"];

	if(strlen($f["alt0"])>0)$NTEXTJ[]=$f["alt0"];
	if(strlen($f["alt1"])>0)$NTEXTJ[]=$f["alt1"];
	if(strlen($f["alt0_e"])>0)$NTEXTE[]=$f["alt0_e"];
	if(strlen($f["alt1_e"])>0)$NTEXTE[]=$f["alt1_e"];

	if(strlen($f["img0copy"])>0)$NTEXTJ[]=$NTEXTE[]=$f["img0copy"];
	if(strlen($f["img1copy"])>0)$NTEXTJ[]=$NTEXTE[]=$f["img1copy"];
}

$NTEXTJ=(count($NTEXTJ)>0)?strip_tags(implode("\n",$NTEXTJ)):"";
$NTEXTE=(count($NTEXTE)>0)?strip_tags(implode("\n",$NTEXTE)):"";

$sql=sprintf("update repo_n set fulltext=%s,fulltext_e=%s,u_time=now() where id=%s",(strlen($NTEXTJ)>0)?sprintf("'%s'",addslashes($NTEXTJ)):"NULL",(strlen($NTEXTE)>0)?sprintf("'%s'",addslashes($NTEXTE)):"NULL",$g->f("nid"));
$o->query($sql);

?>