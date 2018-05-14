<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

$servername=$_SERVER["SERVER_NAME"];
if (preg_match("/cms/",$servername) ||
    preg_match("/stg/",$servername) ||
    preg_match("/dev/",$servername))
{
  include_once __DIR__."/../../../../include/conf/config.php";
  include_once __DIR__."/../../../../app/helpers/env.helper.php";
  include_once __DIR__ . "/../../../../include/aws.php";

// run
// ==============================

      $toj = $TOJ_FILENAME;

      $S3Module = new S3Module;
      $url = $cf_bucket. $toj;
      $file = file_get_contents($url);
      $res = json_decode($file);

      if(empty($res)){
        $res = 'ファイルが存在しません';
        echo $res;
      } else {
          $isPlaying = $res->live->isPlaying ? "true" : "false";
          $json =<<<_EOD
{
    lastupdate: {$res->lastupdate}
    live: 
    {
        alt: 
        {
            large: {$res->live->alt->large}
            medium: {$res->live->alt->medium}
        },
        error:
        {
            large: {$res->live->error->large}
            medium: {$res->live->error->medium}
        },
        interval: {$res->live->interval}
        isPlaying: {$isPlaying}
        video:
        {
            id: {$res->live->video->id}
        }
    }
}        
_EOD;

        echo $json;
      }
}
else
{
  header('Location: ' . '/', true, 301);
  exit;
}