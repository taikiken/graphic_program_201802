<?php if($III!=0&&$q->get_file()!==2&&$HEADERFLAG!=1){ ?>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<?php } ?>
<?php 

$HEADERFLAG=0;

if(!$_BILL){
	if($q->get_dir()==0||$q->get_dir()==1){
		if($q->get_file()==0){
			echo echoCellField($d_name,makePullMenus($f_name,$SIZE,$d_name,$_OPTION,$p,"","",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05),strlen($_COMMENT)>0?$_COMMENT:"",0);
		}elseif($q->get_file()==1){
			echo echoCellField($d_name,echoPullMenu($f_name,$SIZE,$d_name,$_OPTION,$sv,"p_",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05));
		}
	}elseif($q->get_dir()==2){
		if($q->get_file()==0){
			echo echoCellField($d_name,echoPullMenu($f_name,$SIZE,$d_name,$_OPTION,$p,""));
		}elseif($q->get_file()==1){
			echo echoCellField($d_name,echoPullMenu($f_name,$SIZE,$d_name,$_OPTION,$_POST,""));
		}
	}
}else{

	$tlt ="<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"billingualTable\"><tr><th class=\"japTitle\"><img src=\"/shared/cms/img/jp.png\" width=\"16\" height=\"11\" alt=\"日本語\" >日本語</th>";
	$tlt.="<th class=\"engTitle\"><img src=\"/shared/cms/img/us.png\" width=\"16\" height=\"11\" alt=\"英語\" >英語</th></tr><tr><td class=\"japanese\">%s</td><td class=\"english\">%s</td></tr></table>";

	if($q->get_dir()==0||$q->get_dir()==1){

		if($q->get_file()==0){
			echo echoCellField(
				$d_name,
				sprintf(
					$tlt,
					makePullMenus($f_name,$SIZE,$d_name,$_OPTION,$p,"","",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05,""),
					makePullMenus($f_name,$SIZE,$d_name,$_OPTION,$p,"","",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05,"_e")
				),
				echoCommentGeneral($_COMMENT,$d_name,1),
				0
			);
		}elseif($q->get_file()==1){
			echo echoCellField(
				$d_name,
				sprintf(
					$tlt,
					echoPullMenu($f_name,$SIZE,$d_name,$_OPTION,$sv,"p_",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05,""),
					echoPullMenu($f_name,$SIZE,$d_name,$_OPTION,$sv,"p_",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05,"_e")
				)
			);
		}
	}elseif($q->get_dir()==2){
		if($q->get_file()==0){
			echo echoCellField(
				$d_name,
				sprintf(
					$tlt,
					echoPullMenu($f_name,$SIZE,$d_name,$_OPTION,$p,"",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05,""),
					echoPullMenu($f_name,$SIZE,$d_name,$_OPTION,$p,"",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05,"_e")
				)
			);
		}elseif($q->get_file()==1){
			echo echoCellField(
				$d_name,
				sprintf(
					$tlt,
					echoPullMenu($f_name,$SIZE,$d_name,$_OPTION,$_POST,"",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05,""),
					echoPullMenu($f_name,$SIZE,$d_name,$_OPTION,$_POST,"",$_OP01,$_OP02,$_OP03,$_OP04,$_OP05,"_e")
				)
			);
		}
	}
}

?>