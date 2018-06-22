<?php
/**
 * desktop: motorsports category template
 * motorsports category だけ表示が変わるので分岐する
 * User: @taikiken
 * Date: 2017/05/25
 * Time: 16:31
 * @see https://github.com/undotsushin/undotsushin/issues/1914
 * @see https://github.com/undotsushin/undotsushin/issues/1915
 */

// motorsports
if ( $page['category']['slug'] == 'motorsports' ) :
  include_once __DIR__ . '/category_motorsports.php';

// area - since 2017-09-08
elseif ( $page['category']['slug'] == 'area' ) :
  include_once __DIR__ . '/category_area.php';

// CRAZY ATHLETES
elseif ( $page['category']['slug'] == 'crazy') :
  include_once __DIR__.'/category_crazy.php';

// pyeongchang2018
elseif ( $page['category']['slug'] == 'pyeongchang2018' ) :
  include_once __DIR__.'/category_pyeongchang2018.php';

// inhightv
elseif ( $page['category']['slug'] == 'inhightv' ) :

  if ( UT_ENV === 'STAGING' ) :
    include_once __DIR__.'/category_inhightv.php';
  else :
    include_once __DIR__.'/category_inhightv_preopen.php';
  endif;

else :
  include_once __DIR__.'/category_content.php';

endif;
