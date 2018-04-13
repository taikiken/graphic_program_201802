<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

include_once __DIR__."/../../../../include/conf/config.php";
include_once __DIR__."/../../../../app/helpers/env.helper.php";
include_once __DIR__ . "/../../../../include/aws.php";

$servername=$_SERVER["SERVER_NAME"];
if (preg_match("/cms/",$servername) ||
  preg_match("/dev/",$servername))
{
  $res = ['result' => 'NG'];
  $is_exist_json = false;
  $is_saved_tmp_file = false;
  $archive_to_prd_error = [];
//  $content = '';

  if (isset($_GET['date'])) {
    $_GET['date'] = mb_ereg_replace('[^0-9]', '', $_GET['date']);
    $prd_filename = $TOJ_FILENAME;
    $tmp_filename = $TMP_TOJ;
    $archive_filename = $ARCHIVE_TOJ;
    $archive_filename = str_replace('{date}', $_GET['date'], $archive_filename);

    $S3Module = new S3Module;
    $date = mb_ereg_replace('[^0-9]', '', $_GET['date']);
    $url = $S3Module->getUrl(str_replace('{date}', $date, $archive_filename));
    if ($bucket=="img-sportsbull-jp")
    {
      $url = str_replace('https://s3-ap-northeast-1.amazonaws.com/img-sportsbull-jp', 'https://img.sportsbull.jp', $url);
    }
    if (simplejson_load_file($url))
    {
      $is_exist_json = true;
      $content = file_get_contents($url);
      $is_saved_tmp_file = file_put_contents($tmp_filename, $content, LOCK_EX);
      $archive_to_prd_error = s3upload($tmp_filename, $prd_filename);
      unlink($tmp_filename);
    }


    $res = [
      'result'            => 'OK',
      'existArchivedJson'  => $is_exist_json,
      'savedBytesTmpFile' => $is_saved_tmp_file,
      'archiveToPrdErr'   => $archive_to_prd_error,
//      'content'           => $content, // debug
      ];
  }

  header("Content-Type: application/json; charset=utf-8");
  print json_encode($res);
}
else
{
  header('Location: ' . '/', true, 301);
  exit;
}
