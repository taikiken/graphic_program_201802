<?php

$a[] = array("head", "記事");
$a[] = array("textfield", "デスクトップ画像のURL", "alt-large", "30", "", "");
$a[] = array("textfield", "モバイル画像のURL", "alt-medium", "30", "", "");
$a[] = array("textfield", "デスクトップエラー時の画像のURL", "error-large", "30", "", "");
$a[] = array("textfield", "モバイルエラー時の画像のURL", "error-medium", "30", "", "");
$a[] = array("textfield", "ポーリング(秒)", "interval", "30", "", "");
$a[] = array("textfield", "ライブステータス", "isPlaying", "30", "", "");
$a[] = array("textfield", "ブライトコープvideoID", "video_id", array("非公開", "公開"), "", "");

include $INCLUDEPATH."print_write.php";

?>