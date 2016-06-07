<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%sindex_s.php\">%s</a></li>",$ADPATH,"メインメニュー");
$l[]=sprintf("<li><a href=\"%stoolhead/\">%s</a></li>",$ADPATH,"管理画面パーツ管理");

$sql="select name from toolhead where id=".$g->f("cid");
$o->query($sql);
$f=$o->fetch_array();

if($q->get_dir()==3){
	$l[]=sprintf("<li>%s</li>",mod_HTML($f["name"]));
}else{
	$l[]=sprintf("<li><a href=\"%stool/?cid=%s\">%s</a></li>",$ADPATH,$g->f("cid"),mod_HTML($f["name"]));
	//$l[]=sprintf("<li>%s %s</li>",$THIS,$q->exe_fl());
}
//$PARENT=sprintf("マスタカテゴリ ＞ %s",mod_HTML($f["name"]));
$PARENT=mod_HTML($f["name"]);
$THIS="項目";

$EDITDELETEINITIAL="n";

?>