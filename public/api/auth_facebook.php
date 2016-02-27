<?php

include "public/facebook.php";

$helper = $fb->getRedirectLoginHelper();
$permissions = ['email'];
$loginUrl = $helper->getLoginUrl('https://www.undotsushin.com/api/auth_facebook_callback.php', $permissions);

header("Location: ".$loginUrl);

?>