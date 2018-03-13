<?php

include $INCLUDEPATH . "local.php";

// DBオブジェクト作成
$dbo = new db;
$dbo->connect();

//カテゴリが平昌の記事で表示設定になっている記事を、非表示にするsql文
$sql = <<<SQL_EOL
UPDATE 
  repo_n
SET
  direct_link_url = '平昌記事の一時退避flag1',
  flag = 2 
WHERE (m1=165 OR m2=165)
AND
  flag=1;
SQL_EOL;
$dbo->query($sql);
$updated_row_count_pyeongchang_flag1 = $dbo->affected_rows2();

$sql = <<<SQL_EOL
UPDATE
  repo_n
SET
  direct_link_url = '平昌記事の一時退避flag3',
  flag = 2
WHERE
  (m1=165 OR m2=165)
AND
  flag=3;
SQL_EOL;
$dbo->query($sql);
$updated_row_count_pyeongchang_flag3 = $dbo->affected_rows2();

echo "flagが1のレコードを" . $updated_row_count_pyeongchang_flag1 . "件更新しました。";
echo "<br>";
echo "flagが3のレコードを" . $updated_row_count_pyeongchang_flag3 . "件更新しました。";
