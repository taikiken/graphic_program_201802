<table class="notcs">
    <tr>
    <?php

    $sql=sprintf("select name from bottom_tab_livescores where id = %s", $p[$i]["id"]);
    $o->query($sql);
    $title=$o->fetch_array()["name"];


    echo $title;
    ?>
    </tr>
</table>