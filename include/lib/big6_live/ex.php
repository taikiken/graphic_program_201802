<?php

$a[] = array("head", "live設定");
$a[] = array("textfield", "デスクトップ画像のURL", "alt-large", "30", "", "");
$a[] = array("textfield", "モバイル画像のURL", "alt-medium", "30", "", "");
$a[] = array("textfield", "デスクトップエラー時の画像のURL", "error-large", "30", "", "");
$a[] = array("textfield", "モバイルエラー時の画像のURL", "error-medium", "30", "", "");
$a[] = array("textfield", "ポーリング(秒)", "interval", "30", "", "");
$a[] = array("textfield", "ライブステータス", "isPlaying", "30", "", "");
$a[] = array("head", "ブライトコープ設定");
$a[] = array("textfield", "ブライトコープvideoID", "video_id", "30", "", "");
$a[] = array("textfield", "広告動画URL (android)", "android", "30", "", "");
$a[] = array("textfield", "広告動画URL (ios)", "ios", "30", "", "");
$a[] = array("textfield", "広告動画URL (pc)", "pc", "30", "", "");
$a[] = array("textfield", "広告動画URL (sp)", "sp", "30", "", "");
$a[] = array("textfield", "ソース", "source", "30", "", "");
for($count =0;$count < 4; $count++){
  $a[] = array("head", "PCソース設定 ".$count);
  $a[] = array("textfield", "ラベル", "label".$count, "30", "", "");
  $a[] = array("textfield", "デフォルトフラグ", "default".$count, "30", "", "");
  $a[] = array("textfield", "優先順位", "res".$count, "30", "", "");
  $a[] = array("textfield", "HLS動画URL", "url".$count, "30", "", "");
}
for($count =0;$count < 3; $count++){
  $a[] = array("head", "SPソース設定 ".$count);
  $a[] = array("textfield", "ラベル", "sp_label".$count, "30", "", "");
  $a[] = array("textfield", "デフォルトフラグ", "sp_default".$count, "30", "", "");
  $a[] = array("textfield", "優先順位", "sp_res".$count, "30", "", "");
  $a[] = array("textfield", "HLS動画URL", "sp_url".$count, "30", "", "");
}

include $INCLUDEPATH."print_write.php";

?>