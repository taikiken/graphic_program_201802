<?php

$FIELD=explode(",",$FIELDNAMES);

$_YY=date("Y");
$_MM=date("m");
if(count($FIELD)==3){
	$_DD=date("d");
}

$Y_CONDITION=array($_YY-5,$_YY+5);
$M_CONDITION=array(1,12);
if(count($FIELD)==3){
	$D_CONDITION=array(1,31);
}

?>
<?php if($q->get_dir()==0){ ?>
	<?php if($q->get_file()==0){ ?>

		<?php

		$_YY=(strlen($p[$FIELD[0]])>0)?$p[$FIELD[0]]:$_YY;
		$_MM=(strlen($p[$FIELD[1]])>0)?$p[$FIELD[1]]:$_MM;
		if(count($FIELD)==3){
			$_DD=(strlen($p[$FIELD[2]])>0)?$p[$FIELD[2]]:$_DD;
		}
		?>
		<select name="p_<?=$FIELD[0]?>">
		<option value=""></option>
		<?php for($i=$Y_CONDITION[0];$i<=$Y_CONDITION[1];$i++){ ?>
		<option value="<?=$i?>"<?php if($SIZE==$_YY)echo " selected"; ?>><?=$i?></option>
		<?php } ?>
		</select> 年
		<select name="p_<?=$FIELD[1]?>" class="p_<?=$FIELD[1]?>">
		<option value=""></option>
		<?php for($i=$M_CONDITION[0];$i<=$M_CONDITION[1];$i++){ ?>
		<option value="<?=$i?>"<?php if($SIZE==$_MM)echo " selected"; ?>><?=$i?></option>
		<?php } ?>
		</select> 月
		<?php if(count($FIELD)==3){ ?>
		<select name="p_<?=$FIELD[2]?>" class="p_<?=$FIELD[2]?>">
		<option value=""></option>
		<?php for($i=$D_CONDITION[0];$i<=$D_CONDITION[1];$i++){ ?>
		<option value="<?=$i?>"<?php if($SIZE==$_DD)echo " selected"; ?>><?=$i?></option>
		<?php } ?>
		</select> 日
		<?php } ?>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<?php if(strlen($sv["p_".$FIELD[0]])>0&&strlen($sv["p_".$FIELD[1]])>0){ ?><?=$sv["p_".$FIELD[0]]?> 年 <?=$sv["p_".$FIELD[1]]?> 月<?php if(count($FIELD)==3){ ?> <?=$sv["p_".$FIELD[2]]?> 日<?php } ?><?php }else{ ?><?php echo "指定しない"; ?><?php } ?>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>



		<select name="p_<?=$FIELD[0]?>">
		<option value=""<?php if($p[$FIELD[0]]=="")echo " selected"; ?>></option>
		<?php for($i=$Y_CONDITION[0];$i<=$Y_CONDITION[1];$i++){ ?>
		<option value="<?=$i?>"<?php if($p[$FIELD[0]]==$i)echo " selected"; ?>><?=$i?></option>
		<?php } ?>
		</select> 年
		<select name="p_<?=$FIELD[1]?>" class="p_<?=$FIELD[1]?>">
		<option value=""<?php if($p[$FIELD[1]]=="")echo " selected"; ?>></option>
		<?php for($i=$M_CONDITION[0];$i<=$M_CONDITION[1];$i++){ ?>
		<option value="<?=$i?>"<?php if($p[$FIELD[1]]==$i)echo " selected"; ?>><?=$i?></option>
		<?php } ?>
		</select> 月
		<?php if(count($FIELD)==3){ ?>
		<select name="p_<?=$FIELD[2]?>" class="p_<?=$FIELD[2]?>">
		<option value=""<?php if($p[$FIELD[2]]=="")echo " selected"; ?>></option>
		<?php for($i=$D_CONDITION[0];$i<=$D_CONDITION[1];$i++){ ?>
		<option value="<?=$i?>"<?php if($p[$FIELD[2]]==$i)echo " selected"; ?>><?=$i?></option>
		<?php } ?>
		</select> 日
		<?php } ?>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
	
		<?php if(strlen($sv["p_".$FIELD[0]])>0&&strlen($sv["p_".$FIELD[1]])>0){ ?><?=$sv["p_".$FIELD[0]]?> 年 <?=$sv["p_".$FIELD[1]]?> 月<?php if(count($FIELD)==3){ ?> <?=$sv["p_".$FIELD[2]]?> 日<?php } ?><?php }else{ ?><?php echo "指定しない"; ?><?php } ?>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<?php if(strlen($p[$FIELD[0]])>0&&strlen($p[$FIELD[1]])>0){ ?><?=$p[$FIELD[0]]?> 年 <?=$p[$FIELD[1]]?> 月<?php if(count($FIELD)==3){ ?> <?=$p[$FIELD[2]]?> 日<?php } ?><?php }else{ ?>指定しない<?php } ?>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
	
		<?php if(strlen($_POST[$FIELD[0]])>0&&strlen($_POST[$FIELD[1]])>0){ ?><?=$_POST[$FIELD[0]]?> 年 <?=$_POST[$FIELD[1]]?> 月<?php if(count($FIELD)==3){ ?> <?=$_POST[$FIELD[2]]?> 日<?php } ?><?php }else{ ?>指定しない<?php } ?>
	
	<?php } ?>
<?php } ?>