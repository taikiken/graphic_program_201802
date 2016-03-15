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
	"service"=>"facebook",
	"token"=>$accessToken->getValue(),
	"id"=>$userinfo["id"],
	"name"=>$userinfo["name"],
	"email"=>$userinfo["email"],
	"bio"=>$userinfo["description"],
	"profile_picture"=>$picture
);

$_SESSION['fb_access_token'] = (string) $accessToken;
$_SESSION["usersinfo"]=$y;

header("Location:auth.php");

?>