<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

include_once __DIR__."/../../../../include/conf/config.php";
include_once __DIR__."/../../../../app/helpers/env.helper.php";

$servername=$_SERVER["SERVER_NAME"];

if (preg_match("/cms/",$servername) ||
  preg_match("/dev/",$servername))
{
// run
// ==============================

// フォームからjson作成

  var_dump($_POST);

}
else
{
  header('Location: ' . '/', true, 301);
  exit;
}