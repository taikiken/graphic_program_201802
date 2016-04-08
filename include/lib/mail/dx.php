<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%sindex_s.php\">%s</a></li>",$ADPATH,"メインメニュー");
$PARENT="フォーム管理";
$THIS="フォーム";
if($q->get_dir()==3){
	$l[]=sprintf("<li>%s</li>",$PARENT);
}else{
	$l[]=sprintf("<li><a href=\"%smail/\">%s</a></li>",$ADPATH,$PARENT);
	//$l[]=sprintf("<li>%s %s</li>",$THIS,$q->exe_fl());
}

?>