<?php

//system("cd /tmp; rm -rf csv; mkdir -m 0777 csv;");


include $INCLUDEPATH."local.php";
include $INCLUDEPATH."form.php";

$form=new form($_GET["id"],0);
$form->csvDownload();

?>