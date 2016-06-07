<?php

include "local.php";
include "public/check.php";
include __DIR__."/../../app/helpers/db.helper.php";

//初期化＋DB接続
$o=new dbForTemplate;
$o->connect();

//例）

echo "\n\nカテゴリー一覧\n";
var_dump($o->get_site_categories());

echo "\n\nカテゴリー情報\n";
var_dump($o->get_category_by_slug("crazy"));

echo "\n\n投稿データ\n";
var_dump($o->get_post(12321));

echo "\n\nコメント\n";
var_dump($o->get_comment(12321,89));


?>