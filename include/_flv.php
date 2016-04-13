<?php if($q->get_dir()==0){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr class="<?=$f_name?>">
		<td class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><input name="<?=$f_name?>" type="file" size="40" class="ins" ></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
	<?php ${$f_name}=chk_img($_FILES[$f_name],$SIZE,1); ?>

		<tr class="<?=$f_name?>">
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php if(strlen(${$f_name})>0){ ?><video controls width="640" height="360"><source src="<?=$TMPPATH.${$f_name}?>"></video><input type="hidden" name="<?=$f_name?>" value="<?=${$f_name}?>"><?php }else{ ?><?php } ?></td>
		</tr>
		
	<?php } ?>
	<?php if($q->get_file()==2){ ?>
		<?php

		if(strlen($_POST[$f_name])>0){
			${$f_name}=$_POST[$f_name];
			$sv[$sn[]=$f_name]="'".${$f_name}."'";
			@copy($TMPPATH.${$f_name},$IMG.${$f_name});

			if(strlen($_OPTION)>0){
				$Im=explode(",",$_OPTION);
				for($iq=0;$iq<count($Im);$iq++){
					img_resize($TMPPATH.${$f_name},$TIMG[$iq].${$f_name},$Im[$iq]);
				}
				unset($_OPTION);
			}

			@unlink($TMPPATH.${$f_name});
		}

		?>
	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>
		<?php if(strlen($p[$f_name])>0){ ?>

		<?php if(strlen($p[$f_name])>0){ ?>
		<tr class="<?=$f_name?>">
		<td rowspan="3" class="inputTitle">元<?=$d_name?></td>
		<td class="inputFields"><video controls width="640" height="360"><source src="<?=$IMG[0].$p[$f_name]?>"></video></td>
		</tr>
        <?php } ?>
		
        <tr class="<?=$f_name?>">
		<td colspan="2" class="inputCap"><input name="d_<?=$f_name?>" type="checkbox" id="d_<?=$f_name?>" value="1"><label for="d_<?=$f_name?>">削除する場合はチェックしてください</label></td>
		</tr>
		<tr class="<?=$f_name?>">
		<td colspan="2" class="inputFields"><input name="<?=$f_name?>" type="file" size="40" class="ins" ></td>
		</tr>

		<?php }else{ ?>

		<tr class="<?=$f_name?>">
		<td class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><input name="<?=$f_name?>" type="file" size="40" class="ins" ></td>
		</tr>


		<?php } ?>

		<input type="hidden" name="o<?=$f_name?>" value="<?=$p[$f_name]?>">

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php ${$f_name}=chk_img($_FILES[$f_name],$SIZE,1); ?>
		<?php if(strlen($_POST['o'.$f_name])>0&&!$_POST['d_'.$f_name]&&!${$f_name}){ ?>

		<tr class="<?=$f_name?>">
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><video controls width="640" height="360"><source src="<?=$IMG[0].$_POST['o'.$f_name]?>"></video></td>
		</tr>

		<?php }else{ ?>

		<input type="hidden" name="d_<?=$f_name?>" value="<?=$_POST["d_".$f_name]?>">

		<?php } ?>
		<?php if(strlen(${$f_name})>0){ ?>

		<tr class="<?=$f_name?>">
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php if(strlen(${$f_name})>0){ ?><video controls width="640" height="360"><source src="<?=$TMPPATH.${$f_name}?>"></video><input type="hidden" name="<?=$f_name?>" value="<?=${$f_name}?>"><?php }else{ ?><?php } ?></td>
		</tr>
		<input type="hidden" name="<?=$f_name?>" value="<?=${$f_name}?>">
		<input type="hidden" name="o<?=$f_name?>" value="<?=$_POST['o'.$f_name]?>">

		<?php } ?>
	<?php } ?>
	<?php if($q->get_file()==2){ ?>
		<?php
		
		if($_POST["d_".$f_name]==1){
			$sv[$sn[]=$f_name]="''";
		}
		
		if(isset($_POST[$f_name])){
			${$f_name}=$_POST[$f_name];
			$sv[$sn[]=$f_name]="'".${$f_name}."'";
			copy($TMPPATH.${$f_name},$IMG.${$f_name});
			@unlink($IMG.$_POST['o'.$f_name]);
		
			if(strlen($_OPTION)>0){
				$Im=explode(",",$_OPTION);
				for($iq=0;$iq<count($Im);$iq++){
					img_resize($TMPPATH.${$f_name},$TIMG[$iq].${$f_name},$Im[$iq]);
					@unlink($TIMG[$iq].$_POST['o'.$f_name]);
				}
				unset($_OPTION);
			}

			@unlink($TMPPATH.${$f_name});
		}
		
		?>
	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>
		<?php if(strlen($p[$f_name])>0){ ?>

		<tr class="<?=$f_name?>">
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php if(strlen($p[$f_name])>0){ ?>
        <video controls width="640" height="360"><source src="<?=$IMG[0].$p[$f_name]?>"></video>
		<?php } ?></td>
		</tr>

		<?php } ?>
	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php if(strlen($_POST[$f_name])>0){ ?>

		<tr class="<?=$f_name?>">
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php if(strlen($_POST[$f_name])>0){ ?>
        <video controls width="640" height="360"><source src="<?=$IMG[0].$_POST[$f_name]?>"></video>
		<?php } ?></td>
		</tr>
		<input type="hidden" name="<?=$f_name?>" value="<?=$_POST[$f_name]?>">

		<?php } ?>
	<?php } ?>
	<?php if($q->get_file()==2){ ?>
		<?php @unlink($IMG.$_POST[$f_name]); ?>
	<?php } ?>
<?php } ?>