<?php

include "public/facebook.php";

$helper = $fb->getRedirectLoginHelper();
$permissions = ['email'];
$loginUrl = $helper->getLoginUrl($rurl, $permissions);

$ref=$_SERVER['HTTP_REFERER'];
$_SESSION["auth_type"]="facebook";
if(preg_match("/signup-wow/",$ref)){
	$_SESSION["redirecturl"]="/signup-wow/";
}elseif(preg_match("/signup/",$ref)){
	$_SESSION["redirecturl"]="/signup/";
}else{
	$_SESSION["redirecturl"]="/login/";
}
header("Location: ".$loginUrl);

?>
