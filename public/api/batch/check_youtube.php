<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

$id = [];
$counts = [];
$o = new db;
$o->connect();

$sql =<<<SQL
  SELECT
    id
  FROM
    repo_n
  WHERE
    m1 = 162
SQL;

$o->query($sql);
while($result=$o->fetch_array()){
  $id[] =  $result["id"];
}
$ids = implode(',', $id);

$sql =<<<SQL
  SELECT
    body
  FROM
    repo_body
  WHERE
    pid IN ({$ids})
SQL;

$o->query($sql);
while($result = $o->fetch_array()){
  if(preg_match("/.youtube\.com./", $result["body"])){
    $counts[] = true;
  }
}
echo "Youtube動画を利用している記事数:".count($counts)."件";
echo nl2br("\n");
echo "ダンスカテゴリーの全記事数:".count($id)."件";
?>