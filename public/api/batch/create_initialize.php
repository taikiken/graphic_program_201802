<?php

include "local.php";
include "public/check.php";

$o=new db;
$o->connect();

create_initialize_json(true);