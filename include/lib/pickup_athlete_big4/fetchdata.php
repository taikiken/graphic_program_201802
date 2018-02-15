<table class="notcs">
  <tr>

    <td>
      <?php
      $title = mod_HTML($p[$i]["id"] . "：" . $p[$i]["name"]);
      $title .= sprintf(" （表示順 %s ", $p[$i]["sort_no"] . "）");


      echo $title;

      ?>
    </td>

  </tr>
</table>
