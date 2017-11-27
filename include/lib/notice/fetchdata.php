<table class="notcs">
<tr>
<?php if(strlen($DIRECTORY)>0){ ?><td width="14"><a href="<?=$domain?><?=rewrite($DIRECTORY,$p[$i])?>" target="_blank"><img src="<?=strlen($p[$i]["img1"])>0?sprintf("/prg_img/thumbnail2/%s",$p[$i]["img1"]):"/shared/cms/img/icon_browser.gif"?>" width="16"></a><td><?php } ?>
<td>
</td>
<?php if($p[$i]["bodyflag"]==170){ ?><td width="85"><a href="../repo_e/?nid=<?=$p[$i]["id"]?>&<?=$g->g_url()?>" class="toe"><img src="/shared/cms/img/file.png" width="17" height="16">コンテンツ</a></td><?php } ?>
<?php if(preg_match("/u_media|repo_n|u_categories/",$TABLE)){ ?>
<?php for($Hi=0;$Hi<count($settings[$TABLE][1]);$Hi++){ ?>
<td width="<?=$settings[$TABLE][0][$Hi]?>"><a href="../ad/?nid=<?=$p[$i]["id"]?>&<?=$g->g_url()?><?=$settings[$TABLE][1][$Hi]!="広告"?sprintf("&type=1"):""?>" class="toe"><img src="/shared/cms/img/file.png" width="17" height="16"><?=$settings[$TABLE][1][$Hi]?>設定</a></td>
<?php } ?>
<?php } ?>
</tr>
</table>

<?php
$title =sprintf("%s：[タイプ:%s] ",$p[$i]["text"], $p[$i]["type"]);
$title.=mod_HTML($p[$i]["title"],1);

$sql=sprintf("SELECT title FROM notices");
$o->query($sql);
$f=$o->fetch_array();


echo $title;

$settings["notices"]=array(array(130),array("お知らせ"));


?>