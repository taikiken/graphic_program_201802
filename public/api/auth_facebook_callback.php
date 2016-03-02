<?php

include "public/facebook.php";

$helper = $fb->getRedirectLoginHelper();
try {
	$accessToken = $helper->getAccessToken();
	$object = $fb->get('/me?fields=id,name,email,picture.width(9999).height(9999)',$accessToken);
} catch(Facebook\Exceptions\FacebookResponseException $e) {
	echo 'Graph returned an error: ' . $e->getMessage();
	exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
	echo 'Facebook SDK returned an error: ' . $e->getMessage();
	exit;
}

$userinfo=$object->getGraphUser();
foreach($userinfo["picture"] as $k=>$v){
	if($k=="url")$picture=$v;
}

$y=array(
	"token"=>$accessToken->getValue(),
	"id"=>$userinfo["id"],
	"name"=>$userinfo["name"],
	"email"=>$userinfo["email"],
	"profile"=>$userinfo["description"],
	"icon"=>$picture
);

?>
<pre><?php print_r(json_encode($y,JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)); ?></pre>