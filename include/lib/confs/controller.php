<?php

$VARIABLE=array("SITE","SITE_e","KEYWORD","KEYWORD_e","DESCRIPTION","DESCRIPTION_e","IMGRESIZE","ADMINUSR","TRACKBACK","TRACKBACKNG","MAILFROM","PINGFLAG","PINGURL","MAILTO","TAGON","SORC","PAGEOFFSET","MAXFILESIZE","ALTDEFAULT","EDITCONFIGURATION_h1img","EDITCONFIGURATION_alimg","EDITCONFIGURATION_lrimg","RSSCATEGORIESN","RSSALLCATEGORYPAGESN");

if($q->get_dir()===1){
	if($q->get_file()===0){
		for($i=0;$i<count($VARIABLE);$i++){
			$p[$VARIABLE[$i]]=${$VARIABLE[$i]};
		}
		include $INCLUDEPATH."formback.php";
	}elseif($q->get_file()===1){
		data_conf();
	}elseif($q->get_file()===2){
		copy($INCLUDEPATH."conf/configExtend.php",sprintf("%sconf/configExtend%s.php",$INCLUDEPATH,date("YmdHis")));
		while(list($k,$v)=each($_POST)){
			if(ereg("^p_",$k)){
				$v=stripslashes($v);
				$v=str_replace("\r\n","\n",$v);
				$v=str_replace("\r","\n",$v);
				if(strlen($v)>0)$OT[]=sprintf("\$%s=%s;",ereg_replace("^p_","",$k),(isint($v))?$v:sprintf("\"%s\"",$v));
			}
		}
		$OT=implode("\n",$OT);
		$OT=sprintf("<?php\n\n%s\n\n?>",$OT);
		$fp=fopen($INCLUDEPATH."conf/configExtend.php","w");
		fputs($fp,$OT);
		$e=fclose($fp);
		$e=!$e;
	}
}

$EDITDELETEINITIAL="";

?>