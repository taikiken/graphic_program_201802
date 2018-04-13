<table class="notcs">
    <tr>
    <td><?php if (strlen($DIRECTORY1) > 0) { ?><a href="<?= rewrite($DIRECTORY1, $p[$i]) ?>" target="_blank"><img
            src="/shared/cms/img/icon_browser<?= ($p[$i]["expire"] == 1) ? "" : "_" ?>.gif"
            alt="<?= mod_HTML($p[$i]["name"]) ?>ページをブラウザでプレビューする" width="16" height="16"></a><?php } ?>
        <a href="<?= ($p[$i]["c_flag"] != 1) ? sprintf("%sbottom_tabs_nodes/?parent_tab_id=%s", $ADPATH, $p[$i]["id"]) : sprintf("?cid=%s&rid=%s", $PARAM["rid"], $p[$i]["id"]) ?>" class="folder"><?= mod_HTML($p[$i]["name"]) ?></a>
      </td>
    <?php
    $sql=sprintf("select name from bottom_tab_categories where id = %s", $p[$i]["id"]);
    $o->query($sql);
    $title=$o->fetch_array()["name"];



    ?>
    </tr>
</table>
