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
    $params = compact($_GET);

    $save_json_array = [
      'update' => "{$params['target_year']}-{$params['target_month']}-{$params['target_date']} {$params['target_hour']}:{$params['target_minutes']}",
      'medal' => [
        'gold' => $params['gold'],
        'silver' => $params['silver'],
        'bronze' => $params['bronze'],
      ],
      'total' => intval($params['gold']) + intval($params['silver']) + intval($params['bronze'])
    ];

    // upload
    $save_json = json_encode($save_json_array);
    sendResponse([]);
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