<?php

include "local.php";
header("Content-type:text/javascript");

?>
var CONTENTSTYPE_ALLOWED=[<?=implode(",",$CONTENTSTYPE_ALLOWED)?>];
var RELATEDLINK_ALLOWED=[<?=implode(",",$RELATEDLINK_ALLOWED)?>];
var SUMMARY_ALLOWED=[<?=implode(",",$SUMMARY_ALLOWED)?>];
var MOVIE_ALLOWED=[<?=implode(",",$MOVIE_ALLOWED)?>];
var YOUTUBE_ALLOWED=[<?=implode(",",$YOUTUBE_ALLOWED)?>];
var FACEBOOK_ALLOWED=[<?=implode(",",$FACEBOOK_ALLOWED)?>];
var MCAPTION_ALLOWED=[<?=implode(",",$MCAPTION_ALLOWED)?>];
var ORIGINALURL_ALLOWED=[<?=implode(",",$ORIGINALURL_ALLOWED)?>];
var CONTENTS_ALLOWED=[<?=implode(",",$CONTENTS_ALLOWED)?>];