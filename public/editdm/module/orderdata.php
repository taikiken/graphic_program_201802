<?php

<tr>
<th scope="col" width="45" class="t_numbering<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>">����</th>
<th scope="col" width="35" class="t_display<?php if(getSorC("draft")!=1){ ?>_disabled<?php } ?>">����</th>
<th scope="col" class="t_title"><?=$THIS?>�����ȥ�</th>
<th scope="col" width="55" align="center" class="t_edit<?php if(getSorC("edit")!=1){ ?>_disabled<?php } ?>">�Խ�</th>
<th scope="col" width="55" align="center" class="t_delete<?php if(getSorC("delete")!=1){ ?>_disabled<?php } ?>">���</th>
</tr>
<?php for($i=0;$i<count($p);$i++){ ?>

<tr class="blockds" style="border-top:1px dotted #ccc;">
<td class="numbering"><?php if($p[$i]["n"]!=1){ ?><a<?php if(getSorC("order")==1){ ?> href="javascript://" onclick="javascript:cn(<?=$p[$i]["n"]?>,1)"<?php } ?>><img src="/shared/cms/img/cmd_up<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>.gif" width="13" height="13" alt="��ľ�������ؤ���" ></a><?php }else{ ?><img src="/shared/cms/img/cmd_ups<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>.gif" width="13" height="13" alt="��ľ�������ؤ���" ><?php } ?><?php if($p[$i]["n"]!=$N){ ?><a<?php if(getSorC("order")==1){ ?> href="javascript://" onclick="javascript:cn(<?=$p[$i]["n"]?>,0)"<?php } ?>><img src="/shared/cms/img/cmd_down<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>.gif" width="13" height="13" alt="��Ĳ��������ؤ���" ></a><?php }else{ ?><img src="/shared/cms/img/cmd_downs<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>.gif" width="13" height="13" alt="��Ĳ��������ؤ���" ><?php } ?>
<!--
<img src="/shared/cms/img/cmd_ups_disabled.gif" width="13" height="13" alt="��ľ�������ؤ���" ><img src="/shared/cms/img/cmd_downs_disabled.gif" width="13" height="13" alt="��Ĳ��������ؤ���" >
-->
</td>
<td class="display"><?php

if(getSorC("draft")==1){
	echo sprintf("<div class=\"dp\"><img src=\"/shared/cms/img/cmd_%sactive.gif\" width=\"13\" height=\"13\" class=\"flagswitch lang_%s\" id=\"e%s\"></div>",$p[$i]["flag".$LANG[$EI]]!=1?"dis":"",$LANG[$EI],$p[$i]["id"]);
}else{
	echo "<div class=\"dp2\"><img src=\"/shared/cms/img/cmd_active_disabled.gif\" width=\"13\" height=\"13\"></div>";
}

?></td>
<td class="colname"><?php include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/fetchdata.php"; ?></td>
<td><a<?php if(getSorC("edit")==1){ ?> href="./edit/?<?=$EDITDELETEINITIAL?>id=<?=$p[$i]["id"]?>&<?=$g->g_url()?><?php if($CURRENTDIRECTORY=="repo_e"){ ?>&types=<?=$p[$i]["types"]?><?php } ?>"<?php } ?> class="menu"><span class="edit<?php if(getSorC("edit")!=1){ ?>_disabled<?php } ?>">�Խ�</span></a></td>
<td><a<?php if(getSorC("delete")==1){ ?> href="./delete/?<?=$EDITDELETEINITIAL?>id=<?=$p[$i]["id"]?>&<?=$g->g_url()?><?php if($CURRENTDIRECTORY=="repo_e"){ ?>&types=<?=$p[$i]["types"]?><?php } ?>"<?php } ?> class="menu"><span class="delete<?php if(getSorC("delete")!=1){ ?>_disabled<?php } ?>">���</span></a></td>
</tr>

?>