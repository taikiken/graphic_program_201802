<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%sindex_s.php\">%s</a></li>",$ADPATH,"メインメニュー");
$l[]=sprintf("<li><a href=\"%smailtemplate/\">%s</a></li>",$ADPATH,"メールテンプレート");

$sql=sprintf("select subject from mailtemplate where id=%s",$g->f("cid"));
$o->query($sql);
$f=$o->fetch_array();

if($q->get_dir()==3){
	$l[]=sprintf("<li>%s</li>",mod_HTML($f["subject"]));
}else{
	$l[]=sprintf("<li><a href=\"%smail_template/?cid=%s\">%s</a></li>",$ADPATH,$g->f("cid"),mod_HTML($f["subject"]));
}
//$PARENT=sprintf("フォーム ＞ %s",mod_HTML($f["subject"]));
$PARENT=mod_HTML($f["subject"]);

$THIS="フォームブロック";

?>