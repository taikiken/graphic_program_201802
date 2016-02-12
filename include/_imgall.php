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
		<td class="inputFields"><?php if(strlen($_POST[$f_name])>0){ ?><?=swforimg($TMPPATH,$_POST[$f_name])?><input type="hidden" name="<?=$f_name?>" value="<?=$_POST[$f_name]?>" ><br ><?php } ?><input name="<?=$f_name?>" type="file" size="40" class="ins" ></td>
		</tr>
		<tr>
		<td class="inputCap">画像のサイズは幅<?=$SIZE?>ピクセル以下、高さは自由です。<br >アップロードファイルサイズは <?=$MAXFILESIZE?>Mbyte までです。<?php if(strlen($_COMMENT)>0){ ?><br><?=mod_HTML($_COMMENT,1)?><?php } ?></td>
		</tr>

	<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php ${$f_name}=chk_img($_FILES[$f_name],$SIZE,1); ?><?php if(strlen(${$f_name})>0){ ?><?=swforimg($TMPPATH,${$f_name})?><input type="hidden" name="<?=$f_name?>" value="<?=${$f_name}?>" ><?php }elseif(strlen($_POST[$f_name])>0){ ?><?=swforimg($TMPPATH,$_POST[$f_name])?><input type="hidden" name="<?=$f_name?>" value="<?=$_POST[$f_name]?>" ><?php }else{ ?><?php echo "画像なし"; ?><?php } ?></td>
		</tr>

	<?php }elseif($q->get_file()==2){ ?>
		<?php

		if(strlen($_POST[$f_name])>0){
			if(rename($TMPPATH.$_POST[$f_name],$IMG.$_POST[$f_name])){
				chmod($IMG.$_POST[$f_name],0777);
				$sv[$sn[]=$f_name]=sprintf("'%s'",$_POST[$f_name]);
			}
		}

		?>
	<?php } ?>

<?php }elseif($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

		<?php if(strlen($p[$f_name])>0){ ?>
		<tr>
		<td rowspan="2" class="inputTitle">元<?=$d_name?></td>
		<td class="inputFields"><?=swforimg($IMG,(strlen($_POST["o".$f_name])>0)?$_POST["o".$f_name]:$p[$f_name])?></td>
		</tr>
		<tr>
		<td class="inputCap"><input name="d_<?=$f_name?>" type="checkbox" id="d_<?=$f_name?>" value="1" ><label for="d_<?=$f_name?>">削除する場合はチェックしてください</label></td>
		</tr>
		<?php } ?>
		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><?php if(strlen($_POST[$f_name])>0){ ?><?=swforimg($TMPPATH,$_POST[$f_name])?><input type="hidden" name="<?=$f_name?>" value="<?=$_POST[$f_name]?>" ><br ><?php } ?><input name="<?=$f_name?>" type="file" size="40" class="ins" ><input type="hidden" name="o<?=$f_name?>" value="<?=$p[$f_name]?>" ></td>
		</tr>
		<tr>
		<td class="inputCap">画像のサイズは幅<?=$SIZE?>ピクセル以下、高さは自由です。<br >アップロードファイルサイズは <?=$MAXFILESIZE?>Mbyte までです。<?php if(strlen($_COMMENT)>0){ ?><br><?=mod_HTML($_COMMENT,1)?><?php } ?></td>
		</tr>

	<?php }elseif($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php ${$f_name}=chk_img($_FILES[$f_name],$SIZE,1); ?><?php if(strlen(${$f_name})>0){ ?><?=swforimg($TMPPATH,${$f_name})?><input type="hidden" name="<?=$f_name?>" value="<?=${$f_name}?>" ><?php }elseif(strlen($_POST[$f_name])>0){ ?><?=swforimg($TMPPATH,$_POST[$f_name])?><input type="hidden" name="<?=$f_name?>" value="<?=$_POST[$f_name]?>" ><?php }elseif(strlen($_POST['o'.$f_name])>0){ ?><?=swforimg($IMG,$_POST['o'.$f_name])?><?php }else{ ?><?php echo "画像なし"; ?><?php } ?><input type="hidden" name="o<?=$f_name?>" value="<?=$_POST['o'.$f_name]?>"><input type="hidden" name="d_<?=$f_name?>" value="<?=$_POST["d_".$f_name]?>"></td>
		</tr>

	<?php
		}elseif($q->get_file()==2){
		
			if($_POST["d_".$f_name]==1){
				$sv[$sn[]=$f_name]="''";
			}

			if(strlen($_POST[$f_name])>0){
				if(rename($TMPPATH.$_POST[$f_name],$IMG.$_POST[$f_name])){
					chmod($IMG.$_POST[$f_name],0777);
					if(strlen($_POST['o'.$f_name])>0)unlink($IMG.$_POST['o'.$f_name]);
					$sv[$sn[]=$f_name]=sprintf("'%s'",$_POST[$f_name]);
				}

				
			}
		}
	?>

<?php }elseif($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=(strlen($p[$f_name])>0)?swforimg($IMG,$p[$f_name]):"指定なし"?></td>
		</tr>

	<?php }elseif($q->get_file()==1){ ?>
	
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=(strlen($_POST[$f_name])>0)?swforimg($IMG,$_POST[$f_name]):"指定なし"?><input type="hidden" name="<?=$f_name?>" value="<?=$_POST[$f_name]?>"></td>
		</tr>

	<?php }elseif($q->get_file()==2)@unlink($IMG.$_POST[$f_name]); ?>
<?php } ?>