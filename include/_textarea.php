<?php 

if($III!=0&&$q->get_file()!==2&&$HEADERFLAG!=1)echo '<tr><td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td></tr>';
$HEADERFLAG=0;
$class=str_replace(",","",$f_name);

if($q->get_file()!=2){
	if(!$_BILL){
		if(($q->get_dir()==0||$q->get_dir()==1||$q->get_dir()==4)&&$q->get_file()==0){
			makeTextAreaCell($d_name,$f_name,$SIZE,$q->get_dir()!=4?$_OPTION:81,$_COMMENT,0);
		}else{
			if($q->get_dir()==2){
				if($q->get_file()==0)$sv=$p;
				elseif($q->get_file()==1)$sv=$_POST;
			}
			makeTextAreaConf($d_name,$f_name,$q->get_dir()!=2?"p_":"",$sv,0);
		}
	}else{
		if(($q->get_dir()==0||$q->get_dir()==1||$q->get_dir()==4)&&$q->get_file()==0){
			makeTextAreaCell($d_name,$f_name,$SIZE,$_OPTION,$_COMMENT,1);
		}else{
			if($q->get_dir()==2){
				if($q->get_file()==0)$sv=$p;
				elseif($q->get_file()==1)$sv=$_POST;
			}
			makeTextAreaConf($d_name,$f_name,$q->get_dir()!=2?"p_":"",$sv,1);
		}
	}
}

?>