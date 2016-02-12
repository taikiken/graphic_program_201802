<?php

$tugh=explode(",",$_OPTION);
$SizeOption=explode("-",$SIZE);
if(!isset($imgNo))$imgNo=0;
if($III!=0&&$q->get_file()!==2&&$HEADERFLAG!=1) echo "<tr><td colspan=\"2\" class=\"separator\"><img src=\"/shared/cms/img/spacer.gif\" height=\"1\" width=\"1\" alt=\"#\" ></td></tr>";
$HEADERFLAG=0;

if(($q->get_dir()==0||$q->get_dir()==1)&&$q->get_file()==0){

	if(strlen($p[$f_name])>0){
		echo sprintf("<tr><td class=\"inputTitle\">元%s</td><td class=\"inputFields\">",$d_name);
		if(strlen($_POST["o".$f_name])>0){
			echo rtimg($_OPTION,$_POST["o".$f_name],$IMG,$_POST["o".$f_name],$f_name,$p[$f_name."copy"],$SizeOption,$tugh,0);
		}elseif(strlen($p[$f_name])>0){
			echo rtimg($_OPTION,$p[$f_name],$IMG,$p[$f_name],$f_name,$p[$f_name."copy"],$SizeOption,$tugh,0);
		}
		echo sprintf("<div class=\"imgDelete\"><input name=\"d_%s\" type=\"checkbox\" id=\"d_%s\" value=\"1\" ><label for=\"d_%s\">削除する場合はチェックしてください</label></div></td></tr>",$f_name,$f_name,$f_name);
	}
	echo sprintf("<tr><td rowspan=\"2\" class=\"inputTitle\">%s</td><td class=\"inputFields\">",$d_name);
	if($_POST[$f_name]!=$p[$f_name]&&strlen($_POST[$f_name])>0)echo rtimg($_OPTION,$_POST[$f_name],$IMG,$_POST[$f_name],$f_name,$p[$f_name."copy"],$SizeOption,$tugh);
	echo sprintf("<table class=\"copyright\"><tr><td class=\"cell1\"><input name=\"%s\" type=\"file\" size=\"40\" class=\"ins files\" ><input type=\"hidden\" name=\"o%s\" value=\"%s\"></td></tr></table></td></tr>",$f_name,$f_name,$p[$f_name]);
	echo sprintf("<tr><td class=\"inputCap\">%s</td></tr>",makeComment($SIZE,$MAXFILESIZE,$COMMENT));
	
}elseif(($q->get_dir()==0||$q->get_dir()==1)&&$q->get_file()==2){
	if($q->get_dir()==0){
		if(strlen($_POST[$f_name])>0)$sv[$sn[]=$f_name]=sprintf("'%s'",$_POST[$f_name]);
	}elseif($q->get_dir()==1){
		if($_POST["d_".$f_name]==1)$sv[$sn[]=$f_name]="''";
		if(strlen($_POST[$f_name])>0)$sv[$sn[]=$f_name]=sprintf("'%s'",$_POST[$f_name]);
	}
}else{
	echo sprintf("<tr><td class=\"confTitle\">%s</td><td class=\"confFields\">",$d_name);
	if(($q->get_dir()==0||$q->get_dir()==1)&&$q->get_file()!=2){
		
		${$f_name}=chk_img($_FILES[$f_name],$SIZE,$sv["p_".$f_name."copy"],$_POST['o'.$f_name],$_POST["d_".$f_name]);
		if(strlen(${$f_name})>0){
			echo rtimg($_OPTION,${$f_name},$IMG,${$f_name},$f_name,$p[$f_name."copy"],$SizeOption,$tugh);
		}elseif(strlen($_POST[$f_name])>0){
			echo rtimg($_OPTION,$_POST[$f_name],$IMG,$_POST[$f_name],$f_name,$p[$f_name."copy"],$SizeOption,$tugh);
		}elseif(strlen($_POST['o'.$f_name])>0){
			if(strlen($_POST["d_".$f_name])==0){
				echo rtimg($_OPTION,$_POST['o'.$f_name],$IMG,$_POST['o'.$f_name],$f_name,$p[$f_name."copy"],$SizeOption,$tugh);
			}else{
				echo "画像なし";
				echo sprintf("<input type=\"hidden\" name=\"o%s\" value=\"%s\"><input type=\"hidden\" name=\"d_%s\" value=\"%s\">",$f_name,$_POST['o'.$f_name],$f_name,$_POST["d_".$f_name]);
			}
		}else{
			echo "画像アップロードなし";
		}
	
	}elseif($q->get_dir()==2){
		
		$POSTIMG=$q->get_file()==0?$p[$f_name]:$_POST[$f_name];
		if(strlen($POSTIMG)>0){
			if(strlen($_OPTION)>0){
				echo sprintf("<a href=\"/prg_img/img/%s\" class=\"lightbox\" rel=\"lightbox[img%s]\">",$POSTIMG,$id);
				for($i=1;$i<=count($tugh);$i++)echo swforimg($IMG[$i],$POSTIMG);
				echo "</a>";
			}else{
				echo swforimg($IMG[0],$POSTIMG);
			}
		}else{
			echo "画像なし";
		}
	}
	echo"</td></tr>";
}

?>