<?php

include $INCLUDEPATH."local.php";
include $INCLUDEPATH."public/import.php";

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
  $id = [
    'id' => $result["id"]
  ];
}

echo $id;
?>