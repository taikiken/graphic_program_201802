<?php

include "local.php";
include "public/import.php";


// desktop
$pc_header = $domain."/inc/header/vk/desktop/";
$pc_footer = $domain."/inc/footer/vk/desktop/";
$pc_css = $domain."/inc/assets/vk/desktop/inc.css";
$pc_js = $domain."/inc/assets/vk/responsive/inc.js/";
$pc_init = $domain."/assets/facebook/init.js";

// mobile
$sp_header = $domain."/inc/header/vk/mobile/";
$sp_footer = $domain."/inc/footer/vk/mobile/";
$sp_css = $domain."/inc/assets/vk/mobile/inc.css";
$sp_js = $domain."/inc/assets/vk/responsive/inc.js/";
$sp_init = $domain."/assets/facebook/init.js";
$sp_synapse = $domain."/assets/sp/js/libs/synapse/synapse.js";
$sp_jquery = $domain."/assets/js/libs/jquery2/jquery.min.js";
$sp_inview = $domain."/assets/sp/js/libs/synapse/extras/jquery.inview.js";

$ftp_address = $VK_FTP_ADDRESS;

$ftp_user = "sportsbull";
$ftp_pass = $VK_FTP_PASS;

$ftpValue = array(
  'ftp_server' => $ftp_address,
  'ftp_user_name' => $ftp_user,
  'ftp_user_pass' => $ftp_pass
);

$connection = ftp_connect($ftpValue['ftp_server']);

$login_result = ftp_login(
  $connection,
  $ftpValue['ftp_user_name'],
  $ftpValue['ftp_user_pass']
);

ftp_pasv($connection, true);

// PC用hearder
$filename = "spbl_header_d.html";
$key = "/data/spbl_header_d.html";
$tmp = "/tmp/tmp_header_d.html";

$file = file_get_contents($pc_header);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// PC用footer
$filename = "spbl_footer_d.html";
$key = "/data/spbl_footer_d.html";
$tmp = "/tmp/tmp_footer_d.html";

$file = file_get_contents($pc_footer);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// PC用CSS
$filename = "inc.css(pc)";
$key = "/data/inc.css";
$tmp = "/tmp/inc_d.css";

$file = file_get_contents($pc_css);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// PC用JS
$filename = "spbl_inc_d.js";
$key = "/data/spbl_inc_d.js";
$tmp = "/tmp/spbl_inc_d.js";

$file = file_get_contents($pc_js);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// PC用video
$filename = "fb-video.js(PC)";
$key = "/data/fb-video.js";
$tmp = "/tmp/fb-video_d.js";

$file = file_get_contents($pc_init);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// SP用header
$filename = "spbl_header_m.html";
$key = "/data/sp/spbl_header_m.html";
$tmp = "/tmp/tmp_header_m.html";

$file = file_get_contents($sp_header);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// SP用footer
$filename = "spbl_footer_m.html";
$key = "/data/sp/spbl_footer_m.html";
$tmp = "/tmp/tmp_footer_m.html";

$file = file_get_contents($sp_footer);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// SP用CSS
$filename = "inc.css(sp)";
$key = "/data/sp/inc.css";
$tmp = "/tmp/inc_m.css";

$file = file_get_contents($sp_css);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// SP用JS
$filename = "spbl_inc_m.js";
$key = "/data/sp/spbl_inc_m.js";
$tmp = "/tmp/spbl_inc_m.js";

$file = file_get_contents($sp_js);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// SP用video
$filename = "fb-video.js(SP)";
$key = "/data/sp/fb-video.js";
$tmp = "/tmp/fb-video_m.js";

$file = file_get_contents($sp_init);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// SP用synapse
$filename = "synapse.js";
$key = "/data/sp/synapse.js";
$tmp = "/tmp/synapse.js";

$file = file_get_contents($sp_synapse);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// SP用jquery
$filename = "jquery.min.js";
$key = "/data/sp/jquery.min.js";
$tmp = "/tmp/jquery.min.js";

$file = file_get_contents($sp_jquery);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

// SP用inveiw
$filename = "jquery.inview.js";
$key = "/data/sp/jquery.inview.js";
$tmp = "/tmp/jquery.inview.js";

$file = file_get_contents($sp_inview);
file_put_contents($tmp, $file);
$ftpResult = ftp_put($connection, $key, $tmp, FTP_BINARY, false);
if (!$ftpResult) {
  echo $filename."のアップロードに失敗しました。".nl2br("\n");
} else {
  echo $filename."のアップロードに成功しました。".nl2br("\n");
}

ftp_close($connection);