<table class="notcs">
<?php if($gBILL!=1){ ?>
<tr>
<?php if(strlen($DIRECTORY)>0){ ?><td width="14"><a href="<?=$domain?><?=rewrite($DIRECTORY,$p[$i])?>" target="_blank"><img src="<?=strlen($p[$i]["img1"])>0?sprintf("/prg_img/thumbnail2/%s",$p[$i]["img1"]):"/shared/cms/img/icon_browser.gif"?>" width="16"></a><td><?php } ?>
<td>
<?php

if($TABLE=="company_news"){

	$title =sprintf("%s：[%s-%s-%s %s:%s] ",$p[$i]["id"],$p[$i]["title"],$p[$i]["url"],$p[$i]["published_at"]);
	$title.=mod_HTML($p[$i]["title"],1);

	$sql=sprintf("select title from company_news");
	$o->query($sql);
	$f=$o->fetch_array();

	$title.=sprintf("（%s）",date("Y年n月j日",strtotime($p[$i]["published_at"])));

}else{

	$title=mod_HTML($p[$i]["title"],1);

}

echo $title;

$settings["company_news"]=array(array(130),array("プレスリリース"));


?>
</td>
<?php if($p[$i]["bodyflag"]==170){ ?><td width="85"><a href="../repo_e/?nid=<?=$p[$i]["id"]?>&<?=$g->g_url()?>" class="toe"><img src="/shared/cms/img/file.png" width="17" height="16">コンテンツ</a></td><?php } ?>
<?php if(preg_match("/u_media|repo_n|u_categories/",$TABLE)){ ?>
<?php for($Hi=0;$Hi<count($settings[$TABLE][1]);$Hi++){ ?>
<td width="<?=$settings[$TABLE][0][$Hi]?>"><a href="../ad/?nid=<?=$p[$i]["id"]?>&<?=$g->g_url()?><?=$settings[$TABLE][1][$Hi]!="広告"?sprintf("&type=1"):""?>" class="toe"><img src="/shared/cms/img/file.png" width="17" height="16"><?=$settings[$TABLE][1][$Hi]?>設定</a></td>
<?php } ?>
<?php } ?>
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