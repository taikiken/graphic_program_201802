<?php

require __DIR__.'/../../../app/helpers/ua.helper.php';

$ua = new UserAgent();
$ua = $ua->set();

if( $ua === 'desktop' ) :
  include_once __DIR__.'/view/desktop.php';
else :
  include_once __DIR__.'/view/mobile.php';
endif;

?>
