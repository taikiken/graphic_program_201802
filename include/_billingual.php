<?php

$POSITIONS=array("日本語版のみ","多言語版対応");
$d_name="バイリンガル";

?>
<?php $HEADERFLAG=0; ?>
<?php if($q->get_dir()==0){ ?>
<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><?php for($I=0;$I<count($POSITIONS);$I++){ ?><input type="radio" name="p_bill" value="<?=$I?>" id="pos<?=$I?>"<?php if($I==$p["bill"])echo " checked"; ?>> <label for="pos<?=$I?>"><?=$POSITIONS[$I]?></label><?php } ?></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
		</tr>

<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$_POST["p_bill"]]?><input type="hidden" name="p_bill" value="<?=$_POST["p_bill"]?>"></td>
		</tr>

<?php } ?>
<?php }elseif($q->get_dir()==1){ ?>
<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><?php for($I=0;$I<count($POSITIONS);$I++){ ?><input type="radio" name="p_bill" value="<?=$I?>" id="pos<?=$I?>"<?php if($I==$p["bill"])echo " checked"; ?>><label for="pos<?=$I?>"><?=$POSITIONS[$I]?></label><?php } ?></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
		</tr>

<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$_POST["p_bill"]]?><input type="hidden" name="p_bill" value="<?=$_POST["p_bill"]?>"></td>
		</tr>

<?php } ?>
<?php }elseif($q->get_dir()==2){ ?>
<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$p["bill"]]?></td>
		</tr>

<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><?=$POSITIONS[$_POST["bill"]]?></td>
		</tr>

<?php } ?>
<?php } ?>