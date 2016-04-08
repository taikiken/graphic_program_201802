<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%sindex_s.php\">%s</a></li>",$ADPATH,"メインメニュー");
$PARENT="投稿者管理";
$THIS="投稿者";
if($q->get_dir()==3){
	$l[]=sprintf("<li>%s</li>",$PARENT);
}else{
	$l[]=sprintf("<li><a href=\"%sauthentic/\">%s</a></li>",$ADPATH,$PARENT);
	//$l[]=sprintf("<li>%s %s</li>",$THIS,$q->exe_fl());
}

?>