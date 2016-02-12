<?php if(!$BILLINGUAL){ ?>
<?php if(strlen($p[$i]["pdf"])>0||strlen($p[$i]["url"])>0){ ?>
<?php if(strlen($p[$i]["pdf"])>0){ ?>
<a href="/prg_img/pdf/<?=$p[$i]["pdf"]?>" target="_blank"><img src="/shared/cms/img/icon_pdf.gif" alt="<?=mod_HTML($p[$i]["title"])?>のPDFファイルをプレビューする" width="16" height="16" ></a><?=mod_HTML($p[$i]["title"],1)?><?php }elseif(strlen($p[$i]["url"])>0){ ?><a href="<?=$p[$i]["url"]?>" target="_blank"><img src="/shared/cms/img/icon_browser2.gif" alt="<?=mod_HTML($p[$i]["title"])?>のURLをブラウザで見る" width="106" height="16" ></a><?=mod_HTML($p[$i]["title"],1)?><?php }else{ ?><?=mod_HTML($p[$i]["title"],1)?><?php } ?>
<?php }else{ ?>
<?php if($CONTENTSEDIT){ ?>
<?php
unset($QS);
for($IJ=0;$IJ<count($QUERYSTRING);$IJ++){
$QS[]=sprintf("%s=%s",$QUERYSTRING[$IJ][0],$p[$i][$QUERYSTRING[$IJ][1]]);
}
$QS=implode("&",$QS);
?><?php if(strlen($p[$i]["fulltext"])>0){ ?><a href="/<?=$DIRECTORY?>/index.php?<?=$QS?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=(status($p[$i]["oc"],$p[$i]["sy"],$p[$i]["sm"],$p[$i]["sd"],$p[$i]["ey"],$p[$i]["em"],$p[$i]["ed"]))?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["title"])?>ページをブラウザでプレビューする" width="16" height="16" ></a><a href="./source/?<?=$QS?>&CATEGORYID=<?=$CATEGORYID?>" target="_blank"><img src="/shared/cms/img/icon_html.gif" alt="<?=mod_HTML($p[$i]["title"])?>ページのHTMLソースを表示する" width="16" height="16" ></a><!--<a href="#" onclick="logswitcher(<?=$p[$i]["id"]?>,<?=$ROOTID?>)"><img src="/shared/cms/img/icon_log.gif" alt="<?=mod_HTML($p[$i]["title"])?>アクセス状況を見る" width="16" height="16" ></a>--><?php } ?><a href="../repo_e/?nid=<?=$p[$i]["id"]?>&<?=$g->g_url()?>" class="folder"><?=mod_HTML($p[$i]["title"],1)?></a>
<?php }else{ ?>
<?php
if(strlen($QUERYSTRING)>0){
unset($QS);
for($IJ=0;$IJ<count($QUERYSTRING);$IJ++){
$QS[]=sprintf("%s=%s",$QUERYSTRING[$IJ][0],$p[$i][$QUERYSTRING[$IJ][1]]);
}
$QS=implode("&",$QS);

?><a href="/<?=$DIRECTORY?>/index.php?<?=$QS?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=(status($p[$i]["oc"],$p[$i]["sy"],$p[$i]["sm"],$p[$i]["sd"],$p[$i]["ey"],$p[$i]["em"],$p[$i]["ed"]))?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["title"])?>ページをブラウザでプレビュー" width="16" height="16" ></a><!--<a href="#" onclick="logswitcher(<?=$p[$i]["id"]?>,<?=$ROOTID?>)"><img src="/shared/cms/img/icon_log.gif" alt="<?=mod_HTML($p[$i]["title"])?>アクセス状況を見る" width="16" height="16" ></a>--><?php } ?><?=mod_HTML($p[$i]["title"],1)?>
<?php } ?>
<?php } ?>
<?php }else{ ?>

<?php if(strlen($p[$i]["pdf"])>0||strlen($p[$i]["url"])>0){ ?>
<?php if(strlen($p[$i]["pdf"])>0){ ?>
<span class="j2"><a href="/prg_img/pdf/<?=$p[$i]["pdf"]?>" target="_blank"><img src="/shared/cms/img/icon_pdf.gif" alt="<?=mod_HTML($p[$i]["title"])?>のPDFファイルをプレビューする" width="16" height="16" ></a><?=mod_HTML($p[$i]["title"],1)?></span>
<span class="e2"><?php if(strlen($p[$i]["pdf_e"])>0){ ?><a href="/prg_img/pdf/<?=$p[$i]["pdf_e"]?>" target="_blank"><img src="/shared/cms/img/icon_pdf.gif" alt="<?=mod_HTML($p[$i]["title_e"])?>のPDFファイルをプレビューする" width="16" height="16" ></a><?=checkEnglishTitle($p[$i]["title_e"])?></span>
<?php }elseif(strlen($p[$i]["url"])>0){ ?>
<span class="j2"><a href="<?=$p[$i]["url"]?>" target="_blank"><img src="/shared/cms/img/icon_browser2.gif" alt="<?=mod_HTML($p[$i]["title"])?>のURLをブラウザで見る" width="16" height="16" ></a><?php } ?><?=mod_HTML($p[$i]["title"],1)?></span>
<span class="e2"><?php if(strlen($p[$i]["url_e"])>0){ ?><a href="<?=$p[$i]["url_e"]?>" target="_blank"><img src="/shared/cms/img/icon_browser2.gif" alt="<?=mod_HTML($p[$i]["title_e"])?>のURLをブラウザで見る" width="16" height="16" ></a><?php } ?><?=checkEnglishTitle($p[$i]["title_e"])?></span>
<?php }else{ ?>
<span class="j2"><?=mod_HTML($p[$i]["title"],1)?></span>
<span class="e2"><?=checkEnglishTitle($p[$i]["title_e"])?></span>

<?php } ?>
<?php }else{ ?>
<?php if($CONTENTSEDIT){ ?>

<?php unset($QS);for($IJ=0;$IJ<count($QUERYSTRING);$IJ++){$QS[]=sprintf("%s=%s",$QUERYSTRING[$IJ][0],$p[$i][$QUERYSTRING[$IJ][1]]);}$QS=implode("&",$QS); ?>
<span class="j2"><?php if(strlen($p[$i]["fulltext"])>0){ ?><a href="/<?=$DIRECTORY?>/index.php?<?=$QS?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=(status($p[$i]["oc"],$p[$i]["sy"],$p[$i]["sm"],$p[$i]["sd"],$p[$i]["ey"],$p[$i]["em"],$p[$i]["ed"]))?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["title"])?>ページをブラウザでプレビューする" width="16" height="16" ></a><a href="./source/?<?=$QS?>&CATEGORYID=<?=$CATEGORYID?>" target="_blank"><img src="/shared/cms/img/icon_html.gif" alt="<?=mod_HTML($p[$i]["title"])?>ページのHTMLソースを表示する" width="16" height="16" ></a><!--<a href="#" onclick="logswitcher(<?=$p[$i]["id"]?>,<?=$ROOTID?>)"><img src="/shared/cms/img/icon_log.gif" alt="<?=mod_HTML($p[$i]["title"])?>アクセス状況を見る" width="16" height="16" ></a>--><?php } ?><a href="../repo_e/?nid=<?=$p[$i]["id"]?>&<?=$g->g_url()?>" class="folder"><?=mod_HTML($p[$i]["title"],1)?></a></span>
<?php unset($QS);for($IJ=0;$IJ<count($QUERYSTRING_E);$IJ++){$QS[]=sprintf("%s=%s",$QUERYSTRING_E[$IJ][0],$p[$i][$QUERYSTRING_E[$IJ][1]]);}$QS=implode("&",$QS); ?>
<span class="e2"><?php if(strlen($p[$i]["fulltext_e"])>0){ ?><a href="/<?=$DIRECTORY_E?>/index.php?<?=$QS?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=(status($p[$i]["oc"],$p[$i]["sy"],$p[$i]["sm"],$p[$i]["sd"],$p[$i]["ey"],$p[$i]["em"],$p[$i]["ed"]))?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["title_e"])?>ページをブラウザでプレビューする" width="16" height="16" ></a><?php } ?><?=checkEnglishTitle($p[$i]["title_e"])?></span>

<?php }else{ ?>

<span class="j2"><?php if(strlen($QUERYSTRING)>0){ ?><?php unset($QS);for($IJ=0;$IJ<count($QUERYSTRING);$IJ++){$QS[]=sprintf("%s=%s",$QUERYSTRING[$IJ][0],$p[$i][$QUERYSTRING[$IJ][1]]);}$QS=implode("&",$QS); ?><a href="/<?=$DIRECTORY?>/index.php?<?=$QS?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=(status($p[$i]["oc"],$p[$i]["sy"],$p[$i]["sm"],$p[$i]["sd"],$p[$i]["ey"],$p[$i]["em"],$p[$i]["ed"]))?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["title"])?>ページをブラウザでプレビュー" width="16" height="16" ></a><!--<a href="#" onclick="logswitcher(<?=$p[$i]["id"]?>,<?=$ROOTID?>)"><img src="/shared/cms/img/icon_log.gif" alt="<?=mod_HTML($p[$i]["title"])?>アクセス状況を見る" width="16" height="16" ></a>--><?php } ?><?=mod_HTML($p[$i]["title"],1)?></span>
<span class="e2"><?php if(strlen($QUERYSTRING_E)>0){ ?><?php unset($QS);for($IJ=0;$IJ<count($QUERYSTRING_E);$IJ++){$QS[]=sprintf("%s=%s",$QUERYSTRING_E[$IJ][0],$p[$i][$QUERYSTRING_E[$IJ][1]]);}$QS=implode("&",$QS); ?><a href="/<?=$DIRECTORY_E?>/index.php?<?=$QS?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=(status($p[$i]["oc"],$p[$i]["sy"],$p[$i]["sm"],$p[$i]["sd"],$p[$i]["ey"],$p[$i]["em"],$p[$i]["ed"]))?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["title_e"])?>ページをブラウザでプレビュー" width="16" height="16" ></a><?php } ?><?=checkEnglishTitle($p[$i]["title_e"])?></span>

<?php } ?>
<?php } ?>


<?php }//$_BILL END ?>
