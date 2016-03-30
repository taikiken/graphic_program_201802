<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

set_email($_POST["email"]);

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>