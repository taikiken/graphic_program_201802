<?php
/**
 * 地域別記事機能 / 概要 #2318
 * @see https://github.com/undotsushin/undotsushin/issues/2318
 * author: @taikiken
 * Date: 2017/09/04
 * Time: 19:25
 */
// desktop / mobile 振り分け

include_once __DIR__."/../${page['ua']}/_header.php";

include_once __DIR__."/${page['ua']}/category.php";

include_once __DIR__."/../${page['ua']}/_footer.php";

// debug
include_once __DIR__."/../_debug.php";
