<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

include "local.php";
include_once __DIR__."/../../../app/helpers/env.helper.php";


// run
// ==============================

$res = file_get_contents($TMP_PICKS);

// print
// ------------------------------
echo $res;

?>