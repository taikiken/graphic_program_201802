<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%sindex_s.php\">%s</a></li>",$ADPATH,"メインメニュー");
$PARENT="マスタ管理";
$THIS="マスタ";
if($q->get_dir()==3){
	$l[]=sprintf("<li>%s</li>",$PARENT);
}else{
	$l[]=sprintf("<li><a href=\"%spm/\">%s</a></li>",$ADPATH,$PARENT);
	//$l[]=sprintf("<li>%s %s</li>",$THIS,$q->exe_fl());
}

?>