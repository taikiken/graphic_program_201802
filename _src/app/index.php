<?php
/**
 * Created by IntelliJ IDEA.
 * User: inazuma15
 * Date: 2016/02/04
 * Time: 20:09
 */
echo '<!-- $_SERVER REQUEST_URI, ' . "\n";
echo $_SERVER['REQUEST_URI'] . "\n";
echo '-->' . "\n";
echo '<!-- parse_url $_SERVER REQUEST_URI, ' . "\n";
var_dump( parse_url( $_SERVER['REQUEST_URI'] ) );
echo '-->' . "\n";
$uri = $_SERVER['REQUEST_URI'];
$parse_uri = parse_url( $_SERVER['REQUEST_URI'] );

$path = $parse_uri[ 'path' ];
echo '<!-- $path '. "\n";
var_dump( $path );
echo '-->' . "\n";
$split = explode( '/', $path );
$route = $split[ 1 ];

switch ( $route ) {
    case '':
        include_once 'tmp/index.tmp.html';
        break;

    case 'category':
        include_once 'tmp/category.tmp.html';
        break;

    case 'p':
        include_once '_test/test.single.html';
        break;
}


exit( 0 );