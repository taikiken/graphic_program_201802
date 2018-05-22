<?php
$defYear   = "2018";
$defSeason = "spring";

$hostInfo  = $_SERVER['HTTP_HOST'];
if (preg_match("/dev./", $hostInfo)) {
    $jsonDevUrl = "dev-";
} else {
    $jsonDevUrl = "";
}
?>