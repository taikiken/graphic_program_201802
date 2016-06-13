<?php 

$class=str_replace(",","",$f_name);

if($q->get_file()!=2){
  if(($q->get_dir()==0||$q->get_dir()==1||$q->get_dir()==4)&&$q->get_file()==0){
	  makeTable($d_name,$f_name,$SIZE,$_OPTION,$_COMMENT,1);
  }else{
	  if($q->get_dir()==2){
		  if($q->get_file()==0)$sv=$p;
		  elseif($q->get_file()==1)$sv=$_POST;
	  }
	  makeTableConf($d_name,$f_name,$q->get_dir()!=2?"p_":"",$sv,1);
  }
}

?>