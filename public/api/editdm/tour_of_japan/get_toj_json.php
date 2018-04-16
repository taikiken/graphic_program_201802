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

      $toj = $TOJ_FILENAME;

      $S3Module = new S3Module;
      $url = $S3Module->getUrl($toj);
      if ($bucket=="img-sportsbull-jp")
      {
        $url = str_replace('https://s3-ap-northeast-1.amazonaws.com/img-sportsbull-jp', 'https://img.sportsbull.jp', $url);
      }

      $file = file_get_contents($url);
      $res = json_decode($file);

      if(empty($res)){
        $res = 'ファイルが存在しません';
        echo $res;
      } else {

      }
}
else
{
  header('Location: ' . '/', true, 301);
  exit;
}