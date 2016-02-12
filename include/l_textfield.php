<?php

$class=str_replace(",","",$f_name);

?>
<?php if($III!=0&&$q->get_file()!==2&&$HEADERFLAG!=1){ ?>
<tr class="<?=$class?>">
<td colspan="2" class="separator"><img src="/shared/cms/img/spacer.gif" height="1" width="1" alt="#" ></td>
</tr>
<?php } ?>
<?php $HEADERFLAG=0; ?>
<?php if($q->get_dir()==0||$q->get_dir()==4){ ?>

	<?php if($q->get_file()==0){ ?>
		<?php if(!isset($_OPTION)){ ?>
			<tr class="<?=$class?>">
			<td rowspan="2" class="inputTitle"><?=$d_name?></td>
			<td class="inputFields">
				<?php if(!$_BILL){ ?>
				<?=makeTextfieldAddOption($f_name,$_OPTION,$SIZE,$_OP01,$_OP02,$_OP03,$_OP04,$_OP05)?>
				<?php }else{ ?>
					<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
					<tr>
					<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
					<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
					</tr>
					<tr>
					<td class="japanese"><input type="text" size="<?=$SIZE?>" name="p_<?=$f_name?>" value="<?=mod_HTML($p[$f_name])?>" class="in" ></td>
					<td class="english"><input type="text" size="<?=$SIZE?>" name="p_<?=$f_name?>_e" value="<?=mod_HTML($p[$f_name."_e"])?>" class="in" ></td>
					</tr>
					</table> 
				<?php } ?>
			</td>
			</tr>
			<tr class="<?=$class?>">
			<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?><?=addJs($_OP01)?></td>
			</tr>

		<?php }else{ ?>

			<tr class="<?=$class?>">
			<td rowspan="2" class="inputTitle"><?=$d_name?></td>
			<td class="inputFields">
			<?php
			
			if(!$_BILL){
				echo makeTextfieldAddOption($f_name,$_OPTION,$SIZE,$_OP01,$_OP02,$_OP03,$_OP04,$_OP05);
				if($d_name=="緯度・経度")include "map.php";
			}else{
			
			?>
				<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
				<tr>
				<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
				<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
				</tr>
				<tr>
				<td class="japanese">
				<?php if(count($_OPTION)==1){ ?>
					<?php for($U=0;$U<count($SIZE);$U++){ ?>
						<input type="text" size="<?=$SIZE[$U]?>" name="p_<?=$f_name[$U]?>" value="<?=mod_HTML($p[$f_name[$U]])?>" class="in" ><?php if($U!=(count($f_name)-1)){ ?><?=$_OPTION[0]?><?php } ?>
					<?php } ?>
				<?php }else{ ?>
					<?php for($U=0;$U<count($SIZE);$U++){ ?>
						<?=$_OPTION[$U]?><input type="text" size="<?=$SIZE[$U]?>" name="p_<?=$f_name[$U]?>" value="<?=mod_HTML($p[$f_name[$U]])?>" class="in" >
					<?php } ?>	
					<?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?>
				<?php } ?>
				</td>
				<td class="english">
				<?php if(count($_OPTION)==1){ ?>
					<?php for($U=0;$U<count($SIZE);$U++){ ?>
					<input type="text" size="<?=$SIZE[$U]?>" name="p_<?=$f_name[$U]?>_e" value="<?=mod_HTML($p[$f_name[$U]."_e"])?>" class="in" ><?php if($U!=(count($f_name)-1)){ ?><?=$_OPTION[0]?><?php } ?>
					<?php } ?>
				<?php }else{ ?>
					<?php for($U=0;$U<count($SIZE);$U++){ ?>
					<?=$_OPTION[$U]?><input type="text" size="<?=$SIZE[$U]?>" name="p_<?=$f_name[$U]?>_e" value="<?=mod_HTML($p[$f_name[$U]."_e"])?>" class="in" >
					<?php } ?>
					<?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?>	
				<?php } ?>
				</td>
				</tr>
				</table> 
			<?php } ?>
			</td>
			</tr>
			<tr class="<?=$class?>">
			<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
			</tr>

		<?php } ?>
	<?php } ?>

















	<?php if($q->get_file()==1){ ?>
		<?php if(!isset($_OPTION)){ ?>
        
        <?php
        
			if(ereg("^[m|d][0-9]{1}",$f_name)){
				$TMPVALUES=$sv["p_".$f_name];
				$TMPVALUES=mb_convert_kana($TMPVALUES,"n");
				$TMPVALUES=ereg_replace("[^0-9]","",$TMPVALUES);
				$sv["p_".$f_name]=$TMPVALUES;
			}elseif(ereg("^fn[0-9]{1}",$f_name)){
				$TMPVALUES=$sv["p_".$f_name];
				$TMPVALUES=mb_convert_kana($TMPVALUES,"n");
				$TMPVALUES=str_replace("．",".",$TMPVALUES);
				$TMPVALUES=ereg_replace("[^0-9.]","",$TMPVALUES);
				$sv["p_".$f_name]=$TMPVALUES;
			}
		
		?>

		<tr class="<?=$class?>">
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		<?php if(!$_BILL){ ?>
		<?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name]):"-"?>
        <?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name]):"-"?></td>
