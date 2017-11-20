<?php
date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

$_include = __DIR__ . '/../../../../include/';

include $_include . 'conf/config.php';
include $_include . 'postgre.php';
include $_include . 'func.php';
include $_include . 'aws.php';
include_once __DIR__. "/../../../../app/helpers/env.helper.php";

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

  echo sendResponse(getKinds($target));
}

function sendResponse($result)
{
  return json_encode($result);
}

function getKinds($target, $offset=0)
{
  $conditions = ['created_at IS NOT NULL'];
  if($target !== 'ALL')
  {
    $conditions[] = "DATE_FORMAT(created_at, '%Y%m') = {$target}";
  }

  $condtion = ' WHERE ' . join(' AND ', $conditions);

  $sql =<<<SQL
  SELECT * FROM u_member_signup {$condtion} LIMIT 20 {$offset}
SQL;

  $o=new db;
  $o->connect();
  $list = [];
  $o->query($sql);
  var_dump($sql);
  while($row = $o->fetch_object()) {
    $list[] = $row;
  }

  return $list;
}

?>