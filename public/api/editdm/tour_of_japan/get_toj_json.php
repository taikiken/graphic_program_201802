<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

$servername=$_SERVER["SERVER_NAME"];
if (preg_match("/cms/",$servername) ||
  preg_match("/dev/",$servername))
{
  include_once __DIR__."/../../../../include/conf/config.php";
  include_once __DIR__."/../../../../app/helpers/env.helper.php";
  include_once __DIR__ . "/../../../../include/aws.php";

// run
// ==============================
  $res = 'ファイルが存在しません';

    if (isset($_GET['tmp']))
    {
      $tmp_filename = $TMP_TOJ;

      if (json_decode($tmp_filename)) {
        $res = file_get_contents($tmp_filename);
      }

    }
    elseif (isset($_GET['date']))
    {
      $archive_filename = $ARCHIVE_TOJ;

      $S3Module = new S3Module;
      $date = mb_ereg_replace('[^0-9]', '', $_GET['date']);
      $url = $S3Module->getUrl(str_replace('{date}', $date, $archive_filename));
      if ($bucket=="img-sportsbull-jp")
      {
        $url = str_replace('https://s3-ap-northeast-1.amazonaws.com/img-sportsbull-jp', 'https://img.sportsbull.jp', $url);
      }

      if (json_decode($url))
      {
        $res = file_get_contents($url);
      }

    }
    else
    {
      $picks = $TOJ_FILENAME;

      $S3Module = new S3Module;
      $url = $S3Module->getUrl($picks);
      if ($bucket=="img-sportsbull-jp")
      {
        $url = str_replace('https://s3-ap-northeast-1.amazonaws.com/img-sportsbull-jp', 'https://img.sportsbull.jp', $url);
      }

      if (json_decode($url))
      {
        $res = file_get_contents($url);
      }

    }

  // print
  // ------------------------------
    echo $res;
}
else
{
  header('Location: ' . '/', true, 301);
  exit;
}