<td class="english"><?=(strlen($sv["p_".$f_name."_e"])>0)?mod_HTML($sv["p_".$f_name."_e"]):"-"?></td>
</tr>
</table>
        <?php } ?>
        </td>
		</tr>

		<?php }else{ ?>
		
		<tr class="<?=$class?>">
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
<?php if(!$_BILL){ ?>
		<?php
		
		$f_name=explode(",",$f_name);
		$_OPTION=explode(",",$_OPTION);

		for($U=0;$U<count($f_name);$U++){
		
		?>
		<?=$_OPTION[$U]?><?=(strlen($sv["p_".$f_name[$U]])>0)?mod_HTML($sv["p_".$f_name[$U]]):"-"?>
		<?php } ?>
		<?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?>
		<?php if($d_name=="緯度・経度")include "map.php"; ?>
<?php }else{ ?>
		<?php
		
		$f_name=explode(",",$f_name);
		$_OPTION=explode(",",$_OPTION);
		
		?>
        <table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
        <tr>
        <th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
        <th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
        </tr>
        <tr>
        <td class="japanese"><?php for($U=0;$U<count($f_name);$U++){ ?><?=$_OPTION[$U]?><?=(strlen($sv["p_".$f_name[$U]])>0)?mod_HTML($sv["p_".$f_name[$U]]):"-"?><?php } ?><?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?></td>
        <td class="english"><?php for($U=0;$U<count($f_name);$U++){ ?><?=$_OPTION[$U]?><?=(strlen($sv["p_".$f_name[$U]."_e"])>0)?mod_HTML($sv["p_".$f_name[$U]."_e"]):"-"?><?php } ?><?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?></td>
        </tr>
        </table>
        <?php } ?>
        </td>
		</tr>

		<?php } ?>
	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>
		<?php if(!isset($_OPTION)){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields">
		<?php if(!$_BILL){ ?>
		<?=makeTextfieldAddOption($f_name,$_OPTION,$SIZE,$_OP01,$_OP02,$_OP03,$_OP04,$_OP05)?>
        <?php }else{ ?>
        <table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
        <tr>
        <th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
        <th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
        </tr>
        <tr>
        <td class="japanese"><input type="text" size="<?=$SIZE?>" name="p_<?=$f_name?>" value="<?=mod_HTML($p[$f_name])?>" class="in" ></td>
        <td class="english"><input type="text" size="<?=$SIZE?>" name="p_<?=$f_name?>_e" value="<?=mod_HTML($p[$f_name."_e"])?>" class="in" ></td>
        </tr>
        </table>
        <?php } ?>
		</td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

		<?php }else{ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields">
<?php

if(!$_BILL){

echo makeTextfieldAddOption($f_name,$_OPTION,$SIZE,$_OP01,$_OP02,$_OP03,$_OP04,$_OP05);
if(count($_OPTION)>count($f_name))echo $_OPTION[$U];
if($d_name=="緯度・経度")include "map.php";

}else{

?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese">
<?php if(count($_OPTION)==1){ ?>
	<?php for($U=0;$U<count($SIZE);$U++){ ?>
        <input type="text" size="<?=$SIZE[$U]?>" name="p_<?=$f_name[$U]?>" value="<?=mod_HTML($p[$f_name[$U]])?>" class="in" ><?php if($U!=(count($f_name)-1)){ ?><?=$_OPTION[0]?><?php } ?>
	<?php } ?>
<?php }else{ ?>
	<?php for($U=0;$U<count($SIZE);$U++){ ?>
        <?=$_OPTION[$U]?><input type="text" size="<?=$SIZE[$U]?>" name="p_<?=$f_name[$U]?>" value="<?=mod_HTML($p[$f_name[$U]])?>" class="in" >
    <?php } ?>
	<?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?>
<?php } ?>
</td>
<td class="english">
<?php if(count($_OPTION)==1){ ?>
	<?php for($U=0;$U<count($SIZE);$U++){ ?>
	<input type="text" size="<?=$SIZE[$U]?>" name="p_<?=$f_name[$U]?>_e" value="<?=mod_HTML($p[$f_name[$U]."_e"])?>" class="in" ><?php if($U!=(count($f_name)-1)){ ?><?=$_OPTION[0]?><?php } ?>
	<?php } ?>
<?php }else{ ?>
	<?php for($U=0;$U<count($SIZE);$U++){ ?>
	<?=$_OPTION[$U]?><input type="text" size="<?=$SIZE[$U]?>" name="p_<?=$f_name[$U]?>_e" value="<?=mod_HTML($p[$f_name[$U]."_e"])?>" class="in" >
	<?php } ?>
	<?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?>
<?php } ?>
</td>
</tr>
</table>
<?php } ?>
        </td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

		<?php } ?>
	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php if(!isset($_OPTION)){ ?>

        <?php
        
			if(ereg("^[m|d][0-9]{1}",$f_name)){
				$TMPVALUES=$sv["p_".$f_name];
				$TMPVALUES=mb_convert_kana($TMPVALUES,"n");
				$TMPVALUES=ereg_replace("[^0-9]","",$TMPVALUES);
				$sv["p_".$f_name]=$TMPVALUES;
			}elseif(ereg("^fn[0-9]{1}",$f_name)){
				$TMPVALUES=$sv["p_".$f_name];
				$TMPVALUES=mb_convert_kana($TMPVALUES,"n");
				$TMPVALUES=str_replace("．",".",$TMPVALUES);
				$TMPVALUES=ereg_replace("[^0-9.]","",$TMPVALUES);
				$sv["p_".$f_name]=$TMPVALUES;
			}
		
		?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		<?php if(!$_BILL){ ?>
		<?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name]):"-"?>
        <?php }else{ ?>
<table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
<tr>
<th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
<th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
</tr>
<tr>
<td class="japanese"><?=(strlen($sv["p_".$f_name])>0)?mod_HTML($sv["p_".$f_name]):"-"?></td>
<td class="english"><?=(strlen($sv["p_".$f_name."_e"])>0)?mod_HTML($sv["p_".$f_name."_e"]):"-"?></td>
</tr>
</table>
        </td>
		</tr>
<?php } ?>
		<?php }else{ ?>
		
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
<?php if(!$_BILL){ ?>
		<?php
		
		$f_name=explode(",",$f_name);
		$_OPTION=explode(",",$_OPTION);

		for($U=0;$U<count($f_name);$U++){
		
		?>
		<?=$_OPTION[$U]?><?=(strlen($sv["p_".$f_name[$U]])>0)?mod_HTML($sv["p_".$f_name[$U]]):"-"?>
		<?php } ?>
		<?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?>
		<?php if($d_name=="緯度・経度")include "map.php"; ?>
<?php }else{ ?>
		<?php
		
		$f_name=explode(",",$f_name);
		$_OPTION=explode(",",$_OPTION);
		
		?>
        <table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
        <tr>
        <th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
        <th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
        </tr>
        <tr>
        <td class="japanese"><?php for($U=0;$U<count($f_name);$U++){ ?><?=$_OPTION[$U]?><?=(strlen($sv["p_".$f_name[$U]])>0)?mod_HTML($sv["p_".$f_name[$U]]):"-"?><?php } ?><?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?></td>
        <td class="english"><?php for($U=0;$U<count($f_name);$U++){ ?><?=$_OPTION[$U]?><?=(strlen($sv["p_".$f_name[$U]."_e"])>0)?mod_HTML($sv["p_".$f_name[$U]."_e"]):"-"?><?php } ?><?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?></td>
        </tr>
        </table>
<?php } ?>
        </td>
		</tr>

		<?php } ?>
	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>
		<?php if(!isset($_OPTION)){ ?>
		
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		<?php if(!$_BILL){ ?>
		<?=(strlen($p[$f_name])>0)?mod_HTML($p[$f_name]):"-"?>
        <?php }else{ ?>
        <table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
        <tr>
        <th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
        <th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
        </tr>
        <tr>
        <td class="japanese"><?=(strlen($p[$f_name])>0)?mod_HTML($p[$f_name]):"-"?></td>
        <td class="english"><?=(strlen($p[$f_name."_e"])>0)?mod_HTML($p[$f_name."_e"]):"-"?></td>
        </tr>
        </table>
        <?php } ?>
		</td>
		</tr>

		<?php }else{ ?>
		
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		<?php $f_name=explode(",",$f_name);$_OPTION=explode(",",$_OPTION); ?>
	<?php if(!$_BILL){ ?>
        <?php for($U=0;$U<count($f_name);$U++){ ?>
		<?=$_OPTION[$U]?><?=(strlen($p[$f_name[$U]])>0)?mod_HTML($p[$f_name[$U]]):"-"?>
		<?php } ?>
	<?php }else{ ?>
        <table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
        <tr>
        <th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
        <th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
        </tr>
        <tr>
        <td class="japanese"><?php for($U=0;$U<count($f_name);$U++){ ?><?=$_OPTION[$U]?><?=(strlen($p[$f_name[$U]])>0)?mod_HTML($p[$f_name[$U]]):"-"?><?php } ?></td>
        <td class="english"><?php for($U=0;$U<count($f_name);$U++){ ?><?=$_OPTION[$U]?><?=(strlen($p[$f_name[$U]."_e"])>0)?mod_HTML($p[$f_name[$U]."_e"]):"-"?><?php } ?></td>
        </tr>
        </table>
    <?php } ?>
        </td>
		</tr>

		<?php } ?>
	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php if(!isset($_OPTION)){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">

		<?php if(!$_BILL){ ?>
		<?=(strlen($_POST[$f_name])>0)?mod_HTML($_POST[$f_name]):"-"?>
        <?php }else{ ?>
        <table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
        <tr>
        <th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
        <th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
        </tr>
        <tr>
        <td class="japanese"><?=(strlen($_POST[$f_name])>0)?mod_HTML($_POST[$f_name]):"-"?></td>
        <td class="english"><?=(strlen($_POST[$f_name."_e"])>0)?mod_HTML($_POST[$f_name."_e"]):"-"?></td>
        </tr>
        </table>
        <?php } ?>
		</td>
		</tr>

		<?php }else{ ?>
		
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		<?php $f_name=explode(",",$f_name);$_OPTION=explode(",",$_OPTION); ?>
		<?php if(!$_BILL){ ?>
        <?php for($U=0;$U<count($f_name);$U++){ ?>
		<?=$_OPTION[$U]?><?=(strlen($_POST[$f_name[$U]])>0)?mod_HTML($_POST[$f_name[$U]]):"-"?>
		<?php } ?>
		<?php if(count($_OPTION)>count($f_name))echo $_OPTION[$U]; ?>
		<?php }else{ ?>
        <table border="0" cellpadding="0" cellspacing="0" class="billingualTable">
        <tr>
        <th class="japTitle"><img src="/shared/cms/img/jp.png" width="16" height="11" alt="日本語" >日本語</th>
        <th class="engTitle"><img src="/shared/cms/img/us.png" width="16" height="11" alt="英語" >英語</th>
        </tr>
        <tr>
        <td class="japanese"><?php for($U=0;$U<count($f_name);$U++){ ?><?=$_OPTION[$U]?><?=(strlen($_POST[$f_name[$U]])>0)?mod_HTML($_POST[$f_name[$U]]):"-"?><?php } ?></td>
        <td class="english"><?php for($U=0;$U<count($f_name);$U++){ ?><?=$_OPTION[$U]?><?=(strlen($_POST[$f_name[$U]."_e"])>0)?mod_HTML($_POST[$f_name[$U]."_e"]):"-"?><?php } ?></td>
        </tr>
        </table>
        <?php } ?>
        </td>
		</tr>

		<?php } ?>
	<?php } ?>
<?php } ?>
