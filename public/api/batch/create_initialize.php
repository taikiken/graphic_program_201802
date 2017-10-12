<?php

include $INCLUDEPATH . "local.php";
include $INCLUDEPATH . "public/check.php";

$o=new db;
$o->connect();

create_initialize_json(true);