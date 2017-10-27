<?php

$l[]=sprintf("<li class=\"root\"><a href=\"%s\">%s</a></li>",$ADPATH,"メインメニュー");
if($q->get_dir()==4){
  $PARENT="コメント";
  $THIS="マスタ";
  if($q->get_dir()==3){
    $l[]=sprintf("<li>%s</li>",$PARENT);
  }else{
    $l[]=sprintf("<li><a href=\"%scomment/\">%s</a></li>",$ADPATH,$PARENT);
    //$l[]=sprintf("<li>%s %s</li>",$THIS,$q->exe_fl());
  }
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