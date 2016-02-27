<?php

session_start();

define('CONSUMER_KEY','00gnA3emAHJfARBvUf2DIFFXe');
define('CONSUMER_SECRET','q9X3PYPcCPDYC5rOAfGuBrFtFiZXPwlYcvQ43If2EC2iUebEHd');
define('OAUTH_CALLBACK','http://dev.undotsushin.com/api/auth_twitter_callback.php');

require_once 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

?>