<?php
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
// ALL リスト用
// yyyymmdd 右カラムのレポート用
//

main();

function main()
{
  if(isset($_GET['target']) && preg_match('/^[0-9]+$/', $_GET['target']))
  {
    $target = $_GET['target'];
  }
  elseif(isset($_GET['target']) && ! preg_match('/^[0-9]+$/', $_GET['target']))
  {
    $target = 'ALL';
  }
  else
  {
    $target = date('Ym');
  }

  $offset = 0;
  if(isset($_GET['offset']) && preg_match('/^[0-9]+$/', $_GET['offset']))
  {
    $offset = $_GET['offset'];
  }

  $limit = 20;
  if(isset($_GET['limit']) && preg_match('/^[0-9]+$/', $_GET['limit']))
  {
    $limit = $_GET['limit'];
  }

  echo sendResponse(getKinds($target, $offset, $limit));
}

function sendResponse($result)
{
  return json_encode($result);
}

function getKinds($target, $offset, $limit)
{
  $conditions = ['created_at IS NOT NULL'];
  if($target === 'ALL')
  {
    $sql =<<<SQL
    SELECT
      m.id AS id,
      m.t1,
      m.title,
      ms.kind,
      ms.created_at
    FROM
      u_member m
      INNER JOIN u_member_signup ms ON(id = userid)
    ORDER BY id
    LIMIT {$limit} OFFSET {$offset}
SQL;
      $o=new db;
      $o->connect();
      $list = [];
      $o->query($sql);
      while($row = $o->fetch_object()) {
        $list[] = $row;
      }

      $sql =<<<SQL
      SELECT COUNT(*) AS count FROM u_member m INNER JOIN u_member_signup ms ON(id = userid);
SQL;
      $o=new db;
      $o->connect();
      $o->query($sql);
      $count = $o->fetch_object()->count;

      $result = [
        'list' => $list,
        'total_coount' => $count
      ];
  }
  else
  {
    $conditions[] = "TO_CHAR(u_time, 'YYYYMM') = '{$target}'";
    $condtion = ' WHERE ' . join(' AND ', $conditions);

    $result = [];

    $firstTimestamp = strtotime('first day of ' . $target);
    $lastTimestamp  = strtotime('last day of ' . $target);
    $firstDate = date('Y-m-d', $firstTimestamp);
    $lastDate  = date('Y-m-d', $lastTimestamp);

    $delta = day_diff($firstDate, $lastDate);


    $sql =<<<SQL
    SELECT
      kind,
      TO_CHAR(u_time, 'FMDD') AS day,
      COUNT(m.id) AS count
    FROM
      u_member m
      INNER JOIN u_member_signup ms ON(id = userid)
    {$condtion} GROUP BY kind, day
    ORDER BY day ASC
SQL;
// echo $sql;
    $o=new db;
    $o->connect();
    $o->query($sql);
    while($row = $o->fetch_object()) {
      $day = $row->day;
      if(! isset($result[$day])) {
        $result[$day] = [
          'total_count'    => 0,
          'mail_count'     => 0,
          'tw_count'       => 0,
          'fb_count'       => 0,
          'mail_count_wow' => 0,
          'tw_count_wow'   => 0,
          'fb_count_wow'   => 0,
        ];
      }
      switch($row->kind) {
        case 1:  $result[$day]['mail_count'] = $row->count; break;
        case 2:  $result[$day]['tw_count'] = $row->count; break;
        case 3:  $result[$day]['fb_count'] = $row->count; break;
        case 11: $result[$day]['mail_count_wow'] = $row->count; break;
        case 12: $result[$day]['tw_count_wow'] = $row->count; break;
        case 13: $result[$day]['fb_count_wow'] = $row->count; break;
      }
    }
  }

  $day_list = [];
  for($i=1; $i<=$delta+1; $i++) {
    if(!isset($result[$i])) {
      $result[$i] = [
        'total_count'    => 0,
        'mail_count'     => 0,
        'tw_count'       => 0,
        'fb_count'       => 0,
        'mail_count_wow' => 0,
        'tw_count_wow'   => 0,
        'fb_count_wow'   => 0,
      ];
    }
  }

  return $result;
}

function day_diff($date1, $date2)
{
  $timestamp1 = strtotime($date1);
  $timestamp2 = strtotime($date2);

  $seconddiff = abs($timestamp2 - $timestamp1);

  $daydiff = $seconddiff / (60 * 60 * 24);
  return $daydiff;
 }
?>