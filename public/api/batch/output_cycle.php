<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$rssfile="http://cyclestyle.net/feed/article/index.xml";
$xml=get_contents($rssfile);

echo $xml;

?>