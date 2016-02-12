<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%sindex_s.php\">%s</a></li>",$ADPATH,"メインメニュー");
$PARENT="セクション管理";
$THIS="セクション";
if($q->get_dir()==3){
	$l[]=sprintf("<li>%s</li>",$PARENT);
}else{
	$l[]=sprintf("<li><a href=\"%srepo/\">%s</a></li>",$ADPATH,$PARENT);
	//$l[]=sprintf("<li>%s</li>",$THIS);
}

?>