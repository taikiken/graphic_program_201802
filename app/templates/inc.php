<?php

include_once __DIR__."/${page['ua']}/_header.php";

if ( $page['parts'] === 'all' ) :
  echo "\n".'<!-- [contents] -->'."\n";
  echo '<!-- こちらにページ内容を記述してください *下のdivは不要です -->'."\n";
  echo '<div style="height: 800px;"></div>'."\n";
  echo '<!-- //[contents] -->'."\n\n\n\n\n";
endif;

include_once __DIR__."/${page['ua']}/_footer.php";

// debug
include_once __DIR__."/_debug.php";

?>