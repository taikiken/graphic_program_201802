<?php if($q->get_dir()==0){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><input name="<?=$f_name?>" type="file" size="40" class="ins" ></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を参照から選択してください。<?php } ?><br >アップロードファイルサイズは <?=$MAXFILESIZE?>Mbyte までです。</td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php ${$f_name}=chk_file($HTTP_POST_FILES[$f_name],"pdf"); ?>
		<?php if(strlen(${$f_name}[0])>0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><a href="<?=$TMPPATH?><?=${$f_name}[0]?>" target="_blank"><img src="/shared/cms/img/icon_pdf.gif" width="16" height="16" border="0" alt="Pdfファイルをプレビュー" ><?=mod_HTML(${$f_name}[1])?></a>(<?php echo round(filesize($TMPPATH.${$f_name}[0])/1024); ?>K)</td>
		</tr>

		<?php } ?>
		<input type="hidden" name="<?=$f_name?>" value="<?=${$f_name}[0]?>" >
	<?php } ?>
	<?php if($q->get_file()==2){ ?>
		<?php
		
		${$f_name}=$_POST[$f_name];
		if(strlen(${$f_name})>0){
			@copy($TMPPATH.${$f_name},$PDF.${$f_name});
			@unlink($TMPPATH.${$f_name});
			$sv[$sn[]=$f_name]="'".${$f_name}."'";
		}
		?>
	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>
		<?php if(strlen($p[$f_name])>0){ ?>

		<tr>
		<td rowspan="4" class="inputTitle">元<?=$d_name?></td>
		<td class="inputFields"><a href="<?=$PDF?><?=$p[$f_name]?>" target="_blank"><img src="/shared/cms/img/icon_pdf.gif" width="16" height="16" border="0" alt="Pdfファイルをプレビュー" ><?=mod_HTML(${$f_name}[1])?></a>(<?php echo round(filesize($PDF.$p[$f_name])/1024); ?>K)</td>
		</tr>
		<tr>
		<td colspan="2" class="inputCap"><input name="d_<?=$f_name?>" type="checkbox" id="d_<?=$f_name?>" value="1"><label for="d_<?=$f_name?>">削除する場合はチェックしてください</label></td>
		</tr>
		<tr>
		<td colspan="2" class="inputFields"><input name="<?=$f_name?>" type="file" size="40" class="ins" ></td>
		</tr>
		<tr>
		<td colspan="2" class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を参照から選択してください。<?php } ?><br >アップロードファイルサイズは <?=$MAXFILESIZE?>Mbyte までです。</td>
		</tr>

		<?php }else{ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><input name="<?=$f_name?>" type="file" size="40" class="ins" ></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を参照から選択してください。<?php } ?><br >アップロードファイルサイズは <?=$MAXFILESIZE?>Mbyte までです。</td>
		</tr>

		<?php } ?>

		<input type="hidden" name="o<?=$f_name?>" value="<?=$p[$f_name]?>" >

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php ${$f_name}=chk_file($HTTP_POST_FILES[$f_name],"pdf"); ?>
		<?php if(strlen($_POST["o".$f_name])>0&&!$_POST["d_".$f_name]){ ?>
		
		<tr>
		<td class="confTitle">元<?=$d_name?></td>
		<td class="confFields"><a href="<?=$PDF?><?=$_POST["o".$f_name]?>" target="_blank"><img src="/shared/cms/img/icon_pdf.gif" width="16" height="16" border="0" alt="Pdfファイルをプレビュー" ></a>(<?php echo round(filesize($PDF.$_POST["o".$f_name])/1024); ?>K)</td>
		</tr>

		<?php }else{ ?>

		<input type="hidden" name="d_<?=$f_name?>" value="<?=$_POST["d_".$f_name]?>" >

		<?php } ?>
		<?php if(strlen(${$f_name}[0])>0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><a href="<?=$TMPPATH?><?=${$f_name}[0]?>" target="_blank"><img src="/shared/cms/img/icon_pdf.gif" width="16" height="16" border="0" alt="Pdfファイルをプレビュー" ><?=mod_HTML(${$f_name}[1])?></a>(<?php echo round(filesize($TMPPATH.${$f_name}[0])/1024); ?>K)</td>
		</tr>
		<input type="hidden" name="<?=$f_name?>" value="<?=${$f_name}[0]?>" >
		<input type="hidden" name="o<?=$f_name?>" value="<?=$_POST['o'.$f_name]?>" >

		<?php } ?>
	<?php } ?>
	<?php if($q->get_file()==2){ ?>
		<?php

		if($_POST["d_".$f_name]==1){
			$sv[$sn[]=$f_name]="''";
		}
		
		${$f_name}=$_POST[$f_name];
		if(strlen(${$f_name})>0){
			copy($TMPPATH.${$f_name},$PDF.${$f_name});
			@unlink($TMPPATH.${$f_name});
			@unlink($PDF.$_POST['o'.$f_name]);
			$sv[$sn[]=$f_name]="'".${$f_name}."'";
		}
		
		?>
	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>
		<?php if(strlen($p[$f_name])>0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><a href="<?=$PDF?><?=$p[$f_name]?>" target="_blank"><img src="/shared/cms/img/icon_pdf.gif" width="16" height="16" border="0" alt="Pdfファイルをプレビュー" ></a>(<?php echo round(filesize($PDF.$p[$f_name])/1024); ?>K)</td>
		</tr>

		<?php } ?>
	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php if(strlen($_POST[$f_name])>0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><a href="<?=$PDF?><?=$_POST[$f_name]?>" target="_blank"><img src="/shared/cms/img/icon_pdf.gif" width="16" height="16" border="0" alt="Pdfファイルをプレビュー" ></a>(<?php echo round(filesize($PDF.$_POST[$f_name])/1024); ?>K)</td>
		</tr>

		<?php } ?>

		<input type="hidden" name="<?=$f_name?>" value="<?=$_POST[$f_name]?>" >

	<?php } ?>
	<?php if($q->get_file()==2){ ?>
		<?php @unlink($PDF.$_POST[$f_name]); ?>
	<?php } ?>
<?php } ?>