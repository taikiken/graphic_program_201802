<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

include_once __DIR__."/../../../../include/conf/config.php";
include_once __DIR__."/../../../../app/helpers/env.helper.php";

if ( UT_ENV != 'PRODUCTION' )
{
// run
// ==============================

// フォームからxml作成
  $dom = new DomDocument('1.0', 'UTF-8');

  $date = $dom->appendChild($dom->createElement('date'));

  if (isset($_GET['au']))
  {
    for ($date_itr = 0; $date_itr < 3; $date_itr++) {
      $articles = $date->appendChild($dom->createElement('articles'));
      $articles_date = $dom->createAttribute('date');
      $articles_date->value = !empty($_POST['p_date' . $date_itr]) ? $_POST['p_date' . $date_itr] : '-';
      $articles->appendChild($articles_date);

      $new_flag = $dom->createAttribute('new');
      $new_flag->value = $date_itr == 0 ? 'true' : 'false';
      $articles->appendChild($new_flag);

      for ($articles_itr = 0; $articles_itr < 5; $articles_itr++) {
        $post_id = !empty($_POST['p_id' . $date_itr . $articles_itr]) ? $_POST['p_id' . $date_itr . $articles_itr] : 0;
        $post_blstarticle_id = !empty($_POST['p_blstarticle']) ? $_POST['p_blstarticle'] : 0;

        // 動画記事IDを最初の特集内にいれる
        if ($date_itr == 0 && $articles_itr == 0) {
          $blstarticle = $articles->appendChild($dom->createElement('blstarticle'));
          $blstarticle_id = $blstarticle->appendChild($dom->createElement('id'));
          $blstarticle_id->appendChild(
            $dom->createTextNode($post_blstarticle_id)
          );
        }
        $article = $articles->appendChild($dom->createElement('article'));
        $id = $article->appendChild($dom->createElement('id'));
        $id->appendChild(
          $dom->createTextNode($post_id)
        );

        $comments = $article->appendChild($dom->createElement('comments'));
        for ($comment_itr = 0; $comment_itr < 3; $comment_itr++) {
          $post_comment = !empty($_POST['p_comment' . $date_itr . $articles_itr . $comment_itr]) ? $_POST['p_comment' . $date_itr . $articles_itr . $comment_itr] : '-';

          $comment = $comments->appendChild($dom->createElement('comment'));
          $comment->appendChild(
            $dom->createTextNode($post_comment)
          );
        }
      }
    }
    $dom->formatOutput = true;
    $dom->save($TMP_AU_PICKS);

    print $TMP_AU_PICKS;

  }
  else
  {
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
    $dom->save($TMP_PICKS);

    print $TMP_PICKS;

  }
}
else
{
  header('Location: ' . '/', true, 301);
  exit;
}