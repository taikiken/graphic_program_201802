<?php

include_once __DIR__."/${page['ua']}/_header.php";

if ( $page['parts'] === 'all' ) :
  echo "\n".'<div style="height: 800px;"></div>'."\n";
endif;

include_once __DIR__."/${page['ua']}/_footer.php";

// debug
include_once __DIR__."/_debug.php";

?>