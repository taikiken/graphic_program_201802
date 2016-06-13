<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%sindex_s.php\">%s</a></li>",$ADPATH,"メインメニュー");
$l[]=sprintf("<li><a href=\"%srepo/\">%s</a></li>",$ADPATH,"管理カテゴリ");

$sql=sprintf("select name,c_flag,t1,t2,t3 from repo where id=%s",$g->f("cid"));
$o->query($sql);
$f=$o->fetch_array();
$EDITROOT=$f;

$THIS="管理項目ブロック";

if($EDITROOT["c_flag"]==1){
	$sql=sprintf("select id,c_flag from repo where rid=%s",$g->f("cid"));
	$o->query($sql);
	$f=$o->fetch_array();
	$DIRECTRYSBLOCK[]=array("rid",$EDITROOT["t2"]);
	if($f["c_flag"]==1){
		$DIRECTRYSBLOCK[]=array("pid",$EDITROOT["t3"]);
	}
}
$DIRECTRYSBLOCK[]=array("nid",$EDITROOT["t1"]);

if(count($DIRECTRYSBLOCK)==1){
	$LOCALLIST[]=sprintf("<li class=\"ds\"><a href=\"../repo_n/?cid=%s\">%s管理ページへ</a></li>",$g->f("cid"),$EDITROOT["name"]);
}else{
	$LOCALLIST[]=sprintf("<li class=\"ds\"><a href=\"../repo_s/?rid=%s\">%s管理ページへ</a></li>",$g->f("cid"),$EDITROOT["name"]);
}

for($i=0;$i<count($DIRECTRYSBLOCK);$i++){
	if($DIRECTRYSBLOCK[$i][0]==$g->f("directory")){
		$LOCALLIST[]=sprintf("<li class=\"da\"><a>%s</a></li>",$DIRECTRYSBLOCK[$i][1]);
		$CURRENTNAMES=$DIRECTRYSBLOCK[$i][1];
	}else{
		$LOCALLIST[]=sprintf("<li class=\"ds\"><a href=\"?%s&directory=%s\">%s</a></li>",$g->g_url("directory,id"),$DIRECTRYSBLOCK[$i][0],$DIRECTRYSBLOCK[$i][1]);
	}
}


$LOCALLIST=implode("\n",$LOCALLIST);
if($g->f("directory")=="rid")$CURRENTNAMES="第一階層-".$CURRENTNAMES;
elseif($g->f("directory")=="pid")$CURRENTNAMES="第二階層-".$CURRENTNAMES;
else $CURRENTNAMES="ページ-".$CURRENTNAMES;

if($q->get_dir()==3){
	$l[]=sprintf("<li>%s（%s）</li>",mod_HTML($EDITROOT["name"]),$CURRENTNAMES);
}else{
	$l[]=sprintf("<li><a href=\"%srepo_edit/?%s\">%s（%s）</a></li>",$ADPATH,$g->g_url("id,c"),mod_HTML($EDITROOT["name"]),$CURRENTNAMES);
	//$l[]=sprintf("<li>%s</li>",$THIS);
}
$PARENT=sprintf("%s（%s）",mod_HTML($EDITROOT["name"]),$CURRENTNAMES);

?>