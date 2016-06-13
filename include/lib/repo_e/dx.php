<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%sindex_s.php\">%s</a></li>",$ADPATH,"メインメニュー");

if(isset($_GET["qid"])){

	$sql=sprintf("select name,directory,querystring from repo where id=%s",$_GET["qid"]);
	$o->query($sql);
	$f=$o->fetch_array();

	$DIRECTORY=$f["directory"];
	$PARENT.=mod_HTML($f["name"]);
	$l[]=sprintf("<li><a href=\"%srepo_s/?rid=%s\">%s</a></li>",$ADPATH,$_GET["qid"],mod_HTML($f["name"]));

	$sql=sprintf("select name from repo where id=%s",$_GET["rid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$PARENT.=" ＞ ".mod_HTML($f["name"]);
	$l[]=sprintf("<li><a href=\"%srepo_s/?rid=%s&cid=%s\">%s</a></li>",$ADPATH,$_GET["rid"],$_GET["qid"],mod_HTML($f["name"]));
	$PARENT.=" ＞ ";

}elseif(isset($_GET["rid"])){

	$sql=sprintf("select name,directory,querystring from repo where id=%s",$_GET["rid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$DIRECTORY=$f["directory"];
	$PARENT.=mod_HTML($f["name"]);
	$l[]=sprintf("<li><a href=\"%srepo_s/?rid=%s\">%s</a></li>",$ADPATH,$_GET["rid"],mod_HTML($f["name"]));
	$PARENT.=" ＞ ";
	
	$sql=sprintf("select t1 from repo where id=%s",$_GET["cid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
}else{

	$sql=sprintf("select directory,querystring from repo where id=%s",$_GET["cid"]);
	$o->query($sql);
	$f=$o->fetch_array();
	$DIRECTORY=$f["directory"];	
	$PREVIEW=str_replace("{id}",$_GET["nid"],$DIRECTORY);
}

$sql=sprintf("select name from repo where id=%s",$_GET["cid"]);
$o->query($sql);
$f=$o->fetch_array();
$PARENT=mod_HTML($f["name"]);

if(count($l)==3){
	$l[]=sprintf("<li><a href=\"%srepo_n/?qid=%s&rid=%s&cid=%s\">%s</a></li>",$ADPATH,$_GET["qid"],$_GET["rid"],$_GET["cid"],mod_HTML($f["name"]));
}elseif(count($l)==2){
	$l[]=sprintf("<li><a href=\"%srepo_n/?rid=%s&cid=%s\">%s</a></li>",$ADPATH,$_GET["rid"],$_GET["cid"],mod_HTML($f["name"]));
}else{
	$l[]=sprintf("<li><a href=\"%srepo_n/?cid=%s\">%s</a></li>",$ADPATH,$_GET["cid"],mod_HTML($f["name"]));
}

$sql=sprintf("select id,%s,cid,t1 from repo_n where id=%s",multiLangTitleField("title"),$g->f("nid"));
$o->query($sql);
$f=$o->fetch_array();

$PAGEINFO=$f;
$PARENT=strlen($PAGEINFO["title"])>0?$PAGEINFO["title"]:mod_HTML($PAGEINFO[multiLangTitle("title")]);
if($q->get_dir()==3){
	$l[]=sprintf("<li>%s</li>",$PARENT);
}else{
	if(count($l)==4){
		$l[]=sprintf("<li><a href=\"%srepo_e/?nid=%s&qid=%s&rid=%s&cid=%s%s\">%s</a></li>",$ADPATH,$_GET["nid"],$_GET["qid"],$_GET["rid"],$_GET["cid"],$_GET["ad"]==1?"&ad=1":"",$PARENT);
	}elseif(count($l)==3){
		$l[]=sprintf("<li><a href=\"%srepo_e/?nid=%s&rid=%s&cid=%s%s\">%s</a></li>",$ADPATH,$_GET["nid"],$_GET["rid"],$_GET["cid"],$_GET["ad"]==1?"&ad=1":"",$PARENT);
	}else{
		$l[]=sprintf("<li><a href=\"%srepo_e/?nid=%s&cid=%s%s\">%s</a></li>",$ADPATH,$_GET["nid"],$_GET["cid"],$_GET["ad"]==1?"&ad=1":"",$PARENT);
	}
}

if(isset($_GET["rid"])){
	$PREVIEW=dir_match($DIRECTORY,$PAGEINFO);
}

$THIS="ページブロック";
$EDITDELETEINITIAL="e";


?>