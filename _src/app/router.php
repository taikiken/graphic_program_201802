<?php
/**
 * User: taikiken
 * Date: 2016/02/04
 * Time: 20:04
 * http://www.lornajane.net/posts/2012/php-5-4-built-in-webserver
 * http://stackoverflow.com/questions/12564559/use-htaccess-with-php5-4-built-in-server
 */
/*
 * gulp-php-connect aka build in php server
 * を動かすための .htaccess 変わりに使う
 */
if (file_exists(__DIR__  . $_SERVER['REQUEST_URI'])) {
    return false; // serve the requested resource as-is.
} else {
    include_once 'index.php';
}