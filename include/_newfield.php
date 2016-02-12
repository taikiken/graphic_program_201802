<?php

	$TITLE = $a[0];
	$FIELD = $a[1];
	$ARRAY = $a[2];
	$COMMNET=$a[3];

?>
<?php if($q->get_file()!==2){ ?>
<tr>
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<tr>
<th colspan="2" class="inputHeader" scope="row"><?=$TITLE?>設定</th>
</tr>
<?php } ?>
<?php if($q->get_dir()==0){ ?>
<?php if($q->get_file()==0){ ?>
<tr>
<td rowspan="2" class="inputTitle"><?=$TITLE?></td>
<td class="inputFields"><?php for($I=0;$I<count($ARRAY);$I++){ ?>
<input type="radio" class="box" name="p_<?=$FIELD?>" value="<?=$I?>" id="<?=$FIELD?><?=$I?>"<?php if($I==$p[$FIELD])echo " checked"; ?> ><label for="<?=$FIELD?><?=$I?>"><?=$ARRAY[$I]?></label>
<?php } ?></td>
</tr>
<tr>
<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$TITLE?>を選択してください。<?php } ?></td>
</tr>
<?php }elseif($q->get_file()==1){ ?>
<tr>
<td class="confTitle"><?=$TITLE?></td>
<td class="confFields"><?=$ARRAY[$_POST["p_".$FIELD]]?></td>
</tr>
<?php } ?>
<?php }elseif($q->get_dir()==1){ ?>
<?php if($q->get_file()===0){ ?>
<tr>
<td rowspan="2" class="inputTitle"><?=$TITLE?></td>
<td class="inputFields"><?php for($I=0;$I<count($ARRAY);$I++){ ?><input type="radio" class="box" name="p_<?=$FIELD?>" value="<?=$I?>" id="<?=$FIELD?><?=$I?>"<?php if($I==$p[$FIELD])echo " checked"; ?> ><label for="<?=$FIELD?><?=$I?>"><?=$ARRAY[$I]?></label><?php } ?></td>
</tr>
<tr>
<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$TITLE?>を選択してください。<?php } ?></td>
</tr>
<?php }elseif($q->get_file()==1){ ?>
<tr>
<td class="confTitle"><?=$TITLE?></td>
<td class="confFields"><?=$ARRAY[$_POST["p_".$FIELD]]?></td>
</tr>
<?php } ?>
<?php }elseif($q->get_dir()==2){ ?>
<?php if($q->get_file()===0){ ?>
<tr>
<td class="confTitle"><?=$TITLE?></td>
<td class="confFields"><?=$ARRAY[$p[$FIELD]]?></td>
</tr>
<?php }elseif($q->get_file()==1){ ?>
<tr>
<td class="confTitle"><?=$TITLE?></td>
<td class="confFields"><?=$ARRAY[$_POST[$FIELD]]?></td>
</tr>
<?php } ?>
<?php }elseif($q->get_dir()==4){ ?>
<?php if($q->get_file()==0){ ?>
<tr>
<td rowspan="2" class="inputTitle"><?=$TITLE?></td>
<td class="inputFields"><?php for($I=0;$I<count($ARRAY);$I++){ ?>
<input type="radio" class="box" name="p_<?=$FIELD?>" value="<?=$I+1?>" id="<?=$FIELD?><?=$I?>" ><label for="<?=$FIELD?><?=$I?>"><?=$ARRAY[$I]?></label>
<?php } ?></td>
</tr>
<tr>
<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$TITLE?>を選択してください。<?php } ?></td>
</tr>
<?php } ?>
<?php } ?>
<?php unset($a); ?>