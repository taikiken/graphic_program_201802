<?php 

if($q->get_file()==0){
	$l="";
	for($i=0;$i<count($SIZE);$i++){
		$l.=sprintf("<input type=\"checkbox\" name=\"p_%s[]\" value=\"%s\" id=\"%s%s\"%s><label for=\"%s%s\">%s</label>",$f_name,$i,$f_name,$i,count($p[$f_name])>0&&in_array($i,is_array($p[$f_name])?$p[$f_name]:explode(",",$p[$f_name]))?" checked=\"checked\"":"",$f_name,$i,$SIZE[$i]);
	}
	echo sprintf("<tr class=\"%s\"><td class=\"inputTitle\">%s</td><td class=\"inputFields p10\">%s</td></tr>",$f_name,$d_name,$l);
}elseif($q->get_file()==1){
	
	if(count($sv["p_".$f_name])>0){
		$l=array();
		for($i=0;$i<count($sv["p_".$f_name]);$i++){
			$l[]=$SIZE[$sv["p_".$f_name][$i]];
		}
		$l=implode("、",$l);
	}else{
		$l="チェックなし";
	}
	echo sprintf("<tr class=\"%s\"><td class=\"confTitle\">%s</td><td class=\"confFields\">%s</td></tr>",$f_name,$d_name,$l);
}

?>