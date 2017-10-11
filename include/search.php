<?php


if(count($_POST)>0){

	while(list($k,$v)=each($_POST)){
		if(ereg("^p_",$k)){
			if(strlen($v)>0){
				$v=stripslashes($v);
				$v=str_replace("\r\n","",$v);
				$v=str_replace("\r","",$v);
				trim($v);
				$sv[$sn[]=$k]=$v;
				$v=addslashes($v);
				$QUERY[]=" ( ".ereg_replace("^p_","",$k)." like '%".$v."%' ) ";
			}
		}
	}

	if(count($QUERY)>0){
		$QUERY=implode("and",$QUERY);
		$QUERY=sprintf("( %s ) and ",$QUERY);
	}else{
		$QUERY="";
	}

	if(isset($_GET["qid"])){
		$wp=sprintf("( cid=%s and qid=%s )",$g->f("cid"),$g->f("rid"));
	}elseif(isset($_GET["rid"])){
		$wp=sprintf("( cid=%s and qid=%s )",$g->f("cid"),$g->f("rid"));
	}else{
		$wp=sprintf("( cid=%s )",$g->f("cid"));
	}
	$QUERY.=$wp;
	
	$sql=sprintf("select id,%s from %s where ( %s ) order by n",str_replace("\"","",$SEARCHFIELD),$TABLE,$QUERY);
	$o->query($sql);

	while($f=$o->fetch_array()){
		$p[]=$f;
	}
	
	$SEARCHRESULTCOUNT=count($p);
	$j=0;
	$SEARCHFIELD=explode("\"",$SEARCHFIELD);
	for($i=0;$i<count($SEARCHFIELD);$i++){
		if(strlen($SEARCHFIELD[$i])>0&&$SEARCHFIELD[$i]!=","){
			if(strpos($SEARCHFIELD[$i]," as ")>0){
				$e=explode(" as ",$SEARCHFIELD[$i]);
				$SEARCHFIELD[$i]=$e[1];
			}
			$sB[$j]=sprintf("\$%s",$SEARCHFIELD[$i]);
			$sF[$j]=$SEARCHFIELD[$i];
			$j++;
		}
		unset($e);
	}
	$SEARCHLAYOUT=explode("\n",$SEARCHLAYOUT);
	
	for($i=0;$i<count($p);$i++){
		if($CONTENTSEDIT!=1){
			$cHTML=sprintf("<tr>\n<th colspan=\"2\" class=\"resultTitle\"><a href=\"#\" onclick=\"go_back('../edit/?%s&nid=%s')\">%s</a></th>\n</tr>\n",$g->g_url(),$p[$i]["id"],$SEARCHLAYOUT[0]);
		}else{
			$cHTML=sprintf("<tr>\n<th colspan=\"2\" class=\"resultTitle\"><a href=\"#\" onclick=\"go_back('../../repo_e/?%s&nid=%s')\">%s</a></th>\n</tr>\n",$g->g_url(),$p[$i]["id"],$SEARCHLAYOUT[0]);
		}
		if(count($SEARCHLAYOUT)==3){
			$cHTML.=sprintf("<tr>\n<td colspan=\"2\" class=\"resultCont\"><b>%s</b><br >%s</td>\n</tr>\n",$SEARCHLAYOUT[1],$SEARCHLAYOUT[2]);
		}else{
			$cHTML.=sprintf("<tr>\n<td colspan=\"2\" class=\"resultCont\">%s</td>\n</tr>\n",$SEARCHLAYOUT[1]);
		}
		for($j=0;$j<count($sF);$j++){
			$sA[]=mod_HTML(mb_substr($p[$i][$sF[$j]],0,120));
		}
		$cHTML=str_replace($sB,$sA,$cHTML);
		unset($sA);
		$HTML.=$cHTML;
	}
}

?>