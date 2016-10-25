<?php

include "local.php";
include "public/check.php";

$_SESSION=array();
$params=session_get_cookie_params();

setcookie(session_name(),'',time()-42000,"/");
session_destroy();

$o=new db;
$o->connect();

set_email($_POST["email"]);

$y["response"]=$s;
print_json($y,$_SERVER['HTTP_REFERER']);

?>