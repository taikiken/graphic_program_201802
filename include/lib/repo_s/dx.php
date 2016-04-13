<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%s\">%s</a></li>",$ADPATH,"メインメニュー");

if(!isset($_GET["cid"])){
	$sql=sprintf("select * from repo where id=%s",$g->f("rid"));
	$o->query($sql);
	$f=$o->fetch_array();
	$PARENT=mod_HTML($f["name"]);
	$CFLAG=$f["c_flag"];
	$CCFLAG=$f["cc_flag"];
	$CEDIT=$f["c_edit"];
	
	$DIRECTORY=$f["directory"];
	$DIRECTORY1=$f["directory1"];
	$DIRECTORY2=$f["directory2"];
	$DIRECTORY4=$f["directory4"];

	$DIRECTORY_E=$f["directory_e"];
	$DIRECTORY1_E=$f["directory1_e"];
	$DIRECTORY2_E=$f["directory2_e"];
	$DIRECTORY4_E=$f["directory4_e"];

	$COMMANDLISTEXP=$f["list0"];
	$COMMANDPAGEEXP=$f["page0"];

	$QS=$f["id"];
	$INDEX=$f["index"];
	$ROOT=mod_HTML($f["name"]);
	$THIS=mod_HTML($f["t2"]);
	if($q->get_dir()==3){
		$l[]=sprintf("<li>%s</li>",mod_HTML($f["name"]));
	}else{
		$l[]=sprintf("<li><a href=\"%srepo_s/?rid=%s\">%s</a></li>",$ADPATH,$g->f("rid"),mod_HTML($f["name"]));
	}
	
	$CNTPTN=1;
	if($g->f("rid")==2)$CNTPTN=3;
	
}else{
	$sql=sprintf("select * from repo where id=%s",$g->f("cid"));
	$o->query($sql);
	$f=$o->fetch_array();
	
	$THIS=mod_HTML($f["t3"]);
	
	$DIRECTORY=$f["directory"];
	$DIRECTORY1=$f["directory1"];
	$DIRECTORY2=$f["directory2"];
	$DIRECTORY4=$f["directory4"];

	$DIRECTORY_E=$f["directory_e"];
	$DIRECTORY1_E=$f["directory1_e"];
	$DIRECTORY2_E=$f["directory2_e"];
	$DIRECTORY4_E=$f["directory4_e"];

	$COMMANDLISTEXP=$f["list1"];
	$COMMANDPAGEEXP=$f["page1"];
	
	//$PARENT=$ROOT=mod_HTML($f["name"]);
	$QS=$f["id"];
	$INDEX=$f["index"];
	$l[]=sprintf("<li><a href=\"%srepo_s/?rid=%s\">%s</a></li>",$ADPATH,$g->f("cid"),mod_HTML($f["name"]));
	
	$sql=sprintf("select name,c_flag from repo where id=%s",$g->f("rid"));
	$o->query($sql);
	$f=$o->fetch_array();
	//$PARENT=$PARENT." ＞ ".mod_HTML($f["name"]);
	$PARENT=mod_HTML($f["name"]);
	$CFLAG=$f["c_flag"];
	if($q->get_dir()==3){
		$l[]=sprintf("<li>%s</li>",mod_HTML($f["name"]));
	}else{
		$l[]=sprintf("<li><a href=\"%srepo_s/?rid=%s&cid=%s\">%s</a></li>",$ADPATH,$g->f("rid"),$g->f("cid"),mod_HTML($f["name"]));
	}
	
	$CNTPTN=2;
	
}

//if($q->get_dir()!=3)$l[]=sprintf("<li>%s %s</li>",$THIS,$q->exe_fl());

$EDITDELETEINITIAL="";

?>