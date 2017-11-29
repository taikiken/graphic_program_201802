<table class="notcs">
<tr>
<td><td>
<td></td>
</tr>
</table>

<?php
switch ($p[$i]["type"]) {
  case 0:
    $disp_type = 'notice';
    break;
  case 1:
    $disp_type = 'warning';
    break;
  case 2:
    $disp_type = 'img';
    break;
  default:
    $disp_type = '不正なタイプです';
}

$title =sprintf("[%s] %s ",$disp_type, $p[$i]["text"]);
$title.=mod_HTML($p[$i]["title"],1);

echo $title;

$settings["notices"]=array(array(130),array("お知らせ"));


?>