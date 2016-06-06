<?php

include "local.php";
include "public/check.php";
include __DIR__."/../../app/helpers/db.helper.php";


$o   = new dbForTemplate();
$o->connect();


echo '<h1>get_user_id</h1>';
echo '<pre style="font-family:monospace; background:#eee;">';
print_r( $o->get_user_id() );
echo '</pre>';
echo '<hr />';


echo '<h1>get_is_logged_in</h1>';
echo '<pre style="font-family:monospace; background:#eee;">';
print_r( $o->get_is_logged_in() );
echo '</pre>';
echo '<hr />';


echo '<pre style="font-family:monospace; background:#eee;">';
print_r( $o->get_site_categories(false) );
echo '</pre>';
echo '<hr />';


echo '<h1>get_category_by_slug</h1>';
echo '<pre style="font-family:monospace; background:#eee;">';
print_r( $o->get_category_by_slug('soccer') );
echo '</pre>';
echo '<hr />';


echo '<h1>get_post</h1>';
echo '<pre style="font-family:monospace; background:#eee;">';
print_r( $o->get_post(26168) );
echo '</pre>';
echo '<hr />';


$o->disconnect();


?>