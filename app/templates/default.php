<?php


include_once __DIR__."/${page['ua']}/_header.php";

include_once __DIR__."/${page['ua']}/${page['template']}.php";

include_once __DIR__."/${page['ua']}/_footer.php";


# PRODUCTION以外 かつ ?debug の場合に $page の内容を出力
if ( UT_ENV !== 'PRODUCTION' && isset($_GET['debug']) ) :

echo '<textarea style="display:block; width:93%; height:1200px; margin:100px auto; background:#eee; font-family:monospace; font-size:12px; padding:20px;">';
  print_r($page);
echo '</textarea>';

endif;

?>