<?php if($q->get_dir()==0){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><input type="password" name="p_<?=$f_name?>" value="" size="<?=$SIZE?>" class="in" ></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php

			$length=strlen($sv["p_".$f_name]);
			if(strlen($sv["p_".$f_name])>0){
				/*運動通信*/
				$sv["p_a15"]=md5($sv["p_t1"]);
				$sv["p_".$f_name]=md5($MAGIC_STRING.$sv["p_".$f_name]);
			}

		?>
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php if(strlen($length)>0){ ?><?php for($i=0;$i<$length;$i++)echo "*";echo "(アスタリスクで表示されます)"; ?><?php }else{ ?>入力なし<?php } ?></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><input type="password" name="p_<?=$f_name?>" value="" size="<?=$SIZE?>" class="in" ></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php
			$length=strlen($sv["p_".$f_name]);
			if(strlen($sv["p_".$f_name])>0){
				/*運動通信*/
				$sv["p_".$f_name]=md5($MAGIC_STRING.$sv["p_".$f_name]);
			}else{
				unset($sv["p_".$f_name]);
			}
		
		?>
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php if(strlen($length)>0){ ?><?php for($i=0;$i<$length;$i++)echo "*";echo "(アスタリスクで表示されます)"; ?><?php }else{ ?>入力なし<?php } ?></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">******** (アスタリスクで表示されます)</td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
	
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">******** (アスタリスクで表示されます)</td>
		</tr>	
	
	<?php } ?>
<?php } ?>