<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

include_once __DIR__."/../../../../include/conf/config.php";
include_once __DIR__."/../../../../app/helpers/env.helper.php";

$servername=$_SERVER["SERVER_NAME"];

$servername=$_SERVER["SERVER_NAME"];
if (preg_match("/cms/",$servername) ||
  preg_match("/dev/",$servername))
{
// run
// ==============================

// フォームからxml作成
  $dom = new DomDocument('1.0', 'UTF-8');

  $date = $dom->appendChild($dom->createElement('date'));

  $articles = $date->appendChild($dom->createElement('articles'));
  $articles_date = $dom->createAttribute('date');
  $articles_date->value = $_POST['p_date0'];
  $articles->appendChild($articles_date);

  for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
    $article = $articles->appendChild($dom->createElement('article'));
    $id = $article->appendChild($dom->createElement('id'));
    $id->appendChild(
      $dom->createTextNode($_POST['p_id0' . $articles_itr])
    );

    $comments = $article->appendChild($dom->createElement('comments'));
    for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
      $comment = $comments->appendChild($dom->createElement('comment'));
      $comment->appendChild(
        $dom->createTextNode($_POST['p_comment0' . $articles_itr . $comment_itr])
      );
    }
  }
  $dom->formatOutput = true;
  $dom->save($TMP_TOJ);

  print $TMP_TOJ;

}
else
{
  header('Location: ' . '/', true, 301);
  exit;
}