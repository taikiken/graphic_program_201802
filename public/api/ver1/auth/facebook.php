<?php

include "public/facebook.php";

$helper = $fb->getRedirectLoginHelper();
$permissions = ['email'];
$loginUrl = $helper->getLoginUrl($rurl, $permissions);

$ref=$_SERVER['HTTP_REFERER'];
if(preg_match("/signup/",$ref)){
	$_SESSION["redirecturl"]="/signup/";
}elseif(preg_match("/login/",$ref)){
	$_SESSION["redirecturl"]="/login/";
}
header("Location: ".$loginUrl);

?>