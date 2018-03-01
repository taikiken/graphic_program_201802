<?php

// このファイルはcmsサーバから、web{n}サーバにrsyncで同期されません
// 変更する際はweb{n}サーバのファイルを編集する必要があります
// リードレプリカのエンドポイントはweb{n}サーバで異なるため
// 編集する際はクラウドパックインフラチームに声をかけてください

if (preg_match("/dev/", $servername)) {
  $DBHOST = "undo-dev.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
  $DBNAME = "ut_devnew";

} elseif (preg_match("/stg/", $servername)) {
  $DBHOST = "undo-dev.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
  $DBNAME = "ut_stgnew";

} else {
  $DBNAME = "ut0";
  if (preg_match("/editdm|write|batch|password|image/", $filename)) {
    //マスターDB
    $DBHOST = "undo-prod.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
  } else {
    //リードレプリカ ※スケールアウトの場合、ここを変更
    $DBHOST = "undo-prod-replica-c1.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
  }
}

?>