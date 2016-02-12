<?php

if($q->get_file()!=2){
	$m=new m($d_name,$SIZE,$_OPTION,$_OP05);
	$TITLE=$m->mn();
}

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
		<td<?php if(strlen($_COMMENT)>0){ ?> rowspan="2"<?php } ?> class="inputTitle"><?=$TITLE?></td>
		<td class="inputFields"><?=$m->$f_name($p[$m->gv()])?></td>
		</tr>
        <?php if(strlen($_COMMENT)>0){ ?>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$TITLE?>を選択してください。<?php } ?><?=addJs($_OP01)?></td>
		</tr>
		<?php } ?>
	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$TITLE?></td>
		<td class="confFields"><?=($f_name!="cb")?$m->mn($sv["p_".$m->gv()]):($TITLE!=$m->mn_c($_POST["p_".$m->gv()]))?$m->mn_c($_POST["p_".$m->gv()]):"指定なし"?></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td<?php if(strlen($_COMMENT)>0){ ?> rowspan="2"<?php } ?> class="inputTitle"><?=$TITLE?></td>
		<td class="inputFields"><?=$m->$f_name($p[$m->gv()])?></td>
		</tr>
        <?php if(strlen($_COMMENT)>0){ ?>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$TITLE?>を選択してください。<?php } ?><?=addJs($_OP01)?></td>
		</tr>
        <?php } ?>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$TITLE?></td>
		<td class="confFields"><?=($f_name!="cb")?$m->mn($sv["p_".$m->gv()]):($TITLE!=$m->mn_c($_POST["p_".$m->gv()]))?$m->mn_c($_POST["p_".$m->gv()]):"指定なし"?></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$TITLE?></td>
		<td class="confFields"><?=($f_name!="cb")?$m->mn($p[$m->gv()]):($TITLE!=$m->mn_c($p[$m->gv()]))?$m->mn_c($p[$m->gv()]):"指定なし"?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$TITLE?></td>
		<td class="confFields"><?=($f_name!="cb")?$m->mn($_POST[$m->gv()]):($TITLE!=$m->mn_c($_POST[$m->gv()]))?$m->mn_c($_POST[$m->gv()]):"指定なし"?></td>
		</tr>

	<?php } ?>
<?php } ?>
<?php if($q->get_dir()==4){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$TITLE?></td>
		<td class="inputFields"><?=$m->$f_name($p[$m->gv()])?></td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$TITLE?>を選択してください。<?php } ?></td>
		</tr>

<?php } ?>