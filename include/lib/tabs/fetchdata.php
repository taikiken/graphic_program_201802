<table class="notcs">
    <tr>
    <?php

    $sql=sprintf("select name from u_categories where id = %s", $p[$i]["category_id"]);
    $o->query($sql);
    $c_name=$o->fetch_array()["name"];

    $title="";
    $title=mod_HTML($p[$i]["title"],1)."（".$c_name."）";

    echo $title;
    ?>
    </tr>
</table>
