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
    $conditions[] = "TO_CHAR(created_at, 'YYYYMM') = '{$target}'";
    $condtion = ' WHERE ' . join(' AND ', $conditions);

    $result = [
      'total_count'    => 0,
      'mail_count'     => 0,
      'tw_count'       => 0,
      'fb_count'       => 0,
      'mail_count_wow' => 0,
      'tw_count_wow'   => 0,
      'fb_count_wow'   => 0,
    ];

    $sql =<<<SQL
    SELECT COUNT(*) AS count FROM u_member m;
SQL;
    $o=new db;
    $o->connect();
    $o->query($sql);
    $count = $o->fetch_object()->count;
    $result['total_count'] = $count;

    $sql =<<<SQL
    SELECT
      kind,
      COUNT(m.id) AS count
    FROM
      u_member m
      INNER JOIN u_member_signup ms ON(id = userid)
    {$condtion} GROUP BY kind
SQL;
    $o=new db;
    $o->connect();
    $o->query($sql);
    while($row = $o->fetch_object()) {
      switch($row->kind) {
        case 1:  $result['mail_count'] = $row->count; break;
        case 2:  $result['tw_count'] = $row->count; break;
        case 3:  $result['fb_count'] = $row->count; break;
        case 11: $result['mail_count_wow'] = $row->count; break;
        case 12: $result['tw_count_wow'] = $row->count; break;
        case 13: $result['fb_count_wow'] = $row->count; break;
      }
    }
  }

  return $result;
}

?>