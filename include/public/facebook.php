<?php

session_start();
require_once 'facebook-php-sdk-v5/autoload.php';

use Facebook\FacebookSession;
use Facebook\FacebookRequest;
use Facebook\FacebookRedirectLoginHelper;

$fb = new Facebook\Facebook([
	'app_id' => '842032129256034',
	'app_secret' => 'ab26d22cfed9a6304607398556ae7e30',
	'default_graph_version' => 'v2.5',
]);

?>