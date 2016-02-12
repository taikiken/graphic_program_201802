<?php

if(strlen($g->f("cid"))>0&&(strlen($g->f("c"))>0||strlen($p["lib"])>0)){
	unset($DISABLED);
	if($CURRENTDIRECTORY=="repo_edit"){
		$sql=sprintf("select f_name as fvalue from editor where cid=%s and directory='%s'",$g->f("cid"),$g->f("directory"));
	}else{
		$sql=sprintf("select fvalue from mail_ where cid=%s",$g->f("cid"));
	}
	$o->query($sql);
	while($f=$o->fetch_array()){
		if(strpos($f["fvalue"],",")){
			$f["fvalue"]=explode(",",$f["fvalue"]);
			for($RRI=0;$RRI<count($f["fvalue"]);$RRI++){
				$DISABLED[]=$f["fvalue"][$RRI];
			}
		}else{
			$DISABLED[]=$f["fvalue"];
		}
	}
}

unset($v);

?>

<?php if($III!=0&&$q->get_file()!==2&&$HEADERFLAG!=1){ ?>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<?php } ?>
<?php $HEADERFLAG=0; ?>

<?php if($q->get_dir()==0){ ?>
	<?php if($q->get_file()==0){ ?>

	<tr>
	<td<?php if(strlen($_COMMENT)>0){ ?> rowspan="2"<?php } ?> class="inputTitle"><?=$d_name?></td>
	<td class="inputFields"><?php

		$e=@explode(",",$p[$f_name]);
		$o->query($_OPTION);
		$i=0;
		while($f=$o->fetch_array($i++)){
			$v[]=$f;
		}
		$r=explode(" ",$_OPTION);
		$x=explode(",",$r[1]);
		for($i=0;$i<count($v);$i++){
			if(isint($v[$i][$x[0]])){
				$sql=sprintf("select name from pm where id=%s",$v[$i][$x[0]]);
				$o->query($sql);
				$f=$o->fetch_array();
				$v[$i][$x[0]]=mod_HTML($f["name"]);
			}	
		}
		$nm=ceil(count($v)/$SIZE);
		$K=0;
		$cb="<table border=\"0\" cellpadding=\"0\" cellspacing=\"5\">\n";
		for($I=0;$I<$nm;$I++){
			$cb.="<tr>\n";
			for($J=0;$J<$SIZE;$J++){
				if(strlen($v[$K][$x[1]])>0){
					$cb.="<td>";
					$cb.="<input type=\"checkbox\" name=\"p_".$f_name."[]\" value=\"".$v[$K][$x[1]]."\" id=\"".$f_name.$K."\"";
					for($L=0;$L<count($e);$L++){
						if($e[$L]==$v[$K][$x[1]]){
							$cb.=" checked";
							break;
						}
					}
					if(count($DISABLED)){
						for($OO=0;$OO<count($DISABLED);$OO++){
							if($DISABLED[$OO]==$v[$K][$x[1]]){
								$cb.=" disabled";
								break;
							}
						}
					}
					$cb.="><label for=\"".$f_name.$K."\"><span class=\"lbl\">";
					$cb.=$v[$K][$x[0]];
					if(count($x)==3){
						$cb.="( ";
						$cb.=$v[$K][$x[2]];
						$cb.=" )";
					}
					$cb.="</span></label></td>\n";
					$K++;
				}else{
					$cb.="<td>&nbsp;</td>\n";
				}
			}
			$cb.="</tr>\n";
		}
		$cb.="</table>\n";
		
		echo $cb;

	?></td>
	</tr>
    <?php if(strlen($_COMMENT)>0){ ?>
	<tr>
	<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
	</tr>
	<?php } ?>
	<?php }elseif($q->get_file()==1){ ?>

	<tr>
	<td class="confTitle"><?=$d_name?></td>
	<td class="confFields"><?php if(count($_POST["p_".$f_name])>0){ ?>
	<?php
	
	$i=0;
	
	$e=@implode("','",$_POST["p_".$f_name]);
	$r=explode(" ",$_OPTION);
	$x=explode(",",$r[1]);
	ereg("cid=([0-9]{1,2})",$_OPTION,$CID);
	
	$sql=sprintf("select %s from %s where %s in ('%s') and cid=%s",$x[0],$r[3],$x[1],$e,$CID[1]);

	$o->query($sql);
	
	while($f=$o->fetch_array($i++)){
		$b[]=$f[$x[0]];
	}

	for($i=0;$i<count($b);$i++){
		if(isint($b[$i])){
			$sql=sprintf("select name from pm where id=%s",$b[$i]);
			$o->query($sql);
			$f=$o->fetch_array();
			$b[$i]=mod_HTML($f["name"]);
		}	
	}
	
	$sv["p_".$f_name]=str_replace("'","",$e);
	$b=array_unique($b);
	echo implode("<br >",$b);
	unset($b);
	
	?>
	<?php }else{ ?>
	入力なし
	<?php } ?></td>
	</tr>


	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

	<tr>
	<td<?php if(strlen($_COMMENT)>0){ ?> rowspan="2"<?php } ?> class="inputTitle"><?=$d_name?></td>
	<td class="inputFields"><?php

		$e=@explode(",",$p[$f_name]);
		$o->query($_OPTION);
		$i=0;
		while($f=$o->fetch_array($i++)){
			$v[]=$f;
		}
		$r=explode(" ",$_OPTION);
		$x=explode(",",$r[1]);
		for($i=0;$i<count($v);$i++){
			if(isint($v[$i][$x[0]])){
				$sql=sprintf("select name from pm where id=%s",$v[$i][$x[0]]);
				$o->query($sql);
				$f=$o->fetch_array();
				$v[$i][$x[0]]=mod_HTML($f["name"]);
			}	
		}
		$nm=ceil(count($v)/$SIZE);
		$K=0;
		$cb="<table border=\"0\" cellpadding=\"0\" cellspacing=\"5\">\n";
		for($I=0;$I<$nm;$I++){
			$cb.="<tr>\n";
			for($J=0;$J<$SIZE;$J++){
				if(strlen($v[$K][$x[1]])>0){
					$cb.="<td>";
					$cb.="<input type=\"checkbox\" name=\"p_".$f_name."[]\" value=\"".$v[$K][$x[1]]."\" id=\"".$f_name.$K."\"";
					for($L=0;$L<count($e);$L++){
						if($e[$L]==$v[$K][$x[1]]){
							$cb.=" checked";
							$CCBOC=$v[$K][$x[1]];
							break;
						}
					}
					if(count($DISABLED)){
						for($OO=0;$OO<count($DISABLED);$OO++){
							if($DISABLED[$OO]==$v[$K][$x[1]]&&$v[$K][$x[1]]!=$CCBOC){
								$cb.=" disabled";
								break;
							}
						}
					}
					unset($CCBOC);
					$cb.="><label for=\"".$f_name.$K."\"><span class=\"lbl\">";
					$cb.=$v[$K][$x[0]];
					if(count($x)==3){
						$cb.="( ";
						$cb.=$v[$K][$x[2]];
						$cb.=" )";
					}
					$cb.="</span></label></td>\n";
					$K++;
				}else{
					$cb.="<td>&nbsp;</td>\n";
				}
			}
			$cb.="</tr>\n";
		}
		$cb.="</table>\n";
		
		echo $cb;

	?></td>
	</tr>
    <?php if(strlen($_COMMENT)>0){ ?>
	<tr>
	<td class="inputCap"><?php echo strlen($_COMMENT);if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
	</tr>
	<?php } ?>
	<?php }elseif($q->get_file()==1){ ?>

	<tr>
	<td class="confTitle"><?=$d_name?></td>
	<td class="confFields"><?php if(count($_POST["p_".$f_name])>0){ ?>
	<?php
	
	$i=0;
	
	$e=@implode("','",$_POST["p_".$f_name]);
	$r=explode(" ",$_OPTION);
	$x=explode(",",$r[1]);
	ereg("cid=([0-9]{1,2})",$_OPTION,$CID);
	
	$sql=sprintf("select %s from %s where %s in ('%s') and cid=%s",$x[0],$r[3],$x[1],$e,$CID[1]);
	$o->query($sql);
	
	while($f=$o->fetch_array($i++)){
		$b[]=$f[$x[0]];
	}

	for($i=0;$i<count($b);$i++){
		if(isint($b[$i])){
			$sql=sprintf("select name from pm where id=%s",$b[$i]);
			$o->query($sql);
			$f=$o->fetch_array();
			$b[$i]=mod_HTML($f["name"]);
		}	
	}
	
	$sv["p_".$f_name]=str_replace("'","",$e);
	$b=@array_unique($b);
	echo @implode("<br >",$b);
	unset($b);
	
	?>
	<?php }else{ ?>
	入力なし
	<?php } ?></td>
	</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

	<tr>
	<td class="confTitle"><?=$d_name?></td>
	<td class="confFields"><?php if(count($p[$f_name])>0){ ?>
	<?php
	
	$i=0;
	
	$e=$p[$f_name];
	$e=str_replace(",","','",$p[$f_name]);
	$r=explode(" ",$_OPTION);
	$x=explode(",",$r[1]);
	ereg("cid=([0-9]{1,2})",$_OPTION,$CID);
	
	$sql=sprintf("select %s from %s where %s in ('%s') and cid=%s",$x[0],$r[3],$x[1],$e,$CID[1]);
	$o->query($sql);
	
	while($f=$o->fetch_array($i++)){
		$b[]=$f[$x[0]];
	}

	for($i=0;$i<count($b);$i++){
		if(isint($b[$i])){
			$sql=sprintf("select name from pm where id=%s",$b[$i]);
			$o->query($sql);
			$f=$o->fetch_array();
			$b[$i]=mod_HTML($f["name"]);
		}	
	}
	
	$sv["p_".$f_name]=str_replace("'","",$e);
	echo implode("<br >",$b);
	
	?>
	<?php }else{ ?>
	入力なし
	<?php } ?></td>
	</tr>

	<?php }elseif($q->get_file()==1){ ?>
	
	<tr>
	<td class="confTitle"><?=$d_name?></td>
	<td class="confFields"><?php if(count($_POST[$f_name])>0){ ?>
	<?php

	$i=0;

	$e=$_POST[$f_name];
	$e=str_replace(",","','",$_POST[$f_name]);
	$r=explode(" ",$_OPTION);
	$x=explode(",",$r[1]);
	ereg("cid=([0-9]{1,2})",$_OPTION,$CID);
	
	$sql=sprintf("select %s from %s where %s in ('%s') and cid=%s",$x[0],$r[3],$x[1],$e,$CID[1]);
	$o->query($sql);
	
	while($f=$o->fetch_array($i++)){
		$b[]=$f[$x[0]];
	}

	for($i=0;$i<count($b);$i++){
		if(isint($b[$i])){
			$sql=sprintf("select name from pm where id=%s",$b[$i]);
			$o->query($sql);
			$f=$o->fetch_array();
			$b[$i]=mod_HTML($f["name"]);
		}	
	}
	
	$sv["p_".$f_name]=str_replace("'","",$e);
	echo implode("<br >",$b);
	
	?>
	<?php }else{ ?>
	入力なし
	<?php } ?></td>
	</tr>

	<?php } ?>
<?php } ?>