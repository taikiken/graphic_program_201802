<?php
header('Content-Type: application/json');
if( $_GET['type'] === 'regist' &&  $_SERVER['SERVER_NAME'] !== 'undotsushin.local')
{
  if( false === strpos($_SERVER['SERVER_NAME'], 'dev.') && false === strpos($_SERVER['SERVER_NAME'], 'cms.') )
  {
    return false;
  }
}

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

$_include = __DIR__ . '/../../../../include/';

include $_include . 'conf/config.php';
include $_include . 'postgre.php';
include $_include . 'func.php';
include $_include . 'aws.php';
include_once __DIR__. "/../../../../app/helpers/env.helper.php";

//
// 面倒いからtypeでAPIを切り分け
// get: json出力
// regist: 登録（cmsのみ）
//

if($_GET['type'] == 'regist') {
  regist_json();
} else {
  get_json();
}

function regist_json()
{
  if(isset(
    $_GET['target_year'],
    $_GET['target_month'],
    $_GET['target_date'],
    $_GET['target_hour'],
    $_GET['target_minutes'],
    $_GET['gold'],
    $_GET['silver'],
    $_GET['bronze']
    ))
  {
    $save_json_array = [
      'update' => "{$_GET['target_year']}-{$_GET['target_month']}-{$_GET['target_date']} {$_GET['target_hour']}:{$_GET['target_minutes']}",
      'medal' => [
        'gold' => intval($_GET['gold']),
        'silver' => intval($_GET['silver']),
        'bronze' => intval($_GET['bronze']),
      ],
      'total' => intval($_GET['gold']) + intval($_GET['silver']) + intval($_GET['bronze'])
    ];

    // upload
    $save_json = json_encode($save_json_array);
    $S3Module = new S3Module();

    $s3 = new S3Module;
    $s3->createObject(json_encode($save_json_array), 'static/pyeongchang/medal.json', 'application/json');
    echo sendResponse([]);
  }
}

function get_json()
{
  $save_json_array = [
    'update' => "",
    'medal' => [
      'gold' => 1,
      'silver' => 1,
      'bronze' => 2,
    ],
    'total' => 4
  ];
  echo sendResponse($save_json_array);
}

function sendResponse($result)
{
  return json_encode($result);
}


?>