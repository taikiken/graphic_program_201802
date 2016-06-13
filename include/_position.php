<?php

$FDATA[]=array("しない","する");
$FDATA[]=array("テキストに対し左寄せ","テキストに対し右寄せ","中央寄せ");
$FDATA[]=array("拡大しない","拡大する");
$FDATA[]=array("しない","する");

$POSITIONS=$FDATA[$f_name];

?>
<?php if($q->get_dir()==0){ ?>
<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><?php for($I=0;$I<count($POSITIONS);$I++){ ?><input type="radio" name="p_pos<?=$f_name?>" value="<?=$I?>" id="pos<?=$f_name?><?=$I?>"<?php if($I==$p["pos"])echo " checked"; ?>> <label for="pos<?=$f_name?><?=$I?>"><?=$POSITIONS[$I]?></label><?php } ?></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
		</tr>

<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$_POST["p_pos".$f_name]]?><input type="hidden" name="p_pos<?=$f_name?>" value="<?=$_POST["p_pos".$f_name]?>"></td>
		</tr>

<?php } ?>
<?php }elseif($q->get_dir()==1){ ?>
<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><?php for($I=0;$I<count($POSITIONS);$I++){ ?><input type="radio" name="p_pos<?=$f_name?>" value="<?=$I?>" id="pos<?=$f_name?><?=$I?>"<?php if($I==$p["pos".$f_name])echo " checked"; ?>><label for="pos<?=$f_name?><?=$I?>"><?=$POSITIONS[$I]?></label><?php } ?></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
		</tr>

<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$_POST["p_pos".$f_name]]?><input type="hidden" name="p_pos<?=$f_name?>" value="<?=$_POST["p_pos".$f_name]?>"></td>
		</tr>

<?php } ?>
<?php }elseif($q->get_dir()==2){ ?>
<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$p["pos".$f_name]]?></td>
		</tr>

<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><?=$POSITIONS[$_POST["pos".$f_name]]?></td>
		</tr>

<?php } ?>
<?php } ?>