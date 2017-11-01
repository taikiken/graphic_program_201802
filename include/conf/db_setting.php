<?php

//このファイルはcmsサーバからWeb{n}サーバにrsyncされません
//変更した際はcmsサーバだけではなく各Web{n}サーバに手動でアップロードしてください。

if(!preg_match("/dev/",$servername)){
	$DBNAME="ut0";
	if(preg_match("/editdm|write|batch|password|image/",$filename)){
		//マスターDB
		$DBHOST="undo-prod.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
	}else{
		//リードレプリカ ※スケールアウトの場合、ここを変更
		$DBHOST="undo-prod-replica-c1.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
	}
}else{
	// 開発環境DB
	$DBHOST="undo-dev.czcktm8wufta.ap-northeast-1.rds.amazonaws.com";
	$DBNAME="ut_devnew";
}

?>