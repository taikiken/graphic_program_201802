<?php if($CURRENTDIRECTORY!="log"){ ?>
<?php if($q->get_dir()===3){ ?>

<?php // 一覧ヘッダー定義 ?>
<tr>
<?php if($NUMBERINGOFF!=1){ ?>
<th scope="col" width="45" class="t_numbering<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>">順番</th>
<?php } ?>
  <?php if ($CURRENTDIRECTORY != "company_news") { ?>
    <th scope="col" width="35" class="t_display<?php if(getSorC("draft")!=1){ ?>_disabled<?php } ?>">公開</th>
  <?php } ?>
<th scope="col" class="t_title"><?=$THIS?>タイトル</th>
        <?php if($CURRENTDIRECTORY == "photo"){?>
            <th scope="col" width="55" align="center" class="t_edit<?php if(getSorC("edit")!=1){ ?>_disabled<?php } ?>">画像一覧</th>
        <?php }else{?>
            <th scope="col" width="55" align="center" class="t_edit<?php if(getSorC("edit")!=1){ ?>_disabled<?php } ?>">編集</th>
        <?php }?>

        <?php if($CURRENTDIRECTORY == "photo"){?>
            <th scope="col" width="55" align="center" class="t_edit<?php if(getSorC("edit")!=1){ ?>_disabled<?php } ?>">編集</th>
        <?php }?>
<th scope="col" width="55" align="center" class="t_delete<?php if(getSorC("delete")!=1){ ?>_disabled<?php } ?>">削除</th>
</tr>

<?php // 一覧詳細定義 ?>
<?php for($i=0;$i<count($p);$i++){ ?>

<tr class="blockds" style="border-top:1px dotted #ccc;">
<?php if($NUMBERINGOFF!=1){ ?>
<td class="numbering"><?php if($p[$i]["n"]!=1){ ?><a<?php if(getSorC("order")==1){ ?> href="javascript://" onclick="javascript:cn(<?=$p[$i]["n"]?>,1)"<?php } ?>><img src="/shared/cms/img/cmd_up<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>.gif" width="13" height="13" alt="一つ上へ入れ替える" ></a><?php }else{ ?><img src="/shared/cms/img/cmd_ups<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>.gif" width="13" height="13" alt="一つ上へ入れ替える" ><?php } ?><?php if($p[$i]["n"]!=$N){ ?><a<?php if(getSorC("order")==1){ ?> href="javascript://" onclick="javascript:cn(<?=$p[$i]["n"]?>,0)"<?php } ?>><img src="/shared/cms/img/cmd_down<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>.gif" width="13" height="13" alt="一つ下へ入れ替える" ></a><?php }else{ ?><img src="/shared/cms/img/cmd_downs<?php if(getSorC("order")!=1){ ?>_disabled<?php } ?>.gif" width="13" height="13" alt="一つ下へ入れ替える" ><?php } ?>
<?php } ?>
<!--
<img src="/shared/cms/img/cmd_ups_disabled.gif" width="13" height="13" alt="一つ上へ入れ替える" ><img src="/shared/cms/img/cmd_downs_disabled.gif" width="13" height="13" alt="一つ下へ入れ替える" >
-->
</td>
  <?php if ($CURRENTDIRECTORY != "company_news") { ?>
    <td class="display"><?php
      if($CURRENTDIRECTORY == "photo"){
        echo sprintf("<div class=\"dp\"><img src=\"/shared/cms/img/cmd_%sactive.gif\" width=\"13\" height=\"13\" class=\"flagswitch lang_%s\" id=\"e%s\"></div>",$p[$i]["flag".$LANG[$EI]]!=1?"dis":"",$LANG[$EI],$p[$i]["id"]);

      } else {
        if(getSorC("draft")==1){
          echo sprintf("<div class=\"dp\"><img src=\"/shared/cms/img/cmd_%sactive.gif\" width=\"13\" height=\"13\" class=\"flagswitch lang_%s\" id=\"e%s\"></div>",$p[$i]["flag".$LANG[$EI]]!=1?"dis":"",$LANG[$EI],$p[$i]["id"]);
        }else{
          echo "<div class=\"dp2\"><img src=\"/shared/cms/img/cmd_active_disabled.gif\" width=\"13\" height=\"13\"></div>";
        }
      }

      ?></td>
  <?php } ?>
<td class="colname"><?php include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/fetchdata.php"; ?></td>
    <?php if($CURRENTDIRECTORY == "photo"){?>
        <td><a href="./list/?<?=$EDITDELETEINITIAL?>id=<?=$p[$i]["id"]?>&<?=$g->g_url()?>" class="menu"><span class="edit">画像一覧</span></a></td>
    <?php }else{?>
        <td><a<?php if(getSorC("edit")==1){ ?> href="./edit/?<?=$EDITDELETEINITIAL?>id=<?=$p[$i]["id"]?>&<?=$g->g_url()?><?php if($CURRENTDIRECTORY=="repo_e"){ ?>&types=<?=$p[$i]["types"]?><?php } ?>"<?php } ?> class="menu"><span class="edit<?php if(getSorC("edit")!=1){ ?>_disabled<?php } ?>">編集</span></a></td>
    <?php }?>

    <?php if($CURRENTDIRECTORY == "photo"){?>
        <td><a href="/editdm/repo_n/edit/?<?=$EDITDELETEINITIAL?>id=<?=$p[$i]["id"]?>&cid=1" class="menu"><span class="edit">編集</span></a></td>
    <?php }?>
    <?php if($CURRENTDIRECTORY == "photo"){?>
                <td><a href="/editdm/repo_n/delete/?<?=$EDITDELETEINITIAL?>id=<?=$p[$i]["id"]?>&cid=1" class="menu"><span class="delete">削除</span></a></td>

    <?php }else{?>
                <td><a<?php if(getSorC("delete")==1){ ?> href="./delete/?<?=$EDITDELETEINITIAL?>id=<?=$p[$i]["id"]?>&<?=$g->g_url()?><?php if($CURRENTDIRECTORY=="repo_e"){ ?>&types=<?=$p[$i]["types"]?><?php } ?>"<?php } ?> class="menu"><span class="delete<?php if(getSorC("delete")!=1){ ?>_disabled<?php } ?>">削除</span></a></td>
    <?php }?>
</tr>
<?php } ?>
<?php }else{ ?>
<?php if($q->get_file()!==2){ ?>
<!--
<tr>
<th colspan="2" class="inputHeader" scope="row"><?php if($q->get_dir()==4&&$q->get_file()==1){ ?>検索結果<?php }else{ ?><?=$THIS?>設定<?php } ?></th>
</tr>
-->
<?php } ?>

<?php include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/ex.php"; ?>
<?php include $INCLUDEPATH."lib/".$CURRENTDIRECTORY."/px.php"; ?>

<?php } ?>

<?php }else{ ?>
<tr>
<th class="menuTitle" scope="col">作業履歴</th>
</tr>
<?php for($i=0;$i<count($p);$i++){ ?>
<tr>
<td class="menuChild"><dl class="ml"><dt><?=$p[$i]["m_time"]?></dt><dd><?=$p[$i]["usr"]?>が<?=mod_HTML($p[$i]["message"])?><?php if($p[$i]["flag"]!=1){ ?><p title="<?=mod_HTML($p[$i]["sql"])?>"><?=mod_HTML($p[$i]["error"])?></p><?php } ?></dd></dl></td>
</tr>
<?php } ?>

<?php } ?>
