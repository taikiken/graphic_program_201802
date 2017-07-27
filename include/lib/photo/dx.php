<?php
$l[]=sprintf("<li class=\"root\"><a href=\"%s\">%s</a></li>",$ADPATH,"メインメニュー");

$CT=($q->get_dir()==1||$q->get_dir()==2)?$g->c(1):$g->c();
if(isset($_GET["no"]))$CT=$CT-1;
if($CT==1){
	$QS=$g->f("cid");
	$R=0;
	if($g->f("nid"))
    {
        $R = 2;
        $REPONNAME = mod_HTML('フォトアルバム');
    }
}elseif($CT==2){
	$QS=$g->f("rid");
	$R=1;

	$sql="select name from repo where id=1";
	
	$o->query($sql);
	$f=$o->fetch_array();
	
	$REPONNAME=mod_HTML($f["name"]);

}else{
	$QS=$g->f("qid");
	$R=2;

	$sql="select name from repo where id=1";
	
	$o->query($sql);
	$f=$o->fetch_array();
	
	$REPONNAME=mod_HTML('フォトアルバム');

	$sql="select name from repo where id=".$g->f("rid");
	
	$o->query($sql);
	$f=$o->fetch_array();
	$REPONNAME2=mod_HTML($f["name"]);
}

$sql=sprintf("select * from repo where id=%s",$QS);

$o->query($sql);
$f=$o->fetch_array();

$ROOTID=$f["id"];
$CONTENTSEDIT=$f["c_edit"];
$DIRECTORY=$f["directory"];
$DIRECTORY_E=$f["directory_e"];
$SEARCHFIELD=$f["searchfield"];
$SEARCHTARGET=$f["searchtarget"];
$SEARCHLAYOUT=$f["searchlayout"];

$COMMANDLISTEXP=$f["list2"];
$COMMANDPAGEEXP=$f["page2"];

$META=$f["meta"];
$SEARCHS=$f["search"];
$PAGEOPTION=$f["pageoption"];
$CATEGORYID=$QS;

if($R==0){
	$PARENT=mod_HTML($f["name"]);
	if($q->get_dir()==3){
		$l[]=sprintf("<li>%s</li>",mod_HTML($f["name"]));
	}else{
		$l[]=sprintf("<li><a href=\"%srepo_n/?cid=%s\">%s</a></li>",$ADPATH,$g->f("cid"),mod_HTML($f["name"]));
	}
}elseif($R==1){
	//$PARENT=mod_HTML($f["name"])." ＞ ".mod_HTML($f["t2"])." [ ".$REPONNAME." ] ";
	//$PARENT=mod_HTML($f["name"])." ＞ ".$REPONNAME;
	$l[]=sprintf("<li><a href=\"%srepo_s/?rid=%s\">%s</a></li>",$ADPATH,$g->f("rid"),mod_HTML($f["name"]));
	if($q->get_dir()==3){
		$l[]=sprintf("<li>%s</li>",$REPONNAME);
	}else{
		$l[]=sprintf("<li><a href=\"%srepo_n/?cid=%s&rid=%s\">%s</a></li>",$ADPATH,$g->f("cid"),$g->f("rid"),$REPONNAME);
	}
	$PARENT=$REPONNAME;
}else{
	//$PARENT=mod_HTML($f["name"])." ＞ ".mod_HTML($f["t2"])." [ ".$REPONNAME2." ] "." ＞ ".mod_HTML($f["t3"])." [ ".$REPONNAME." ] ";
	//$PARENT=mod_HTML($f["name"])." ＞ ".$REPONNAME2." ＞ ".$REPONNAME;
	$l[]=sprintf("<li><a href=\"%srepo_s/?rid=%s\">%s</a></li>",$ADPATH,$g->f("qid"),mod_HTML($f["name"]));
	$l[]=sprintf("<li><a href=\"%srepo_s/?cid=%s&rid=%s\">%s</a></li>",$ADPATH,$g->f("qid"),$g->f("rid"),$REPONNAME2);
	if($q->get_dir()==3){
		$l[]=sprintf("<li>%s</li>",$REPONNAME);
	}else{
		$l[]=sprintf("<li><a href=\"%srepo_n/?rid=%s&cid=%s&qid=%s\">%s</a></li>",$ADPATH,$g->f("rid"),$g->f("cid"),$g->f("qid"),$REPONNAME);
	}
	$PARENT=$REPONNAME;
}

$THIS=mod_HTML($f["t1"]);

if($q->get_dir()!=3&&$q->get_dir()!=4){
	if($_POST["search"]==1){
		$l[]=sprintf("<li><a href=\"javascript:searchBack()\">検索結果</a></li>");	
	}
	//$l[]=sprintf("<li>%ss</li>",$THIS);
}
if($q->get_dir()==4){
	if($q->get_file()===0){
		$l[]=sprintf("<li>%s</li>","絞り込み検索");
	}else{
		$l[]=sprintf("<li><a href=\"javascript:go_back('.?%s')\">%s</a></li>",$g->g_url(),"絞り込み検索");
		$l[]=sprintf("<li>%s</li>","検索結果");
	}
}

$CNTPTN=0;
$EDITDELETEINITIAL="n";

?>