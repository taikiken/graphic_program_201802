<?php


if ( $page['conditional']['header'] ) :
  include_once __DIR__."/${page['ua']}/_header.php";
endif;

if ( $page['conditional']['footer'] ) :
  include_once __DIR__."/${page['ua']}/_footer.php";
endif;

// debug
include_once __DIR__."/_debug.php";

?>