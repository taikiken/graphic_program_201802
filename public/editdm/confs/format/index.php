<?php


$fp=fopen($INCLUDEPATH."conf/configExtend.php","w");
fputs($fp,"");
fclose($fp);

header("Location:../edit/");

?>