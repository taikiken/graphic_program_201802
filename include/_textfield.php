<?php 

if($q->get_file()!=2){
	
	$HEADERFLAG=0;
	$class=str_replace(",","",$f_name);
	
	if(!$_BILL){
		if(($q->get_dir()==0||$q->get_dir()==1||$q->get_dir()==4)&&$q->get_file()==0){
			makeTextfieldCell($class,$d_name,array($f_name,$_OPTION,$SIZE,$_OP01,$_OP02,$_OP03,$_OP04,$_OP05),$_COMMENT,0);
		}else{
			if($q->get_dir()==2){
				if($q->get_file()==0)$sv=$p;elseif($q->get_file()==1)$sv=$_POST;
			}
			makeTextfieldConf($f_name,$_OPTION,$SIZE,$q->get_dir()!=2?"p_":"",$sv,$class,$d_name,0,$_COMMENT);
		}
	}else{
		if(($q->get_dir()==0||$q->get_dir()==1||$q->get_dir()==4)&&$q->get_file()==0){
			makeTextfieldCell($class,$d_name,array($f_name,$_OPTION,$SIZE,$_OP01,$_OP02,$_OP03,$_OP04,$_OP05),$_COMMENT,1);
		}else{
			if($q->get_dir()==2){
				if($q->get_file()==0)$sv=$p;elseif($q->get_file()==1)$sv=$_POST;
			}
			makeTextfieldConf($f_name,$_OPTION,$SIZE,$q->get_dir()!=2?"p_":"",$sv,$class,$d_name,1,$_COMMENT);
		}
	}
}

?>