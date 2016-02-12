<?php 

unset($STYLE);

if($q->get_file()==0){
	$fp=fopen($SIZE,"r");
	while($l=fgets($fp,1024)){
		if(ereg('^\.([^ {]*)',$l,$e)){
			$STYLE[]=trim($e[1]);
		}
	}
	fclose($fp);
}

?>
<?php if($q->get_dir()==0){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td width="3" rowspan="2" bgcolor="#FFB600"><img src="/shared/editor/spacer.gif"></td>
		<td width="3" rowspan="2"><img src="/shared/editor/spacer.gif"></td>
		<td width="150" rowspan="2" bgcolor="#FFFFFF"><span class="lbl"><?=$d_name?></span></td>
		<td width="5" rowspan="2" background="/shared/editor/dot.gif"><img src="/shared/editor/spacer.gif"></td>
		<td width="537"><span class="lbl"><select name="p_<?=$f_name?>"><option value="" selected>クラス選択</option><?php for($Y=0;$Y<count($STYLE);$Y++){ ?><option value="<?=$STYLE[$Y]?>"><?=$STYLE[$Y]?></option><?php } ?></select></span></td>
		<td rowspan="2" background="/shared/editor/dot.gif" width="3"><img src="/shared/editor/spacer.gif"></td>
		</tr>
		<tr>
		<td><span class="ins"><?=$d_name?>を入力してください。</span></td>
		</tr>


	<?php } ?>
	<?php if($q->get_file()==1){ ?>
	
		<link href="<?=$SIZE?>" rel="stylesheet" type="text/css">
		<tr>
		<td width="3" bgcolor="#FFB600"><img src="/shared/editor/spacer.gif"></td>
		<td width="3"><img src="/shared/editor/spacer.gif"></td>
		<td width="150" bgcolor="#FFFFFF"><span class="lbl_c"><?=$d_name?></span></td>
		<td width="5" background="/shared/editor/dot.gif"><img src="/shared/editor/spacer.gif"></td>
		<td width="537"><span class="<?=mod_HTML($sv["p_".$f_name])?>"><?=mod_HTML($sv["p_".$f_name])?></span></td>
		<td background="/shared/editor/dot.gif" width="3"><img src="/shared/editor/spacer.gif"></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td width="3" rowspan="2" bgcolor="#FFB600"><img src="/shared/editor/spacer.gif"></td>
		<td width="3" rowspan="2"><img src="/shared/editor/spacer.gif"></td>
		<td width="150" rowspan="2" bgcolor="#FFFFFF"><span class="lbl"><?=$d_name?></span></td>
		<td width="5" rowspan="2" background="/shared/editor/dot.gif"><img src="/shared/editor/spacer.gif"></td>
		<td width="537"><select name="p_<?=$f_name?>"><option value="" selected>クラス選択</option><?php for($Y=0;$Y<count($STYLE);$Y++){ ?><option value="<?=$STYLE[$Y]?>"<?php if($STYLE[$Y]==$p[$f_name])echo " selected" ?>><?=$STYLE[$Y]?></option><?php } ?></select></td>
		<td rowspan="2" background="/shared/editor/dot.gif" width="3"><img src="/shared/editor/spacer.gif"></td>
		</tr>
		<tr>
		<td><span class="ins"><?=$d_name?>を入力してください。</span></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<link href="<?=$SIZE?>" rel="stylesheet" type="text/css">
		<tr>
		<td width="3" bgcolor="#FFB600"><img src="/shared/editor/spacer.gif"></td>
		<td width="3"><img src="/shared/editor/spacer.gif"></td>
		<td width="150" bgcolor="#FFFFFF"><span class="lbl_c"><?=$d_name?></span></td>
		<td width="5" background="/shared/editor/dot.gif"><img src="/shared/editor/spacer.gif"></td>
		<td width="537"><span class="<?=mod_HTML($sv["p_".$f_name])?>"><?=mod_HTML($sv["p_".$f_name])?></span></td>
		<td background="/shared/editor/dot.gif" width="3"><img src="/shared/editor/spacer.gif"></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td width="3" bgcolor="#FFB600"><img src="/shared/editor/spacer.gif"></td>
		<td width="3"><img src="/shared/editor/spacer.gif"></td>
		<td width="150" bgcolor="#FFFFFF"><span class="lbl_c"><?=$d_name?></span></td>
		<td width="5" background="/shared/editor/dot.gif"><img src="/shared/editor/spacer.gif"></td>
		<td width="537"><span class="lbl"><?=(strlen($p[$f_name])>0)?mod_HTML($p[$f_name],1):"入力なし"?></span></td>
		<td background="/shared/editor/dot.gif" width="3"><img src="/shared/editor/spacer.gif"></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td width="3" bgcolor="#FFB600"><img src="/shared/editor/spacer.gif"></td>
		<td width="3"><img src="/shared/editor/spacer.gif"></td>
		<td width="150" bgcolor="#FFFFFF"><span class="lbl_c"><?=$d_name?></span></td>
		<td width="5" background="/shared/editor/dot.gif"><img src="/shared/editor/spacer.gif"></td>
		<td width="537"><span class="lbl"><?=(strlen($_POST[$f_name])>0)?mod_HTML($_POST[$f_name],1):"入力なし"?></span></td>
		<td background="/shared/editor/dot.gif" width="3"><img src="/shared/editor/spacer.gif"></td>
		</tr>
		<tr>
		<td colspan="6" background="/shared/editor/cd.gif"><img src="/shared/editor/spacer.gif" height="5"></td>
		</tr>	

	<?php } ?>
<?php } ?>