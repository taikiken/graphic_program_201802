<?php

$tugh=explode(",",$_OPTION);
$SizeOption=explode("-",$SIZE);
if(!isset($imgNo))$imgNo=0;

if(($q->get_dir()==0||$q->get_dir()==1)&&$q->get_file()==0){

	echo sprintf("<tr class=\"%s\"><td rowspan=\"2\" class=\"inputTitle\">%s</td><td class=\"inputFields\">",$f_name,$d_name);
	if(strlen($p[$f_name])>0){
		if(strlen($_POST["o".$f_name])>0){
			echo rtimg($_OPTION,$_POST["o".$f_name],$IMG,$_POST["o".$f_name],$f_name,$p[$f_name."copy"],$SizeOption,$tugh,0);
		}elseif(strlen($p[$f_name])>0){
			echo sprintf("<p style='padding:5px 0;'><a href='/prg_img/raw/%s' target=\"_blank\">オリジナル画像を別ウインドウで表示する</a></p>",$p[$f_name]);
			echo rtimg($_OPTION,$p[$f_name],$IMG,$p[$f_name],$f_name,$p[$f_name."copy"],$SizeOption,$tugh,0);
		}
		//echo sprintf("<div class=\"imgDelete\"><input name=\"d_%s\" type=\"checkbox\" id=\"d_%s\" value=\"1\" ><label for=\"d_%s\">登録されている画像を削除する場合はチェックしてください</label></div>",$f_name,$f_name,$f_name);
	}
	if($_POST[$f_name]!=$p[$f_name]&&strlen($_POST[$f_name])>0)echo rtimg($_OPTION,$_POST[$f_name],$IMG,$_POST[$f_name],$f_name,$p[$f_name."copy"],$SizeOption,$tugh);
	echo sprintf("<div style=\"clear:both;\"><table><tr><td><input name=\"%s\" type=\"file\" size=\"40\" class=\"ins files\" ><input type=\"hidden\" name=\"o%s\" value=\"%s\">%s</td><td>%s</td></tr></table></div></td></tr>",$f_name,$f_name,$p[$f_name],strlen($p[$f_name])>0?"　|":"",strlen($p[$f_name])>0?sprintf("<div class=\"imgDelete\"><input name=\"d_%s\" type=\"checkbox\" id=\"d_%s\" value=\"1\" ><label for=\"d_%s\">登録されている画像を削除する場合はチェックしてください</label></div>",$f_name,$f_name,$f_name):"");
	echo sprintf("<tr class=\"%s\"><td class=\"inputCap\">%s</td></tr>",$f_name,makeComment($SIZE,$MAXFILESIZE,$COMMENT));
	
}elseif(($q->get_dir()==0||$q->get_dir()==1)&&$q->get_file()==2){
	if($q->get_dir()==0){
		if(strlen($_POST[$f_name])>0)$sv[$sn[]=$f_name]=sprintf("'%s'",$_POST[$f_name]);
	}elseif($q->get_dir()==1){
		if($_POST["d_".$f_name]==1)$sv[$sn[]=$f_name]="''";
		if(strlen($_POST[$f_name])>0)$sv[$sn[]=$f_name]=sprintf("'%s'",$_POST[$f_name]);
	}
}else{
	
	echo sprintf("<tr class=\"%s\"><td class=\"confTitle\">%s</td><td class=\"confFields\">",$f_name,$d_name);
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