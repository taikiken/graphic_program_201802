<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

include "local.php";
include_once __DIR__."/../../../app/helpers/env.helper.php";


// run
// ==============================

// spb保存時に最新のpicksを$TMP_AU_PICKSに保存してる
if (file_exists($TMP_AU_PICKS))
{
  $res = file_get_contents($TMP_AU_PICKS);
}

else
{
  $S3Module = new S3Module;
  if (isset($_GET['date'])) {
    $date = mb_ereg_replace('[^0-9]', '', $_GET['date']);
    $url = $S3Module->getUrl(str_replace('{date}', $date, $AU_ARCHIVE_PICKS));
  } else {
    $url = $S3Module->getUrl($AU_PICKS_FILENAME);
  }

  $picks_xml = simplexml_load_file($url);
  if ($picks_xml) {
    $picks_xml->asXML($TMP_AU_PICKS);
    $res = file_get_contents($TMP_AU_PICKS);

  } else {
    $res = 'ファイルが存在しません';
  }
}

// print
// ------------------------------
echo $res;

?>