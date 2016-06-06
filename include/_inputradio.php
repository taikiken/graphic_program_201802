<?php 

if($q->get_file()==0){
	$l="";
	for($i=0;$i<count($SIZE);$i++){
		$l.=sprintf("<input type=\"radio\" name=\"p_%s\" value=\"%s\" id=\"%s%s\"%s><label for=\"%s%s\">%s</label>",$f_name,$i,$f_name,$i,$p[$f_name]==$i?" checked=\"checked\"":"",$f_name,$i,$SIZE[$i]);
	}
	echo sprintf("<tr class=\"%s\"><td class=\"inputTitle\">%s</td><td class=\"inputFields p10\">%s</td></tr>",$f_name,$d_name,$l);
}elseif($q->get_file()==1){
	echo sprintf("<tr class=\"%s\"><td class=\"confTitle\">%s</td><td class=\"confFields\">%s</td></tr>",$f_name,$d_name,$SIZE[$sv["p_".$f_name]]);
}

?>