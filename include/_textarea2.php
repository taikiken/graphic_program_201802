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
		<td class="inputFields">
<?php if(!$_BILL){ ?>
<textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>"<?php if($_OPTION==82&&$TAGON==1)echo " class=\"cleditor\""; ?>><?=mod_HTML($p[$f_name])?></textarea>
<?php }else{ ?>

<?php if($_OPTION==82&&$TAGON==1){ ?>
<div class="japTitle b_label"><img src="/shared/cms/img/jp.png" width="16" height="11" ><span>日本語</span></div>
<textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>"<?php if($_OPTION==82&&$TAGON==1)echo " class=\"cleditor\""; ?>><?=mod_HTML($p[$f_name])?></textarea>
<div class="engTitle b_label"><img src="/shared/cms/img/us.png" width="16" height="11" ><span>英語</span></div>
<textarea name="p_<?=$f_name?>_e" rows="<?=$SIZE?>"<?php if($_OPTION==82&&$TAGON==1)echo " class=\"cleditor\""; ?>><?=mod_HTML($p[$f_name."_e"])?></textarea>
<?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese"><textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>" class="bltext"><?=mod_HTML($p[$f_name])?></textarea></td>
<td class="english"><textarea name="p_<?=$f_name?>_e" rows="<?=$SIZE?>" class="bltext"><?=mod_HTML($p[$f_name."_e"])?></textarea></td>
</tr>
</table>
<?php } ?>
<?php } ?>
		</td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
<?php if(!$_BILL){ ?>
<?=(strlen($sv["p_".$f_name])>0)?nl2br($sv["p_".$f_name]):"入力なし"?>
<?php if($sv["p_".$f_name."tag"]!=2&&$_OPTION==82){ ?><input type="hidden" name="p_<?=$f_name?>tag" value="1" ><?php } ?>
<?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?></td>
<td class="english"><?=(strlen($sv["p_".$f_name."_e"])>0)?mod_HTML($sv["p_".$f_name."_e"],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?></td>
</tr>
</table>
<?php if($sv["p_".$f_name."tag"]!=2&&$_OPTION==82){ ?><input type="hidden" name="p_<?=$f_name?>tag" value="1" ><?php } ?>
<?php } ?>
		</td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields">
<?php if(!$_BILL){ ?>
<?php if($THIS=="定休日"||$THIS=="開催日")include $INCLUDEPATH."calendar.php"; ?>
<textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>"<?php if($_OPTION==82&&$TAGON==1)echo " class=\"cleditor\""; ?>><?=mod_HTML($p[$f_name])?></textarea>
<?php }else{ ?>

<?php if($_OPTION==82&&$TAGON==1){ ?>
<div class="japTitle b_label"><img src="/shared/cms/img/jp.png" width="16" height="11" ><span>日本語</span></div>
<textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>"<?php if($_OPTION==82&&$TAGON==1)echo " class=\"cleditor\""; ?>><?=mod_HTML($p[$f_name])?></textarea>
<div class="engTitle b_label"><img src="/shared/cms/img/us.png" width="16" height="11" ><span>英語</span></div>
<textarea name="p_<?=$f_name?>_e" rows="<?=$SIZE?>"<?php if($_OPTION==82&&$TAGON==1)echo " class=\"cleditor\""; ?>><?=mod_HTML($p[$f_name."_e"])?></textarea>
<?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese"><textarea name="p_<?=$f_name?>" rows="<?=$SIZE?>" class="bltext"><?=mod_HTML($p[$f_name])?></textarea></td>
<td class="english"><textarea name="p_<?=$f_name?>_e" rows="<?=$SIZE?>" class="bltext"><?=mod_HTML($p[$f_name."_e"])?></textarea></td>
</tr>
</table>
<?php } ?>
<?php } ?>
		</td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
<?php if(!$_BILL){ ?>
<?=(strlen($sv["p_".$f_name])>0)?nl2br($sv["p_".$f_name]):"入力なし"?>
<?php if($sv["p_".$f_name."tag"]!=2&&$_OPTION==82){ ?><input type="hidden" name="p_<?=$f_name?>tag" value="1" ><?php } ?>
<?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?></td>
<td class="english"><?=(strlen($sv["p_".$f_name."_e"])>0)?mod_HTML($sv["p_".$f_name."_e"],($sv["p_".$f_name."tag"]==2)?2:1):"入力なし"?></td>
</tr>
</table>
<?php if($sv["p_".$f_name."tag"]!=2&&$_OPTION==82){ ?><input type="hidden" name="p_<?=$f_name?>tag" value="1" ><?php } ?>
<?php } ?>
		</td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		<?php if(!$_BILL){ ?>
		<?=(strlen($p[$f_name])>0)?$p[$f_name]:"入力なし"?>
        <?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($p[$f_name])>0)?mod_HTML($p[$f_name],($p[$f_name."tag"]==2)?2:1):"入力なし"?></td>
<td class="english"><?=(strlen($p[$f_name."_e"])>0)?mod_HTML($p[$f_name."_e"],($p[$f_name."tag"]==2)?2:1):"入力なし"?></td>
</tr>
</table>
        <?php } ?>
        </td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		
		<?php if(!$_BILL){ ?>
		<?=(strlen($_POST[$f_name])>0)?$_POST[$f_name]:"入力なし"?>
        <?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($_POST[$f_name])>0)?mod_HTML($_POST[$f_name],($_POST[$f_name."tag"]==2)?2:1):"入力なし"?></td>
<td class="english"><?=(strlen($_POST[$f_name."_e"])>0)?mod_HTML($_POST[$f_name."_e"],($_POST[$f_name."tag"]==2)?2:1):"入力なし"?></td>
</tr>
</table>
        <?php } ?>
        </td>
		</tr>	

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==4||$q->get_dir()==5){ ?>
		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields"><textarea name="p_<?=$f_name?>" cols="<?=(strpos($CURRENTPATH,"/mail/")>0)?"75":"60"?>" rows="<?=$SIZE?>"><?=mod_HTML($p[$f_name])?></textarea></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>
<?php } ?>