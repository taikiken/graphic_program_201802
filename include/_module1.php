<?php if($III!=0&&$q->get_file()!==2&&$HEADERFLAG!=1&&$q->get_dir()!=4&&$q->get_dir()!=5){ ?>
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
        <table border="0" cellpadding="0" cellspacing="5">
        <tr>
			<?php
            
            unset($M2);
			unset($l);
            
            if(strlen($p[$f_name])>0){
                $sql=sprintf("select m2 from repo_n where id=%s",$p[$f_name]);
                $o->query($sql);
                $f=$o->fetch_array();
                $M2=$f["m2"];
            }
            
            $sql="select id,name from pm_ where cid=21";
            $o->query($sql);
            
            while($f=$o->fetch_array()){
            
            ?>
            <td><input type="radio" class="box" name="m<?=$f_name?>" value="<?=$f["id"]?>" id="<?=$f_name?><?=$f["id"]?>" onclick="mansionModuleInput(this.value,'<?=$f_name?>',<?=$f["id"]?>)"<?php if($M2==$f["id"])echo " checked=\"checked\""; ?> ><label for="<?=$f_name?><?=$f["id"]?>"><?=mod_HTML($f["name"])?></label></td>
            <?php } ?>
            </tr>
            </table>
            <div id="selectbox_<?=$f_name?>" style="padding:5px 0 0 10px;border-top:1px solid #EFEFEF">
            <?php if(strlen($M2)>0){ ?>
            <select name="p_<?=$f_name?>">
			<?php
            
            $sql=sprintf("select id,title from repo_n where m2=%s and flag=1",$M2);
            $o->query($sql);
            
			$l[]="<option value=\"\">%s</option>";
			
            while($f=$o->fetch_array()){
                $l[]=sprintf("<option value=\"%s\"%s>%s</option>",$f["id"],($p[$f_name]==$f["id"])?" selected=\"selected\"":"",mod_HTML($f["title"]));
            }
			
			$LN=(count($l)-2)."件のマンションが登録されています";
			$l=implode("",$l);
			$l=sprintf($l,$LN);
			
			echo $l;
			
			unset($l);	
			unset($LN);		
            
            ?>
            </select>
            <?php }else{ ?>
            上記からエリアを選択してください。
            <?php } ?>
            </div>
            </td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php
        
			if(strlen($sv["p_".$f_name])>0){
				
				$sql=sprintf("select title from repo_n where id=%s",$sv["p_".$f_name]);
				$o->query($sql);
				$f=$o->fetch_array();
				
				echo mod_HTML($f["title"]);
				
			}else{
				echo "指定しない";
			}
		
		?></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields">
        <table border="0" cellpadding="0" cellspacing="5">
        <tr>
			<?php
            
            unset($M2);
			unset($l);
            
            if(strlen($p[$f_name])>0){
                $sql=sprintf("select m2 from repo_n where id=%s",$p[$f_name]);
                $o->query($sql);
                $f=$o->fetch_array();
                $M2=$f["m2"];
            }
            
            $sql="select id,name from pm_ where cid=21";
            $o->query($sql);
            
            while($f=$o->fetch_array()){
            
            ?>
            <td><input type="radio" class="box" name="m<?=$f_name?>" value="<?=$f["id"]?>" id="<?=$f_name?><?=$f["id"]?>" onclick="mansionModuleInput(this.value,'<?=$f_name?>',<?=$f["id"]?>)"<?php if($M2==$f["id"])echo " checked=\"checked\""; ?> ><label for="<?=$f_name?><?=$f["id"]?>"><?=mod_HTML($f["name"])?></label></td>
            <?php } ?>
            </tr>
            </table>
            <div id="selectbox_<?=$f_name?>" style="padding:5px 0 0 10px;border-top:1px solid #EFEFEF">
            <?php if(strlen($M2)>0){ ?>
            <select name="p_<?=$f_name?>">
			<?php
            
            $sql=sprintf("select id,title from repo_n where m2=%s and flag=1",$M2);
            $o->query($sql);
            
			$l[]="<option value=\"\">%s</option>";
			
            while($f=$o->fetch_array()){
                $l[]=sprintf("<option value=\"%s\"%s>%s</option>",$f["id"],($p[$f_name]==$f["id"])?" selected=\"selected\"":"",mod_HTML($f["title"]));
            }
			
			$LN=(count($l)-2)."件のマンションが登録されています";
			$l=implode("",$l);
			$l=sprintf($l,$LN);
			
			echo $l;
			
			unset($l);	
			unset($LN);		
            
            ?>
            </select>
            <?php }else{ ?>
            上記からエリアを選択してください。
            <?php } ?>
            </div>
            </td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を選択してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php
        
			if(strlen($sv["p_".$f_name])>0){
				
				$sql=sprintf("select title from repo_n where id=%s",$sv["p_".$f_name]);
				$o->query($sql);
				$f=$o->fetch_array();
				
				echo mod_HTML($f["title"]);
				
			}else{
				echo "指定しない";
			}
		
		?></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		<?php
        
			if(strlen($p[$f_name])>0){
				
				$sql=sprintf("select title from repo_n where id=%s",$p[$f_name]);
				$o->query($sql);
				$f=$o->fetch_array();
				
				echo mod_HTML($f["title"]);
				
			}else{
				echo "指定しない";
			}
		
		?>
        </td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
	
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields">
		<?php
        
			if(strlen($_POST[$f_name])>0){
				
				$sql=sprintf("select title from repo_n where id=%s",$_POST[$f_name]);
				$o->query($sql);
				$f=$o->fetch_array();
				
				echo mod_HTML($f["title"]);
				
			}else{
				echo "指定しない";
			}
		
		?>
        </td>
		</tr>
	
	<?php } ?>
<?php } ?>