<?php

$c=new contentsEditor($CONTENTSID,$CATEGORYID,strlen($PARENTID)>0?$PARENTID:0);
$c->htmlOutput();

?>