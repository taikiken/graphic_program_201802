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
if ($page['category']['slug'] == 'motorsports') {
    // motorsports
    include_once __DIR__ . '/category_motorsports.php';
} else if ($page['category']['slug'] == 'area') {
    // area - since 2017-09-08
    include_once __DIR__.'/category_area.php';
} elseif($page['category']['slug'] == 'crazy') {
    // CRAZY ATHLETES
    include_once __DIR__.'/category_crazy.php';
} else {
    include_once __DIR__.'/category_content.php';
}
