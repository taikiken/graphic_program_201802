<table class="notcs">
<?php if($gBILL!=1){ ?>
<tr>
<?php if(strlen($DIRECTORY)>0){ ?><td width="15"><a href="<?=$domain?><?=rewrite($DIRECTORY,$p[$i])?>" target="_blank"><img src="/shared/cms/img/icon_browser.gif" width="16" height="16" ></a><td><?php } ?>
<td>
<?php

if($TABLE=="repo_n"){

	$title =sprintf("[%s-%s-%s %s:%s] ",$p[$i]["a1"],$p[$i]["a2"],$p[$i]["a3"],$p[$i]["a4"],$p[$i]["a5"]);
	$title.=mod_HTML($p[$i]["title"],1);
	
	$sql=sprintf("select title from u_media where id=%s",$p[$i]["d2"]);
	$o->query($sql);
	$f=$o->fetch_array();
	
	$title.=sprintf("（%s）",$f["title"]);

}elseif($TABLE=="u_member"){

	$title="";
	$title.=mod_HTML($p[$i]["title"]);

}elseif($TABLE=="u_media"){

	$title="";
	$title.=mod_HTML($p[$i]["title"]);
	
	if($p[$i]["id"]==33)$title.="（WBC関連記事）";
	
}elseif($TABLE=="u_categories"){

	$title="";
	$title.=mod_HTML($p[$i]["name"]);

}elseif($TABLE=="u_epg"){

	$title=sprintf("[%s] ",$p[$i]["pid"]);
	$title.=mod_HTML($p[$i]["title"]);

}elseif($TABLE=="u_headline") {

    if (!preg_match("/^[0-9]+$/", $p[$i]["d2"])) {
        preg_match("/^([0-9]+):/", $p[$i]["d2"], $r);
        $sid = $r[1];
    } else {
        $sid = $p[$i]["d2"];
    }

    $sql = sprintf("select a1,a2,a3,a4,a5,title,(select name from u_categories where id=m1) as category,(select title from u_media as e where e.id=repo_n.d2) as media from repo_n where id=%s", $sid);
    $o->query($sql);
    $f = $o->fetch_array();

    $title = strlen($p[$i]["title"]) > 0 ? sprintf("[%s-%s-%s %s:%s] %s：%s(%s)", $f["a1"], $f["a2"], $f["a3"], $f["a4"], $f["a5"], $f["category"], strlen($p[$i]["title"]) > 0 ? $p[$i]["title"] : $f["title"], $f["media"]) : "-";
}elseif($TABLE=="photo"){
    $title = $p[$i]["title"];
}else{
	$title=mod_HTML($p[$i]["title"],1);

}
if(isset($_GET['nid']))
{
    echo '<input type="text" name="title" class="caption" value="' . $title . '" size="40">';
}
else
{
    echo $title;
}

/*
$settings["u_media"]=array(array(100,75),array("システム","広告"));
$settings["repo_n"]=array(array(75),array("広告"));
$settings["u_categories"]=array(array(85,75),array("テーマ","広告"));
*/

$settings["u_media"]=array(array(130),array("システム/広告"));
$settings["repo_n"]=array(array(75),array("広告"));
$settings["photo"]=array(array(75),array("広告"));
$settings["u_categories"]=array(array(120),array("テーマ/広告"));

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