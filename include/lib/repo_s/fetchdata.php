<?php if($SC==1){ ?>
<span class="j2"><?php if(strlen($DIRECTORY1)>0){ ?><a href="<?=rewrite($DIRECTORY1,$p[$i])?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=($p[$i]["expire"]==1)?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["name"])?>ページをブラウザでプレビューする" width="16" height="16" ></a><?php } ?>
<a href="<?=($p[$i]["c_flag"]!=1) ? sprintf("%srepo_n/?cid=%s&rid=%s",$ADPATH,$p[$i]["id"],$PARAM["rid"]) : sprintf("?cid=%s&rid=%s",$PARAM["rid"],$p[$i]["id"])?>" class="folder"><?=mod_HTML($p[$i]["name"])?></a></span>
<?php if($BILLINGUAL){ ?><span class="e2"><?php if(strlen($DIRECTORY1_E)>0){ ?><a href="<?=rewrite($DIRECTORY1_E,$p[$i])?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=($p[$i]["expire"]==1)?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["name_e"])?>ページをブラウザでプレビューする" width="16" height="16" ></a><?php } ?>
<?=checkEnglishTitle($p[$i]["name_e"])?></span><?php } ?>
<?php }else{ ?>
<span class="j2"><?php if(strlen($DIRECTORY2)>0){ ?><a href="<?=rewrite($DIRECTORY2,$p[$i])?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=($p[$i]["expire"]==1)?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["name"])?>ページをブラウザでプレビューする" width="16" height="16" ></a><?php } ?>
<a href="<?=$ADPATH?>repo_n/?cid=<?=$p[$i]["id"]?>&rid=<?=$PARAM["rid"]?>&qid=<?=$PARAM["cid"]?>" class="folder"><?=mod_HTML($p[$i]["name"])?></a></span>
<?php if($BILLINGUAL){ ?><span class="e2"><?php if(strlen($DIRECTORY2_E)>0){ ?><a href="<?=rewrite($DIRECTORY2_E,$p[$i])?>" target="_blank"><img src="/shared/cms/img/icon_browser<?=($p[$i]["expire"]==1)?"":"_"?>.gif" alt="<?=mod_HTML($p[$i]["name_e"])?>ページをブラウザでプレビューする" width="16" height="16" ></a><?php } ?>
<?=checkEnglishTitle($p[$i]["name_e"])?></span><?php } ?>
<?php } ?>