<?php

$STYLESHEET=array("CMS基本スタイルシート","フォームスタイルシート");

if($q->get_dir()===1){
	if($q->get_file()===0){

		if(strlen($g->f("c"))>0){
			$c=$g->f("c");
		}else{
			header("Location:.?c=0");
		}

		$fp=fopen(${"CSSFILE".$c},"r");
		while($f=fgets($fp,1024)){
			$EEE.=$f;
		}
		$p["style"]=$EEE;
		$p["FILENAME"]=$STYLESHEET[$g->f("c")];
		
	}elseif($q->get_file()===1){
		data_conf();
		$sv["p_FILENAME"]=$STYLESHEET[$g->f("c")];
	}elseif($q->get_file()===2){

		$c=$g->f("c");
		data_conf();
		$css_=$sv["p_style"];
		$fp=fopen(${"CSSFILE".$c},"w");
		fputs($fp,$css_);
		fclose($fp);

	}
}

$EDITDELETEINITIAL="";

?>