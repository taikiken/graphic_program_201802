<?php

function getJoinText($a){
	$n=array();
	while(list($k,$v)=each($a)){
		if(ereg("^zzz_a",$k)){
			$n=ereg_replace("zzz_a","",$k);
			$m1[$n]=$_POST["zzz_a".$n];
			$m2[$n]=$_POST["zzz_b".$n];
		}
	}
	$l="";
	
	for($i=0;$i<count($m1);$i++){
		if(strlen($m1[$i])||strlen($m2[$i])){
			$l.=sprintf("%s\t%s\n",$m1[$i],$m2[$i]);
		}
	}
	return $l;
}
function modDispText($s){
	$s=explode("\n",$s);
	$l="<table class=\"admintables\">";
	for($i=0;$i<count($s);$i++){
		$r=trim($s[$i]);
		if(strlen($r)>0){
			$r=explode("\t",$r);
			$l.=sprintf("<tr><th>%s ：</th><td>%s</td></tr>",mod_HTML($r[0]),mod_HTML($r[1]));
		}
	}
	$l.="</table>";
	return $l;
}
function modInputData($s){
	if(strlen($s)>0){
		$s=explode("\n",$s);
	}else{
		$s=array("\t\n","\t\n","\t\n");
	}
	$l="";
	for($i=0;$i<count($s);$i++){
		$r=trim($s[$i]);
		$r=explode("\t",$r);
		$l.=sprintf('<div class="pms clearfix"><span>項目名：</span><input type="text" size="20" name="zzz_a%s" value="%s" class="in tt1" ><span>値：</span><input type="text" size="50" name="zzz_b%s" value="%s" class="in tt2" ></div>',
		$i,mod_HTML($r[0]),$i,mod_HTML($r[1]));
	}
	return $l;
}

?>
<?php if($q->get_dir()==0){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields">
<ul class="menucont clearfix">
<li class="madd"><a href="javascript://">項目を追加</a></li>
<li class="mdel"><a href="javascript://">項目を削除</a></li>
</ul>
<div class="inmenu">
<?=modInputData($p[$f_name])?>
</div>
       	</td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
		<?php

			$rrty=getJoinText($_POST);

		?>
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php if(strlen($rrty)>0){ ?><?php echo modDispText($rrty); ?><?php }else{ ?>入力無し<?php } ?><input type="hidden" name="p_<?=$f_name?>" value="<?=mod_HTML($rrty)?>" ></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==1){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td rowspan="2" class="inputTitle"><?=$d_name?></td>
		<td class="inputFields">
<ul class="menucont clearfix">
<li class="madd"><a href="javascript://">項目を追加</a></li>
<li class="mdel"><a href="javascript://">項目を削除</a></li>
</ul>
<div class="inmenu">
<?=modInputData($p[$f_name])?>
</div>
        </td>
		</tr>
		<tr>
		<td class="inputCap"><?php if(strlen($_COMMENT)>0){ ?><?=mod_HTML($_COMMENT,1)?><?php }else{ ?><?=$d_name?>を入力してください。<?php } ?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
 		<?php

			$rrty=getJoinText($_POST);

		?>
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?php if(strlen($rrty)>0){ ?><?php echo modDispText($rrty); ?><?php }else{ ?>入力無し<?php } ?><input type="hidden" name="p_<?=$f_name?>" value="<?=mod_HTML($rrty)?>" ></td>
		</tr>

	<?php } ?>
<?php } ?>

<?php if($q->get_dir()==2){ ?>
	<?php if($q->get_file()==0){ ?>

		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=strlen($p[$f_name])>0?modDispText($p[$f_name]):"入力なし"?></td>
		</tr>

	<?php } ?>
	<?php if($q->get_file()==1){ ?>
	
		<tr>
		<td class="confTitle"><?=$d_name?></td>
		<td class="confFields"><?=strlen($_POST[$f_name])>0?modDispText($_POST[$f_name]):"入力なし"?></td>
		</tr>	
	
	<?php } ?>
<?php } ?>
<script type="text/javascript">
$(function(){
	$(".madd,.mdel").click(function(){
		if($(this).attr("class")=="madd"){
			var s='<div class="pms clearfix"><span>項目名：</span><input type="text" size="20" name="zzz_aNNN" value="" class="in tt1" ><span>値：</span><input type="text" size="80" name="zzz_bNNN" value="" class="in tt2" ></div>'
			var l=$(".inmenu div").length;
			s=s.replace("NNN",l)
			$(".inmenu").append(s);
		}else{
			var l=$(".inmenu div").length-1;
			if($(".inmenu div:eq("+l+") input:eq(0)").attr("value")==""&&$(".inmenu div:eq("+l+") input:eq(1)").attr("value")==""){
				$(".inmenu div:eq("+l+")").remove();
			}else{
				if(window.confirm('項目名、値が入力されていますが削除しますか？')){
					$(".inmenu div:eq("+l+")").remove();
				}
			}
		}
	});
});
</script>