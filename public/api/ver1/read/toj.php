<?php
include "local.php";
include_once __DIR__ . "/../../../../app/helpers/env.helper.php";

$json = $cf_bucket . 'static/toj/live.json';


$result["status"]["code"] = 200;
$result["status"]["message_type"] = "success";
$result["status"]["user_message"] = "";
$result["status"]["developer_message"] = "";

if (!empty(file_get_contents($json, false, null, 0, 1))) {
  $result["response"] = json_decode(file_get_contents($json), true);
} else {
  $result["response"] = null;
}

// print
// ------------------------------
print_json($result, $_SERVER['HTTP_REFERER']);
