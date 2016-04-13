<table class="notcs">
<?php if($gBILL!=1){ ?>
<tr>
<td><?php if(strlen($DIRECTORY)>0){ ?><a href="http://www.undotsushin.com<?=rewrite($DIRECTORY,$p[$i])?>" target="_blank"><img src="/shared/cms/img/icon_browser.gif" width="16" height="16" ></a><?php } ?>
<?php

if($_GET["cid"]==1){

	$title =sprintf("[%s-%s-%s %s:%s] ",$p[$i]["a1"],$p[$i]["a2"],$p[$i]["a3"],$p[$i]["a4"],$p[$i]["a5"]);
	$title.=mod_HTML($p[$i]["title"],1);
	
	$sql=sprintf("select title from u_member where id=%s",$p[$i]["d2"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$title.=sprintf("（%s）",$f["title"]);

}elseif($_GET["rid"]==2){

	$title="";
	$title.=mod_HTML($p[$i]["title"]);

}elseif($_GET["rid"]==7){
	
	if(!preg_match("/^[0-9]+$/",$p[$i]["d2"])){
		preg_match("/^([0-9]+):/",$p[$i]["d2"],$r);
		$sid=$r[1];
	}else{
		$sid=$p[$i]["d2"];
	}
	
	$sql=sprintf("select '['||a1||'-'||a2||'-'||a3||' '||a4||':'||a5||'] ' ||(select name from pm_ where id=m1)||'：'||title||'('||(select title from u_member as e where e.id=repo_n.d2)||')' as title from %s where id=%s","repo_n",$sid);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$title=$f["title"];

}else{

	$title=mod_HTML($p[$i]["title"],1);

}

echo $title;

?>
</td>
<?php if($CONTENTSEDIT==1){ ?><td><a href="../repo_e/?nid=<?=$p[$i]["id"]?>&<?=$g->g_url()?>" class="toe"><img src="/shared/cms/img/file.png" width="17" height="16">ページ管理</a></td><?php } ?>
</tr>
<?php }else{ ?>
<?php for($EI=0;$EI<count($LANG);$EI++){ ?>
<?php $TITLEFLAG=strlen($p[$i]["title".$LANG[$EI]])>0; ?>
<tr class="<?=$LANG[$EI]?>">
<td class="clearfix mnlang"><span class="sp00e"><?=strtoupper($LANG[$EI])?></span></td>
<td class="mndisp"><div class="dp"><img src="/shared/cms/img/cmd_<?php if($p[$i]["flag".$LANG[$EI]]!=1){ ?>dis<?php } ?>active.gif" width="13" height="13" class="flagswitch lang_<?=$LANG[$EI]?>" id="e<?=$p[$i]["id"]?>"></div></td>
<td><?php if(strlen($p[$i]["m2"])>0){ ?><img src="/shared/img/common/ct<?=$p[$i]["m2"]?>.png" style="float:left;"><?php } ?><?php if(strlen($DIRECTORY)>0&&$TITLEFLAG==1){ ?><a href="http://www.undotsushin.com<?=rewrite($DIRECTORY,$p[$i],$LANG[$EI])?>" target="_blank"><img src="/shared/cms/img/icon_browser.gif" width="16" height="16"></a><?php } ?><?=$TITLEFLAG==1?sprintf("[<b class=\"sedx\">%s</b>] ",timemapping($p[$i]["m_time"])).mod_HTML($p[$i]["title".$LANG[$EI]],1):"<span class=\"colred\">タイトル未設定</span>"?></td>
<?php if($CONTENTSEDIT==1){ ?><td class="pl5"><a href="../repo_e/?nid=<?=$p[$i]["id"]?>&<?=$g->g_url()?>" class="toe"><img src="/shared/cms/img/file.png" width="17" height="16">[<?=strtoupper($LANG[$EI])?>]ページ管理</a></td><?php } ?>
</tr>
<?php } ?>
<?php } ?>
</table>