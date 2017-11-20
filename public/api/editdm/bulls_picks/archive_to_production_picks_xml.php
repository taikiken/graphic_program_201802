<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

include_once __DIR__."/../../../../include/conf/config.php";
include_once __DIR__."/../../../../app/helpers/env.helper.php";
include_once __DIR__ . "/../../../../include/aws.php";

if ( UT_ENV != 'PRODUCTION' )
{
  $res = ['result' => 'NG'];
  $is_exist_xml = false;
  $is_saved_tmp_file = false;
  $archive_to_prd_error = [];
//  $content = '';

  if (isset($_GET['date'])) {
    $_GET['date'] = mb_ereg_replace('[^0-9]', '', $_GET['date']);
    $prd_filename = isset($_GET['au']) ? $AU_PICKS_FILENAME : $PICKS_FILENAME;
    $tmp_filename = isset($_GET['au']) ? $TMP_AU_PICKS : $TMP_PICKS;
    $archive_filename = isset($_GET['au']) ? $AU_ARCHIVE_PICKS : $ARCHIVE_PICKS;
    $archive_filename = str_replace('{date}', $_GET['date'], $archive_filename);

    $S3Module = new S3Module;
    $date = mb_ereg_replace('[^0-9]', '', $_GET['date']);
    $url = $S3Module->getUrl(str_replace('{date}', $date, $archive_filename));

    if (simplexml_load_file($url))
    {
      $is_exist_xml = true;
      $content = file_get_contents($url);
      $is_saved_tmp_file = file_put_contents($tmp_filename, $content, LOCK_EX);
      $archive_to_prd_error = s3upload($tmp_filename, $prd_filename);
      unlink($tmp_filename);
    }


    $res = [
      'result'            => 'OK',
      'existArchivedXml'  => $is_exist_xml,
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
