<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>
		<tr>
		<td width="136" align="right" class="list3"><?=$d_name?></td>
		<td class="right"><table><tr><?php

$act=array("無効","有効");

for($i=0;$i<count($act);$i++){

?>
<td>
<input type="radio" name="p_activate" value="<?=$i?>" id="act<?=$i?>"<?php if($i==$p["activate"])echo " checked"; ?>><label for="act<?=$i?>"><?=$act[$i]?></label></td>
<?php } ?></tr></table></td>
		</tr>
	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<tr>
		<td width="136" align="right" class="list3"><?=$d_name?></td>
		<td class="right"><?=($sv["p_activate"]==0)?"無効":"有効"?></td>
		</tr>
	<?php } ?>
<?php } ?>