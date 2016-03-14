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

$helper = $fb->getRedirectLoginHelper();
try {
	$accessToken = $helper->getAccessToken();
	
	var_dump($accessToken);
	
	$request = new FacebookRequest(
	  $_SESSION['facebook_access_token'],
	  'GET',
	  '/10153231379946729'
	);
	$response = $request->execute();
	$graphObject = $response->getGraphObject();
	
	var_dump($graphObject);
	
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	echo 'Graph returned an error: ' . $e->getMessage();
	exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
	echo 'Facebook SDK returned an error: ' . $e->getMessage();
	exit;
}


?>