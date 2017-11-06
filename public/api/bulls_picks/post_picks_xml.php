<?php
/*

# big6tv - 順位表


*/

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

include "local.php";
include_once __DIR__."/../../../app/helpers/env.helper.php";


// run
// ==============================

$S3Module = new S3Module;
$url = $S3Module->getUrl($PICKS_FILENAME);
$picks_xml = simplexml_load_file($url);
$picks_xml->asXML($TMP_PICKS);

$res = file_get_contents($TMP_PICKS);

// print
// ------------------------------
echo $res;

?>