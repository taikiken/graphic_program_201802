<?php

$POSITIONS=array("スタイル1","スタイル2","スタイル3");
$d_name="ラインスタイルの適用";

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
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><?php for($I=0;$I<count($POSITIONS);$I++){ ?><input type="radio" name="p_pos" value="<?=$I?>" id="pos<?=$I?>"<?php if($I==$p["pos"])echo " checked"; ?>><label for="pos<?=$I?>"><?=$POSITIONS[$I]?></label><?php } ?></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
		</tr>

<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$_POST["p_pos"]]?><input type="hidden" name="p_pos" value="<?=$_POST["p_pos"]?>"></td>
		</tr>

<?php } ?>
<?php }elseif($q->get_dir()==1){ ?>
<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><?php for($I=0;$I<count($POSITIONS);$I++){ ?><input type="radio" name="p_pos" value="<?=$I?>" id="pos<?=$I?>"<?php if($I==$p["pos"])echo " checked"; ?>> <label for="pos<?=$I?>"><?=$POSITIONS[$I]?></label><?php } ?></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
		</tr>

<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$_POST["p_pos"]]?><input type="hidden" name="p_pos" value="<?=$_POST["p_pos"]?>"></td>
		</tr>

<?php } ?>
<?php }elseif($q->get_dir()==2){ ?>
<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$p["pos"]]?></td>
		</tr>

<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=$POSITIONS[$_POST["pos"]]?></td>
		</tr>

<?php } ?>
<?php } ?>